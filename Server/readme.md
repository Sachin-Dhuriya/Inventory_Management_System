# 📦 Inventory Management System — API Design & Database Schema #(Ongoig Project)

## 📌 Project Overview
A **Node.js + Express + PostgreSQL** based Inventory Management System designed to handle:
- Products
- Suppliers
- Purchase Orders
- Sales Orders
- Users (with roles and authentication)

This system provides secure **JWT-based authentication** and **role-based access control**, ensuring that only authorized users can perform critical operations.

---

## 🛡️ Authentication & Authorization

- **Authentication:** JWT-based user authentication.
- **User Roles:**  
  - **Admin:** Can add, update, and delete products and suppliers.  
  - **User:** Can view products and create purchase/sales orders.
- **Middleware:** Checks JWT token and role for protected routes.

---

## 📦 API Endpoints

### ✅ Auth Module

| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login and get JWT token | Public |

---

### 📦 Product Module

| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| GET | `/api/products` | Get all products | Authenticated |
| GET | `/api/products/:id` | Get product by ID | Authenticated |
| POST | `/api/products` | Create new product | Admin only |
| PUT | `/api/products/:id` | Update product | Admin only |
| DELETE | `/api/products/:id` | Delete product | Admin only |

---

### 📦 Supplier Module

| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| GET | `/api/suppliers` | List suppliers | Authenticated |
| GET | `/api/suppliers/:id` | Supplier details | Authenticated |
| POST | `/api/suppliers` | Create supplier | Admin only |
| PUT | `/api/suppliers/:id` | Update supplier | Admin only |
| DELETE | `/api/suppliers/:id` | Delete supplier | Admin only |

---

### 📦 Purchase Orders

| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| GET | `/api/purchases` | List purchase orders | Authenticated |
| POST | `/api/purchases` | Create purchase order | Authenticated |
| GET | `/api/purchases/:id` | Purchase order details | Authenticated |

---

### 📦 Sales Orders

| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| GET | `/api/sales` | List sales orders | Authenticated |
| POST | `/api/sales` | Create sales order | Authenticated |
| GET | `/api/sales/:id` | Sales order details | Authenticated |

---

## 🗄️ Database Tables (PostgreSQL)

### 📌 `users`

| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL PRIMARY KEY | |
| username | VARCHAR | Unique |
| email | VARCHAR | Unique |
| password | VARCHAR | Hashed |
| role | VARCHAR | `admin` or `user` |

---

### 📌 `products`

| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL PRIMARY KEY | |
| name | VARCHAR | |
| description | TEXT | |
| price | NUMERIC | |
| quantity | INT | Current stock |

---

### 📌 `suppliers`

| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL PRIMARY KEY | |
| name | VARCHAR | |
| contact_info | TEXT | Phone/email, UPI etc. |

---

### 📌 `purchase_orders`

| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL PRIMARY KEY | |
| product_id | INTEGER REFERENCES `products`(id) | |
| supplier_id | INTEGER REFERENCES `suppliers`(id) | |
| quantity | INT | |
| purchase_date | TIMESTAMP | |

---

### 📌 `sales_orders`

| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL PRIMARY KEY | |
| product_id | INTEGER REFERENCES `products`(id) | |
| quantity | INT | |
| sale_date | TIMESTAMP | |

---

## ✅ Next Steps

- ✔ Build controllers and route handlers for all modules.
- ✔ Implement JWT authentication middleware.
- ✔ Add role-based access control.
- ✔ Validate input using `Joi` schemas.
- ✔ Write unit tests for critical endpoints.
- ✔ Document the API with Swagger or Postman.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Auth:** JWT, Bcrypt
- **Validation:** Joi
- **Database Migrations:** `node-pg-migrate`

---

**Happy Building!**
