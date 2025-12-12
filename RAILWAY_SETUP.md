# 🚂 Railway Deployment Guide

## Quick Setup Steps

### 1. Go to Railway
Visit [railway.app](https://railway.app) and sign up/login (it's free!)

### 2. Create New Project
- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Authorize Railway to access your GitHub if needed
- Select your repository: **`cojosted-MSIS/Christmas`**

### 3. Add PostgreSQL Database
- In your Railway project dashboard, click **"+ New"**
- Select **"Database"** → **"Add PostgreSQL"**
- Railway will automatically create the database and set the `DATABASE_URL` environment variable

### 4. Set Environment Variables
- In your Railway project, go to the **"Variables"** tab
- Add the following variable:
  - **Name:** `SITE_PASSWORD`
  - **Value:** `your-family-password-here` (change this to your desired password)

### 5. Deploy!
Railway will automatically:
- Install dependencies
- Generate Prisma client
- Push database schema
- Build the Next.js app
- Start the server

### 6. Get Your URL
- Once deployed, Railway will show you a URL like: `https://christmas-production.up.railway.app`
- Click on your service → **"Settings"** → **"Generate Domain"** to get a custom domain
- **This is your shareable link!** 🎉

## After Deployment

1. Visit your Railway URL
2. Enter the password you set in `SITE_PASSWORD`
3. The database will be automatically set up on first run
4. Start adding photos and memories!

## Troubleshooting

- **Database connection issues:** Make sure the PostgreSQL database service is running
- **Build fails:** Check the build logs in Railway dashboard
- **Can't access site:** Make sure the service is deployed (not just the database)

## Your Shareable Link

Once deployed, your family can access the site at:
**`https://your-app-name.up.railway.app`**

They'll need the password you set in the `SITE_PASSWORD` environment variable.

