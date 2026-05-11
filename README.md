# 🍽️ Savora — Food Delivery Web App

> A full-stack food delivery platform built with the MERN stack, featuring real-time order tracking, multi-role authentication, and seamless payment integration.

---

## Overview

**Savora** is a modern, full-featured food delivery web application that connects customers with local restaurants and food shops. It supports three distinct user roles — **Customer**, **Shop Owner**, and **Delivery Boy** — each with a dedicated experience. Customers can browse nearby shops, add items to cart, track orders live on a map, and pay via Razorpay or Cash on Delivery. Shop owners can manage their shop, menu, and incoming orders through a dedicated dashboard.

---

## ✨ Features

### 👤 Authentication & User Management
- Email/Password Sign Up & Sign In with JWT-based auth (cookie-stored, 7-day expiry)
- **Google OAuth** via Firebase Authentication
- OTP-based Password Reset (4-digit OTP sent via Gmail, expires in 5 minutes)
- Three roles: `user`, `owner`, `deliveryBoy`
- Protected routes via `isAuth` middleware

### 🏪 Shop Management (Owner Role)
- Create and update shop profile (name, city, state, address, image)
- Image upload via Cloudinary (with Multer for temporary local storage)
- Browse shops filtered by city

### 🍕 Menu / Item Management (Owner Role)
- Add, edit, and delete menu items
- Item fields: name, category, food type (Veg/Non-Veg), price, image
- Item ratings (average + count)

### 🛒 Cart & Ordering (Customer Role)
- Add items to cart, update quantities, remove items
- Cart state managed globally with Redux Toolkit
- Cart total calculated dynamically
- Items grouped by shop when placing orders
- Delivery address captured with latitude/longitude (map-based)
- Payment via **Razorpay** (online) or **Cash on Delivery**

### 🗺️ Live Map & Location
- Location detection (lat/lon) stored in Redux
- Reverse geocoding for human-readable address
- Live order tracking via map
- Shops and items filtered by detected city

### ⚡ Real-Time Features
- WebSocket integration via **Socket.IO** for live order status updates

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| Redux Toolkit | Global state management |
| Firebase | Google OAuth |
| Razorpay | Payment gateway |
| Socket.IO Client | Real-time communication |
| React Router | Client-side routing |
| Vite | Build tool |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| Cloudinary | Cloud image storage |
| Multer | File upload handling |
| Nodemailer | OTP email delivery |
| Socket.IO | WebSocket server |
| dotenv | Environment config |

---

## 🏗️ Architecture

```
Savora/
├── backend/                  # Node.js + Express API server
│   ├── controllers/          # Route handler logic
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express route definitions
│   ├── middlewares/          # Auth middleware (isAuth)
│   └── utils/                # Cloudinary, Multer, JWT, Mailer, DB
│
└── frontend/                 # React + Vite client
    ├── src/
    │   ├── components/       # UI components
    │   ├── pages/            # Route-level page components
    │   ├── redux/            # Redux store + slices
    │   └── utils/            # Firebase config, helpers
    └── public/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account
- Firebase project (for Google Auth)
- Razorpay account
- Gmail app password (for Nodemailer)

### 1. Clone the repository
```bash
git clone https://github.com/notstanzinn/Savora.git
cd Savora
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or your configured PORT).

### 3. Setup the Frontend
```bash
cd frontend
npm install
```


```bash
npm run dev
```

The React app will start on `http://localhost:5173`.

---

## 📁 Project Structure

```
Savora/
│
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── shop.controller.js
│   │   ├── item.controller.js
│   │   └── order.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── shop.model.js
│   │   ├── item.model.js
│   │   └── order.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── user.route.js
│   │   ├── shop.route.js
│   │   ├── item.route.js
│   │   └── order.route.js
│   ├── middlewares/
│   │   └── isAuth.js
│   ├── utils/
│   │   ├── db.js
│   │   ├── token.js
│   │   ├── mail.js
│   │   ├── cloudinary.js
│   │   └── multer.js
│   └── index.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    │   │   ├── store.js
    │   │   ├── userSlice.js
    │   │   ├── ownerSlice.js
    │   │   └── mapSlice.js
    │   └── utils/
    │       └── firebase.js
    ├── public/
    └── index.html
```

---

<p align="center">By notstanzinn</p>
