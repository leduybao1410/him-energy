import { useState, useEffect } from 'react';
import { Product, ProductFilters } from '@/types/product';
import { useLanguageCode } from './useTranslations';
import { fetchProducts, fetchProduct, fetchRelatedProducts } from '@/lib/api/apiFetch';

// Hook for fetching products list with language support
export const useProducts = (filters: ProductFilters) => {
    const langCode = useLanguageCode();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchProductsData = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProducts(
                    langCode,
                    filters.category,
                    filters.page || 1,
                    filters.per_page || 12
                );

                setProducts(data.products);
                setTotalPages(data.totalPages);
                setTotalProducts(data.totalProducts);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch products');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsData();
    }, [langCode, filters.category, filters.page, filters.per_page]);

    return {
        products,
        loading,
        error,
        totalPages,
        totalProducts
    };
};

// Hook for fetching single product with language support
export const useProduct = (id: string) => {
    const langCode = useLanguageCode();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProduct(id, langCode);
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch product');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductData();
        }
    }, [id, langCode]);

    return {
        product,
        loading,
        error
    };
};

// Hook for fetching related products with language support
export const useRelatedProducts = (id: string, limit: number = 4) => {
    const langCode = useLanguageCode();
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRelatedData = async () => {
            setLoading(true);
            setError(null);

            try {
                let data = await fetchRelatedProducts(id, langCode);
                if (data.length > 0) {
                    data = data.filter((item: Product) => Number(item.id) !== Number(id));
                }
                setRelatedProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch related products');
                console.error('Error fetching related products:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRelatedData();
        }
    }, [id, langCode, limit]);

    return {
        relatedProducts,
        loading,
        error
    };
};
