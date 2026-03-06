# 🛍️ E-Commerce ShopShop (MERN + PostgreSQL)

A full-stack e-commerce platform with:
- 🧑‍💻 **Customer storefront** (`client`)
- 🛠️ **Admin dashboard** (`dashboard`)
- ⚙️ **REST API server** (`server`)

Built with modern React + Redux Toolkit on the frontend and Express + PostgreSQL on the backend.

## ✨ Highlights

- 🔐 JWT cookie-based authentication
- 👤 Role-based authorization (`User`, `Admin`)
- 📦 Product catalog with CRUD (admin protected)
- 🛒 Order placement + order management
- 💳 Stripe integration (payment + webhook handling)
- 🖼️ Cloudinary image upload support
- 📧 Password reset flow via email
- 🤖 AI product search endpoint
- 📊 Admin stats and management APIs

## 🧱 Monorepo Structure

```text
E-Commerce AI-Mern/
├── client/        # Customer-facing React app (Vite)
├── dashboard/     # Admin React app (Vite)
└── server/        # Express API + PostgreSQL
```

## 🛠️ Tech Stack

### Frontend (`client`, `dashboard`)
- ⚛️ React 19
- 🧠 Redux Toolkit + React Redux
- 🧭 React Router
- 🔌 Axios
- 🎨 Tailwind CSS
- 🔔 React Toastify

### Backend (`server`)
- 🚀 Express 5
- 🗄️ PostgreSQL (`pg`)
- 🍪 Cookie Parser + CORS
- 🔑 JSON Web Token (`jsonwebtoken`)
- 🔐 Bcrypt
- ☁️ Cloudinary
- 💌 Nodemailer
- 💳 Stripe

## 🚀 Local Setup

## 1. Clone

```bash
git clone https://github.com/Neelesh-jatav/E-commerce-ShopShop.git
cd E-commerce-ShopShop
```

## 2. Install dependencies

```bash
cd client && npm install
cd ../dashboard && npm install
cd ../server && npm install
```

## 3. Configure environment variables

Create/update `server/config/config.env`:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174

JWT_EXPIRES_IN=30d
COOKIE_EXPIRES_IN=30
JWT_SECRET_KEY=your_secret_here

SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_MAIL=your_email_here
SMTP_PASSWORD=your_app_password_here

GEMINI_API_KEY=your_gemini_key_here

CLOUDINARY_CLIENT_NAME=your_cloud_name
CLOUDINARY_CLIENT_API=your_cloudinary_api_key
CLOUDINARY_CLIENT_SECRET=your_cloudinary_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
STRIPE_FRONTEND_KEY=your_stripe_publishable_key
```

Create `dashboard/.env`:

```env
VITE_DEMO_ADMIN_EMAIL=demo.admin@example.com
VITE_DEMO_ADMIN_PASSWORD=DemoAdmin@123
```

## 4. Database setup

1. Ensure PostgreSQL is running.
2. Update DB connection in `server/database/db.js`.
3. Start server once to auto-create tables.

Default DB config in this repo points to:
- Host: `localhost`
- Port: `5432`
- Database: `mern_ecommerce_store`
- User: `postgres`

## 5. Run all apps

Open 3 terminals:

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev

# Terminal 3
cd dashboard
npm run dev
```

Apps run at:
- 🛍️ Client: `http://localhost:5173`
- 🛠️ Dashboard: `http://localhost:5174`
- ⚙️ API: `http://localhost:4000`

## 👑 Demo Admin Account

Dashboard routes require an admin role.

Use these credentials (if seeded in DB):
- Email: `demo.admin@example.com`
- Password: `DemoAdmin@123`

If missing, create/upsert the user in PostgreSQL with role `Admin`.

## 🔌 API Overview

Base URL: `http://localhost:4000/api/v1`

### Auth (`/auth`)
- `POST /register`
- `POST /login`
- `GET /me`
- `GET /logout`
- `POST /password/forgot`
- `PUT /password/reset/:token`
- `PUT /password/update`
- `PUT /profile/update`

### Product (`/product`)
- `GET /`
- `GET /singleProduct/:productId`
- `POST /admin/create`
- `PUT /admin/update/:productId`
- `DELETE /admin/delete/:productId`
- `PUT /post-new/review/:productId`
- `DELETE /delete/review/:productId`
- `POST /ai-search`

### Order (`/order`)
- `POST /new`
- `GET /:orderId`
- `GET /orders/me`
- `GET /admin/getall`
- `PUT /admin/update/:orderId`
- `DELETE /admin/delete/:orderId`

### Admin (`/admin`)
- `GET /getallusers`
- `DELETE /delete/:id`
- `GET /fetch/dashboard-stats`

## 📌 Scripts

### Client / Dashboard
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

### Server
- `npm run dev`
- `npm start`

## 🧪 Troubleshooting

- ❌ `401 Unauthorized` on `/auth/me`:
  - Usually expected when no login cookie exists.
  - Login first from client/dashboard.

- ❌ Dashboard demo login fails:
  - Ensure `dashboard/.env` has demo vars.
  - Ensure user exists in DB and role is `Admin`.

- ❌ CORS issues:
  - Verify `FRONTEND_URL` and `DASHBOARD_URL` in `server/config/config.env`.

- ❌ Stripe webhook errors:
  - Confirm `STRIPE_WEBHOOK_SECRET` and raw body parsing for webhook route.

## 🔐 Security Notes

- Never commit real API keys or passwords.
- Rotate exposed keys immediately if leaked.
- Use `.env` files and secrets manager in production.
- Set secure cookie flags (`secure`, `sameSite`) properly in production.

## 📄 License

This project is for learning and development use. Add a formal `LICENSE` file if you plan public distribution.

---

Built with ❤️ by **Neelesh Jatav**
