# 🚀 Quick Start: Deploy to Vercel in 10 Minutes

## 1️⃣ Push to GitHub (2 min)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## 2️⃣ Deploy Backend to Railway (3 min)
1. Go to https://railway.app → **New Project**
2. **Deploy from GitHub** → Select your repo
3. **Settings** → Root Directory: `backend`
4. **Variables** → Add:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   GOOGLE_CLIENT_ID=your_client_id
   FRONTEND_URL=https://temp-url.vercel.app
   PORT=5000
   ```
5. Copy the Railway URL (e.g., `https://ridesharex-production.up.railway.app`)

## 3️⃣ Deploy Frontend to Vercel (3 min)
1. Go to https://vercel.com/new → Import your repo
2. **Settings**:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
3. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend.railway.app
   REACT_APP_GOOGLE_CLIENT_ID=your_client_id
   REACT_APP_CLOUDINARY_CLOUD_NAME=dtgrovkrh
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=react_uploads
   ```
4. Click **Deploy**
5. Copy your Vercel URL

## 4️⃣ Update Backend (1 min)
1. Go back to Railway
2. Update `FRONTEND_URL` to your Vercel URL
3. Redeploy

## 5️⃣ Configure Google OAuth (1 min)
1. [Google Console](https://console.cloud.google.com/)
2. Add to **Authorized JavaScript origins**:
   - `https://your-app.vercel.app`
   - `https://your-backend.railway.app`
3. Save

## ✅ Done!
Visit your Vercel URL and test your app!

---

## 💡 Pro Tip
Bookmark these for monitoring:
- **Frontend**: Your Vercel Dashboard
- **Backend**: Railway Logs
- **Database**: MongoDB Atlas Metrics

---

## 🆘 If Something Breaks
1. Check Vercel deployment logs
2. Check Railway logs
3. Verify all environment variables
4. Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
5. Review [Full Guide](./DEPLOYMENT_GUIDE.md)

---

**Time to deploy: ~10 minutes**  
**Cost: $0 (all free tiers)**
