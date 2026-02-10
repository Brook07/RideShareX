# Vercel Deployment Guide for RideShareX

## 🎯 Deployment Strategy: Split Deployment (Recommended)

**Frontend:** Vercel  
**Backend:** Railway/Render  
**Database:** MongoDB Atlas

---

## 📋 Prerequisites

1. ✅ GitHub account
2. ✅ Vercel account (sign up at https://vercel.com)
3. ✅ Railway account (sign up at https://railway.app) OR Render account
4. ✅ MongoDB Atlas account (already set up)
5. ✅ Push your code to GitHub

---

## 🚀 PART 1: Deploy Backend on Railway

### Step 1: Prepare Backend for Deployment

Create `backend/.env.example`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
GOOGLE_CLIENT_ID=your_google_client_id
FRONTEND_URL=https://your-frontend.vercel.app
```

### Step 2: Deploy to Railway

1. Go to https://railway.app
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your RideShareX repository
4. Railway will auto-detect Node.js
5. **Configure Root Directory:**
   - Settings → **Root Directory** → `backend`
6. **Add Environment Variables:**
   - Variables tab → Add all from `.env.example`
   - Set `FRONTEND_URL` to your Vercel URL (we'll update this later)
7. Click **Deploy**
8. Copy your Railway backend URL (e.g., `https://ridesharex-backend.railway.app`)

---

## 🎨 PART 2: Deploy Frontend on Vercel

### Step 1: Update Frontend API URL

Update `frontend/.env`:
```env
REACT_APP_API_URL=https://ridesharex-backend.railway.app
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_CLOUDINARY_CLOUD_NAME=dtgrovkrh
REACT_APP_CLOUDINARY_UPLOAD_PRESET=react_uploads
```

### Step 2: Add Build Script to Root package.json

Your root package.json already exists, add vercel-build script:
```json
{
  "scripts": {
    "vercel-build": "cd frontend && npm install && npm run build"
  }
}
```

### Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. **Import Git Repository**
3. Select your RideShareX repository
4. **Configure Project:**
   - Framework Preset: **Create React App**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `build`
5. **Environment Variables** (Add these):
   ```
   REACT_APP_API_URL=https://ridesharex-backend.railway.app
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   REACT_APP_CLOUDINARY_CLOUD_NAME=dtgrovkrh
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=react_uploads
   ```
6. Click **Deploy**

### Step 4: Update Backend CORS

After getting your Vercel URL (e.g., `https://ridesharex.vercel.app`):

1. Go back to Railway
2. Update `FRONTEND_URL` environment variable to your Vercel URL
3. Redeploy

---

## 🔐 PART 3: Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. **APIs & Services** → **Credentials**
4. Edit your OAuth 2.0 Client ID
5. **Authorized JavaScript origins:**
   ```
   https://ridesharex.vercel.app
   https://ridesharex-backend.railway.app
   ```
6. **Authorized redirect URIs:**
   ```
   https://ridesharex.vercel.app
   https://ridesharex.vercel.app/auth/callback
   ```
7. Click **Save**

---

## 🗄️ PART 4: Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. **Network Access** → **Add IP Address**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. This allows Railway to connect

---

## ✅ Verification Checklist

After deployment, test:

- [ ] Frontend loads at Vercel URL
- [ ] Backend health check: `https://your-backend.railway.app/api/health`
- [ ] Google OAuth login works
- [ ] API calls from frontend to backend work
- [ ] MongoDB connection is stable
- [ ] Profile picture uploads to Cloudinary work
- [ ] All features function correctly

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution:** Ensure `FRONTEND_URL` in Railway matches your exact Vercel URL

### Issue: 404 on Page Refresh
**Solution:** Vercel.json is configured to handle SPA routing

### Issue: Environment Variables Not Working
**Solution:** 
- Vercel: Must start with `REACT_APP_`
- Railway: Regular variable names
- Redeploy after adding variables

### Issue: Google OAuth Not Working
**Solution:** Add both Railway and Vercel URLs to Google Console authorized origins

---

## 🔄 Continuous Deployment

Both Vercel and Railway auto-deploy when you push to GitHub:
- Push to `main` branch → Automatic deployment
- Each PR gets a preview deployment on Vercel

---

## 💰 Cost Estimate

- **Vercel:** Free tier (good for most projects)
- **Railway:** Free $5 credit/month (usually sufficient for small apps)
- **MongoDB Atlas:** Free tier M0 cluster (512MB)
- **Cloudinary:** Free tier (25 credits/month)

**Total: FREE** for hobby/student projects!

---

## 📊 Alternative: Deploy Backend on Render

If you prefer Render over Railway:

1. Go to https://render.com
2. **New** → **Web Service**
3. Connect GitHub repo
4. Configure:
   - Name: ridesharex-backend
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add environment variables
6. Deploy

---

## 🎓 Pro Tips

1. **Use Environment-Specific URLs:**
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   ```

2. **Enable Vercel Analytics:**
   - Project Settings → Analytics → Enable

3. **Set Up Custom Domain (Optional):**
   - Vercel: Settings → Domains → Add
   - Point your domain DNS to Vercel

4. **Monitor Backend:**
   - Railway provides logs and metrics
   - Set up monitoring for production

5. **Database Backups:**
   - MongoDB Atlas: Enable automated backups

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

---

**Your deployment URLs will look like:**
- Frontend: `https://ridesharex.vercel.app`
- Backend: `https://ridesharex-backend.railway.app`
