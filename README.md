# 🎁 Shared-Wishlist-Frontend

This is the **frontend** of the **Shared Wishlist-App** project — a collaborative wishlist app that lets users create, share, and manage wishlists and products in real-time.
---
## ⚙️ Tech Stack

- **React.js** – UI library for building interactive user interfaces
- **React Router** – For client-side routing
- **Axios** – For API communication with the backend
- **Tailwind CSS** – Utility-first CSS framework for styling
- **JWT (stored in localStorage)** – For session persistence
- **React Hooks** – For state and lifecycle management

---

## 📁 Folder Structure

Shared-Wishlist-Frontend/
├── public/
│ └── index.html
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-based pages (Login, Dashboard, WishlistDetail)
│ ├── api.js # Axios instance for API calls
│ ├── App.js # Main app router
│ └── index.js # React DOM entry
├── tailwind.config.js # Tailwind CSS configuration
├── package.json # Dependencies and scripts
└── README.md # You’re here!

## 🚀 Getting Started

1. Clone the Repository
   git clone https://github.com/your-username/Shared-Wishlist-Frontend.git
   cd Shared-Wishlist-Frontend
   
2. Install Dependencies
npm install

3. Start the Development Server
npm start

The frontend will run at:
👉 http://localhost:3000

⚠️ Make sure the backend (usually on port 5000) runs for full functionality.

🔒 Authentication
Users must sign up or log in to use the app.

Upon successful login, the JWT token is saved in localStorage.

The token is attached to outgoing API requests using Axios interceptors.

🧪 Features Overview
✅ Login / Sign Up
✅ Create & Delete Wishlists
✅ Add, Edit & Remove Products
✅ Timestamp for when a product was added
✅ User-based permissions and visual indication
✅ Responsive UI with Tailwind

