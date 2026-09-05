# CleanPro GmbH – Website

A full-stack single-page website built with the **MERN stack** (MongoDB, Express, React, Node.js) for a German cleaning & facility services company.

## 🗂 Project Structure

```
cleaning-services/
├── client/          # React 18 + Vite + Tailwind CSS
└── server/          # Node.js + Express + MongoDB
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### 1. Start the Backend

```bash
cd server

# Copy env file and fill in your values
copy .env.example .env

# Install & start
npm install
npm run dev
```

The API runs on **http://localhost:5000**.

---

### 2. Start the Frontend

```bash
cd client
npm run dev
```

The site runs on **http://localhost:5173** and proxies `/api` → `localhost:5000`.

---

## ⚙️ Environment Variables (server/.env)

| Variable | Default | Description |
|---|---|---|
| `MONGODB_URI` | `mongodb://localhost:27017/cleanpro` | MongoDB connection string |
| `PORT` | `5000` | Express server port |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origin |
| `ADMIN_USERNAME` | `admin` | Admin login username |
| `ADMIN_PASSWORD` | required | Strong admin login password |
| `ADMIN_SESSION_SECRET` | required | At least 32 random characters for signed sessions |

---

## 🌐 Single-page sections

| Section | Description |
|---|---|
| **Header** | Sticky navbar with logo, nav links and CTA button. Mobile hamburger menu. |
| **Header** | Company name, logo, short service description, responsive navigation and offer CTA. |
| **Hero** | Mobile-friendly introduction with contextual copy, trust points and offer CTA. |
| **Services** | Three clearly presented services with contextual images: Reinigung, Hausmeisterdienst, Winterdienst. |
| **About Us** | Permanent company story, team values, experience and customer stats. |
| **Contact Form** | Client and server validation, field-level errors, then POST `/api/contact` to MongoDB. |
| **Footer** | Dedicated WhatsApp and E-mail buttons plus Facebook, Instagram and LinkedIn links. |

---

## 📦 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, Lucide React, Axios |
| Backend | Node.js, Express 4, Mongoose |
| Database | MongoDB |

---

## 🔧 Customization

Replace all placeholder values in the source files:

- **Company name**: Search for `CleanPro GmbH` across `src/` and `server/`
- **Phone number**: `+49 (0) 123 456 7890` / `4901234567890`
- **Email**: `info@cleanpro-gmbh.de`
- **Address**: `Musterstraße 12, 10115 Berlin`
- **WhatsApp**: Update the `wa.me/` links with your real number

---

## 🏗 Production Build

```bash
# Build client
cd client && npm run build

# Serve dist/ via nginx or a static host
# Run server with: node server.js
```
