# Alumni System - Full Stack Application

## Overview

This is a complete Alumni Management System with:
- **Backend**: Express.js + MongoDB + JWT Authentication
- **Frontend**: Next.js 16 with TypeScript

## 📁 Project Structure

```
.
├── backend/              # Express.js backend server
│   ├── server.js        # Main server entry point
│   ├── package.json     # Backend dependencies
│   ├── .env.example     # Environment variables template
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & admin middleware
│   └── utils/           # Utility functions
│
└── v0-alumni-system-ui/  # Next.js frontend
    ├── app/             # Next.js app directory
    ├── components/      # React components
    ├── services/        # API service functions
    └── package.json     # Frontend dependencies
```

## 🚀 Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/alumni-db?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

   **👉 Important:**
   - Get your `MONGO_URI` from MongoDB Atlas:
     1. Go to https://cloud.mongodb.com
     2. Create a free cluster (if you don't have one)
     3. Click "Connect" → "Connect your application"
     4. Copy the connection string
     5. Replace `<password>` with your database password
     6. Replace `<dbname>` with `alumni-db`
   
   - Generate a strong `JWT_SECRET`:
     - Use a long random string (minimum 32 characters)
     - You can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

5. **Start the backend server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

   The backend will run on `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd v0-alumni-system-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Create `.env.local` file (optional):**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
   If you don't create this, the frontend will default to `http://localhost:4000`

4. **Start the frontend development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   The frontend will run on `http://localhost:3000`

## 🔐 Authentication Flow

1. **Signup**: Users register → Status: `pending` → Wait for admin approval
2. **Login**: Approved users can log in → Receive JWT token
3. **Protected Routes**: 
   - Admin pages require `role: "admin"` + valid JWT
   - Alumni pages require `role: "alumni"` + `status: "approved"` + valid JWT

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user

### Alumni
- `GET /alumni` - Get all approved alumni (authenticated)
- `GET /alumni/pending` - Get pending approvals (admin only)
- `PUT /alumni/approve/:id` - Approve alumni (admin only)
- `PUT /alumni/reject/:id` - Reject alumni (admin only)
- `PUT /alumni/:id` - Update alumni (admin only)
- `DELETE /alumni/:id` - Delete alumni (admin only)

### Events
- `GET /events` - Get all events (public)
- `POST /events` - Create event (admin only)
- `PUT /events/:id` - Update event (admin only)
- `DELETE /events/:id` - Delete event (admin only)

### Jobs
- `GET /jobs` - Get all jobs (public)
- `POST /jobs` - Create job (admin only)
- `PUT /jobs/:id` - Update job (admin only)
- `DELETE /jobs/:id` - Delete job (admin only)

### Announcements
- `GET /announcements` - Get all announcements (public)
- `POST /announcements` - Create announcement (admin only)
- `PUT /announcements/:id` - Update announcement (admin only)
- `DELETE /announcements/:id` - Delete announcement (admin only)

## 🎯 Features

### Admin Features
- ✅ View and approve/reject pending alumni registrations
- ✅ Manage alumni directory
- ✅ Create, update, and delete events
- ✅ Create, update, and delete job postings
- ✅ Create, update, and delete announcements
- ✅ View dashboard with statistics

### Alumni Features
- ✅ Register and wait for approval
- ✅ Login after approval
- ✅ View alumni directory
- ✅ Browse events
- ✅ Browse job opportunities
- ✅ View news and announcements
- ✅ View personal dashboard

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Admin/Alumni)
- CORS enabled for frontend
- Protected API routes with middleware
- Frontend authentication guards

## 📝 Creating Your First Admin Account

After setting up the backend, you'll need to create an admin account. You can do this in two ways:

### Method 1: Direct MongoDB Update
1. Create a user account through the signup page
2. Connect to your MongoDB database
3. Find the user document
4. Update the `role` field to `"admin"` and `status` to `"approved"`

### Method 2: MongoDB Shell/Compass
```javascript
// After creating a user through signup, update in MongoDB:
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin", status: "approved" } }
)
```

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB URI is correct in `.env`
- Ensure MongoDB Atlas IP whitelist includes your IP (use `0.0.0.0/0` for development)
- Verify JWT_SECRET is set

### Frontend can't connect to backend
- Ensure backend is running on port 4000
- Check CORS settings in `backend/server.js`
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local` (if set)

### Login fails for approved users
- Verify user status is `"approved"` in database
- Check if JWT_SECRET matches between `.env` and what you're using
- Clear browser localStorage and try again

## 📦 Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- date-fns

## 📄 License

ISC

---

**👉 Remember**: Always keep your `.env` file secure and never commit it to version control!



