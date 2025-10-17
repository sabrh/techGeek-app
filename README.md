# 🛍️ techGeek App

A full-stack CRUD application built with **Next.js (App Router)**, **Tailwind CSS**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB**.  
This project allows users to **browse, create, edit, view, and delete products**, with JWT-based authentication.

---

## 🚀 Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **DaisyUI** for navbar, footer components
- **React Icons** for icons

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with Mongoose
- **JWT Authentication**

---

## 🎨 Color Palette

| Name | Hex Code | Usage |
|------|-----------|--------|
| Primary | `#0D1821` | Background / Header |
| Light | `#EFF1F3` | Text / Surface |
| Accent | `#4E6E5D` | Buttons / Highlights |
| Sand | `#AD8A64` | Secondary elements |
| Brick | `#A44A3F` | Alerts / Warnings |

---

## 🔐 Authentication Flow

- Login using **email** only.
- Calls `POST /auth` to retrieve a JWT.
- JWT is stored in **Redux Toolkit** state.
- All product CRUD requests include `Authorization: Bearer <token>`.
- Logout clears the auth state.

---

## 🧩 Features

- ✅ JWT-based authentication  
- ✅ Browse all products  
- ✅ Create, edit, and delete products  
- ✅ View product details  
- ✅ Form validation with feedback  
- ✅ Responsive and minimalist UI  

---

## ⚙️ Getting Started

### 1 Clone the repository
```bash
git clone https://github.com/sabrh/techGeek-app.git
cd product-management-app

### 2 Install dependencies
npm install

Configure environment variables

### 3 Create a .env.local file in the root:

NEXT_PUBLIC_API_URL=http://localhost:5000


### Create a .env file in your backend:

MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
JWT_SECRET=your_secret_key
PORT=5000

### 4 Run the development servers

npm run dev

## Developed by: Sabrina Haque

Built for a job assessment focusing on clean code, solid validation, and polished UI/UX.