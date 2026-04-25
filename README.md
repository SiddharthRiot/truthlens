# TruthLens Frontend

World-class AI-powered fake news detector UI built with React + TypeScript + Tailwind CSS.

## Setup Instructions

### 1. Copy these files into your existing frontend folder
Replace the following files in `D:\hackathon\frontend\src\`:
- `App.tsx`
- `index.css`
- All files in `components/`
- All files in `pages/`
- All files in `hooks/`
- All files in `services/`
- All files in `types/`

Also replace `tailwind.config.js` in the root of your frontend folder.

### 2. Make sure dependencies are installed
```bash
npm install axios react-router-dom
npm install -D @types/react-router-dom
```

### 3. Run frontend
```bash
npm start
```

### 4. Make sure backend is running
```bash
cd D:\hackathon\backend
venv\Scripts\activate
uvicorn main:app --reload
```

### 5. Open browser
Go to `http://localhost:3000`

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS
- Plus Jakarta Sans font
- Axios for API calls
- React Router DOM
