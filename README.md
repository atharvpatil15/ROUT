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
*   **Security:** Passwords are hashed, and sessions are locked via secure HTTP-Only cookies.

### **3. Gen Z "Vibe" Elements**
*   **The Manifesto:** A kinetic typography section that reveals the brand's "Anti-Hustle" message word-by-word.
*   **Micro-Interactions:** Buttons that respond to hover, loading spinners, and staggered fade-ins.
*   **Editorial Copy:** Carefully crafted narratives for each product (e.g., "The Natural Reset," "High-Octane Focus").

---

## 🚀 Setup & Installation

### **Prerequisites**
*   Node.js (v16+)
*   MongoDB (Local or Atlas)
*   Google Cloud Console Account (for OAuth)

### **1. Clone & Install**
```bash
# 1. Clone the repository
git clone https://github.com/your-username/rout.git
cd rout

# 2. Install Server Dependencies
cd server
npm install

# 3. Install Client Dependencies
cd ../client
npm install
```

### **2. Environment Configuration**
Create a `.env` file in the `server` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_URL=mongodb://localhost:27017/rout

# Security
SESSION_SECRET=your_super_long_random_string
SESSION_EXPIRY=90d
COOKIE_EXPIRY=90

# Google OAuth (From Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### **3. Run the Project**
Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

Visit **`http://localhost:5173`** to enter the ritual.

---

## 🔮 Roadmap to Production
To take ROUT from a high-fidelity prototype to a live business, we need to complete the following:

### **Phase 1: Commerce Logic (Immediate Next Steps)**
- [ ] **Admin Dashboard:** A private panel to Create/Edit/Delete products and view orders.
- [ ] **Order Schema:** Update the backend to store user orders and cart history.
- [ ] **Payment Gateway:** Integrate **Stripe** or **Razorpay** to handle actual transactions.
- [ ] **Stock Management:** Automatically decrement product inventory upon purchase.

### **Phase 2: User Account Features**
- [ ] **Profile Page:** Allow users to view their Order History and saved addresses.
- [ ] **Address Book:** Save shipping details for faster checkout.
- [ ] **Wishlist:** Allow users to save products for later.

### **Phase 3: DevOps & Deployment**
- [ ] **Cloud Database:** Migrate local MongoDB to **MongoDB Atlas**.
- [ ] **Email Service:** Integrate **SendGrid** or **Nodemailer** for "Welcome" and "Order Confirmation" emails.
- [ ] **Deployment:**
    -   Frontend: Vercel or Netlify.
    -   Backend: Render, Railway, or AWS.
- [ ] **Domain:** Connect `www.rout.tea` (or similar) with SSL.

---

## 📂 Project Structure

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
