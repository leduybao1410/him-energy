type PdfType = {
    url: string;
    title: string;
}

export interface Product {
    id?: number;
    root_id?: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: 'solar' | 'wind' | 'hydro' | 'battery' | 'inverter';
    features: string[];
    image_url: string[];
    thumbnail_url: string;
    pdf_file?: PdfType;
    pdf_url?: string;
    pdf_title?: string;
    created_at?: string;
    updated_at?: string;
    specifications?: {
        capacity: string;
        efficiency: string;
        size: string;
        weight: string;
        warranty: string;
        origin: string;
    };
    languages?: {
        lang_code: string;
        post_id: number;
    }[];
    lang_code: string;
}

export interface ProductListResponse {
    data: Product[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

export interface ProductFilters {
    category?: string;
    page?: number;
    per_page?: number;
    search?: string;
    min_price?: number;
    max_price?: number;
    sort?: string;
}

export interface RelatedProduct {
    id: number;
    name: string;
    slug: string;
    price?: number;
    thumbnail_url?: string;
    category?: string;
    description: string;
}
