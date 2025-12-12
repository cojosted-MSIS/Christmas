'use client';

import { useEffect, useState } from 'react';

export default function SnowAnimation() {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Create 50 snowflakes
    const flakes = Array.from({ length: 50 }, (_, i) => i);
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
            fontSize: `${10 + Math.random() * 10}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}

