# 💾 SQLite Deployment Guide

SQLite is perfect for your family photo album! Here are platforms that support it:

## ✅ Platforms That Support SQLite

### 1. **Render** (Best for SQLite) ⭐

**Why it works:** Render has persistent file storage, so SQLite files persist.

### Steps:
1. Go to [render.com](https://render.com) and sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo: `cojosted-MSIS/Christmas`
4. **Settings:**
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** `Node`
5. **Set Environment Variables:**
   - `DATABASE_URL` = `file:./data.db` (or `file:./prisma/data.db`)
   - `SITE_PASSWORD` = your family password
6. **Deploy!**

**Note:** Render's free tier spins down after 15 min of inactivity, but SQLite will persist when it wakes up.

**Your URL:** `https://christmas.onrender.com`

---

### 2. **Fly.io** (Good for SQLite)

**Why it works:** Fly.io provides persistent volumes for SQLite.

### Steps:
1. Install Fly CLI: `npm install -g @fly/cli`
2. Sign up at [fly.io](https://fly.io) (free)
3. Run: `fly launch` in your project
4. Create a volume: `fly volumes create data --size 1`
5. Update your `fly.toml` to mount the volume
6. Set `DATABASE_URL=file:/data/db.sqlite`
7. Deploy: `fly deploy`

**Pros:** Persistent storage, always-on option
**Cons:** More technical setup

---

### 3. **DigitalOcean App Platform** (Paid, but simple)

**Why it works:** Supports persistent storage.

- Has a free trial
- Simple setup
- SQLite works well

---

### 4. **Self-Hosted Options**

If you have a VPS or always-on computer:

- **VPS (DigitalOcean, Linode, etc.):** Full control, SQLite works perfectly
- **Raspberry Pi:** Can run 24/7 at home
- **Old computer:** Turn it into a server

---

## ⚠️ Platforms That DON'T Work with SQLite

These use serverless functions (no persistent file storage):
- ❌ Vercel
- ❌ Netlify
- ❌ AWS Lambda
- ❌ Cloudflare Workers

---

## 🎯 My Recommendation for SQLite

**Use Render** - it's the easiest free option that supports SQLite:
1. Free tier available
2. Persistent file storage
3. Simple setup
4. Auto-deploys from GitHub

The only downside: free tier spins down after 15 min (but wakes up on first request).

---

## Quick Render Setup

1. **Go to [render.com](https://render.com)**
2. **New +** → **Web Service**
3. **Connect GitHub** → Select `cojosted-MSIS/Christmas`
4. **Settings:**
   - Build: `npm install && npx prisma generate && npm run build`
   - Start: `npm start`
5. **Environment Variables:**
   - `DATABASE_URL` = `file:./prisma/data.db`
   - `SITE_PASSWORD` = your password
6. **Deploy!**

That's it! Your SQLite database will work perfectly on Render.

