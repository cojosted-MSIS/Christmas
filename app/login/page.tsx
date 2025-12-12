'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-amber-50 to-green-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-4 border-christmas-red">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-christmas-red mb-2">
            🎄 The Stedman Family Photo Album 🎄
          </h1>
          <p className="text-gray-600">Enter the family password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-christmas-green rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red focus:border-transparent"
              placeholder="Enter family password"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-christmas-red text-white py-3 rounded-lg font-semibold hover:bg-christmas-burgundy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Unlocking...' : 'Unlock Album'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 italic">
          "The best way to spread Christmas cheer is singing loud for all to hear." - Elf
        </p>
      </div>
    </div>
  );
}

