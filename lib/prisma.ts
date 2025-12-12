import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper to check if database is initialized
export async function ensureDatabase() {
  try {
    await prisma.$connect();
    return true;
  } catch (error: any) {
    if (error?.code === 'P1001' || error?.message?.includes('SQLITE_CANTOPEN')) {
      console.error('❌ Database file not found. Please run: npm run db:migrate');
      return false;
    }
    throw error;
  }
}

