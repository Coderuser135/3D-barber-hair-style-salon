// 50-image hairstyle catalog for the salon app.
// The 3D viewer has been removed. Each entry keeps the same structured
// cut specifications so the booking, compare and filter features continue to work.
//
// Image note: these are temporary mannequin/hairstyling reference sources.
// The exact supplied reference style (faceless white mannequin + realistic hair)
// should be used as the final local asset set once 50 matching HD assets are available.

const imagePool = [
  'https://images.pexels.com/photos/17320163/pexels-photo-17320163.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/17320164/pexels-photo-17320164.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/17320162/pexels-photo-17320162.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/6923476/pexels-photo-6923476.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/9547827/pexels-photo-9547827.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/14355689/pexels-photo-14355689.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/7702774/pexels-photo-7702774.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/8481592/pexels-photo-8481592.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/8481593/pexels-photo-8481593.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/10303066/pexels-photo-10303066.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/7745272/pexels-photo-7745272.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/10303022/pexels-photo-10303022.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/12377012/pexels-photo-12377012.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/104343/pexels-photo-104343.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/7027834/pexels-photo-7027834.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/17523435/pexels-photo-17523435.jpeg?auto=compress&cs=tinysrgb&w=1600',
];

const specByCategory = {
  Fade: { topLength: '2–3 inches', sideLength: '#1 → #2', backLength: '#1 → #2', fadeType: 'Low / Mid Fade', texture: 'Textured', maintenance: 'Medium', stylingTime: '5–10 min', hairType: ['Straight', 'Wavy'] },
  Taper: { topLength: '2–3 inches', sideLength: '#2 → #3', backLength: '#2 → #3', fadeType: 'Taper', texture: 'Natural', maintenance: 'Low', stylingTime: '5 min', hairType: ['Straight', 'Wavy', 'Curly'] },
  Crop: { topLength: '2–3 inches', sideLength: '#1 → #2', backLength: '#1', fadeType: 'Low Fade', texture: 'Textured fringe', maintenance: 'Low', stylingTime: '5 min', hairType: ['Straight', 'Wavy'] },
  Buzz: { topLength: '#2–3 uniform', sideLength: '#2–3', backLength: '#2–3', fadeType: 'None', texture: 'Uniform', maintenance: 'Very Low', stylingTime: '0–2 min', hairType: ['Straight', 'Wavy', 'Curly', 'Coily'] },
  Quiff: { topLength: '3–4 inches', sideLength: '#1 → #3', backLength: '#2', fadeType: 'Mid Fade', texture: 'Volume', maintenance: 'Medium', stylingTime: '10–15 min', hairType: ['Straight', 'Wavy'] },
  Classic: { topLength: '3–5 inches', sideLength: '#2 → #3', backLength: '#2', fadeType: 'Taper', texture: 'Smooth', maintenance: 'Medium', stylingTime: '10 min', hairType: ['Straight', 'Wavy'] },
  Textured: { topLength: '3–4 inches', sideLength: '#2 → #3', backLength: '#2', fadeType: 'Taper', texture: 'Piecey', maintenance: 'Low', stylingTime: '5–10 min', hairType: ['Straight', 'Wavy'] },
  Curly: { topLength: '3–4 inches', sideLength: '#0 → #2', backLength: '#1', fadeType: 'Low Fade', texture: 'Curly', maintenance: 'Medium', stylingTime: '10 min', hairType: ['Curly', 'Coily'] },
  Undercut: { topLength: '4–6 inches', sideLength: '#0 disconnected', backLength: '#0', fadeType: 'Disconnected', texture: 'Slick', maintenance: 'Medium', stylingTime: '10–15 min', hairType: ['Straight', 'Wavy', 'Thick'] },
  Pompadour: { topLength: '4–5 inches', sideLength: '#0 → #2', backLength: '#1', fadeType: 'High Fade', texture: 'Slick / Volume', maintenance: 'High', stylingTime: '15–20 min', hairType: ['Straight', 'Thick'] },
  Long: { topLength: '5–8 inches', sideLength: '#2 → #3', backLength: '#2', fadeType: 'Taper', texture: 'Layered', maintenance: 'Medium', stylingTime: '10–15 min', hairType: ['Straight', 'Wavy'] },
  Wavy: { topLength: '3–5 inches', sideLength: '#2 → #3', backLength: '#2', fadeType: 'Taper', texture: 'Wavy', maintenance: 'Medium', stylingTime: '10 min', hairType: ['Wavy', 'Straight'] },
};

const detail = (id, name, category, imageIndex, overrides = {}) => {
  const spec = { ...(specByCategory[category] || specByCategory.Classic), ...overrides };
  const maintenance = spec.maintenance;
  return {
    id,
    name,
    category,
    model: null,
    image: imagePool[imageIndex % imagePool.length],
    ...spec,
    difficulty: maintenance === 'High' ? 'Hard' : maintenance === 'Very Low' || maintenance === 'Low' ? 'Easy' : 'Medium',
    frequency: maintenance === 'High' ? 'Every 2–3 weeks' : maintenance === 'Low' || maintenance === 'Very Low' ? 'Every 4–5 weeks' : 'Every 3–4 weeks',
    products: category === 'Curly' ? ['Curl cream', 'Leave-in conditioner'] : category === 'Slick' ? ['Pomade', 'Comb'] : ['Matte clay', 'Styling powder'],
    description: `${name} — a clean ${category.toLowerCase()} style with a defined silhouette and practical everyday finish.`,
    barberNotes: `Keep the ${category.toLowerCase()} shape balanced and clean. Adjust length and texture to the client's hair density and growth pattern.`,
    popular: false,
    featured: false,
  };
};

const hairstyles = [
  detail('low-fade-textured-crop', 'Low Fade Textured Crop', 'Fade', 0, { topLength: '2–3 inches', fadeType: 'Low Fade' }),
  detail('mid-fade-quiff', 'Mid Fade Quiff', 'Quiff', 1),
  detail('high-fade-pompadour', 'High Fade Pompadour', 'Pompadour', 2),
  detail('classic-taper', 'Classic Taper', 'Taper', 3),
  detail('buzz-cut', 'Buzz Cut', 'Buzz', 4),
  detail('french-crop', 'French Crop', 'Crop', 5),
  detail('skin-fade', 'Skin Fade', 'Fade', 6, { fadeType: 'Skin Fade', maintenance: 'High' }),
  detail('slick-back', 'Slick Back', 'Classic', 7, { topLength: '4–6 inches', texture: 'Slick' }),
  detail('messy-fringe', 'Messy Fringe', 'Textured', 8),
  detail('curly-fade', 'Curly Fade', 'Curly', 9),
  detail('undercut', 'Undercut', 'Undercut', 10),
  detail('classic-side-part', 'Classic Side Part', 'Classic', 11),
  detail('mid-fade-textured-quiff', 'Mid Fade Textured Quiff', 'Quiff', 12),
  detail('low-fade-crop', 'Low Fade Crop', 'Fade', 13, { fadeType: 'Low Fade' }),
  detail('high-fade-texture', 'High Fade Texture', 'Fade', 14, { fadeType: 'High Fade' }),
  detail('drop-fade-crop', 'Drop Fade Crop', 'Fade', 15, { fadeType: 'Drop Fade' }),
  detail('temple-fade-crop', 'Temple Fade Crop', 'Fade', 0, { fadeType: 'Temple Fade' }),
  detail('burst-fade-mohawk', 'Burst Fade Mohawk', 'Fade', 1, { fadeType: 'Burst Fade' }),
  detail('shadow-fade', 'Shadow Fade', 'Fade', 2, { fadeType: 'Shadow Fade' }),
  detail('taper-fade', 'Taper Fade', 'Taper', 3),
  detail('low-taper', 'Low Taper', 'Taper', 4),
  detail('scissor-taper', 'Scissor Taper', 'Taper', 5),
  detail('ivy-league', 'Ivy League', 'Classic', 6),
  detail('crew-cut', 'Crew Cut', 'Buzz', 7),
  detail('high-and-tight', 'High and Tight', 'Buzz', 8),
  detail('caesar-cut', 'Caesar Cut', 'Crop', 9),
  detail('textured-caesar', 'Textured Caesar', 'Crop', 10),
  detail('short-crop', 'Short Textured Crop', 'Crop', 11),
  detail('choppy-crop', 'Choppy Crop', 'Crop', 12),
  detail('long-fringe', 'Long Fringe', 'Textured', 13),
  detail('curtain-fringe', 'Curtain Fringe', 'Textured', 14),
  detail('side-swept-fringe', 'Side Swept Fringe', 'Textured', 15),
  detail('modern-mullet', 'Modern Mullet', 'Long', 0),
  detail('wolf-cut', 'Wolf Cut', 'Long', 1),
  detail('shaggy-layers', 'Shaggy Layers', 'Long', 2),
  detail('medium-layers', 'Medium Layers', 'Long', 3),
  detail('long-layered-flow', 'Long Layered Flow', 'Long', 4),
  detail('bro-flow', 'Bro Flow', 'Long', 5),
  detail('textured-flow', 'Textured Flow', 'Long', 6),
  detail('wavy-top-taper', 'Wavy Top Taper', 'Wavy', 7),
  detail('messy-wavy-top', 'Messy Wavy Top', 'Wavy', 8),
  detail('natural-waves', 'Natural Waves', 'Wavy', 9),
  detail('short-curly-top', 'Short Curly Top', 'Curly', 10),
  detail('curly-top-fade', 'Curly Top Fade', 'Curly', 11),
  detail('coily-taper', 'Coily Taper', 'Curly', 12),
  detail('defined-curls', 'Defined Curls', 'Curly', 13),
  detail('slick-side-part', 'Slick Side Part', 'Classic', 14, { texture: 'Slick' }),
  detail('hard-part-taper', 'Hard Part Taper', 'Classic', 15, { fadeType: 'Hard Part Taper' }),
  detail('comb-over-fade', 'Comb Over Fade', 'Classic', 0, { fadeType: 'Mid Fade' }),
  detail('modern-pompadour', 'Modern Pompadour', 'Pompadour', 1),
];

// Keep the first 8 prominent in home sections.
hairstyles.forEach((h, index) => {
  if (index < 8) h.featured = true;
  if (index < 12) h.popular = true;
});

export { hairstyles };

export const categories = [
  'All', 'Fade', 'Taper', 'Crop', 'Buzz', 'Quiff', 'Pompadour',
  'Undercut', 'Curly', 'Textured', 'Classic', 'Long', 'Wavy',
];

export const hairTypes = ['Straight', 'Wavy', 'Curly', 'Coily', 'Thick'];
export const fadeTypes = ['Low Fade', 'Mid Fade', 'High Fade', 'Skin Fade', 'Taper', 'Disconnected', 'None', 'Drop Fade', 'Burst Fade', 'Shadow Fade', 'Temple Fade'];
export const maintenanceLevels = ['Very Low', 'Low', 'Medium', 'High'];
export const lengthOptions = ['Short', 'Medium', 'Long'];
export const sortOptions = ['Popular', 'A–Z', 'Z–A', 'Low Maintenance', 'High Maintenance'];

export const getHairstyleById = (id) => hairstyles.find((h) => h.id === id);
export const getFeaturedHairstyles = () => hairstyles.filter((h) => h.featured);
export const getPopularHairstyles = () => hairstyles.filter((h) => h.popular);
