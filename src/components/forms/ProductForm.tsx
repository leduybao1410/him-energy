'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, ImageInput, PDFInput, Select, Textarea, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
import { Product } from '@/types/product';
import { CheckCircle, Circle, Globe, PlusCircle, Save } from 'lucide-react';
import { ClassNameValue } from 'tailwind-merge';
import { productFormSchema, ProductFormData } from '@/lib/validations/product';
import { cn, renderSlug } from '@/lib/utils';
import { useLanguageCode } from '@/hooks/useTranslations';
import { localeFlags, localeNames, locales } from '@/lib/i18n';
import { Locale } from 'next-intl';

interface ProductFormProps {
    variant?: 'dark' | 'light';
    product?: Product | null;
    onSubmit: (product: Product) => void;
    onCancel: () => void;
    isEditing?: boolean;
    loading?: boolean;
    langCode?: string;
    root_id?: string | null;
}

export default function ProductForm({ variant = 'dark', product, onSubmit, onCancel, isEditing = false, loading = false, langCode, root_id }: ProductFormProps) {
    // Style constants for glass effect

    const inputStyle: ClassNameValue = cn('p-2 rounded-lg w-full', variant === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-white/70 focus:ring-white/30 focus:border-white/40' : 'bg-black/10 border-black/20 text-black placeholder-black/70 focus:ring-black/30 focus:border-black/40');
    const labelStyle: ClassNameValue = cn('p-2 rounded-lg w-full', variant === 'dark' ? 'text-white/90 font-medium' : 'text-black/90 font-medium');
    const containerStyle: ClassNameValue = cn('p-2 rounded-lg w-full', variant === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-white/70 focus:ring-white/30 focus:border-white/40' : 'bg-black/10 p-2 rounded-lg border-black/20 text-black placeholder-black/70 focus:ring-black/30 focus:border-black/40');

    const [selectedLangCode, setSelectedLangCode] = useState(langCode || product?.lang_code || 'VI');
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
            image_url: [],
            thumbnail_url: '',
            pdf_file: {
                url: '',
                title: ''
            },
            specifications: {
                capacity: '',
                efficiency: '',
                size: '',
                weight: '',
                warranty: '',
                origin: ''
            },
            root_id: root_id ? parseInt(root_id) : undefined
        }
    });

    // Watch name field to auto-generate slug
    const watchedName = watch('name');

    // Initialize form data when product prop changes
    useEffect(() => {
        if (product) {
            setValue('name', product.name);
            setValue('slug', product.slug);
            setValue('description', product.description);
            setValue('price', product.price.toString());
            setValue('category', product.category);
            setValue('features', product.features.join('\n'));
            setValue('image_url', product.image_url);
            setValue('thumbnail_url', product.thumbnail_url);
            console.log(product);
            setValue('pdf_file', {
                url: product.pdf_file?.url || '',
                title: product.pdf_file?.title || '',
            });
            setValue('specifications', {
                capacity: '',
                efficiency: '',
                size: '',
                weight: '',
                warranty: '',
                origin: ''
            });
        }
    }, [product]);

    // Auto-generate slug when name changes
    useEffect(() => {
        if (watchedName && watchedName.length > 0) {
            const generatedSlug = renderSlug(watchedName);
            setValue('slug', generatedSlug);
        }
    }, [watchedName]);

    const onFormSubmit = (data: ProductFormData) => {
        const productData: Product = {
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: Number(data.price),
            category: data.category as any,
            image_url: data.image_url || [],
            features: data.features ? data.features.split('\n').filter(f => f.trim()) : [],
            thumbnail_url: data.thumbnail_url || '',
            pdf_url: data.pdf_file?.url || '',
            pdf_title: data.pdf_file?.title || '',
            specifications: {
                capacity: data.specifications?.capacity || '',
                efficiency: data.specifications?.efficiency || '',
                size: data.specifications?.size || '',
                weight: data.specifications?.weight || '',
                warranty: data.specifications?.warranty || '',
                origin: data.specifications?.origin || ''
            },
            root_id: data.root_id ? data.root_id : product?.id ? product.id : undefined,
            lang_code: data.lang_code ? data.lang_code : product?.lang_code ? product.lang_code : selectedLangCode ?? 'VI'
        };

        onSubmit(productData as any);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 text-white ">
            <div className='flex flex-row justify-between items-center'>
                <h2 className="text-xl font-semibold text-primary">
                    {isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                </h2>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex flex-row justify-between items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors'>
                        <span className='text-sm'>{localeFlags[product?.lang_code ? product.lang_code as keyof typeof localeFlags : selectedLangCode as keyof typeof localeFlags] || localeFlags['vi']}</span>
                        <span className='text-sm'>{localeNames[product?.lang_code ? product.lang_code as keyof typeof localeNames : selectedLangCode as keyof typeof localeNames] || 'Tiếng Việt'}</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='z-[9999] bg-white border border-gray-200 shadow-lg'>
                        {locales.map((locale) => {

                            const isAvailableLanguage = product?.languages?.find(lang => lang.lang_code === locale);
                            const handleLanguageChange = (locale: string) => {
                                if (isAvailableLanguage) {
                                    window.location.href = `/${locale}/admin/products?isEditing=true&id=${isAvailableLanguage.post_id?.toString()}&lang_code=${locale}`;
                                } else {
                                    window.location.href = `/${locale}/admin/products?isCreating=true&lang_code=${locale}&root_id=${product?.id?.toString()}`;
                                }
                            };

                            return (<DropdownMenuItem
                                key={locale}
                                onSelect={() => handleLanguageChange(locale)}
                                className='flex flex-row  items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer'
                            >
                                {isAvailableLanguage ? <CheckCircle className='w-4 h-4 text-green-500' /> : <PlusCircle className='w-4 h-4 text-gray-500' />}
                                <span className='text-sm'>{localeFlags[locale as keyof typeof localeFlags]}</span>
                                <span className='text-sm'>{localeNames[locale as keyof typeof localeNames]}</span>
                            </DropdownMenuItem>)
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label="Tên sản phẩm *"
                            className={inputStyle}
                            labelClassName={labelStyle}
                            containerClassName={containerStyle}
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
                            className={inputStyle}
                            labelClassName={labelStyle}
                            containerClassName={containerStyle}
                            placeholder="tam-pin-mat-troi-mono-300w"
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
                            label="Giá sản phẩm *"
                            type="text"
                            isCurrency={true}
                            currencySymbol="đ"
                            className={inputStyle}
                            labelClassName={labelStyle}
                            containerClassName={containerStyle}
                            placeholder="2,500,000"
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
                            className={inputStyle}
                            labelClassName={labelStyle}
                            containerClassName={containerStyle}
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
                        className={inputStyle}
                        labelClassName={labelStyle}
                        containerClassName={containerStyle}
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
                            value={field.value || []}
                            onChange={(value) => field.onChange(value as string[])}
                            label="URL hình ảnh chính"
                            allowedTypes={['image']}
                            placeholder="Nhập URL hoặc chọn từ thư viện"
                            className={inputStyle}
                            labelClassName={labelStyle}
                            containerClassName={containerStyle}
                            error={errors.image_url?.message}
                            multiple={true}
                            maxImages={5}
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
                            allowedTypes={['image']}
                            placeholder="Nhập URL hoặc chọn từ thư viện"
                            className={inputStyle}
                            labelClassName={labelStyle}
                            containerClassName={containerStyle}
                            error={errors.thumbnail_url?.message}
                        />
                    )}
                />
                <Controller
                    name="pdf_file"
                    control={control}
                    render={({ field }) => (
                        <PDFInput
                            value={field.value?.url || ''}
                            onChange={field.onChange}
                            label="PDF file"
                            placeholder="Chọn PDF file"
                            className={inputStyle}
                            labelClassName={labelStyle}
                            containerClassName={containerStyle}
                            error={errors.pdf_file?.message}
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
                        className={inputStyle}
                        labelClassName={labelStyle}
                        containerClassName={containerStyle}
                        error={errors.features?.message}
                        rows={3}
                    />
                )}
            />

            <h3 className="text-lg font-semibold mb-4">
                Thông số kỹ thuật
            </h3>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Controller
                        name="specifications.capacity"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Công suất"
                                placeholder="300W"
                                className={inputStyle}
                                labelClassName={labelStyle}
                                containerClassName={containerStyle}
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
                                className={inputStyle}
                                labelClassName={labelStyle}
                                containerClassName={containerStyle}
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
                                className={inputStyle}
                                labelClassName={labelStyle}
                                containerClassName={containerStyle}
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
                                className={inputStyle}
                                labelClassName={labelStyle}
                                containerClassName={containerStyle}
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
                                className={inputStyle}
                                labelClassName={labelStyle}
                                containerClassName={containerStyle}
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
                                className={inputStyle}
                                labelClassName={labelStyle}
                                containerClassName={containerStyle}
                                error={errors.specifications?.origin?.message}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <Button
                    type="submit"
                    className="flex items-center gap-2"
                    disabled={loading || isSubmitting}
                >
                    <Save className="w-5 h-5" />
                    {loading || isSubmitting ? 'Đang xử lý...' : (isEditing ? 'Cập nhật' : 'Tạo sản phẩm')}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading || isSubmitting}
                >
                    Hủy
                </Button>
            </div>
        </form >
    );
}
