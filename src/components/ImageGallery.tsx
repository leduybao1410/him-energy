'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui';
import { X, Upload, Search, Image as ImageIcon, Trash2, Check, FileText } from 'lucide-react';
import { ClientImagesRoute } from '@/constants/client-route/client-images-route';
import { ClientFilesRoute } from '@/constants/client-route/client-files-route';

interface FileItem {
    id: number;
    source_url: string;
    title: {
        rendered: string;
    };
    alt_text: string;
    mime_type: string;
    media_details?: {
        width: number;
        height: number;
        file: string;
    };
}

interface ImageGalleryProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (fileUrl: string) => void;
    onMultipleSelect?: (fileUrls: string[]) => void;
    selectedFileUrl?: string;
    selectedImageUrls?: string[];
    title?: string;
    allowedTypes?: ('image' | 'pdf')[];
    multiple?: boolean;
    maxSelection?: number;
}

export default function ImageGallery({
    isOpen,
    onClose,
    onSelect,
    onMultipleSelect,
    selectedFileUrl,
    selectedImageUrls = [],
    title = "Chọn file",
    allowedTypes = ['image', 'pdf'],
    multiple = false,
    maxSelection = 1
}: ImageGalleryProps) {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'image' | 'pdf'>('image');
    const [selectedUrls, setSelectedUrls] = useState<string[]>(selectedImageUrls || []);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync selectedUrls with props when gallery opens
    useEffect(() => {
        if (isOpen && selectedImageUrls) {
            setSelectedUrls(selectedImageUrls);
        } else if (!isOpen) {
            setSelectedUrls([]);
        }
    }, [isOpen]);


    // Fetch files from API
    const fetchFiles = async (page: number = 1, search: string = '', fileType: 'image' | 'pdf' = 'image') => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                per_page: '20',
                page: page.toString(),
                type: fileType
            });

            if (search) {
                params.append('search', search);
            }

            const response = await fetch(`${ClientFilesRoute.list.url}?${params}`);
            const data = await response.json();

            if (response.ok) {
                setFiles(data.data || []);
                console.log(data.data.map((file: FileItem) => file.source_url));
                setTotalPages(parseInt(data.totalPages) || 1);
                setCurrentPage(page);
            } else {
                setError(data.error || 'Không thể tải danh sách file');
            }
        } catch (error) {
            console.error('Error fetching files:', error);
            setError('Lỗi kết nối khi tải file');
        } finally {
            setLoading(false);
        }
    };

    // Upload new file
    const handleUpload = async (file: File) => {
        try {
            setUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', file.name);

            const response = await fetch(ClientFilesRoute.create.url, {
                method: ClientFilesRoute.create.method,
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // Refresh the file list
                await fetchFiles(1, searchTerm, activeTab);
                setError(null);
            } else {
                setError(data.error || 'Không thể tải lên file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Lỗi kết nối khi tải lên file');
        } finally {
            setUploading(false);
        }
    };

    // Handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type based on active tab
            if (activeTab === 'image' && !file.type.startsWith('image/')) {
                setError('Vui lòng chọn file hình ảnh hợp lệ');
                return;
            }
            if (activeTab === 'pdf' && file.type !== 'application/pdf') {
                setError('Vui lòng chọn file PDF hợp lệ');
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

    // Delete file
    const handleDelete = async (fileId: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa file này?')) {
            return;
        }

        try {
            const response = await fetch(ClientFilesRoute.delete.url(fileId.toString()), {
                method: ClientFilesRoute.delete.method,
            });

            if (response.ok) {
                // Refresh the file list
                await fetchFiles(currentPage, searchTerm, activeTab);
            } else {
                const data = await response.json();
                setError(data.error || 'Không thể xóa file');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            setError('Lỗi kết nối khi xóa file');
        }
    };

    // Handle search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchFiles(1, searchTerm, activeTab);
    };

    // Handle tab change
    const handleTabChange = (tab: 'image' | 'pdf') => {
        setActiveTab(tab);
        fetchFiles(1, searchTerm, tab);
    };

    // Load files when component opens
    useEffect(() => {
        if (isOpen) {
            fetchFiles(1, searchTerm, activeTab);
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4"
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

                {/* Tabs */}
                <div className="border-b px-4">
                    <div className="flex">
                        {allowedTypes.includes('image') && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleTabChange('image')}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'image'
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-primary-600 hover:border-primary-600'
                                    }`}
                            >
                                <ImageIcon className="w-4 h-4 inline mr-2" />
                                Hình ảnh
                            </Button>
                        )}
                        {allowedTypes.includes('pdf') && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleTabChange('pdf')}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'pdf'
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-primary-600 hover:border-primary-600'
                                    }`}
                            >
                                <FileText className="w-4 h-4 inline mr-2" />
                                PDF Files
                            </Button>
                        )}
                    </div>
                </div>

                {/* Upload Section */}
                <div className="p-6 border-b bg-gray-50">
                    <div className="flex items-center gap-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={activeTab === 'image' ? 'image/*' : 'application/pdf'}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2"
                        >
                            <Upload className="w-4 h-4" />
                            {uploading ? 'Đang tải lên...' : `Tải lên ${activeTab === 'image' ? 'hình ảnh' : 'PDF'}`}
                        </Button>

                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1 max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={`Tìm kiếm ${activeTab === 'image' ? 'hình ảnh' : 'PDF'}...`}
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

                {/* File Grid */}
                <div className="flex-1 overflow-auto p-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : files.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            {activeTab === 'image' ? (
                                <ImageIcon className="w-12 h-12 mb-4" />
                            ) : (
                                <FileText className="w-12 h-12 mb-4" />
                            )}
                            <p>Không tìm thấy {activeTab === 'image' ? 'hình ảnh' : 'PDF'} nào</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${multiple
                                        ? (selectedUrls.includes(file.source_url)
                                            ? 'border-primary ring-2 ring-primary/20'
                                            : 'border-gray-200 hover:border-gray-300')
                                        : (selectedFileUrl === file.source_url
                                            ? 'border-primary ring-2 ring-primary/20'
                                            : 'border-gray-200 hover:border-gray-300')
                                        }`}
                                    onClick={() => {
                                        if (multiple) {
                                            if (selectedUrls.includes(file.source_url)) {
                                                // Remove from selection
                                                const newSelection = selectedUrls.filter(url => url !== file.source_url);
                                                setSelectedUrls(newSelection);
                                            } else if (selectedUrls.length < maxSelection) {
                                                // Add to selection
                                                const newSelection = [...selectedUrls, file.source_url];
                                                setSelectedUrls(newSelection);
                                            }
                                        } else {
                                            onSelect(file.source_url);
                                        }
                                    }}
                                >
                                    {activeTab === 'image' ? (
                                        <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                                            <img
                                                src={file.source_url}
                                                alt={file.alt_text || file.title.rendered}
                                                className="w-full h-full object-cover"
                                                onLoad={() => console.log('Image loaded successfully:', file.source_url)}
                                                onError={(e) => {
                                                    console.error('Image load error:', file.source_url);
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    // Show error placeholder
                                                    const parent = target.parentElement;
                                                    if (parent) {
                                                        parent.innerHTML = `
                                                            <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                <span class="text-gray-500 text-xs">Image Error</span>
                                                            </div>
                                                        `;
                                                    }
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                                            <FileText className="w-12 h-12 text-gray-400" />
                                        </div>
                                    )}

                                    {/* Selection indicator */}
                                    {(multiple ? selectedUrls.includes(file.source_url) : selectedFileUrl === file.source_url) && (
                                        <div className="absolute top-2 right-2 bg-primary text-white bg-black/30 rounded-full p-1">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(file.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* File info */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs">
                                        <p className="truncate">{file.title.rendered}</p>
                                        {file.media_details && activeTab === 'image' && (
                                            <p className="text-gray-300">
                                                {file.media_details.width} × {file.media_details.height}
                                            </p>
                                        )}
                                        {activeTab === 'pdf' && (
                                            <p className="text-gray-300">PDF Document</p>
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
                            onClick={() => fetchFiles(currentPage - 1, searchTerm, activeTab)}
                            disabled={currentPage === 1 || loading}
                        >
                            Trước
                        </Button>
                        <span className="text-sm text-gray-600">
                            Trang {currentPage} / {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => fetchFiles(currentPage + 1, searchTerm, activeTab)}
                            disabled={currentPage === totalPages || loading}
                        >
                            Sau
                        </Button>
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t">
                    {multiple && (
                        <div className="text-sm text-gray-600">
                            Đã chọn {selectedUrls.length}/{maxSelection} hình ảnh
                        </div>
                    )}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            className="text-black/50 border-black/50 hover:bg-black/10"
                            onClick={onClose}>
                            Hủy
                        </Button>
                        <Button
                            onClick={() => {
                                if (multiple) {
                                    // For multiple selection, use onMultipleSelect if available
                                    if (onMultipleSelect) {
                                        onMultipleSelect(selectedUrls);
                                    } else {
                                        // Fallback: call onSelect for each selected URL
                                        selectedUrls.forEach(url => onSelect(url));
                                    }
                                } else {
                                    if (selectedFileUrl) {
                                        onSelect(selectedFileUrl);
                                    }
                                }
                                onClose();
                            }}
                            disabled={multiple ? selectedUrls.length === 0 : !selectedFileUrl}
                        >
                            {multiple ? `Chọn ${selectedUrls.length} hình` : 'Chọn'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
