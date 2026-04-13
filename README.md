# College Club Management System

## 🏗️ Project Structure
```
collegeClubManagement/
├── Frontend/           # React + Vite frontend
├── backend/            # Node.js + Express backend
├── .gitignore
├── TODO.md
└── README.md
```

## 🚀 Quick Start

### Frontend (React + Vite + Tailwind)
```bash
cd Frontend
npm install
npm run dev
```
- Opens at http://localhost:5173

### Backend (Node.js + Express + MongoDB)
```bash
cd backend
npm install
npm start
```
- Runs on http://localhost:5000
- Update `backend/server.js` with your MongoDB URI

## 📱 Features
- User authentication (login/register)
- Club browsing & joining
- Attendance marking (manual/QR)
- Application forms
- Certificates
- Feedback system
- Admin panel
- SAC Council info
- Responsive design

## 🛠️ Tech Stack
**Frontend:** React 19, Vite 7, Tailwind CSS 3, Axios  
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT Auth  
**Tools:** ESLint, PostCSS, Autoprefixer

## 📝 Development Scripts
**Frontend:**
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - Lint code
- `npm run preview` - Preview production build

**Backend:**
- `npm start` - Start server
- `npm install` - Install dependencies

## 🌐 API Endpoints
```
POST /api/auth/login
POST /api/auth/register  
GET  /api/auth/profile
GET  /api/clubs
POST /api/feedback
...
```
See `src/services/api.js` (Frontend) for full list.

## 📂 Folder Structure

**Frontend/**
```
Frontend/
├── public/
├── src/
│   ├── components/     # All UI components
│   ├── services/       # API calls
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── tailwind.config.js
```

**backend/**
```
backend/
├── models/             # Mongoose schemas
├── routes/             # API routes
├── middleware/
├── server.js
└── package.json
```

## 🔒 Environment Variables
**Backend (.env):**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🤝 Contributing
1. Fork the repo
2. Create feature branch
3. Update TODO.md with progress
4. Submit PR

Happy coding! 🎉
