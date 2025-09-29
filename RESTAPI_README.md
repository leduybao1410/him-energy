POST https://leduybao.io.vn/wp-json/jwt-auth/v1/token
{
    "username":"",
    "password":""
}

 🔓 Public Endpoints (No Auth Required)

### 1. List Products (archive)
```
GET /wp-json/custom/v1/products
```
**Query params:**
- `category` (string, optional)
- `page` (int, default `1`)
- `per_page` (int, default `10`)

✅ Example:
```
GET /wp-json/custom/v1/products?category=shoes&page=1&per_page=12
```

---

### 2. Get Product Details
```
GET /wp-json/custom/v1/products/{id}
```
✅ Example:
```
GET /wp-json/custom/v1/products/5
```

---

### 3. Get Related Products
```
GET /wp-json/custom/v1/products/{id}/related
```
✅ Example:
```
GET /wp-json/custom/v1/products/5/related
```

---

## 🔒 Protected Endpoints (JWT Required)

👉 These require a JWT token in the header:
```
Authorization: Bearer <your_token>
```

---

### 4. Create Product
```
POST /wp-json/custom/v1/products
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Solar Pannel",
  "slug": "Solar-panel",
  "description": "This is description of solar panel",
  "price": 599.99,
  "category": "solar",
  "image_url": "https://example.com/solar.jpg"
}
```

---

### 5. Update Product
```
PUT /wp-json/custom/v1/products/{id}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "price": 65.00,
  "description": "Updated description"
}
```

---

### 6. Delete Product
```
DELETE /wp-json/custom/v1/products/{id}
```

**Headers:**
```
Authorization: Bearer <token>
```

---

## 🔑 JWT Authentication Endpoints

### 7. Get Token
```
POST /wp-json/jwt-auth/v1/token
```

**Body:**
```json
{
  "username": "admin",
  "password": "your_password"
}
```

✅ Response:
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJh...",
  "user_email": "admin@example.com",
  "user_nicename": "admin",
  "user_display_name": "Administrator"
}
```

---

### 8. Validate Token
```
POST /wp-json/jwt-auth/v1/token/validate
```

**Headers:**
```
Authorization: Bearer <token>
```

---

## ✅ Summary

- Public (GET):  
  `/products`, `/products/{id}`, `/products/{id}/related`

- Protected (JWT):  
  `POST /products`, `PUT /products/{id}`, `DELETE /products/{id}`

- Auth:  
  `POST /jwt-auth/v1/token`, `POST /jwt-auth/v1/token/validate`

---
