// 50-style boys/men hairstyle catalog for the salon app.
// The 3D viewer has been removed. Each entry keeps the same structured
// cut specifications so the booking, compare and filter features continue to work.
//
// Image note: these are male mannequin/hairstyling reference sources.
// The exact supplied reference style (faceless white mannequin + realistic hair)
// should be used as the final local asset set once 50 matching HD assets are available.

const imagePool = [
  // Male / boy hairstyle references only. Blank/faceless mannequin style,
  // matching the supplied reference direction as closely as available online.
  'https://media.hairtical.com/2026/03/hair-system-instant-results-69b39605771fe.webp',
  'https://www.kapillus.fr/cdn/shop/files/PhotocoupeVolumisKapillus.jpg?v=1733154254&width=1440',
  'https://www.kapillus.fr/cdn/shop/files/PhotocoupeOndulisKapillus_6.jpg?v=1733154394&width=1440',
  'https://www.exalto-professional-shop.com/img/layerslider/Mode-slider/thomas.jpg',
  'https://www.b-zone.biz/html/upload/save_image/0806145449_5d4916296ffda.jpg',
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
  detail('low-taper-fade', 'Low Taper Fade', 'Fade', 0, { image: `/images/hairstyles/low-taper-fade.jpg` }),
  detail('mid-taper-fade', 'Mid Taper Fade', 'Taper', 1, { image: `/images/hairstyles/mid-taper-fade.jpg` }),
  detail('high-taper-fade', 'High Taper Fade', 'Taper', 2, { image: `/images/hairstyles/high-taper-fade.jpg` }),
  detail('low-skin-fade', 'Low Skin Fade', 'Fade', 3, { image: `/images/hairstyles/low-skin-fade.jpg` }),
  detail('mid-skin-fade', 'Mid Skin Fade', 'Fade', 4, { image: `/images/hairstyles/mid-skin-fade.jpg` }),
  detail('high-skin-fade', 'High Skin Fade', 'Fade', 5, { image: `/images/hairstyles/high-skin-fade.jpg` }),
  detail('low-fade-textured-crop', 'Low Fade Textured Crop', 'Fade', 6, { image: `/images/hairstyles/low-fade-textured-crop.jpg` }),
  detail('mid-fade-textured-crop', 'Mid Fade Textured Crop', 'Fade', 7, { image: `/images/hairstyles/mid-fade-textured-crop.jpg` }),
  detail('high-fade-textured-crop', 'High Fade Textured Crop', 'Fade', 8, { image: `/images/hairstyles/high-fade-textured-crop.jpg` }),
  detail('french-crop', 'French Crop', 'Crop', 9, { image: `/images/hairstyles/french-crop.jpg` }),
  detail('caesar-cut', 'Caesar Cut', 'Crop', 10, { image: `/images/hairstyles/caesar-cut.jpg` }),
  detail('textured-crop', 'Textured Crop', 'Crop', 11, { image: `/images/hairstyles/textured-crop.jpg` }),
  detail('crew-cut', 'Crew Cut', 'Buzz', 12, { image: `/images/hairstyles/crew-cut.jpg` }),
  detail('buzz-cut', 'Buzz Cut', 'Buzz', 13, { image: `/images/hairstyles/buzz-cut.jpg` }),
  detail('high-and-tight', 'High and Tight', 'Buzz', 14, { image: `/images/hairstyles/high-and-tight.jpg` }),
  detail('ivy-league', 'Ivy League', 'Classic', 15, { image: `/images/hairstyles/ivy-league.jpg` }),
  detail('classic-side-part', 'Classic Side Part', 'Classic', 16, { image: `/images/hairstyles/classic-side-part.jpg` }),
  detail('hard-side-part', 'Hard Side Part', 'Classic', 17, { image: `/images/hairstyles/hard-side-part.jpg` }),
  detail('comb-over', 'Comb Over', 'Classic', 18, { image: `/images/hairstyles/comb-over.jpg` }),
  detail('slick-back', 'Slick Back', 'Classic', 19, { image: `/images/hairstyles/slick-back.jpg` }),
  detail('slick-side-part', 'Slick Side Part', 'Classic', 20, { image: `/images/hairstyles/slick-side-part.jpg` }),
  detail('quiff', 'Quiff', 'Quiff', 21, { image: `/images/hairstyles/quiff.jpg` }),
  detail('textured-quiff', 'Textured Quiff', 'Quiff', 22, { image: `/images/hairstyles/textured-quiff.jpg` }),
  detail('side-part-quiff', 'Side Part Quiff', 'Quiff', 23, { image: `/images/hairstyles/side-part-quiff.jpg` }),
  detail('pompadour', 'Pompadour', 'Pompadour', 24, { image: `/images/hairstyles/pompadour.jpg` }),
  detail('modern-pompadour', 'Modern Pompadour', 'Pompadour', 25, { image: `/images/hairstyles/modern-pompadour.jpg` }),
  detail('textured-pompadour', 'Textured Pompadour', 'Pompadour', 26, { image: `/images/hairstyles/textured-pompadour.jpg` }),
  detail('undercut', 'Undercut', 'Undercut', 27, { image: `/images/hairstyles/undercut.jpg` }),
  detail('disconnected-undercut', 'Disconnected Undercut', 'Undercut', 28, { image: `/images/hairstyles/disconnected-undercut.jpg` }),
  detail('slick-undercut', 'Slick Undercut', 'Undercut', 29, { image: `/images/hairstyles/slick-undercut.jpg` }),
  detail('curtain-fringe', 'Curtain Fringe', 'Textured', 30, { image: `/images/hairstyles/curtain-fringe.jpg` }),
  detail('side-swept-fringe', 'Side-Swept Fringe', 'Textured', 31, { image: `/images/hairstyles/side-swept-fringe.jpg` }),
  detail('messy-fringe', 'Messy Fringe', 'Textured', 32, { image: `/images/hairstyles/messy-fringe.jpg` }),
  detail('textured-spikes', 'Textured Spikes', 'Textured', 33, { image: `/images/hairstyles/textured-spikes.jpg` }),
  detail('brush-up', 'Brush Up', 'Textured', 34, { image: `/images/hairstyles/brush-up.jpg` }),
  detail('faux-hawk', 'Faux Hawk', 'Textured', 35, { image: `/images/hairstyles/faux-hawk.jpg` }),
  detail('modern-mullet', 'Modern Mullet', 'Long', 36, { image: `/images/hairstyles/modern-mullet.jpg` }),
  detail('wolf-cut', 'Wolf Cut', 'Long', 37, { image: `/images/hairstyles/wolf-cut.jpg` }),
  detail('shag', 'Shag', 'Long', 38, { image: `/images/hairstyles/shag.jpg` }),
  detail('bro-flow', 'Bro Flow', 'Long', 39, { image: `/images/hairstyles/bro-flow.jpg` }),
  detail('medium-layered', 'Medium Layered Cut', 'Long', 40, { image: `/images/hairstyles/medium-layered.jpg` }),
  detail('long-layered', 'Long Layered Cut', 'Long', 41, { image: `/images/hairstyles/long-layered.jpg` }),
  detail('wavy-top-taper', 'Wavy Top Taper', 'Wavy', 42, { image: `/images/hairstyles/wavy-top-taper.jpg` }),
  detail('messy-wavy', 'Messy Wavy Top', 'Wavy', 43, { image: `/images/hairstyles/messy-wavy.jpg` }),
  detail('natural-waves', 'Natural Waves', 'Wavy', 44, { image: `/images/hairstyles/natural-waves.jpg` }),
  detail('curly-top-fade', 'Curly Top Fade', 'Curly', 45, { image: `/images/hairstyles/curly-top-fade.jpg` }),
  detail('curly-fringe', 'Curly Fringe', 'Curly', 46, { image: `/images/hairstyles/curly-fringe.jpg` }),
  detail('curly-undercut', 'Curly Undercut', 'Curly', 47, { image: `/images/hairstyles/curly-undercut.jpg` }),
  detail('coily-taper', 'Coily Taper', 'Curly', 48, { image: `/images/hairstyles/coily-taper.jpg` }),
  detail('textured-flow', 'Textured Flow', 'Long', 49, { image: `/images/hairstyles/textured-flow.jpg` }),
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
