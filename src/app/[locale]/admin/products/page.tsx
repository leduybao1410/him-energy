'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button, Card } from '@/components/ui';
import { Container, Section } from '@/components/ui';
import { Product } from '@/types/product';
import { Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { HeroSectionBackground } from '@/components/sections/HeroSection';
import { cn } from '@/lib/utils';
import ProductForm from '@/components/forms/ProductForm';
import { ClientRouteMap } from '@/constants/client-route/client-route-map';
import { apiFetch } from '@/lib/api/apiFetch';

export default function AdminProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/products');
            const data = await response.json();

            if (response.ok && data.products && Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                setError(data.error || 'Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Network error occurred while fetching products');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (productData: Product) => {
        try {
            setActionLoading(true);
            setError(null);



            let response;
            if (editingProduct) {
                console.log(productData);
                // Update existing product
                const route = ClientRouteMap.products.update.url(editingProduct.id.toString());
                console.log(route);
                response = await apiFetch(route, {
                    method: ClientRouteMap.products.update.method,
                    body: JSON.stringify(productData),
                });
            } else {
                // Create new product
                response = await apiFetch(ClientRouteMap.products.create.url, {
                    method: ClientRouteMap.products.create.method,
                    body: JSON.stringify(productData),
                });
            }

            const data = await response.json();

            if (response.ok) {
                // Refresh products list
                await fetchProducts();
                // Reset form state
                setShowForm(false);
                setEditingProduct(null);
            } else {
                setError(data.error || 'Failed to save product');
            }
        } catch (error) {
            console.error('Error saving product:', error);
            setError('Network error occurred while saving product');
        } finally {
            setActionLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (productId: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                setActionLoading(true);
                setError(null);

                const response = await fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                });

                const data = await response.json();

                if (response.ok) {
                    // Refresh products list
                    await fetchProducts();
                } else {
                    setError(data.error || 'Failed to delete product');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                setError('Network error occurred while deleting product');
            } finally {
                setActionLoading(false);
            }
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-secondary w-full">
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="flex-1 bg-secondary">
                <HeroSectionBackground showArrow={false}>
                    <Container className="z-10 flex flex-col gap-6 py-20">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl text-white font-bold text-primary mb-2">
                                    Quản lý sản phẩm
                                </h1>
                                <p className="text-muted-foreground text-white/70">
                                    Tạo, chỉnh sửa và quản lý sản phẩm của bạn
                                </p>
                            </div>
                            <Button
                                onClick={() => setShowForm(true)}
                                className="flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Thêm sản phẩm
                            </Button>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <Card className="bg-red-50 border-red-200 p-4">
                                <div className="flex items-center gap-2 text-red-600">
                                    <X className="w-5 h-5" />
                                    <span>{error}</span>
                                    <button
                                        onClick={() => setError(null)}
                                        className="ml-auto text-red-400 hover:text-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </Card>
                        )}

                        {/* Product Form */}
                        <Card className={cn(" bg-white/10 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300", showForm ? "h-full opacity-100" : "h-0 opacity-0")}>
                            <ProductForm
                                product={editingProduct}
                                onSubmit={handleFormSubmit}
                                onCancel={handleCancel}
                                isEditing={!!editingProduct}
                                loading={actionLoading}
                            />
                        </Card>

                        {/* Products List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {product.category}
                                            </p>
                                            <p className="text-lg font-bold text-accent">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                        {product.description}
                                    </p>

                                    <div className="flex gap-2 z-50">
                                        <Button
                                            type='button'
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                router.push(`/admin/products/${product.id}`);
                                            }}
                                            className="flex items-center gap-1 text-black"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Chi tiết
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(product)}
                                            disabled={actionLoading}
                                            className="flex items-center gap-1 text-black"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(product.id)}
                                            disabled={actionLoading}
                                            className="flex items-center gap-1 text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Xóa
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {products.length === 0 && (
                            <Card className="p-12 text-center">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-xl font-semibold text-primary mb-2">
                                    Chưa có sản phẩm nào
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Bắt đầu bằng cách thêm sản phẩm đầu tiên của bạn
                                </p>
                                <Button onClick={() => setShowForm(true)}>
                                    <Plus className="w-5 h-5 mr-2" />
                                    Thêm sản phẩm
                                </Button>
                            </Card>
                        )}
                    </Container>
                </HeroSectionBackground>
            </div>
        </ProtectedRoute>
    );
}
