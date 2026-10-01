// 50 distinct men's/ boys' hairstyles from the supplied 10x5 reference sheet.
// Indexes are fixed 0–49 so every visual tile maps to exactly one catalog item.
// The site uses the supplied reference sprite; no procedural/3D hairstyle generation is used.

const sprite = { src: '/images/hairstyles-50-clean-sprite.webp', columns: 10, rows: 5 };

const style = (id,name,category,index,meta,extra={}) => ({
  id,name,category,index,spriteIndex:index,
  image:sprite.src,spriteColumns:10,spriteRows:5,
  topLength:meta.topLength,sideLength:meta.sideLength,backLength:meta.backLength,
  fadeType:meta.fadeType,texture:meta.texture,
  maintenance:extra.maintenance||'Medium',
  stylingTime:extra.stylingTime||'5–10 min',
  hairType:extra.hairType||['Straight','Wavy'],
  difficulty:'Medium',
  frequency:'Every 3–4 weeks',
  products:extra.products||['Matte clay','Styling powder'],
  description:`${name} — a ${meta.texture.toLowerCase()} ${category.toLowerCase()} style with a defined, barber-friendly shape.`,
  barberNotes:`Ask for the ${name}. Preserve the defining silhouette, texture and length shown in the reference image; adjust for the client's hair density and growth pattern.`,
  popular:index<12,featured:index<8
});


const hairstyles = [
  style('low-fade-textured-crop','Low Fade Textured Crop','Fade',0,{topLength:'2–4 in',sideLength:'#0–#2',backLength:'#0–#2',fadeType:'Fade',texture:'Defined'},{maintenance:"Very Low",hairType:['Straight','Wavy']}),
  style('mid-fade-quiff','Mid Fade Quiff','Fade',1,{topLength:'2–4 in',sideLength:'#0–#2',backLength:'#0–#2',fadeType:'Fade',texture:'Defined'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('high-fade-pompadour','High Fade Pompadour','Fade',2,{topLength:'2–4 in',sideLength:'#0–#2',backLength:'#0–#2',fadeType:'Fade',texture:'Defined'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('classic-taper','Classic Taper','Taper',3,{topLength:'2–4 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Taper',texture:'Natural'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('buzz-cut','Buzz Cut','Buzz',4,{topLength:'#2–#4',sideLength:'#2–#4',backLength:'#2–#4',fadeType:'None',texture:'Minimal'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('french-crop','French Crop','Crop',5,{topLength:'1–3 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Taper / Fade',texture:'Textured'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('caesar-cut','Caesar Cut','Crop',6,{topLength:'1–3 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Taper / Fade',texture:'Textured'},{maintenance:"Very Low",hairType:['Straight','Wavy']}),
  style('crew-cut','Crew Cut','Short',7,{topLength:'1–3 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Taper',texture:'Clean'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('ivy-league','Ivy League','Classic',8,{topLength:'3–5 in',sideLength:'#2–#3',backLength:'#2–#3',fadeType:'Taper / None',texture:'Clean'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('fade-undercut','Fade Undercut','Undercut',9,{topLength:'3–5 in',sideLength:'#1–#2',backLength:'#1–#2',fadeType:'Disconnected',texture:'Bold'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('slick-back','Slick Back','Classic',10,{topLength:'3–5 in',sideLength:'#2–#3',backLength:'#2–#3',fadeType:'Taper / None',texture:'Clean'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('side-part','Side Part','Classic',11,{topLength:'3–5 in',sideLength:'#2–#3',backLength:'#2–#3',fadeType:'Taper / None',texture:'Clean'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('comb-over','Comb Over','Classic',12,{topLength:'3–5 in',sideLength:'#2–#3',backLength:'#2–#3',fadeType:'Taper / None',texture:'Clean'},{maintenance:"Very Low",hairType:['Straight','Wavy']}),
  style('pompadour','Pompadour','Pompadour',13,{topLength:'4–6 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Fade / Taper',texture:'Volume'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('textured-quiff','Textured Quiff','Quiff',14,{topLength:'3–5 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Fade / Taper',texture:'Volume'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('messy-hair','Messy Hair','Textured',15,{topLength:'3–5 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Fade / Taper',texture:'Textured'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('curly-top-fade','Curly Top Fade','Curly',16,{topLength:'2–5 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Fade / Taper',texture:'Curly'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('wavy-medium','Wavy Medium','Wavy',17,{topLength:'4–7 in',sideLength:'Natural',backLength:'Natural',fadeType:'None / Taper',texture:'Wavy'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('long-wavy','Long Wavy','Long',18,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Very Low",hairType:['Straight','Wavy']}),
  style('wolf-cut','Wolf Cut','Long',19,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('mullet','Mullet','Long',20,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('shag-cut','Shag Cut','Long',21,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('curtain-bangs','Curtain Bangs','Long',22,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('bro-flow','Bro Flow','Long',23,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('man-bun','Man Bun','Long',24,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Very Low",hairType:['Straight','Wavy']}),
  style('top-knot','Top Knot','Long',25,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('half-up-half-down','Half Up Half Down','Long',26,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('cornrows','Cornrows','Braids',27,{topLength:'Medium–Long',sideLength:'Taper / natural',backLength:'Natural',fadeType:'None / Taper',texture:'Braided'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('braided-rows','Braided Rows','Braids',28,{topLength:'Medium–Long',sideLength:'Taper / natural',backLength:'Natural',fadeType:'None / Taper',texture:'Braided'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('afro','Afro','Curly',29,{topLength:'2–5 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Fade / Taper',texture:'Curly'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('temple-fade','Temple Fade','Fade',30,{topLength:'2–4 in',sideLength:'#0–#2',backLength:'#0–#2',fadeType:'Fade',texture:'Defined'},{maintenance:"Very Low",hairType:['Straight','Wavy']}),
  style('skin-fade','Skin Fade','Fade',31,{topLength:'2–4 in',sideLength:'#0–#2',backLength:'#0–#2',fadeType:'Fade',texture:'Defined'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('drop-fade','Drop Fade','Fade',32,{topLength:'2–4 in',sideLength:'#0–#2',backLength:'#0–#2',fadeType:'Fade',texture:'Defined'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('burst-fade','Burst Fade','Fade',33,{topLength:'2–4 in',sideLength:'#0–#2',backLength:'#0–#2',fadeType:'Fade',texture:'Defined'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('mohawk','Mohawk','Textured',34,{topLength:'3–5 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Fade / Taper',texture:'Textured'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('faux-hawk','Faux Hawk','Textured',35,{topLength:'3–5 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Fade / Taper',texture:'Textured'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('spiky-crop','Spiky Crop','Textured',36,{topLength:'3–5 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Fade / Taper',texture:'Textured'},{maintenance:"Very Low",hairType:['Straight','Wavy']}),
  style('flat-top','Flat Top','Classic',37,{topLength:'3–5 in',sideLength:'#2–#3',backLength:'#2–#3',fadeType:'Taper / None',texture:'Clean'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('bowl-cut','Bowl Cut','Classic',38,{topLength:'3–5 in',sideLength:'#2–#3',backLength:'#2–#3',fadeType:'Taper / None',texture:'Clean'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('pageboy','Pageboy','Classic',39,{topLength:'3–5 in',sideLength:'#2–#3',backLength:'#2–#3',fadeType:'Taper / None',texture:'Clean'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('modern-shag','Modern Shag','Long',40,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('taper-fade','Taper Fade','Fade',41,{topLength:'2–4 in',sideLength:'#0–#2',backLength:'#0–#2',fadeType:'Fade',texture:'Defined'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('brush-back','Brush Back','Classic',42,{topLength:'3–5 in',sideLength:'#2–#3',backLength:'#2–#3',fadeType:'Taper / None',texture:'Clean'},{maintenance:"Very Low",hairType:['Straight','Wavy']}),
  style('wet-look','Wet Look','Classic',43,{topLength:'3–5 in',sideLength:'#2–#3',backLength:'#2–#3',fadeType:'Taper / None',texture:'Clean'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('side-swept','Side Swept','Long',44,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('spiky-fade','Spiky Fade','Fade',45,{topLength:'2–4 in',sideLength:'#0–#2',backLength:'#0–#2',fadeType:'Fade',texture:'Defined'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('short-curly','Short Curly','Curly',46,{topLength:'2–5 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Fade / Taper',texture:'Curly'},{maintenance:"Medium",hairType:['Straight','Wavy']}),
  style('curly-crop','Curly Crop','Curly',47,{topLength:'2–5 in',sideLength:'#1–#3',backLength:'#1–#3',fadeType:'Fade / Taper',texture:'Curly'},{maintenance:"Low",hairType:['Straight','Wavy']}),
  style('disconnected-undercut','Disconnected Undercut','Undercut',48,{topLength:'3–5 in',sideLength:'#1–#2',backLength:'#1–#2',fadeType:'Disconnected',texture:'Bold'},{maintenance:"Very Low",hairType:['Straight','Wavy']}),
  style('samurai-bun','Samurai Bun','Long',49,{topLength:'5–8 in',sideLength:'Natural / tapered',backLength:'Natural / layered',fadeType:'None / Taper',texture:'Layered'},{maintenance:"Low",hairType:['Straight','Wavy']})
];

export { hairstyles };
export const categories=['All',...new Set(hairstyles.map(h=>h.category))];
export const hairTypes=['Straight','Wavy','Curly','Coily','Thick'];
export const fadeTypes=['Low Fade','Mid Fade','High Fade','Skin Fade','Taper','Disconnected','Drop Fade','Burst Fade','Temple Fade','None'];
export const maintenanceLevels=['Very Low','Low','Medium','High'];
export const lengthOptions=['Short','Medium','Long'];
export const sortOptions=['Popular','A–Z','Z–A','Low Maintenance','High Maintenance'];
export const getHairstyleById=(id)=>hairstyles.find(h=>h.id===id);
export const getFeaturedHairstyles=()=>hairstyles.filter(h=>h.featured);
export const getPopularHairstyles=()=>hairstyles.filter(h=>h.popular);
