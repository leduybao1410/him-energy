# Trang Sản Phẩm - Him Energy

## Tổng quan

Đã tạo thành công hệ thống trang sản phẩm hoàn chỉnh cho website Him Energy, bao gồm:

- **Trang danh sách sản phẩm** (`/products`)
- **Trang chi tiết sản phẩm** (`/products/[id]`)
- **Hệ thống lọc và tìm kiếm**
- **Hỗ trợ đa ngôn ngữ** (vi, en, ru, zh)

## Cấu trúc Files

### 1. Types & Interfaces
```
src/types/product.ts
```
- `Product`: Interface cho sản phẩm
- `ProductFilters`: Interface cho bộ lọc
- `ProductListResponse`: Interface cho response API
- `RelatedProduct`: Interface cho sản phẩm liên quan

### 2. Translations
```
src/locales/
├── vi/products.json
├── en/products.json
├── ru/products.json
└── zh/products.json
```

### 3. Components
```
src/components/sections/
├── ProductHeroSection.tsx      # Hero section cho trang products
├── ProductFilterSection.tsx    # Bộ lọc sản phẩm
├── ProductGridSection.tsx      # Grid hiển thị sản phẩm
└── ProductDetailSection.tsx    # Chi tiết sản phẩm
```

### 4. Pages
```
src/app/[locale]/products/
├── layout.tsx                  # Layout cho trang products
├── page.tsx                    # Trang danh sách sản phẩm
└── [id]/
    └── page.tsx                # Trang chi tiết sản phẩm
```

## Tính năng chính

### Trang Danh Sách Sản Phẩm (`/products`)

1. **Hero Section**
   - Tiêu đề và mô tả trang
   - Thiết kế gradient đẹp mắt

2. **Bộ Lọc Sản Phẩm**
   - Tìm kiếm theo tên/mô tả
   - Lọc theo danh mục (solar, wind, hydro, battery, inverter)
   - Lọc theo khoảng giá
   - Sắp xếp (mới nhất, giá, tên)

3. **Grid Sản Phẩm**
   - Hiển thị sản phẩm dạng card
   - Hover effects
   - Pagination
   - Responsive design

### Trang Chi Tiết Sản Phẩm (`/products/[id]`)

1. **Thông tin sản phẩm**
   - Hình ảnh sản phẩm với gallery
   - Tên, giá, mô tả chi tiết
   - Thông số kỹ thuật
   - Tính năng nổi bật

2. **Tương tác**
   - Chọn số lượng
   - Thêm vào giỏ hàng
   - Chia sẻ sản phẩm
   - Breadcrumb navigation

3. **Sản phẩm liên quan**
   - Hiển thị sản phẩm cùng danh mục
   - Link đến trang chi tiết

## Schema Sản Phẩm

Dựa trên API schema từ `RESTAPI_README.md`:

```typescript
interface Product {
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
```

## API Integration

Hiện tại sử dụng mock data. Để tích hợp API thực tế:

1. **Thay thế mock data** trong:
   - `src/app/[locale]/products/page.tsx`
   - `src/app/[locale]/products/[id]/page.tsx`

2. **Sử dụng API endpoints**:
   - `GET /wp-json/custom/v1/products` - Danh sách sản phẩm
   - `GET /wp-json/custom/v1/products/{id}` - Chi tiết sản phẩm
   - `GET /wp-json/custom/v1/products/{id}/related` - Sản phẩm liên quan

## Responsive Design

- **Mobile-first approach**
- **Grid responsive**: 1 cột (mobile) → 2 cột (tablet) → 3-4 cột (desktop)
- **Flexible layouts** cho tất cả components

## Accessibility

- **Semantic HTML**
- **ARIA labels**
- **Keyboard navigation**
- **Screen reader friendly**

## Performance

- **Image optimization** với Next.js Image component
- **Lazy loading** cho images
- **Code splitting** tự động
- **SEO optimized** với metadata

## Cách sử dụng

1. **Truy cập trang sản phẩm**: `/products`
2. **Sử dụng bộ lọc** để tìm sản phẩm phù hợp
3. **Click vào sản phẩm** để xem chi tiết
4. **Thêm vào giỏ hàng** (chức năng cần implement)

## Tùy chỉnh

### Thêm danh mục mới:
1. Cập nhật `Product` type trong `src/types/product.ts`
2. Thêm translation trong các file `products.json`
3. Cập nhật mock data

### Thay đổi layout:
1. Chỉnh sửa components trong `src/components/sections/`
2. Cập nhật CSS classes theo Tailwind

### Thêm tính năng:
1. Tạo component mới trong `src/components/sections/`
2. Import và sử dụng trong pages
3. Cập nhật translations nếu cần

## Lưu ý

- Tất cả components đều sử dụng **TypeScript**
- Styling với **Tailwind CSS**
- **Next.js 14** với App Router
- **next-intl** cho đa ngôn ngữ
- **Responsive design** cho mọi thiết bị
