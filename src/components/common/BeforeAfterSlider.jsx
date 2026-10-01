import { useRef, useState, useCallback, useEffect } from 'react';

export default function BeforeAfterSlider({ before, after, beforeLabel = 'Before', afterLabel = 'After' }) {
  const [pos, setPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    updatePos(e.clientX);
  };
  const onPointerMove = (e) => {
    if (dragging.current) updatePos(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="ba-slider relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-ink-800 select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* After (full) */}
      <img src={after} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <span className="absolute top-3 right-3 px-3 py-1 rounded-full glass text-xs font-medium text-gold-300">
        {afterLabel}
      </span>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt={beforeLabel}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${containerWidth || 1000}px` }}
          draggable={false}
        />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs font-medium text-gray-300">
          {beforeLabel}
        </span>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gold-400 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-ink-950">
            <path d="M9 7L4 12L9 17M15 7L20 12L15 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label="Before and after slider"
      />
    </div>
  );
}
