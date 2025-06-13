import { Activity } from '../types/activity';

const activitiesData: Activity[] = [
  // Food Category
  {
    id: '1',
    name: 'Traditional Thai Cooking Class',
    description: 'Learn authentic Thai cuisine from our master chefs in a hands-on cooking experience.',
    categoryId: 'food',
    images: [
      'https://images.pexels.com/photos/5907619/pexels-photo-5907619.jpeg',
      'https://images.pexels.com/photos/5907626/pexels-photo-5907626.jpeg'
    ],
    pricing: {
      format: 'tiered',
      tiers: [
        { min: 1, max: 2, price: 80 },
        { min: 3, max: 4, price: 70 },
        { min: 5, max: 8, price: 60 }
      ]
    },
    schedule: {
      type: 'weekly',
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['10:00', '14:00']
    },
    capacity: {
      min: 1,
      max: 8
    },
    duration: '3 hours',
    included: ['Ingredients', 'Recipe booklet', 'Cooking equipment', 'Lunch'],
    requirements: ['No experience needed', 'Inform of allergies in advance'],
    contactOptions: {
      booking: true,
      info: true,
      email: 'cooking@hotel.com'
    },
    status: 'active'
  },
  {
    id: '2',
    name: 'Wine & Dine Experience',
    description: 'Five-course gourmet dinner with wine pairing by our sommelier.',
    categoryId: 'food',
    images: [
      'https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg',
      'https://images.pexels.com/photos/2284169/pexels-photo-2284169.jpeg'
    ],
    pricing: {
      format: 'fixed',
      amount: 120
    },
    schedule: {
      type: 'weekly',
      days: ['Thursday', 'Saturday'],
      timeSlots: ['19:00']
    },
    capacity: {
      min: 2,
      max: 12
    },
    duration: '2.5 hours',
    included: ['5-course dinner', 'Wine pairing', 'Coffee/Tea'],
    notes: 'Smart casual dress code required',
    contactOptions: {
      booking: true,
      info: true,
      phone: '+1234567890'
    },
    status: 'active'
  },

  // Tour Category
  {
    id: '3',
    name: 'Historical City Walking Tour',
    description: 'Explore the rich history and culture of the city with our expert guide.',
    categoryId: 'tour',
    images: [
      'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg',
      'https://images.pexels.com/photos/175773/pexels-photo-175773.jpeg'
    ],
    pricing: {
      format: 'hourly',
      hourlyRates: [
        { hours: 2, price: 30 },
        { hours: 4, price: 50 }
      ]
    },
    schedule: {
      type: 'flexible',
      timeSlots: ['09:00', '14:00']
    },
    capacity: {
      min: 2,
      max: 15
    },
    duration: '2-4 hours',
    included: ['Professional guide', 'Water', 'Map'],
    requirements: ['Comfortable walking shoes', 'Sun protection'],
    contactOptions: {
      booking: true,
      info: true
    },
    status: 'active'
  },
  {
    id: '4',
    name: 'Night Market Food Tour',
    description: 'Sample local delicacies and experience the vibrant night market scene.',
    categoryId: 'tour',
    images: [
      'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',
      'https://images.pexels.com/photos/2087871/pexels-photo-2087871.jpeg'
    ],
    pricing: {
      format: 'fixed',
      amount: 45
    },
    schedule: {
      type: 'weekly',
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      timeSlots: ['18:00']
    },
    capacity: {
      min: 2,
      max: 10
    },
    duration: '3 hours',
    included: ['Food tastings', 'Local guide', 'Transportation'],
    contactOptions: {
      booking: true,
      info: true
    },
    status: 'active'
  },

  // Relaxation Category
  {
    id: '5',
    name: 'Traditional Thai Massage',
    description: 'Experience authentic Thai massage techniques for complete relaxation.',
    categoryId: 'relaxation',
    images: [
      'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg',
      'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg'
    ],
    pricing: {
      format: 'hourly',
      hourlyRates: [
        { hours: 1, price: 60 },
        { hours: 1.5, price: 85 },
        { hours: 2, price: 110 }
      ]
    },
    schedule: {
      type: 'flexible',
      timeSlots: ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30']
    },
    capacity: {
      min: 1,
      max: 1
    },
    duration: '1-2 hours',
    included: ['Massage oil', 'Tea service'],
    requirements: ['Complete health questionnaire'],
    contactOptions: {
      booking: true,
      info: true
    },
    status: 'active'
  },
  {
    id: '6',
    name: 'Yoga by the Pool',
    description: 'Start your day with a rejuvenating yoga session led by experienced instructors.',
    categoryId: 'relaxation',
    images: [
      'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg',
      'https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg'
    ],
    pricing: {
      format: 'fixed',
      amount: 25
    },
    schedule: {
      type: 'weekly',
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['07:00', '17:00']
    },
    capacity: {
      min: 1,
      max: 12
    },
    duration: '1 hour',
    included: ['Yoga mat', 'Towel', 'Water'],
    requirements: ['Comfortable clothing'],
    contactOptions: {
      booking: true,
      info: true
    },
    status: 'active'
  },

  // Transportation Category
  {
    id: '7',
    name: 'Private Airport Transfer',
    description: 'Comfortable and reliable transfer service between airport and hotel.',
    categoryId: 'transportation',
    images: [
      'https://images.pexels.com/photos/2394/lights-clouds-dark-airport.jpg',
      'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg'
    ],
    pricing: {
      format: 'fixed',
      amount: 50
    },
    schedule: {
      type: 'flexible'
    },
    capacity: {
      min: 1,
      max: 4
    },
    duration: '45 minutes',
    included: ['Professional driver', 'Bottled water', 'Meet & greet service'],
    contactOptions: {
      booking: true,
      info: true,
      phone: '+1234567890'
    },
    status: 'active'
  },
  {
    id: '8',
    name: 'Island Hopping Boat Tour',
    description: 'Visit multiple islands in comfort with our private boat service.',
    categoryId: 'transportation',
    images: [
      'https://images.pexels.com/photos/1223649/pexels-photo-1223649.jpeg',
      'https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg'
    ],
    pricing: {
      format: 'daily',
      dailyRates: [
        { days: 1, price: 200 },
        { days: 2, price: 350 },
        { days: 3, price: 500 }
      ]
    },
    schedule: {
      type: 'specific',
      specificDates: ['2024-04-01', '2024-04-15', '2024-05-01']
    },
    capacity: {
      min: 4,
      max: 12
    },
    duration: '8 hours',
    included: ['Boat rental', 'Captain & crew', 'Snacks & drinks', 'Snorkeling gear'],
    requirements: ['Swimming ability', 'Sun protection'],
    contactOptions: {
      booking: true,
      info: true
    },
    status: 'active'
  },

  // Photography Category
  {
    id: '9',
    name: 'Professional Photo Session',
    description: 'Capture your vacation memories with our professional photographer.',
    categoryId: 'photography',
    images: [
      'https://images.pexels.com/photos/1854897/pexels-photo-1854897.jpeg',
      'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg'
    ],
    pricing: {
      format: 'hourly',
      hourlyRates: [
        { hours: 1, price: 150 },
        { hours: 2, price: 250 },
        { hours: 3, price: 350 }
      ]
    },
    schedule: {
      type: 'flexible',
      timeSlots: ['08:00', '16:00']
    },
    capacity: {
      min: 1,
      max: 6
    },
    duration: '1-3 hours',
    included: ['Professional photographer', 'Digital photos', 'Basic editing'],
    notes: 'Additional editing services available',
    contactOptions: {
      booking: true,
      info: true,
      email: 'photo@hotel.com'
    },
    status: 'active'
  },
  {
    id: '10',
    name: 'Sunset Photography Workshop',
    description: 'Learn photography techniques while capturing stunning sunset scenes.',
    categoryId: 'photography',
    images: [
      'https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg',
      'https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg'
    ],
    pricing: {
      format: 'fixed',
      amount: 75
    },
    schedule: {
      type: 'weekly',
      days: ['Tuesday', 'Thursday', 'Saturday'],
      timeSlots: ['16:00']
    },
    capacity: {
      min: 2,
      max: 8
    },
    duration: '3 hours',
    included: ['Photography instruction', 'Location guide', 'Refreshments'],
    requirements: ['Own camera', 'Basic camera knowledge'],
    contactOptions: {
      booking: true,
      info: true
    },
    status: 'active'
  },

  // Special Activities Category
  {
    id: '11',
    name: 'Private Beach Dinner',
    description: 'Romantic dinner setup on the beach with personal chef and butler.',
    categoryId: 'special',
    images: [
      'https://images.pexels.com/photos/169191/pexels-photo-169191.jpeg',
      'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg'
    ],
    pricing: {
      format: 'fixed',
      amount: 300
    },
    schedule: {
      type: 'flexible',
      timeSlots: ['18:30', '19:00', '19:30']
    },
    capacity: {
      min: 2,
      max: 2
    },
    duration: '2.5 hours',
    included: ['4-course dinner', 'Wine pairing', 'Personal butler', 'Romantic setup'],
    notes: 'Weather dependent activity',
    contactOptions: {
      booking: true,
      info: true,
      phone: '+1234567890'
    },
    status: 'active'
  },
  {
    id: '12',
    name: 'Helicopter Island Tour',
    description: 'Breathtaking aerial tour of the islands and coastline.',
    categoryId: 'special',
    images: [
      'https://images.pexels.com/photos/2404046/pexels-photo-2404046.jpeg',
      'https://images.pexels.com/photos/2889685/pexels-photo-2889685.jpeg'
    ],
    pricing: {
      format: 'fixed',
      amount: 500
    },
    schedule: {
      type: 'specific',
      specificDates: ['2024-04-01', '2024-04-15', '2024-05-01']
    },
    capacity: {
      min: 2,
      max: 4
    },
    duration: '1 hour',
    included: ['Helicopter tour', 'Safety briefing', 'Champagne service'],
    requirements: ['Weight restrictions apply', 'Weather dependent'],
    contactOptions: {
      booking: true,
      info: true
    },
    status: 'active'
  }
];

export default activitiesData;