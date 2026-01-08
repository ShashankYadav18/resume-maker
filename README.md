# Resume Maker

A full-stack application to create, manage, and share professional resumes.

## Tech Stack

- **Frontend**: React 19 + Vite + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT
- **PDF Generation**: PDFKit

## Project Structure

```
.
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── styles/
├── server/          # Node.js backend
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middlewares/
│       └── config/
└── uploads/         # Uploaded files storage
```

## Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/resume-maker.git
cd resume-maker
```

### 2. Install dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Configure environment variables

**Server (.env in server root):**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume_maker
JWT_SECRET=your_secure_jwt_secret_here
CLIENT_URL=http://localhost:3000
```

**Client (.env.local in client directory):**
```
VITE_API_URL=http://localhost:5000
```

## Development

Run both frontend and backend concurrently:

```bash
# From root directory
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Building

```bash
# Build frontend
cd client
npm run build

# Backend runs as-is
```

## Deployment

### Option 1: Vercel (Frontend) + Railway/Render (Backend)

#### Frontend Deployment (Vercel)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `client`
5. Add environment variable: `VITE_API_URL=your_backend_url`

#### Backend Deployment (Railway/Render)
1. Go to [railway.app](https://railway.app) or [render.com](https://render.com)
2. Create new service from GitHub
3. Configure:
   - Build Command: `npm install` (in server directory)
   - Start Command: `npm start`
   - Set environment variables (MONGODB_URI, JWT_SECRET, etc.)

### Option 2: Netlify (Frontend) + Heroku (Backend)

Follow similar steps on respective platforms.

## Features

- User authentication with JWT
- Create and edit resumes
- Multiple resume templates
- Export to PDF
- Resume sharing
- User feedback system

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Resumes
- `GET /api/resumes` - Get all resumes
- `POST /api/resumes` - Create resume
- `GET /api/resumes/:id` - Get resume by ID
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### Feedback
- `POST /api/feedback` - Submit feedback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@resumemaker.com or open an issue on GitHub.
