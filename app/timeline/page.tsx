'use client';

import { useEffect, useState } from 'react';
import SnowAnimation from '@/components/SnowAnimation';
import ChristmasBorder from '@/components/ChristmasBorder';
import Link from 'next/link';

interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  photoId: string | null;
  createdAt: string;
}

interface Photo {
  id: string;
  filePath: string;
}

export default function TimelinePage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [photoId, setPhotoId] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const [memoriesRes, photosRes] = await Promise.all([
        fetch('/api/memories'),
        fetch('/api/photos'),
      ]);

      if (memoriesRes.ok) {
        const memoriesData = await memoriesRes.json();
        setMemories(memoriesData);
      }

      if (photosRes.ok) {
        const photosData = await photosRes.json();
        setPhotos(photosData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll every 5 seconds for updates
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date) return;

    setLoading(true);
    try {
      const response = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          date,
          photoId: photoId || null,
        }),
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        setDate('');
        setPhotoId('');
        fetchData(); // Refresh immediately
      }
    } catch (error) {
      console.error('Error creating memory:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoPath = (photoId: string | null) => {
    if (!photoId) return null;
    const photo = photos.find((p) => p.id === photoId);
    return photo?.filePath || null;
  };

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

        <h1 className="text-4xl font-bold text-christmas-green mb-8 text-center">
          🕰️ Memory Timeline
        </h1>

        {/* Add Memory Form */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8 border-4 border-christmas-green max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-christmas-green mb-4">
            Add a Memory
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border-2 border-christmas-green rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                placeholder="What happened?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border-2 border-christmas-green rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                rows={4}
                placeholder="Tell us about this memory..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border-2 border-christmas-green rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link to Photo (optional)
              </label>
              <select
                value={photoId}
                onChange={(e) => setPhotoId(e.target.value)}
                className="w-full px-4 py-2 border-2 border-christmas-green rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
              >
                <option value="">No photo</option>
                {photos.map((photo) => (
                  <option key={photo.id} value={photo.id}>
                    {photo.filePath.split('/').pop()}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-christmas-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Memory'}
            </button>
          </form>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {memories.length > 0 ? (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-christmas-green"></div>

              {memories.map((memory, index) => {
                const photoPath = getPhotoPath(memory.photoId);
                return (
                  <div key={memory.id} className="relative mb-8 pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-christmas-red rounded-full border-4 border-white shadow-lg"></div>

                    {/* Memory card */}
                    <div className="bg-white rounded-lg shadow-xl p-6 border-4 border-christmas-green">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-christmas-red">
                          {memory.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(memory.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                        {memory.description}
                      </p>
                      {photoPath && (
                        <div className="mt-4">
                          <img
                            src={photoPath}
                            alt={memory.title}
                            className="max-w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500 italic py-12">
              No memories yet. Start documenting your family's journey! 🎄
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

