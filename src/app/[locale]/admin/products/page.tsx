'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button, Card } from '@/components/ui';
import { Container, Section } from '@/components/ui';
import { Product } from '@/types/product';
import { Plus, Edit, Trash2, Eye, X, Ellipsis } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { HeroSectionBackground } from '@/components/sections/HeroSection';
import { cn } from '@/lib/utils';
import ProductForm from '@/components/forms/ProductForm';
import { ClientRouteMap } from '@/constants/client-route/client-route-map';
import { apiFetch, fetchProduct } from '@/lib/api/apiFetch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getCategoryLabel } from '@/components/sections/ProductDetailSection';
import { useLocale, useTranslations } from 'next-intl';


export default function AdminProductsPage() {
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const langCode = urlParams.get('lang_code');
    const isEditing = urlParams.get('isEditing');
    const isCreating = urlParams.get('isCreating');
    const id = urlParams.get('id');
    const root_id = urlParams.get('root_id') ?? null;

    const router = useRouter();
    const t = useTranslations();
    const tCategories = useTranslations('products.categories');

    const currentLangCode = window.location.pathname.split('/')[1] || 'vi';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const [formLangCode, setFormLangCode] = useState(langCode ?? currentLangCode);



    const fetchProducts = async (langCode: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/products?lang_code=${langCode}`);
            const data = await response.json();

            if (response.ok && data.products && Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                setError(data.error || 'Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Network error occurred while fetching products');
            setLoading(false);
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
                const route = ClientRouteMap.products.update.url(editingProduct.id?.toString() ?? '');
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
                await fetchProducts(langCode ?? currentLangCode);
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
                    await fetchProducts(langCode ?? currentLangCode);
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

    useEffect(() => {
        fetchProducts(langCode ?? currentLangCode);
        if (isCreating && langCode) {
            setShowForm(true);
            setEditingProduct(null);
            setFormLangCode(langCode);
        }
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            if (isEditing && id) {
                setEditingProduct(products.find(product => product.id === parseInt(id)) ?? null);
                setShowForm(true);
            }
        }
    }, [products.length]);


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
                        <Card className={cn(" bg-white/10  backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300", showForm ? "h-full opacity-100" : "h-0 opacity-0")}>
                            <ProductForm
                                product={editingProduct}
                                onSubmit={handleFormSubmit}
                                onCancel={handleCancel}
                                isEditing={!!editingProduct}
                                loading={actionLoading}
                                langCode={formLangCode}
                                root_id={root_id}
                            />
                        </Card>

                        {/* Products List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Card key={product.id} className="px-3 py-4 z-50 hover:shadow-lg transition-shadow relative">
                                    <div className="flex justify-between items-start mb-4 gap-3">
                                        <img src={product.thumbnail_url} width={100} height={100} className='border border-black/10 shadow rounded-lg' />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {getCategoryLabel(product.category, tCategories)}
                                            </p>
                                            {/* <p className="text-lg font-bold text-accent">
                                                {formatPrice(product.price)}
                                            </p> */}
                                        </div>
                                        <ProductDropdownMenu
                                            product={product}
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                            actionLoading={actionLoading}
                                        />
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                        {t('products.productDetail.description')}: {product.description}
                                    </p>




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


function ProductDropdownMenu({
    product,
    handleEdit,
    handleDelete,
    actionLoading,
}: {
    product: Product;
    handleEdit: (product: Product) => void;
    handleDelete: (productId: number) => void;
    actionLoading: boolean;
}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const handleOpenDropdown = () => {
        setOpen(!open);
    };

    return (
        <DropdownMenu open={open} modal={true} onOpenChange={handleOpenDropdown}>
            <DropdownMenuTrigger
                className="rounded-full border p-1 w-8 h-8 flex items-center justify-center hover:bg-black/10 cursor-pointer outline-none"
                aria-label="Mở menu thao tác"
            >
                <Ellipsis className="w-4 h-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-black/80 shadow-md rounded-md" align="end" side="bottom">
                <DropdownMenuItem
                    onClick={() => router.push(`/admin/products/${product.id}`)}
                    disabled={actionLoading}
                    className="flex items-center gap-2 hover:bg-gray-50 text-white hover:text-black "
                >
                    <Eye className="w-4 h-4" />
                    <span>Xem</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleEdit(product)}
                    disabled={actionLoading}
                    className="flex items-center gap-2 hover:bg-gray-50 text-white hover:text-black "
                >
                    <Edit className="w-4 h-4" />
                    <span>Chỉnh sửa</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleDelete(product.id ?? -1)}
                    disabled={actionLoading}
                    className="flex items-center gap-2 text-red-600 focus:text-red-700 hover:bg-red-50"
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Xóa sản phẩm</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}