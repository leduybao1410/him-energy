'use client';

import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { ImageIcon, X, ExternalLink } from 'lucide-react';
import ImageGallery from '../ImageGallery';

interface ImageInputProps {
    value: string | undefined;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    className?: string;
    labelClassName?: string;
    containerClassName?: string;
    showGallery?: boolean;
}

export default function ImageInput({
    value,
    onChange,
    label,
    placeholder = "Nhập URL hình ảnh hoặc chọn từ thư viện",
    error,
    className,
    labelClassName,
    containerClassName,
    showGallery = true
}: ImageInputProps) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const handleImageSelect = (imageUrl: string) => {
        onChange(imageUrl);
        setIsGalleryOpen(false);
    };

    const clearImage = () => {
        onChange('');
    };

    return (
        <div className={containerClassName}>
            {label && (
                <label className={`block text-sm font-medium mb-2 ${labelClassName || 'text-gray-700'}`}>
                    {label}
                </label>
            )}

            <div className="space-y-3 flex flex-col gap-2">
                {/* Image preview */}
                {value && value.trim() && (
                    <div className="relative flex flex-row">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={clearImage}
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
                        onChange={(e) => onChange(e.target.value)}
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
                            Xem hình ảnh
                        </a>
                    </div>
                )}
            </div>

            {/* Image Gallery Modal */}
            <ImageGallery
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                onSelect={handleImageSelect}
                selectedImageUrl={value || ''}
                title="Chọn hình ảnh"
            />
        </div>
    );
}
