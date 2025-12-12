'use client';

import { useEffect, useState } from 'react';
import SnowAnimation from '@/components/SnowAnimation';
import ChristmasBorder from '@/components/ChristmasBorder';
import Link from 'next/link';

interface Photo {
  id: string;
  fileName: string;
  filePath: string;
  uploadedBy: string;
  caption: string | null;
  createdAt: string;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedBy, setUploadedBy] = useState('');
  const [caption, setCaption] = useState('');

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
    // Poll every 5 seconds for updates
    const interval = setInterval(fetchPhotos, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    
    if (!fileInput?.files || fileInput.files.length === 0) {
      alert('Please select at least one photo');
      return;
    }

    setUploading(true);
    try {
      const files = Array.from(fileInput.files);
      
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uploadedBy', uploadedBy || 'Anonymous');
        formData.append('caption', caption);

        const response = await fetch('/api/photos', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }
      }

      setUploadedBy('');
      setCaption('');
      fileInput.value = '';
      fetchPhotos(); // Refresh immediately
      alert('Photos uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert('Error uploading photos. Please try again.');
    } finally {
      setUploading(false);
    }
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

        <h1 className="text-4xl font-bold text-christmas-red mb-8 text-center">
          📸 Photo Gallery
        </h1>

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8 border-4 border-christmas-gold max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-christmas-gold mb-4">
            Upload Photos
          </h2>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                className="w-full px-4 py-2 border-2 border-christmas-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                placeholder="Who's uploading?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caption (optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-4 py-2 border-2 border-christmas-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                placeholder="Add a caption for all photos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Photos
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full px-4 py-2 border-2 border-christmas-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                You can select multiple photos at once
              </p>
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-christmas-gold text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Photos'}
            </button>
          </form>
        </div>

        {/* Photo Grid */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-lg"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.filePath}
                  alt={photo.caption || photo.fileName}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 italic py-12">
            No photos yet. Upload your first family photo! 📸
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="max-w-4xl max-h-full relative">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
              >
                ×
              </button>
              <img
                src={selectedPhoto.filePath}
                alt={selectedPhoto.caption || selectedPhoto.fileName}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <div
                className="bg-white p-4 rounded-b-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-semibold">{selectedPhoto.caption || 'No caption'}</p>
                <p className="text-sm text-gray-600">
                  Uploaded by {selectedPhoto.uploadedBy} on{' '}
                  {new Date(selectedPhoto.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

