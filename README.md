# 🚀 AI Resume Analyzer

A high-performance AI Resume Analyzer built with **React**, **Node.js/Express**, **MongoDB Atlas**, and **Google Gemini AI**. Evaluate resumes for ATS compatibility, uncover missing skills, analyze strengths & weaknesses, and generate tailored interview questions and career recommendations.

---

## ✨ Features

- 🔐 **JWT Authentication**: Secure user registration, login, and session tokens.
- 👤 **Protected Dashboard**: Clean stats, recent analyses, quick actions, and history.
- 📄 **Resume Upload & Parsing**: Supports PDF and DOCX formats with selectable text extraction.
- 🗄️ **Persistent Database Storage**: Resumes are stored safely in MongoDB Atlas so files are never lost on container restarts (Render / serverless).
- 🤖 **Google Gemini AI Integration**: Multi-model fallback (`gemini-2.5-flash`, `gemini-1.5-flash`, `gemini-2.0-flash`) with strict JSON schema enforcement.
- 📊 **Interactive ATS Score**: Visual radial score gauge with categorized feedback.
- 🔍 **In-depth Feedback**:
  - Strengths & Weaknesses
  - Detected Technical & Soft Skills
  - Missing Target Skills
  - Actionable Improvement Suggestions
  - Customized AI Interview Questions
- 📑 **Persistent Resume & Analysis Viewer**: Revisit past analyses anytime directly from the dashboard or history.
- 🎨 **Executive Theme**: Sleek Obsidian Slate & Sapphire theme replacing generic neon templates.

---

## 🛠 Tech Stack

### Frontend
- **React.js** (Vite)
- **React Router DOM v6**
- **Framer Motion**
- **Lucide React Icons**
- **Axios**

### Backend
- **Node.js** & **Express.js**
- **MongoDB Atlas** & **Mongoose**
- **Google GenAI SDK** (`@google/genai`)
- **Multer** (multipart upload)
- **pdf-parse** & **mammoth** (document text extraction)
- **JSONWebToken** & **bcryptjs**

---

## 🚀 Deployment Guide

### Option 1: Backend on Render & Frontend on Vercel (Recommended)

#### 1. Backend (Render)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New > Web Service**.
2. Connect your GitHub repository `ResumeAi-Analyzer`.
3. Configure the following:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add the following **Environment Variables**:
   | Variable | Value / Description |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | A long, secure random string |
   | `JWT_EXPIRES_IN` | `7d` |
   | `GEMINI_API_KEY` | Your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/) |
   | `CLIENT_URL` | Your frontend URL (e.g. `https://your-app.vercel.app`) |
5. Click **Create Web Service**. Note the deployed URL (e.g. `https://resume-backend.onrender.com`).

#### 2. Frontend (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
2. Select your `ResumeAi-Analyzer` repository.
3. Configure:
   - **Root Directory**: Click *Edit* and select `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variable**:
   | Variable | Value |
   |---|---|
   | `VITE_API_BASE_URL` | `https://your-backend.onrender.com/api` |
5. Click **Deploy**.

---

### Option 2: Local Development

#### Prerequisites
- Node.js (v18+)
- MongoDB running locally or MongoDB Atlas connection URI
- Google Gemini API Key

#### 1. Clone & Setup
```bash
git clone https://github.com/tfaryanraj07/ResumeAi-Analyzer.git
cd ResumeAi-Analyzer
```

#### 2. Configure Environment Files
**Server (`server/.env`):**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/resume_checker
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
MAX_FILE_SIZE_MB=5
GEMINI_API_KEY=your_gemini_api_key_here
```

**Client (`client/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

#### 3. Start Backend
```bash
cd server
npm install
npm run dev
```

#### 4. Start Frontend
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT |
| `GET` | `/api/users/profile` | Private | Retrieve logged-in user details |
| `POST` | `/api/resumes/upload` | Private | Upload resume, extract text, run AI analysis |
| `GET` | `/api/resumes` | Private | List all past resumes analyzed by user |
| `GET` | `/api/resumes/:id` | Private | Get single resume & full AI analysis by ID |
| `GET` | `/api/resumes/:id/file` | Public | Stream or download original resume PDF |
| `GET` | `/uploads/:filename` | Public | Fallback route serving resume file |
| `DELETE` | `/api/resumes/:id` | Private | Delete resume record & binary file |
| `GET` | `/api/health` | Public | Healthcheck endpoint |

---

## 👨‍💻 Author

**Raj Kumar Solanki**
- GitHub: [tfaryanraj07](https://github.com/tfaryanraj07)
- LinkedIn: [rajkumar-solanki07](https://www.linkedin.com/in/rajkumar-solanki07)