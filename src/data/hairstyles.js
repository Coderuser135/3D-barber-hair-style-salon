// Production hairstyle catalog: 50 distinct boys/men cuts based on the supplied reference sheet.
// The old procedural 3D viewer is intentionally removed.
// Images use one exact 50-style reference sprite at /images/hairstyles-50.webp.
// Each card/detail view crops one tile from that sprite, so the head/mannequin style stays consistent.

const sprite = {
  src: '/images/hairstyles-50.webp',
  columns: 10,
  rows: 5,
};

const style = (id, name, category, index, meta, overrides = {}) => ({
  id,
  name,
  category,
  image: sprite.src,
  spriteIndex: index,
  spriteColumns: sprite.columns,
  spriteRows: sprite.rows,
  topLength: overrides.topLength || meta.topLength,
  sideLength: overrides.sideLength || meta.sideLength,
  backLength: overrides.backLength || meta.backLength,
  fadeType: overrides.fadeType || meta.fadeType,
  texture: overrides.texture || meta.texture,
  maintenance: overrides.maintenance || 'Medium',
  stylingTime: overrides.stylingTime || '5–10 min',
  hairType: overrides.hairType || ['Straight', 'Wavy'],
  difficulty: overrides.difficulty || 'Medium',
  frequency: overrides.frequency || 'Every 3–4 weeks',
  products: overrides.products || ['Matte clay', 'Styling powder'],
  description: overrides.description || `${name} — a ${meta.texture.toLowerCase()} ${category.toLowerCase()} style with a clean, defined finish.`,
  barberNotes: overrides.barberNotes || `Maintain the defining shape of the ${name}. Adjust length and texture to the client's density, hairline and growth pattern.`,
  popular: index < 12,
  featured: index < 8,
});

const SHORT = { topLength: '2–3 in', sideLength: '#1–#3', backLength: '#1–#3', fadeType: 'Taper / Fade', texture: 'Short' };
const MEDIUM = { topLength: '3–4 in', sideLength: '#2–#3', backLength: '#2–#3', fadeType: 'Taper', texture: 'Medium' };
const LONG = { topLength: '5–8 in', sideLength: 'Natural / tapered', backLength: 'Natural / layered', fadeType: 'None / Taper', texture: 'Layered' };

const hairstyles = [
  style('low-fade-textured-crop','Low Fade Textured Crop','Fade',0,{...SHORT,texture:'Textured'},{maintenance:'Low',hairType:['Straight','Wavy']}),
  style('mid-fade-quiff','Mid Fade Quiff','Fade',1,{...MEDIUM,texture:'Volume'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('high-fade-pompadour','High Fade Pompadour','Fade',2,{...MEDIUM,texture:'Volume'},{maintenance:'High',hairType:['Straight','Thick']}),
  style('classic-taper','Classic Taper','Taper',3,{...MEDIUM,texture:'Natural'},{maintenance:'Low',hairType:['Straight','Wavy','Curly']}),
  style('buzz-cut','Buzz Cut','Buzz',4,{topLength:'#2–#3 uniform',sideLength:'#2–#3',backLength:'#2–#3',fadeType:'None',texture:'Minimal'},{maintenance:'Very Low',stylingTime:'0–2 min',hairType:['Straight','Wavy','Curly','Coily'],difficulty:'Easy'}),
  style('french-crop','French Crop','Crop',5,{...SHORT,texture:'Textured'},{maintenance:'Low'}),
  style('caesar-cut','Caesar Cut','Crop',6,{...SHORT,texture:'Textured'},{maintenance:'Low'}),
  style('ivy-league','Ivy League','Classic',7,{...MEDIUM,texture:'Clean'},{maintenance:'Medium'}),
  style('short-back-and-sides','Short Back and Sides','Classic',8,{...SHORT,texture:'Clean'},{maintenance:'Low'}),
  style('fade-undercut','Fade Undercut','Undercut',9,{...MEDIUM,texture:'Bold',fadeType:'Fade'},{maintenance:'Medium'}),
  style('slick-back','Slick Back','Classic',10,{...MEDIUM,texture:'Polished'},{maintenance:'Medium',hairType:['Straight','Wavy'],products:['Pomade','Comb']}),
  style('side-part','Side Part','Classic',11,{...MEDIUM,texture:'Neat'},{maintenance:'Medium',hairType:['Straight','Wavy'],products:['Pomade','Comb']}),
  style('comb-over','Comb Over','Classic',12,{...MEDIUM,texture:'Elegant'},{maintenance:'Medium',hairType:['Straight','Wavy'],products:['Pomade','Comb']}),
  style('pompadour','Pompadour','Pompadour',13,{...MEDIUM,texture:'Volume'},{maintenance:'High',hairType:['Straight','Thick'],products:['Pomade','Round brush']}),
  style('textured-quiff','Textured Quiff','Quiff',14,{...MEDIUM,texture:'Textured'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('messy-hair','Messy Hair','Textured',15,{...MEDIUM,texture:'Curly'},{maintenance:'Low',hairType:['Wavy','Curly']}),
  style('curly-top-fade','Curly Top Fade','Curly',16,{...SHORT,texture:'Curly',fadeType:'Fade'},{maintenance:'Medium',hairType:['Curly','Coily'],products:['Curl cream','Leave-in conditioner']}),
  style('wavy-medium','Wavy Medium','Wavy',17,{...MEDIUM,texture:'Wavy'},{maintenance:'Medium',hairType:['Wavy']}),
  style('wolf-cut','Wolf Cut','Long',18,{...LONG,texture:'Layered'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('mullet','Mullet','Long',19,{...LONG,texture:'Layered'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('shag-cut','Shag Cut','Long',20,{...LONG,texture:'Layered'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('curtain-bangs','Curtain Bangs','Long',21,{...LONG,texture:'Fringe'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('bro-flow','Bro Flow','Long',22,{...LONG,texture:'Natural'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('man-bun','Man Bun','Long',23,{...LONG,texture:'Tied'},{maintenance:'Medium',hairType:['Straight','Wavy','Curly']}),
  style('top-knot','Top Knot','Long',24,{...LONG,texture:'Tied'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('half-up-half-down','Half Up Half Down','Long',25,{...LONG,texture:'Tied'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('cornrows','Cornrows','Textured',26,{...LONG,texture:'Braided'},{maintenance:'Medium',hairType:['Curly','Coily'],products:['Scalp oil','Leave-in conditioner']}),
  style('afro','Afro','Curly',27,{...MEDIUM,texture:'Volume'},{maintenance:'Medium',hairType:['Curly','Coily'],products:['Curl cream','Moisturizer']}),
  style('temple-fade','Temple Fade','Fade',28,{...SHORT,texture:'Sharp'},{maintenance:'Low'}),
  style('skin-fade','Skin Fade','Fade',29,{...SHORT,texture:'Clean',fadeType:'Skin Fade'},{maintenance:'Medium'}),
  style('drop-fade','Drop Fade','Fade',30,{...SHORT,texture:'Curved',fadeType:'Drop Fade'},{maintenance:'Medium'}),
  style('burst-fade','Burst Fade','Fade',31,{...SHORT,texture:'Bold',fadeType:'Burst Fade'},{maintenance:'Medium'}),
  style('mohawk','Mohawk','Textured',32,{...MEDIUM,texture:'Edgy',fadeType:'Fade'},{maintenance:'High',hairType:['Straight','Wavy'],products:['Matte clay','Styling powder']}),
  style('faux-hawk','Faux Hawk','Textured',33,{...MEDIUM,texture:'Edgy'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('textured-short-cut','Textured Short Cut','Textured',34,{...SHORT,texture:'Bold'},{maintenance:'Low'}),
  style('flat-top','Flat Top','Classic',35,{...SHORT,texture:'Classic'},{maintenance:'Medium',hairType:['Straight','Thick']}),
  style('bowl-cut','Bowl Cut','Classic',36,{...MEDIUM,texture:'Smooth'},{maintenance:'Medium',hairType:['Straight']}),
  style('pageboy','Pageboy','Classic',37,{...MEDIUM,texture:'Smooth'},{maintenance:'Medium',hairType:['Straight']}),
  style('modern-shag','Modern Shag','Long',38,{...LONG,texture:'Layered'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('taper-fade','Taper Fade','Taper',39,{...SHORT,texture:'Clean',fadeType:'Taper'},{maintenance:'Low'}),
  style('brush-back','Brush Back','Classic',40,{...MEDIUM,texture:'Smooth'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('wet-look','Wet Look','Classic',41,{...MEDIUM,texture:'Slick'},{maintenance:'High',hairType:['Straight','Wavy'],products:['Gel','Comb']}),
  style('side-swept','Side Swept','Long',42,{...MEDIUM,texture:'Flow'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('spiky-fade','Spiky Fade','Fade',43,{...SHORT,texture:'Spiky',fadeType:'Fade'},{maintenance:'Medium',hairType:['Straight','Thick']}),
  style('short-curly','Short Curly','Curly',44,{...SHORT,texture:'Curly'},{maintenance:'Medium',hairType:['Curly','Coily'],products:['Curl cream','Leave-in conditioner']}),
  style('disconnected-undercut','Disconnected Undercut','Undercut',45,{...MEDIUM,texture:'Bold',fadeType:'Disconnected'},{maintenance:'Medium',hairType:['Straight','Wavy']}),
  style('curly-taper','Curly Taper','Curly',46,{...SHORT,texture:'Curly',fadeType:'Taper'},{maintenance:'Medium',hairType:['Curly','Coily'],products:['Curl cream','Leave-in conditioner']}),
  style('textured-crop','Textured Crop','Crop',47,{...SHORT,texture:'Textured'},{maintenance:'Low',hairType:['Straight','Wavy']}),
  style('samurai-bun','Samurai Bun','Long',48,{...LONG,texture:'Tied'},{maintenance:'Medium',hairType:['Straight','Wavy'],products:['Hair tie','Light pomade']}),
];

export { hairstyles };

export const categories = ['All','Fade','Taper','Crop','Buzz','Quiff','Pompadour','Undercut','Curly','Textured','Classic','Long','Wavy'];
export const hairTypes = ['Straight','Wavy','Curly','Coily','Thick'];
export const fadeTypes = ['Low Fade','Mid Fade','High Fade','Skin Fade','Taper','Disconnected','None','Drop Fade','Burst Fade','Shadow Fade','Temple Fade'];
export const maintenanceLevels = ['Very Low','Low','Medium','High'];
export const lengthOptions = ['Short','Medium','Long'];
export const sortOptions = ['Popular','A–Z','Z–A','Low Maintenance','High Maintenance'];
export const getHairstyleById = (id) => hairstyles.find((h) => h.id === id);
export const getFeaturedHairstyles = () => hairstyles.filter((h) => h.featured);
export const getPopularHairstyles = () => hairstyles.filter((h) => h.popular);
