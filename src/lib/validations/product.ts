import { z } from 'zod';

// Product validation schema
export const productSchema = z.object({
    name: z.string()
        .min(1, 'Tên sản phẩm là bắt buộc')
        .min(2, 'Tên sản phẩm phải có ít nhất 2 ký tự')
        .max(100, 'Tên sản phẩm không được vượt quá 100 ký tự'),

    slug: z.string()
        .min(1, 'Slug là bắt buộc')
        .regex(/^[a-z0-9-]+$/, 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang'),

    description: z.string()
        .min(1, 'Mô tả là bắt buộc')
        .min(10, 'Mô tả phải có ít nhất 10 ký tự')
        .max(1000, 'Mô tả không được vượt quá 1000 ký tự'),

    price: z.number()
        .min(0, 'Giá sản phẩm phải lớn hơn hoặc bằng 0')
        .max(1000000000, 'Giá sản phẩm không được vượt quá 1 tỷ VND'),

    category: z.enum(['solar', 'wind', 'hydro', 'battery', 'inverter']),

    features: z.string()
        .optional()
        .transform(val => val ? val.split('\n').filter(f => f.trim()) : []),

    image_url: z.string()
        .optional()
        .transform(val => val ? [val] : []),

    thumbnail_url: z.string()
        .optional(),

    specifications: z.object({
        capacity: z.string().optional(),
        efficiency: z.string().optional(),
        size: z.string().optional(),
        weight: z.string().optional(),
        warranty: z.string().optional(),
        origin: z.string().optional(),
    }).optional(),
});

// Form data schema (for form inputs)
export const productFormSchema = z.object({
    name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
    slug: z.string().min(1, 'Slug là bắt buộc'),
    description: z.string().min(1, 'Mô tả là bắt buộc'),
    price: z.string().min(1, 'Giá sản phẩm là bắt buộc'),
    category: z.string().min(1, 'Danh mục là bắt buộc'),
    features: z.string().optional(),
    image_url: z.string().optional(),
    thumbnail_url: z.string().optional(),
    specifications: z.object({
        capacity: z.string().optional(),
        efficiency: z.string().optional(),
        size: z.string().optional(),
        weight: z.string().optional(),
        warranty: z.string().optional(),
        origin: z.string().optional(),
    }).optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
export type ProductData = z.infer<typeof productSchema>;
