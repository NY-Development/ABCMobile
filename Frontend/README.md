# 🎂 ABC Frontend (React + Vite + Tailwind)

The frontend UI for Adama Bakery & Cake (ABC).  
A mobile-first progressive web app (PWA) that allows customers to browse cakes, place orders, and pay securely.

## 🚀 Features
- **Customer Dashboard:** Browse products, customize orders, checkout
- **Owner Dashboard:** Add/edit products, accept orders, send notifications
- **Admin Dashboard:** Approve deletion requests, monitor platform
- Real-time notifications and updates
- Payment integration with Chapa

## 📂 Folder Structure
```
frontend/
│── src/
│ ├── components/  # Reusable UI elements
│ ├── pages/       # Main views (Home, Orders, Profile, Admin)
│ ├── context/     # Auth & state management
│ ├── services/    # API calls (Axios, Chapa, etc.)
│ ├── App.jsx      # Root component
│ └── main.jsx     # Entry point
│── public/        # Assets & icons
│── package.json
│── README.md
```

## ⚙️ Installation
```bash
cd frontend
npm install
```

## ▶️ Running the App
```bash
npm run dev
```

App runs at:  
👉 [http://localhost:5173]

## 🛠️ Tech Stack
- React 18 + Vite
- Tailwind CSS
- Axios (API integration)
- React Router (navigation)
- Web Push (notifications)

## 📱 Build for Production
```bash
npm run build
```

## 🗺️ Roadmap
- [x] Setup React + Vite + Tailwind project
- [x] Build Home Page UI (from Figma)
- [ ] Implement reusable ProductCard component
- [ ] Connect product showcase to backend API
- [ ] Add Special Orders form
- [ ] Integrate Chapa payment system
- [ ] Implement Customer Dashboard (orders, profile)
- [ ] Build Owner Dashboard (manage products & orders)
- [ ] Add Admin Dashboard (approve deletion, monitor system)
- [ ] Setup notifications (real-time updates)
- [ ] Make app PWA (installable, offline-ready)
```