'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Input, ImageInput, Select, Textarea } from '@/components/ui';
import { Container, Section } from '@/components/ui';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import { ClientRouteMap } from '@/constants/client-route/client-route-map';
import { apiFetch } from '@/lib/api/apiFetch';
import { renderSlug } from '@/lib/utils';
import { productFormSchema, ProductFormData } from '@/lib/validations/product';
import { HeroSectionBackground } from '@/components/sections/HeroSection';


export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const productId = parseInt(params.id as string);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<ProductFormData>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            price: '',
            category: '',
            features: '',
            image_url: '',
            thumbnail_url: '',
            specifications: {
                capacity: '',
                efficiency: '',
                size: '',
                weight: '',
                warranty: '',
                origin: ''
            }
        }
    });

    // Watch name field to auto-generate slug
    const watchedName = watch('name');

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`/api/products/${productId}`);
                const data = await response.json();

                if (response.ok) {
                    setValue('name', data.name);
                    setValue('slug', data.slug);
                    setValue('description', data.description);
                    setValue('price', data.price.toString());
                    setValue('category', data.category);
                    setValue('features', data.features.join('\n'));
                    setValue('image_url', data.image_url[0] || '');
                    setValue('thumbnail_url', data.thumbnail_url);
                    setValue('specifications', data.specifications || {
                        capacity: '',
                        efficiency: '',
                        size: '',
                        weight: '',
                        warranty: '',
                        origin: ''
                    });
                } else {
                    setError(data.error || 'Failed to fetch product');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Network error occurred while fetching product');
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [productId, setValue]);

    // Auto-generate slug when name changes
    useEffect(() => {
        if (watchedName && watchedName.length > 0) {
            const generatedSlug = renderSlug(watchedName);
            setValue('slug', generatedSlug);
        }
    }, [watchedName, setValue]);

    const onFormSubmit = async (data: ProductFormData) => {
        setSaving(true);
        setError(null);

        try {
            const response = await apiFetch(ClientRouteMap.products.update.url(productId.toString()), {
                method: ClientRouteMap.products.update.method,
                body: JSON.stringify(data),
            });
            const responseData = await response.json();

            if (response.ok) {
                router.push('/admin/products');
            } else {
                setError(responseData.error || 'Có lỗi xảy ra khi cập nhật sản phẩm');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Network error occurred while updating product');
        } finally {
            setSaving(false);
        }
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

    if (error && !loading) {
        return (
            <div className="min-h-screen bg-secondary w-full">
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h1 className="text-2xl font-bold text-primary mb-2">
                            Không tìm thấy sản phẩm
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            {error}
                        </p>
                        <Button onClick={() => router.push('/admin/products')}>
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Quay lại
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <HeroSectionBackground>
            <Section className="py-16 flex-1 bg-transparent z-10">
                <Container >
                    <div className="max-w-4xl mx-auto z-20">
                        <div className="flex justify-between items-center mb-8">
                            <div className="text-white">
                                <Button
                                    variant="outline"
                                    onClick={() => router.push('/admin/products')}
                                    className="flex items-center gap-2 mb-4"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Quay lại
                                </Button>
                                <h1 className="text-3xl font-bold text-primary mb-2">
                                    Chỉnh sửa sản phẩm
                                </h1>
                                <p className="text-muted-foreground">
                                    Cập nhật thông tin sản phẩm
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => router.push(`/products/${productId}`)}
                                className="flex items-center gap-2"
                            >
                                <Eye className="w-5 h-5" />
                                Xem sản phẩm
                            </Button>
                        </div>

                        <Card className="p-8">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Tên sản phẩm *"
                                                placeholder="Nhập tên sản phẩm"
                                                error={errors.name?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="slug"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Slug"
                                                placeholder="Nhập slug"
                                                error={errors.slug?.message}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Controller
                                        name="price"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                isCurrency={true}
                                                currencySymbol="đ"
                                                label="Giá sản phẩm *"
                                                type="number"
                                                placeholder="2500000"
                                                error={errors.price?.message}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="category"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label="Danh mục *"
                                                error={errors.category?.message}
                                            >
                                                <option value="">Chọn danh mục</option>
                                                <option value="solar">Năng lượng mặt trời</option>
                                                <option value="wind">Năng lượng gió</option>
                                                <option value="hydro">Thủy điện</option>
                                                <option value="battery">Pin lưu trữ</option>
                                                <option value="inverter">Biến tần</option>
                                            </Select>
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="Mô tả sản phẩm *"
                                            placeholder="Mô tả chi tiết về sản phẩm"
                                            error={errors.description?.message}
                                            rows={4}
                                        />
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Controller
                                        name="image_url"
                                        control={control}
                                        render={({ field }) => (
                                            <ImageInput
                                                value={field.value || ''}
                                                onChange={field.onChange}
                                                label="URL hình ảnh chính"
                                                placeholder="Nhập URL hoặc chọn từ thư viện"
                                                error={errors.image_url?.message}
                                                className='border border-black/50 rounded-lg p-2'
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="thumbnail_url"
                                        control={control}
                                        render={({ field }) => (
                                            <ImageInput
                                                value={field.value || ''}
                                                onChange={field.onChange}
                                                label="URL hình ảnh thumbnail"
                                                placeholder="Nhập URL hoặc chọn từ thư viện"
                                                error={errors.thumbnail_url?.message}
                                                className='border border-black/50 rounded-lg p-2'

                                            />
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="features"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            label="Tính năng (mỗi dòng một tính năng)"
                                            placeholder="Chất lượng cao, bền bỉ&#10;Bảo hành 25 năm&#10;Hiệu suất cao"
                                            error={errors.features?.message}
                                            rows={3}
                                        />
                                    )}
                                />

                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-4">
                                        Thông số kỹ thuật
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <Controller
                                            name="specifications.capacity"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Công suất"
                                                    placeholder="300W"
                                                    error={errors.specifications?.capacity?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="specifications.efficiency"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Hiệu suất"
                                                    placeholder="20.5%"
                                                    error={errors.specifications?.efficiency?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="specifications.size"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Kích thước"
                                                    placeholder="1956 x 992 x 40mm"
                                                    error={errors.specifications?.size?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="specifications.weight"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Trọng lượng"
                                                    placeholder="10kg"
                                                    error={errors.specifications?.weight?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="specifications.warranty"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Bảo hành"
                                                    placeholder="25 năm"
                                                    error={errors.specifications?.warranty?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="specifications.origin"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Xuất xứ"
                                                    placeholder="Việt Nam"
                                                    error={errors.specifications?.origin?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6 border-t">
                                    <Button
                                        type="submit"
                                        disabled={saving || isSubmitting}
                                        className="flex items-center gap-2"
                                    >
                                        {saving || isSubmitting ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        ) : (
                                            <Save className="w-5 h-5" />
                                        )}
                                        {saving || isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.push('/admin/products')}
                                        disabled={saving || isSubmitting}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </Container>
            </Section>
        </HeroSectionBackground>
    );
}
