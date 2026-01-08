# GitHub Hosting Guide for Resume Maker

## Step 1: Initialize Git & Push to GitHub

### 1.1 Initialize Git Repository
```bash
cd c:\Users\user\Desktop\resume-maker
git init
git add .
git commit -m "Initial commit: Resume Maker application"
```

### 1.2 Create Repository on GitHub
1. Go to [github.com](https://github.com)
2. Click **New Repository**
3. Name it: `resume-maker`
4. Add description: "A full-stack resume builder application"
5. Choose **Public** (for free deployment options)
6. Click **Create repository**

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/resume-maker.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Frontend (Vercel - Recommended)

### 2.1 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign up** and choose **GitHub**
3. Authorize Vercel to access your GitHub
4. Click **Import Project**
5. Select your `resume-maker` repository

### 2.2 Configure Vercel Settings
1. In "Configure your project":
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

2. Click **Environment Variables** and add:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
   (You'll set this after deploying the backend)

3. Click **Deploy**

✅ Frontend will be live at: `https://resume-maker-xxx.vercel.app`

---

## Step 3: Deploy Backend (Railway - Recommended)

### 3.1 Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your `resume-maker` repository
4. Choose service type: **Node.js**

### 3.2 Configure Railway Settings
1. In **Settings** → **Environment**:
   - **Root Directory**: `server` (important!)
   - **Start Command**: `npm start`

2. Add Environment Variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/resume_maker
   JWT_SECRET=your_very_secure_secret_key_here
   CLIENT_URL=https://resume-maker-xxx.vercel.app
   ```

3. Click **Deploy**

✅ Backend will be live at: `https://your-backend-url.railway.app`

---

## Step 4: Link Frontend & Backend

### 4.1 Update Frontend Environment
1. Go back to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Update `VITE_API_URL` with your Railway backend URL:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
5. Trigger redeploy (Vercel will automatically redeploy)

### 4.2 Update Backend Environment
1. Go to Railway dashboard
2. Go to **Project** → **Variables**
3. Update `CLIENT_URL`:
   ```
   CLIENT_URL=https://resume-maker-xxx.vercel.app
   ```
4. Railway will auto-redeploy

---

## Step 5: Setup MongoDB Atlas

If you don't have MongoDB:

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up (free tier available)
3. Create a new cluster
4. Create a database user
5. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/resume_maker`
6. Add this to your Railway environment variables as `MONGODB_URI`

---

## Step 6: Update Your Repository

After deployment, update your README and .env files:

```bash
git add .
git commit -m "Add deployment configuration and documentation"
git push origin main
```

---

## Deployment Checklist

- [ ] Git repository initialized and pushed to GitHub
- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Railway
- [ ] MongoDB connection string configured
- [ ] Environment variables set on both platforms
- [ ] Backend URL added to frontend environment
- [ ] Frontend URL added to backend environment
- [ ] Test API endpoints from deployed frontend
- [ ] Update repository README with live URLs

---

## Important Notes

⚠️ **Security**:
- Never commit `.env` files (use `.env.example` instead)
- Use strong, random JWT_SECRET
- Keep MongoDB credentials secure
- Use environment variables for all sensitive data

🔄 **Automatic Deployments**:
- Every push to `main` branch will trigger automatic redeploy on Vercel & Railway
- No manual deployment needed!

🧪 **Testing**:
- Test all features: login, create resume, download PDF
- Check console for errors in browser DevTools

---

## Alternative Deployment Options

### Frontend:
- **Netlify**: Similar to Vercel
- **GitHub Pages**: Static only (no API calls)

### Backend:
- **Render**: Similar to Railway
- **Heroku**: Free tier discontinued, but similar setup
- **AWS**: For production-grade deployment

---

## Troubleshooting

**CORS Error**: Check `CLIENT_URL` in backend matches frontend URL
**API 404**: Ensure backend URL is correct in frontend `.env`
**MongoDB Connection**: Verify connection string and IP whitelist on MongoDB Atlas

For support, refer to official docs:
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
