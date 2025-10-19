'use client';

import { useState, useMemo } from 'react';
import Button from './Button';
import Input from './Input';
import { ImageIcon, X, ExternalLink } from 'lucide-react';
import ImageGallery from '../ImageGallery';

interface ImageInputProps {
    value: string | string[] | undefined;
    onChange: (value: string | string[]) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    className?: string;
    labelClassName?: string;
    containerClassName?: string;
    showGallery?: boolean;
    multiple?: boolean;
    maxImages?: number;
    allowedTypes?: ('image' | 'pdf')[];
}

export default function ImageInput({
    value,
    onChange,
    label,
    allowedTypes = ['image'],
    placeholder = "Nhập URL hình ảnh hoặc chọn từ thư viện",
    error,
    className,
    labelClassName,
    containerClassName,
    showGallery = true,
    multiple = false,
    maxImages = 10
}: ImageInputProps) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    // Helper functions to handle both single and multiple values
    const getCurrentImages = (): string[] => {
        if (!value) return [];
        return Array.isArray(value) ? value : [value];
    };

    // Memoize current images to prevent infinite re-renders
    const currentImages = useMemo(() => getCurrentImages(), [value]);

    const handleImageSelect = (imageUrl: string) => {
        if (multiple) {
            if (!currentImages.includes(imageUrl) && currentImages.length < maxImages) {
                const newImages = [...currentImages, imageUrl];
                onChange(newImages);
            }
        } else {
            onChange(imageUrl);
        }
        setIsGalleryOpen(false);
    };

    const handleMultipleImageSelect = (imageUrls: string[]) => {
        if (multiple) {
            // Filter out URLs that are already selected and respect maxImages limit
            const newUrls = imageUrls.filter(url => !currentImages.includes(url));
            const totalImages = currentImages.length + newUrls.length;
            const allowedNewUrls = totalImages <= maxImages ? newUrls : newUrls.slice(0, maxImages - currentImages.length);

            if (allowedNewUrls.length > 0) {
                const newImages = [...currentImages, ...allowedNewUrls];
                onChange(newImages);
            }
        }
        setIsGalleryOpen(false);
    };

    const clearImage = (imageUrl?: string) => {
        if (multiple && imageUrl) {
            const newImages = currentImages.filter(img => img !== imageUrl);
            onChange(newImages);
        } else {
            onChange(multiple ? [] : '');
        }
    };

    const clearAllImages = () => {
        onChange(multiple ? [] : '');
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
                {currentImages.length > 0 && (
                    <div className="space-y-2">
                        {/* Multiple images display */}
                        {multiple ? (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm ">
                                        Đã chọn {currentImages.length}/{maxImages} hình ảnh
                                    </span>
                                    {currentImages.length > 0 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={clearAllImages}
                                            className="text-red-600 border-red-200 hover:bg-red-50"
                                        >
                                            Xóa tất cả
                                        </Button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {currentImages.map((imageUrl, index) => (
                                        <div key={index} className="relative group">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => clearImage(imageUrl)}
                                                className=" absolute top-2 right-2 bg-white border-red-200 text-red-600 hover:bg-red-50 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                            <img
                                                src={imageUrl}
                                                alt={`Preview ${index + 1}`}
                                                className=" w-full h-24 object-cover rounded-lg border border-gray-200"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                }}
                                            />

                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // Single image display
                            <div className="relative flex flex-row">
                                <img
                                    src={currentImages[0]}
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
                                    onClick={() => clearImage()}
                                    className="absolute top-0 left-0 bg-white border-red-200 text-red-600 hover:bg-red-50 p-1"
                                >
                                    <X className="w-3 h-3" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Input field */}
                <div className="flex gap-2">
                    {multiple ? (
                        <div className="flex-1">
                            <Input
                                value=""
                                onChange={(e) => {
                                    const url = e.target.value.trim();
                                    if (url && !currentImages.includes(url)) {
                                        if (currentImages.length < maxImages) {
                                            onChange([...currentImages, url]);
                                        }
                                    }
                                }}
                                placeholder={`${placeholder} (Tối đa ${maxImages} hình)`}
                                error={error}
                                className={className}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        const url = (e.target as HTMLInputElement).value.trim();
                                        if (url && !currentImages.includes(url)) {
                                            if (currentImages.length < maxImages) {
                                                onChange([...currentImages, url]);
                                                (e.target as HTMLInputElement).value = '';
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <Input
                            value={Array.isArray(value) ? value[0] || '' : value || ''}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            error={error}
                            className={className}
                        />
                    )}

                    {showGallery && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsGalleryOpen(true)}
                            className="flex items-center gap-2 whitespace-nowrap"
                            disabled={multiple && currentImages.length >= maxImages}
                        >
                            {multiple ? 'Thêm từ thư viện' : 'Thư viện'}
                        </Button>
                    )}
                </div>

                {/* External link buttons */}
                {currentImages.length > 0 && (
                    <div className="flex items-center gap-2 text-sm ">
                        {multiple ? (
                            <div className="flex flex-wrap gap-2">
                                {currentImages.map((imageUrl, index) => (
                                    <a
                                        key={index}
                                        href={imageUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-primary hover:text-primary/80"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        Hình {index + 1}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <a
                                href={currentImages[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:text-primary/80"
                            >
                                <ExternalLink className="w-3 h-3" />
                                Xem hình ảnh
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Image Gallery Modal */}
            <ImageGallery
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                onSelect={handleImageSelect}
                allowedTypes={allowedTypes}
                onMultipleSelect={multiple ? handleMultipleImageSelect : undefined}
                selectedFileUrl={multiple ? undefined : (Array.isArray(value) ? value[0] || '' : value || '')}
                selectedImageUrls={multiple ? currentImages : undefined}
                title={multiple ? "Chọn hình ảnh (có thể chọn nhiều)" : "Chọn hình ảnh"}
                multiple={multiple}
                maxSelection={multiple ? maxImages : 1}
            />
        </div>
    );
}
