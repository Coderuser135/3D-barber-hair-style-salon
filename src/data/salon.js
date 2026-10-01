// Verified business details captured from the provided Google Business Profile screenshots.
// Keep this file as the single source of truth for salon contact information.
export const salon = {
  name: 'AG Luxurious Unisex Salon & Academy',
  hindiName: 'आग लजरीयस यूनिसेक्स सैलून & एकेडमी',
  category: 'Make-up artist',
  tagline: 'Salon, Styling & Beauty Academy',
  description:
    'AG Luxurious Unisex Salon & Academy is a unisex salon and beauty academy in Purnea, Bihar. Explore hairstyle references and contact the salon for appointments and current service pricing.',
  address: 'Front Gali of Aetiana, Bus Stand, Chitrawani Rd, Sarvodaya Nagar, Purnia, Bihar 854301',
  phone: '062028 15275',
  phoneRaw: '06202815275',
  whatsapp: '916202815275',
  email: null,
  googleRating: 5.0,
  googleReviewCount: 43,
  hoursSummary: 'Open · Closes 9 PM',
  socials: {
    instagram: 'https://instagram.com',
  },
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=AG%20Luxurious%20Unisex%20Salon%20%26%20Academy%2C%20Front%20Gali%20of%20Aetiana%2C%20Bus%20Stand%2C%20Chitrawani%20Rd%2C%20Sarvodaya%20Nagar%2C%20Purnia%2C%20Bihar%20854301',
  stats: [
    { label: 'Google Rating', value: '5.0★' },
    { label: 'Google Reviews', value: '43' },
    { label: 'Category', value: 'Make-up Artist' },
    { label: 'Closing Time', value: '9 PM' },
  ],
};

export const whatsappLink = (message = '') => `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(message)}`;

export const bookingWhatsAppLink = ({ service, hairstyle, date, time, name, phone, notes }) => {
  const message = [
    'Hello AG Luxurious Unisex Salon & Academy,',
    '',
    'I would like to enquire about an appointment:',
    `Service: ${service || 'Not selected'}`,
    `Hairstyle: ${hairstyle || 'Not selected'}`,
    `Preferred date: ${date || 'Not selected'}`,
    `Preferred time: ${time || 'Not selected'}`,
    `Name: ${name || 'Not provided'}`,
    `Customer phone: ${phone || 'Not provided'}`,
    notes ? `Notes: ${notes}` : '',
    '',
    'Please confirm availability and current price.',
  ].filter(Boolean).join('\\n');
  return whatsappLink(message);
};
