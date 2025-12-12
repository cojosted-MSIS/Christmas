# 🎄 The Stedman Family Photo Album

A cozy, Christmas-themed family photo album and memory sharing web application built with Next.js, TypeScript, and Prisma.

## ✨ Features

- **🔐 Password Protection**: One shared password protects the entire site
- **📸 Photo Gallery**: Upload and view family photos with captions
- **📝 Sticky Notes**: Leave messages that auto-expire after 30 days
- **🕰️ Memory Timeline**: Document and view family memories chronologically
- **📅 Family Calendar**: Share events and important dates
- **❄️ Real-time Updates**: All content updates automatically for all users (polling every 5 seconds)
- **🎄 Christmas Theme**: Beautiful, warm, family-friendly design with snow animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory with the following content:
   ```env
   DATABASE_URL="file:./dev.db"
   SITE_PASSWORD="your-secure-password-here"
   ```
   
   Replace `"your-secure-password-here"` with your desired family password.

4. **Set up the database:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Seed the database (optional, for sample data):**
   ```bash
   npm run db:seed
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)
   
   You'll be prompted for the password you set in `.env`.

## 📁 Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── notes/        # Sticky notes API
│   │   ├── photos/       # Photo upload & retrieval
│   │   ├── memories/     # Memory timeline API
│   │   └── events/       # Calendar events API
│   ├── calendar/         # Calendar page
│   ├── login/            # Login page
│   ├── notes/            # Sticky notes page
│   ├── photos/           # Photo gallery page
│   ├── timeline/         # Memory timeline page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── SnowAnimation.tsx
│   └── ChristmasBorder.tsx
├── lib/                  # Utility libraries
│   ├── auth.ts          # Authentication helpers
│   └── prisma.ts        # Prisma client
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data script
├── uploads/             # Uploaded photos (created automatically)
└── public/              # Static assets
```

## 🔧 Configuration

### Changing the Password

Edit the `SITE_PASSWORD` value in your `.env` file:

```env
SITE_PASSWORD="new-password-here"
```

Restart the server for changes to take effect.

### Database Location

By default, SQLite database is stored at `prisma/dev.db`. You can change this in `.env`:

```env
DATABASE_URL="file:./path/to/your/database.db"
```

## 📸 Photo Uploads

- Photos are stored in the `uploads/photos/` directory
- Supported formats: JPG, PNG, GIF, WebP
- Multiple photos can be uploaded at once
- Photos are served via API routes for security

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import project in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure environment variables:**
   - Add `DATABASE_URL` and `SITE_PASSWORD` in Vercel dashboard
   - For SQLite on Vercel, consider using a hosted database or Vercel's file system

4. **Deploy!**

**Note:** Vercel uses serverless functions, so SQLite file storage may not persist. Consider using:
- **PostgreSQL** (via Vercel Postgres, Supabase, or Railway)
- **PlanetScale** (MySQL)
- **Neon** (PostgreSQL)

To use PostgreSQL instead of SQLite:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update your `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

### Deploy to Railway

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create a new project** and connect your GitHub repo

3. **Add a PostgreSQL database** service

4. **Set environment variables:**
   - `DATABASE_URL` (auto-provided by Railway)
   - `SITE_PASSWORD`

5. **Deploy!**

### Deploy to Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service** and connect your GitHub repo

3. **Add a PostgreSQL database** (or use SQLite for small projects)

4. **Configure build command:**
   ```bash
   npm install && npm run db:generate && npm run build
   ```

5. **Set environment variables:**
   - `DATABASE_URL`
   - `SITE_PASSWORD`

6. **Deploy!**

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

### Real-time Updates

The app uses client-side polling (every 5 seconds) to update content in real-time. All pages automatically refresh their data:

- **Home page**: Shows recent notes, events, and photos
- **Notes page**: Refreshes note list
- **Photos page**: Refreshes photo gallery
- **Timeline page**: Refreshes memories
- **Calendar page**: Refreshes events

## 🎨 Customization

### Christmas Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  christmas: {
    red: '#C41E3A',
    green: '#228B22',
    gold: '#FFD700',
    // ... add more colors
  },
}
```

### Sticky Note Expiration

Default expiration is 30 days. To change, edit `app/api/notes/route.ts`:

```typescript
expiresAt.setDate(expiresAt.getDate() + 30); // Change 30 to your desired days
```

## 🔒 Security Notes

- Password is stored in plain text in `.env` (simple shared password system)
- Session cookies are HTTP-only and secure in production
- All routes require authentication except `/login` and API routes
- File uploads are restricted to authenticated users
- Consider using environment-specific secrets for production

## 📝 License

This project is created for personal/family use. Feel free to modify and use as needed.

## 🎄 Merry Christmas!

Enjoy sharing your family memories! 

*"The best way to spread Christmas cheer is singing loud for all to hear."* - Elf

---

**Built with ❤️ using Next.js, TypeScript, Prisma, and Tailwind CSS**

