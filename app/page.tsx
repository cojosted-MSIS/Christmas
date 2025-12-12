import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import SnowAnimation from '@/components/SnowAnimation';
import ChristmasBorder from '@/components/ChristmasBorder';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

async function getRecentData() {
  const [recentNotes, upcomingEvents, recentPhotos] = await Promise.all([
    prisma.note.findMany({
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    prisma.event.findMany({
      where: {
        dateTime: {
          gte: new Date(),
        },
      },
      orderBy: { dateTime: 'asc' },
      take: 3,
    }),
    prisma.photo.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
  ]);

  return { recentNotes, upcomingEvents, recentPhotos };
}

export default async function HomePage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect('/login');
  }

  const { recentNotes, upcomingEvents, recentPhotos } = await getRecentData();

  return (
    <div className="min-h-screen relative">
      <SnowAnimation />
      <ChristmasBorder />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-christmas-red mb-4 drop-shadow-lg">
            🎄 The Stedman Family Photo Album 🎄
          </h1>
          <p className="text-2xl text-christmas-green italic">
            A cozy place for our family memories ✨
          </p>
          <p className="mt-4 text-gray-600 text-sm">
            "Merry Christmas, ya filthy animal." - Home Alone
          </p>
        </header>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/photos"
            className="bg-christmas-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-christmas-burgundy transition-colors shadow-lg"
          >
            📸 Photos
          </Link>
          <Link
            href="/timeline"
            className="bg-christmas-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            🕰️ Memory Timeline
          </Link>
          <Link
            href="/calendar"
            className="bg-christmas-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors shadow-lg"
          >
            📅 Calendar
          </Link>
          <Link
            href="/notes"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
          >
            📝 Sticky Notes
          </Link>
        </nav>

        {/* Quick Previews */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Sticky Notes Preview */}
          <div className="bg-white rounded-lg shadow-xl p-6 border-4 border-christmas-red">
            <h2 className="text-2xl font-bold text-christmas-red mb-4">
              📝 Recent Notes
            </h2>
            {recentNotes.length > 0 ? (
              <div className="space-y-3">
                {recentNotes.map((note) => (
                  <div key={note.id} className="sticky-note">
                    <p className="font-semibold text-sm text-gray-700">
                      {note.author}
                    </p>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No notes yet</p>
            )}
            <Link
              href="/notes"
              className="mt-4 inline-block text-christmas-red hover:underline"
            >
              View all notes →
            </Link>
          </div>

          {/* Calendar Events Preview */}
          <div className="bg-white rounded-lg shadow-xl p-6 border-4 border-christmas-green">
            <h2 className="text-2xl font-bold text-christmas-green mb-4">
              📅 Upcoming Events
            </h2>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-sm">{event.title}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(event.dateTime).toLocaleDateString()} at{' '}
                      {new Date(event.dateTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No upcoming events</p>
            )}
            <Link
              href="/calendar"
              className="mt-4 inline-block text-christmas-green hover:underline"
            >
              View calendar →
            </Link>
          </div>

          {/* Recent Photos Preview */}
          <div className="bg-white rounded-lg shadow-xl p-6 border-4 border-christmas-gold">
            <h2 className="text-2xl font-bold text-christmas-gold mb-4">
              📸 Recent Photos
            </h2>
            {recentPhotos.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {recentPhotos.slice(0, 4).map((photo) => (
                  <div key={photo.id} className="aspect-square rounded overflow-hidden">
                    <img
                      src={photo.filePath}
                      alt={photo.caption || 'Family photo'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No photos yet</p>
            )}
            <Link
              href="/photos"
              className="mt-4 inline-block text-christmas-gold hover:underline"
            >
              View all photos →
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center mt-8">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

