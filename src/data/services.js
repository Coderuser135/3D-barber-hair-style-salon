// Service categories for the salon website.
// Prices and durations are intentionally omitted until the salon provides an official menu.
export const services = [
  {
    id: 'hair-styling',
    name: 'Hair Styling & Cuts',
    description: 'Choose a hairstyle from the salon catalogue and contact the salon to confirm the current service and price.',
    category: 'Hair',
    includes: ['Hairstyle consultation', 'Cut or styling as applicable'],
    icon: 'Scissors',
  },
  {
    id: 'makeup',
    name: 'Make-up',
    description: 'Make-up services are represented by the Google Business category shown in the provided listing.',
    category: 'Beauty',
    includes: ['Consultation', 'Make-up service'],
    icon: 'Sparkles',
  },
  {
    id: 'unisex-grooming',
    name: 'Unisex Salon Services',
    description: 'Salon services for clients looking for a unisex grooming and styling experience.',
    category: 'Salon',
    includes: ['Service consultation', 'Styling as applicable'],
    icon: 'Scissors',
  },
  {
    id: 'academy',
    name: 'Academy',
    description: 'The business name includes “Academy”. Contact the salon for current courses, batches, fees and availability.',
    category: 'Academy',
    includes: ['Course enquiry', 'Batch enquiry'],
    icon: 'Sparkles',
  },
];

export const serviceCategories = ['Hair', 'Beauty', 'Salon', 'Academy'];

export const getServiceById = (id) => services.find((s) => s.id === id);
