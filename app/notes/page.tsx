'use client';

import { useEffect, useState } from 'react';
import SnowAnimation from '@/components/SnowAnimation';
import ChristmasBorder from '@/components/ChristmasBorder';
import Link from 'next/link';

interface Note {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  expiresAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
    // Poll every 5 seconds for updates
    const interval = setInterval(fetchNotes, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    setLoading(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content }),
      });

      if (response.ok) {
        setAuthor('');
        setContent('');
        fetchNotes(); // Refresh immediately
      }
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setLoading(false);
    }
  };

  const noteStyles = [
    'sticky-note',
    'sticky-note-alt',
    'sticky-note-red',
  ];

  return (
    <div className="min-h-screen relative">
      <SnowAnimation />
      <ChristmasBorder />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-6">
          <Link
            href="/"
            className="text-christmas-red hover:underline font-semibold"
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-christmas-red mb-8 text-center">
          📝 Sticky Notes Board
        </h1>

        {/* Add Note Form */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8 border-4 border-christmas-green max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-christmas-green mb-4">
            Add a New Note
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 border-2 border-christmas-green rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                placeholder="Who's leaving this note?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border-2 border-christmas-green rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                rows={4}
                placeholder="What's on your mind?"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-christmas-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post Note'}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500 italic">
            Notes automatically expire after 30 days
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <div
                key={note.id}
                className={noteStyles[index % noteStyles.length]}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-lg text-gray-800">
                    {note.author}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {note.content}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Expires: {new Date(note.expiresAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 italic py-12">
              No notes yet. Be the first to leave a message! 🎄
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

