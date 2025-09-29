export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: 'solar' | 'wind' | 'hydro' | 'battery' | 'inverter';
    image_url: string;
    created_at?: string;
    updated_at?: string;
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
    price: number;
    image_url: string;
    category: string;
}
