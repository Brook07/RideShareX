# Quick Deployment Checklist

## Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] All features tested locally
- [ ] Environment variables documented
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Google OAuth credentials ready

## Backend Deployment (Railway/Render)
- [ ] Create new project
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend`
- [ ] Add all environment variables
- [ ] Deploy and get backend URL
- [ ] Test API health endpoint

## Frontend Deployment (Vercel)
- [ ] Create new project on Vercel
- [ ] Import GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Add environment variables (start with REACT_APP_)
- [ ] Set REACT_APP_API_URL to backend URL
- [ ] Deploy and get frontend URL

## Post-Deployment
- [ ] Update backend FRONTEND_URL with Vercel URL
- [ ] Redeploy backend
- [ ] Update Google OAuth authorized origins
- [ ] Add both URLs to authorized JavaScript origins
- [ ] Test full application flow
- [ ] Test Google OAuth login
- [ ] Test profile picture upload
- [ ] Test booking functionality
- [ ] Test payment flows

## URLs to Configure
```
Frontend URL: https://__________________.vercel.app
Backend URL:  https://__________________.railway.app

Google Console ✓
MongoDB Atlas ✓
Backend CORS ✓
Frontend API URL ✓
```

## Verification Tests
```bash
# Test backend health
curl https://your-backend.railway.app/api/health

# Test frontend
# Open browser and check console for errors
# Try Google login
# Test all features
```

## Common Issues
- [ ] CORS errors → Check FRONTEND_URL matches exactly
- [ ] 404 errors → Check vercel.json configuration
- [ ] Auth errors → Check Google Console settings
- [ ] API errors → Check environment variables
- [ ] MongoDB errors → Check IP whitelist

## Performance Monitoring
- [ ] Enable Vercel Analytics
- [ ] Check Railway logs
- [ ] Monitor MongoDB Atlas metrics
- [ ] Set up error tracking (optional: Sentry)

---

**Notes:**
- First deployment takes 2-5 minutes
- Auto-deploy enabled on git push
- Free tier limits: Check usage regularly
