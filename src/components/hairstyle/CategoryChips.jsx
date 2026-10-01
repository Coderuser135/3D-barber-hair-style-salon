import { useRef } from 'react';

export default function CategoryChips({ categories, active, onSelect }) {
  const scrollRef = useRef(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto no-scrollbar pb-1"
      role="tablist"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`chip ${active === cat ? 'chip-active' : 'chip-inactive'}`}
          role="tab"
          aria-selected={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
