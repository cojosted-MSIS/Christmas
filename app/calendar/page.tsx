'use client';

import { useEffect, useState } from 'react';
import SnowAnimation from '@/components/SnowAnimation';
import ChristmasBorder from '@/components/ChristmasBorder';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  description: string | null;
  dateTime: string;
  createdBy: string | null;
  createdAt: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
    // Poll every 5 seconds for updates
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dateTime) return;

    setLoading(true);
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          dateTime,
          createdBy: createdBy || null,
        }),
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        setDateTime('');
        setCreatedBy('');
        fetchEvents(); // Refresh immediately
      }
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calendar grid generation
  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getEventsForDate = (day: number | null) => {
    if (day === null) return [];
    const date = new Date(year, month, day);
    return events.filter((event) => {
      const eventDate = new Date(event.dateTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const changeMonth = (direction: number) => {
    setSelectedMonth(new Date(year, month + direction, 1));
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

        <h1 className="text-4xl font-bold text-christmas-gold mb-8 text-center">
          📅 Family Calendar
        </h1>

        {/* Add Event Form */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8 border-4 border-christmas-gold max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-christmas-gold mb-4">
            Add an Event
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border-2 border-christmas-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                placeholder="What's happening?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border-2 border-christmas-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                rows={3}
                placeholder="Add details..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-christmas-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Created By (optional)
                </label>
                <input
                  type="text"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-christmas-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red"
                  placeholder="Your name"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-christmas-gold text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Event'}
            </button>
          </form>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-xl p-6 border-4 border-christmas-gold max-w-5xl mx-auto">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => changeMonth(-1)}
              className="text-christmas-red hover:text-christmas-burgundy text-2xl font-bold"
            >
              ←
            </button>
            <h2 className="text-3xl font-bold text-christmas-red">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={() => changeMonth(1)}
              className="text-christmas-red hover:text-christmas-burgundy text-2xl font-bold"
            >
              →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center font-bold text-christmas-green py-2"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const isToday =
                day !== null &&
                new Date().toDateString() ===
                  new Date(year, month, day).toDateString();

              return (
                <div
                  key={index}
                  className={`min-h-24 p-2 border-2 rounded-lg ${
                    day === null
                      ? 'bg-gray-100 border-gray-200'
                      : isToday
                      ? 'bg-christmas-gold bg-opacity-20 border-christmas-gold'
                      : 'bg-white border-christmas-green'
                  }`}
                >
                  {day !== null && (
                    <>
                      <div
                        className={`font-bold mb-1 ${
                          isToday ? 'text-christmas-red text-lg' : 'text-gray-700'
                        }`}
                      >
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs bg-christmas-red text-white p-1 rounded truncate"
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="mt-8 bg-white rounded-lg shadow-xl p-6 border-4 border-christmas-gold max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-christmas-gold mb-4">
            All Events
          </h2>
          {events.length > 0 ? (
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-christmas-gold bg-opacity-10 p-4 rounded-lg border-l-4 border-christmas-gold"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-christmas-red">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-gray-700 mt-1">{event.description}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">
                        {new Date(event.dateTime).toLocaleString()}
                        {event.createdBy && ` • Created by ${event.createdBy}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No events scheduled yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

