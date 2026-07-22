# 🚀 AI Resume Analyzer

An AI-powered Resume Analyzer that evaluates resumes for ATS compatibility using **Google Gemini AI**. Users can upload their resume, receive an ATS score, identify strengths and weaknesses, discover missing skills, and get AI-generated suggestions along with interview questions.

---

## 🌐 Features

- 🔐 JWT Authentication (Register & Login)
- 👤 Protected User Dashboard
- 📄 Resume Upload (PDF)
- 📑 PDF Text Extraction
- 🤖 Google Gemini AI Integration
- 📊 ATS Score Analysis
- 💪 Resume Strengths
- ⚠️ Resume Weaknesses
- 🧠 AI Generated Summary
- 📈 Missing Skills Detection
- 💡 Resume Improvement Suggestions
- 🎯 AI Interview Questions
- 📂 Resume History
- 📱 Responsive Premium UI

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- CSS3
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer
- pdf-parse
- Google Gemini API

---

## 📂 Project Structure

```
AI-Resume-Analyzer
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── src
│   ├── uploads
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/AI-Resume-Analyzer.git
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| GET | `/api/users/profile` | User Profile |
| POST | `/api/resumes/upload` | Upload Resume |
| GET | `/api/resumes` | Resume History |
| DELETE | `/api/resumes/:id` | Delete Resume |

---

## 📸 Screenshots

### Landing Page

> Add screenshot here

### Dashboard

> Add screenshot here

### Upload Resume

> Add screenshot here

### AI Analysis

> Add screenshot here

---

## 🚀 Future Improvements

- Resume Comparison
- Download PDF Report
- AI Resume Rewriter
- Resume Keyword Optimizer
- Cover Letter Generator
- Job Description Matching
- Cloud Storage for Uploaded Files
- Redis Caching
- Admin Dashboard

---

## 👨‍💻 Author

**Raj Kumar Solanki**

- GitHub: https://github.com/tfaryanraj07
- LinkedIn: https://www.linkedin.com/in/rajkumar-solanki07

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub.