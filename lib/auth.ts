import { cookies } from 'next/headers';

const SITE_PASSWORD = process.env.SITE_PASSWORD || 'family2024';
const SESSION_COOKIE = 'family_album_session';

/**
 * Verify if the provided password matches the site password
 */
export async function verifyPassword(password: string): Promise<boolean> {
  // For simplicity, we'll do a direct comparison
  // In production, you might want to hash the password in .env
  return password === SITE_PASSWORD;
}

/**
 * Create a session by setting a cookie
 */
export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === 'authenticated';
}

/**
 * Clear the session (logout)
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

