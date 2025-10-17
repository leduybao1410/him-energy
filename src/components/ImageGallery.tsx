'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui';
import { X, Upload, Search, Image as ImageIcon, Trash2, Check } from 'lucide-react';
import { ClientImagesRoute } from '@/constants/client-route/client-images-route';

interface ImageItem {
    id: number;
    source_url: string;
    title: {
        rendered: string;
    };
    alt_text: string;
    media_details?: {
        width: number;
        height: number;
        file: string;
    };
}

interface ImageGalleryProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (imageUrl: string) => void;
    selectedImageUrl?: string;
    title?: string;
}

export default function ImageGallery({
    isOpen,
    onClose,
    onSelect,
    selectedImageUrl,
    title = "Chọn hình ảnh"
}: ImageGalleryProps) {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch images from API
    const fetchImages = async (page: number = 1, search: string = '') => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                per_page: '20',
                page: page.toString()
            });

            if (search) {
                params.append('search', search);
            }

            const response = await fetch(`${ClientImagesRoute.list.url}?${params}`);
            const data = await response.json();

            if (response.ok) {
                setImages(data.data || []);
                setTotalPages(parseInt(data.totalPages) || 1);
                setCurrentPage(page);
            } else {
                setError(data.error || 'Không thể tải danh sách hình ảnh');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setError('Lỗi kết nối khi tải hình ảnh');
        } finally {
            setLoading(false);
        }
    };

    // Upload new image
    const handleUpload = async (file: File) => {
        try {
            setUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', file.name);

            const response = await fetch(ClientImagesRoute.create.url, {
                method: ClientImagesRoute.create.method,
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // Refresh the image list
                await fetchImages(1, searchTerm);
                setError(null);
            } else {
                setError(data.error || 'Không thể tải lên hình ảnh');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Lỗi kết nối khi tải lên hình ảnh');
        } finally {
            setUploading(false);
        }
    };

    // Handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Vui lòng chọn file hình ảnh hợp lệ');
                return;
            }

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError('Kích thước file không được vượt quá 10MB');
                return;
            }

            handleUpload(file);
        }
    };

    // Delete image
    const handleDelete = async (imageId: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
            return;
        }

        try {
            const response = await fetch(ClientImagesRoute.delete.url(imageId.toString()), {
                method: ClientImagesRoute.delete.method,
            });

            if (response.ok) {
                // Refresh the image list
                await fetchImages(currentPage, searchTerm);
            } else {
                const data = await response.json();
                setError(data.error || 'Không thể xóa hình ảnh');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            setError('Lỗi kết nối khi xóa hình ảnh');
        }
    };

    // Handle search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchImages(1, searchTerm);
    };

    // Load images when component opens
    useEffect(() => {
        if (isOpen) {
            fetchImages(1, searchTerm);
        }
    }, [isOpen]);

    // Handle click outside to close modal
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <Button
                        variant="outline"
                        className="text-black/50 border-black/50 hover:bg-black/10"
                        onClick={onClose}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Upload Section */}
                <div className="p-6 border-b bg-gray-50">
                    <div className="flex items-center gap-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2"
                        >
                            <Upload className="w-4 h-4" />
                            {uploading ? 'Đang tải lên...' : 'Tải lên hình ảnh'}
                        </Button>

                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1 max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Tìm kiếm hình ảnh..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </form>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}
                </div>

                {/* Image Grid */}
                <div className="flex-1 overflow-auto p-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <ImageIcon className="w-12 h-12 mb-4" />
                            <p>Không tìm thấy hình ảnh nào</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {images.map((image) => (
                                <div
                                    key={image.id}
                                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${selectedImageUrl === image.source_url
                                        ? 'border-primary ring-2 ring-primary/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => onSelect(image.source_url)}
                                >
                                    <img
                                        src={image.source_url}
                                        alt={image.alt_text || image.title.rendered}
                                        className="w-full h-32 object-cover"
                                        loading="lazy"
                                    />

                                    {/* Selection indicator */}
                                    {selectedImageUrl === image.source_url && (
                                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(image.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Image info */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs">
                                        <p className="truncate">{image.title.rendered}</p>
                                        {image.media_details && (
                                            <p className="text-gray-300">
                                                {image.media_details.width} × {image.media_details.height}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between p-6 border-t">
                        <Button
                            variant="outline"
                            onClick={() => fetchImages(currentPage - 1, searchTerm)}
                            disabled={currentPage === 1 || loading}
                        >
                            Trước
                        </Button>
                        <span className="text-sm text-gray-600">
                            Trang {currentPage} / {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => fetchImages(currentPage + 1, searchTerm)}
                            disabled={currentPage === totalPages || loading}
                        >
                            Sau
                        </Button>
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 p-6 border-t">
                    <Button
                        variant="outline"
                        className="text-black/50 border-black/50 hover:bg-black/10"
                        onClick={onClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={() => {
                            if (selectedImageUrl) {
                                onSelect(selectedImageUrl);
                                onClose();
                            }
                        }}
                        disabled={!selectedImageUrl}
                    >
                        Chọn
                    </Button>
                </div>
            </div>
        </div>
    );
}
