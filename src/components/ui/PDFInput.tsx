'use client';

import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { FileText, X, ExternalLink } from 'lucide-react';
import ImageGallery from '../ImageGallery';

interface PDFInputProps {
    value: string | undefined;
    onChange: (value: { url: string; title: string }) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    className?: string;
    labelClassName?: string;
    containerClassName?: string;
    showGallery?: boolean;
}

export default function PDFInput({
    value,
    onChange,
    label,
    placeholder = "Nhập URL PDF hoặc chọn từ thư viện",
    error,
    className,
    labelClassName,
    containerClassName,
    showGallery = true
}: PDFInputProps) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const handlePDFSelect = (pdfUrl: string) => {
        // Extract filename from URL for title
        const filename = pdfUrl.split('/').pop()?.split('.')[0] || 'PDF Document';
        onChange({ url: pdfUrl, title: filename });
        setIsGalleryOpen(false);
    };

    const clearPDF = () => {
        onChange({ url: '', title: '' });
    };

    return (
        <div className={containerClassName}>
            {label && (
                <label className={`block text-sm font-medium mb-2 ${labelClassName || 'text-gray-700'}`}>
                    {label}
                </label>
            )}

            <div className="space-y-3 flex flex-col gap-2">
                {/* PDF preview */}
                {value && value.trim() && (
                    <div className="relative flex flex-row">
                        <div className="w-32 h-32 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
                            <FileText className="w-8 h-8 text-red-500" />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={clearPDF}
                            className="absolute top-0 left-0 bg-white border-red-200 text-red-600 hover:bg-red-50 p-1"
                        >
                            <X className="w-3 h-3" />
                        </Button>
                    </div>
                )}

                {/* Input field */}
                <div className="flex gap-2">
                    <Input
                        value={value || ''}
                        onChange={(e) => onChange({ url: e.target.value, title: '' })}
                        placeholder={placeholder}
                        error={error}
                        className={className}
                    />

                    {showGallery && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsGalleryOpen(true)}
                            className="flex items-center gap-2 whitespace-nowrap text-black/50 border-black/50 hover:bg-black/10"
                        >
                            Thư viện
                        </Button>
                    )}
                </div>

                {/* External link button */}
                {value && value.trim() && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:text-primary/80"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Xem PDF
                        </a>
                    </div>
                )}
            </div>

            {/* PDF Gallery Modal */}
            <ImageGallery
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                onSelect={handlePDFSelect}
                selectedFileUrl={value || ''}
                title="Chọn PDF"
                allowedTypes={['pdf']}
            />
        </div>
    );
}
