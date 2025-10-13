'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container, Section, Button, Input, Select } from '@/components/ui';
import { ProductFilters } from '@/types/product';
import { XIcon } from 'lucide-react';

interface ProductFilterSectionProps {
    filters: ProductFilters;
    onFiltersChange: (filters: ProductFilters) => void;
    totalProducts: number;
}

const ProductFilterSection = ({
    filters,
    onFiltersChange,
    totalProducts
}: ProductFilterSectionProps) => {
    const t = useTranslations('products.filters');
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const categories = [
        { value: '', label: t('all') },
        { value: 'solar', label: t('solar') },
        { value: 'wind', label: t('wind') },
        { value: 'hydro', label: t('hydro') },
        { value: 'battery', label: t('battery') },
        { value: 'inverter', label: t('inverter') },
    ];

    const sortOptions = [
        { value: 'newest', label: t('sortOptions.newest') },
        // { value: 'priceLow', label: t('sortOptions.priceLow') },
        // { value: 'priceHigh', label: t('sortOptions.priceHigh') },
        { value: 'name', label: t('sortOptions.name') },
    ];

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        onFiltersChange({ ...filters, search: value, page: 1 });
    };

    const handleCategoryChange = (category: string) => {
        onFiltersChange({ ...filters, category: category || undefined, page: 1 });
    };

    const handleSortChange = (sort: string) => {
        onFiltersChange({ ...filters, sort, page: 1 });
    };

    const clearFilters = () => {
        setSearchTerm('');
        onFiltersChange({ page: 1, per_page: 12 });
    };

    return (
        <Section className=" border-b">
            <Container>
                <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-primary">{t('title')}</h2>
                            <span className="text-muted-foreground">
                                {totalProducts} sản phẩm
                            </span>
                        </div>
                    </div>

                    <div className="items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <Input
                                placeholder={t('search')}
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* Category Filter */}
                        <Select
                            value={filters.category || ''}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category.value} value={category.value}>
                                    {category.label}
                                </option>
                            ))}
                        </Select>

                        {/* Sort */}
                        <Select
                            value={filters.sort || 'newest'}
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <button

                        className="text-sm hover:bg-gray-200 transition-all duration-300 text-black p-2 rounded-full" onClick={clearFilters}>
                        <XIcon className="w-4 h-4" />
                    </button>
                    {/* Price Range */}
                    {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                Giá tối thiểu
                            </label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={filters.min_price || ''}
                                onChange={(e) => onFiltersChange({
                                    ...filters,
                                    min_price: e.target.value ? Number(e.target.value) : undefined,
                                    page: 1
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                Giá tối đa
                            </label>
                            <Input
                                type="number"
                                placeholder="Không giới hạn"
                                value={filters.max_price || ''}
                                onChange={(e) => onFiltersChange({
                                    ...filters,
                                    max_price: e.target.value ? Number(e.target.value) : undefined,
                                    page: 1
                                })}
                            />
                        </div>
                    </div> */}
                </div>
            </Container>
        </Section>
    );
};

export default ProductFilterSection;
