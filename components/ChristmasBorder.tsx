'use client';

export default function ChristmasBorder() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Top border decorations */}
      <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={`top-${i}`}
            className="text-christmas-red text-lg animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            ✨
          </span>
        ))}
      </div>
      
      {/* Bottom border decorations */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={`bottom-${i}`}
            className="text-christmas-green text-lg animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            🎄
          </span>
        ))}
      </div>
      
      {/* Left border decorations */}
      <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center justify-center gap-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={`left-${i}`}
            className="text-christmas-gold text-lg animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            🎁
          </span>
        ))}
      </div>
      
      {/* Right border decorations */}
      <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col items-center justify-center gap-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={`right-${i}`}
            className="text-christmas-red text-lg animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            🎅
          </span>
        ))}
      </div>
    </div>
  );
}

