export default function HairstyleImage({ hairstyle, className = '', alt = '' }) {
  const columns = hairstyle.spriteColumns || 10;
  const rows = hairstyle.spriteRows || 5;
  const index = hairstyle.spriteIndex ?? 0;
  const column = index % columns;
  const row = Math.floor(index / columns);
  const x = columns === 1 ? 0 : (column / (columns - 1)) * 100;
  // The supplied sprite includes a caption strip in each tile. The viewer
  // viewport is intentionally 80% of each source tile, so the vertical
  // background image is scaled to 625% and positioned to show only the photo.
  const y = rows === 1 ? 0 : (row / (rows - 1)) * 95.238;
  const style = {
    backgroundImage: `url("${hairstyle.image}")`,
    backgroundSize: '1000% 625%',
    backgroundPosition: `${x}% ${y}%`,
    backgroundRepeat: 'no-repeat',
  };
  return (
    <div
      role="img"
      aria-label={alt || hairstyle.name}
      className={`w-full aspect-[0.684] bg-center bg-no-repeat bg-cover ${className}`}
      style={style}
    />
  );
}
