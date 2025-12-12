# 🚀 Quick Deployment Guide

## Get Your Shareable Link in 3 Steps

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Deploy to Railway (Easiest Option)

1. **Go to [railway.app](https://railway.app)** and sign up (free)

2. **Create New Project** → "Deploy from GitHub repo"

3. **Select your repository**

4. **Add PostgreSQL Database:**
   - Click "+ New" in your project
   - Select "Database" → "Add PostgreSQL"
   - Railway automatically creates the database

5. **Set Environment Variables:**
   - In your Railway project, go to "Variables"
   - Add: `SITE_PASSWORD` = `your-family-password`
   - `DATABASE_URL` is automatically set by Railway

6. **Update Prisma Schema for PostgreSQL:**
   - Change `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

7. **Add Build Command:**
   - In Railway project settings, add build command:
   ```
   npm install && npx prisma generate && npx prisma db push && npm run build
   ```

8. **Deploy!** Railway will give you a URL like: `https://your-app-name.up.railway.app`

### Step 3: Share the Link!

Once deployed, you'll get a URL like:
- `https://stedman-family-photo-album.up.railway.app`

**Share this URL with your family!** They'll need the password you set in `SITE_PASSWORD`.

---

## Alternative: Deploy to Vercel (Free, but needs PostgreSQL)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Add PostgreSQL database (via Vercel Postgres, Supabase, or Neon)
4. Set environment variables
5. Deploy!

---

## After Deployment

1. Visit your URL
2. Enter the password
3. Start adding photos and memories!

**Note:** The first time you visit, you may need to wait a moment for the database to initialize.

