# RideShareX Cloudflare Deployment Guide

## Overview
- **Frontend**: Deploy to Cloudflare Pages
- **Backend**: Deploy to Render/Railway (Cloudflare Workers don't support Express + MongoDB)

---

## 🎨 Frontend Deployment (Cloudflare Pages)

### Method 1: Using Cloudflare Dashboard (Recommended)

1. **Build your frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Navigate to `Pages` → `Create a project`

3. **Connect to Git** (Recommended)
   - Connect your GitHub/GitLab repository
   - Select your RideShareX repository
   - Configure build settings:
     - **Build command**: `cd frontend && npm install && npm run build`
     - **Build output directory**: `frontend/build`
     - **Root directory**: `/`

4. **Environment Variables** (Add in Cloudflare Pages settings)
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

5. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will build and deploy automatically
   - You'll get a URL like: `https://ridesharex.pages.dev`

### Method 2: Using Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build frontend**
   ```bash
   cd frontend
   npm run build
   ```

4. **Deploy using Wrangler**
   ```bash
   cd ..
   wrangler pages deploy frontend/build --project-name=ridesharex
   ```

### Method 3: Direct Upload

1. **Build frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload to Cloudflare Pages**
   - Go to Cloudflare Dashboard → Pages
   - Click "Upload assets"
   - Upload the `frontend/build` folder
   - Deploy!

---

## 🚀 Backend Deployment Options

### Option 1: Render.com (Recommended - Free Tier Available)

1. **Go to Render.com**
   - Visit: https://render.com/
   - Sign up/Login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: `ridesharex-backend`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Plan**: Free (or paid for always-on)

3. **Environment Variables**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://ridesharex.pages.dev
   GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Deploy**
   - Render will auto-deploy
   - Copy your backend URL: `https://ridesharex-backend.onrender.com`

### Option 2: Railway.app

1. **Go to Railway.app**
   - Visit: https://railway.app/
   - Sign up with GitHub

2. **Deploy from GitHub**
   - New Project → Deploy from GitHub
   - Select RideShareX repository
   - Configure root directory: `backend`
   - Add environment variables (same as above)

3. **Deploy**
   - Railway auto-deploys
   - Copy your backend URL

### Option 3: Heroku

```bash
cd backend
heroku login
heroku create ridesharex-backend
git push heroku main
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
```

---

## 🔗 After Deployment

### Update Frontend Environment Variables

1. **Update API URL in Cloudflare Pages**
   - Go to your Cloudflare Pages project
   - Settings → Environment Variables
   - Add: `REACT_APP_API_URL=https://your-backend-url.onrender.com`
   - Redeploy

### Update Backend CORS

Update `backend/server.js` CORS to include your Cloudflare Pages URL:
```javascript
app.use(cors({
  origin: ['https://ridesharex.pages.dev', 'http://localhost:3000'],
  credentials: true
}));
```

### Update Google OAuth

1. Go to Google Cloud Console
2. Add authorized origins:
   - `https://ridesharex.pages.dev`
3. Add redirect URIs:
   - `https://ridesharex.pages.dev`

---

## 📝 Quick Deployment Commands

```bash
# Frontend (Cloudflare Pages)
cd frontend
npm install
npm run build
cd ..
wrangler pages deploy frontend/build --project-name=ridesharex

# Backend (push to GitHub, then connect to Render/Railway)
git add .
git commit -m "Deploy backend"
git push origin main
```

---

## 🔍 Troubleshooting

**Frontend can't connect to backend:**
- Check REACT_APP_API_URL is set correctly
- Ensure backend CORS allows your frontend URL

**Backend crashes:**
- Check environment variables are set
- Verify MongoDB connection string
- Check logs in Render/Railway dashboard

**Build fails:**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

---

## 💡 Pro Tips

1. **Custom Domain**: Add your domain in Cloudflare Pages → Custom domains
2. **Auto-deploys**: Connect GitHub for automatic deployments on push
3. **Preview Deployments**: Every PR gets a preview URL on Cloudflare Pages
4. **Free SSL**: Cloudflare provides free SSL certificates automatically
5. **MongoDB Atlas**: Use MongoDB Atlas (free tier) for database hosting
