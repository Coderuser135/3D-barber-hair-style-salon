export default function HairstyleImage({ hairstyle, className = '', alt = '' }) {
  return (
    <div className="relative w-full aspect-[4/5] max-h-[260px] overflow-hidden bg-ink-700">
      <img
        src={hairstyle.image}
        alt={alt || hairstyle.name}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover object-top transition-transform duration-500 ${className}`}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement.classList.add('image-fallback');
        }}
      />
      <div className="absolute inset-0 hidden items-center justify-center bg-ink-700 image-fallback-label">
        <span className="text-xs text-gray-500">Hair style image unavailable</span>
      </div>
    </div>
  );
}
