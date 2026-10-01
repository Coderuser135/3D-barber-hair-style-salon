// Centralized salon information — easy to replace with real data
export const salon = {
  name: 'Blade & Bone',
  tagline: 'Your Style. Your Signature.',
  description:
    'A premium grooming studio where modern craft meets timeless tradition. Every cut is tailored, every detail intentional.',
  address: '124 Grooming Lane, Arts District, Metropolis',
  phone: '+1 (555) 010-2470',
  phoneRaw: '+15550102470',
  whatsapp: '15550102470',
  email: 'hello@bladeandbone.studio',
  hours: [
    { day: 'Monday', time: '9:00 AM – 7:00 PM' },
    { day: 'Tuesday', time: '9:00 AM – 7:00 PM' },
    { day: 'Wednesday', time: '9:00 AM – 7:00 PM' },
    { day: 'Thursday', time: '9:00 AM – 8:00 PM' },
    { day: 'Friday', time: '9:00 AM – 8:00 PM' },
    { day: 'Saturday', time: '8:00 AM – 6:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    tiktok: 'https://tiktok.com',
  },
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=-0.13%2C51.5%2C-0.1%2C51.52&layer=mapnik',
  founded: 2018,
  stats: [
    { label: 'Years of Craft', value: '7+' },
    { label: 'Happy Clients', value: '12K+' },
    { label: 'Master Barbers', value: '6' },
    { label: 'Avg. Rating', value: '4.9' },
  ],
};

export const whatsappLink = (message) =>
  `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(message || 'Hi, I would like to book a haircut appointment.')}`;
