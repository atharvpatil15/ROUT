# ROUT - The Art of Stillness 🍵

> **"We don't just sell tea. We engineer moments of stillness for a generation that never stops."**

ROUT is a premium, high-end e-commerce platform designed for Gen Z and Millennials. It combines "Zen Minimalist" aesthetics with a high-performance MERN stack architecture to deliver a digital spa experience.

![ROUT Banner](https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2521&auto=format&fit=crop)

---

## 🏗️ Tech Stack

### **Frontend (The "Zen" UI)**
*   **Framework:** React 18 + Vite
*   **Styling:** Tailwind CSS (Custom Premium Palette)
*   **Animation:** Framer Motion (Parallax, Scroll-Triggered Reveals)
*   **State Management:** React Context API (Auth, Cart)
*   **Validation:** Zod + React Hook Form
*   **Typography:** Playfair Display (Serif), Inter (Sans), Cinzel Decorative (Branding)

### **Backend (The "Engine")**
*   **Runtime:** Node.js + Express
*   **Database:** MongoDB + Mongoose
*   **Authentication:** JWT (HttpOnly Cookies) + Google OAuth 2.0 (Passport.js)
*   **Security:** Helmet, Express-Rate-Limit, Bcrypt, CORS, XSS Protection

---

## ✨ Features Implemented

### **1. Immersive User Experience (UX)**
*   **Parallax Hero:** A multi-layered entrance that creates depth as you scroll.
*   **Scrollytelling About Page:** An editorial-style deep dive into the brand philosophy with sticky storytelling elements.
*   **Glassmorphism Navbar:** A responsive header that blurs the background content, adapting its style based on the page context.
*   **Smooth Navigation:** Custom scroll handling that remembers position and allows cross-page anchor linking (e.g., "Shop" button).

### **2. Aesthetic Authentication**
*   **Split-Screen Auth Page:** A beautiful, animated login/signup form with high-quality imagery.
*   **Hybrid Login:** Users can sign up via Email/Password or **Continue with Google**.
*   **Session Persistence:** Fixed "logout on refresh" bug by implementing a `/me` session verification endpoint and aligning `SESSION_SECRET` across the stack.
*   **Security:** Passwords are hashed, and sessions are locked via secure HTTP-Only cookies with `SameSite: Lax` configuration.

---

## 🚀 Setup & Installation
... (keep existing setup) ...

---

## 🔮 Roadmap to Production

### **Phase 1: The "Engine" (Product Management)**
- [ ] **Dynamic Sourcing:** Move hardcoded tea products from `Home.jsx` to the MongoDB database.
- [ ] **Admin Dashboard:** Create a private `/admin` route for the ROUT team to Add/Edit/Delete products and manage stock levels.
- [ ] **API Integration:** Update frontend to fetch real-time product data using Axios.

### **Phase 2: The "Transaction" (Cart & Checkout)**
- [ ] **Persistent Cart:** Save the shopping bag to `LocalStorage` so it survives refreshes.
- [ ] **Order Model:** Implement a backend `Order` schema to track purchases, status (Pending/Shipped), and customer details.
- [ ] **Payment Integration:** Connect a gateway (Stripe/Razorpay) to process actual revenue.

### **Phase 3: The "User" (Retention)**
- [ ] **User Dashboard:** Create a `/profile` page for customers to view their order history and update preferences.
- [ ] **Email Rituals:** Automated emails for "Welcome," "Order Received," and "Shipped" using Nodemailer/SendGrid.

### **Phase 4: Deployment & Polish**
- [ ] **Database Migration:** Move from local MongoDB to MongoDB Atlas.
- [ ] **Cloud Hosting:** Deploy backend (Render/Railway) and frontend (Vercel).
- [ ] **SEO & Performance:** Optimize image sizes and meta-tags for the "Zen" aesthetic.

---

*Engineered with 🍵 and Stillness.*
```text
ROUT/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, ProductCard)
│   │   ├── context/        # Global State (Auth, Cart)
│   │   ├── pages/          # Views (Home, Auth, About, Checkout)
│   │   ├── assets/         # Images & Fonts
│   │   └── utils/          # Helpers
│   └── ...
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── config/         # DB & Passport Config
│   │   ├── controllers/    # Logic (Auth, Products)
│   │   ├── models/         # Database Schemas
│   │   ├── routes/         # API Endpoints
│   │   └── middleware/     # Protection & Validation
│   └── ...
└── README.md               # You are here
```

---

*Engineered with 🍵 and Stillness.*
