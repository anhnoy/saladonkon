export interface RoomType {
  id: string;
  roomNumber: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  size: number;
  capacity: number;
  beds: string;
  amenities: string[];
  featured: boolean;
  images: string[];
}

// Helper function to generate room data
const generateRooms = () => {
  const roomTypes = [
    {
      name: 'Floating Studio',
      slug: 'floating-studio',
      description: 'Embark on an unforgettable adventure in our ultimate luxury of our FLOATING STUDIO or FLOATING BUNGALOW',
      longDescription: 'Our Floating Studio offers a unique experience with a bedroom that appears to float on water. Floor-to-ceiling windows provide panoramic views of the surrounding nature. The interior features handcrafted furniture with natural materials that harmonize with the environment. The bathroom includes a luxurious rain shower and a deep soaking tub positioned to enjoy the views. A private deck extends over the water for intimate dining or yoga sessions at sunrise.',
      price: 350,
      size: 45,
      capacity: 2,
      beds: '1 King Size',
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Coffee Machine', 'Air Conditioning', 'Private Deck', 'Water Views', 'Breakfast Included'],
      images: [
        'https://i.imgur.com/jGvTKfa.jpeg',
        'https://i.imgur.com/fRWl1xB.jpeg',
        'https://i.imgur.com/Wk61KFQ.jpeg',
        'https://i.imgur.com/AYxy8p1.jpeg'
      ]
    },
    {
      name: 'French Studio',
      slug: 'french-studio',
      description: 'Discover the perfect blend of history and modern comfort in our French-style cottages.',
      longDescription: 'Discover the perfect blend of history and modern comfort in our French-style cottages. Explore the surrounding countryside, relax by the pool, or host a barbecue on your private terrace. Our accommodations offer a unique and unforgettable experience, whether you\'re seeking a romantic getaway or a family vacation.',
      price: 280,
      size: 40,
      capacity: 2,
      beds: '1 King Size',
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Espresso Machine', 'Air Conditioning', 'Balcony', 'Bathrobe & Slippers', 'Breakfast Included'],
      images: [
        'https://i.imgur.com/PzJg4pj.jpeg',
        'https://i.imgur.com/w37QRj4.jpeg',
        'https://i.imgur.com/Of7GJtU.jpeg'
      ]
    },
    {
      name: 'French Heritage Villa',
      slug: 'french-heritage-villa',
      description: 'Step Back in Time Indulge in the elegance of a bygone era.',
      longDescription: 'Step Back in Time Indulge in the elegance of a bygone era. This 100+ year old villa, once home to French dignitaries, offers a luxurious retreat. Situated near the region\'s first railway station, port, and shipyard, it was a center of activity. Experience the charm of colonial living.',
      price: 520,
      size: 85,
      capacity: 4,
      beds: '1 King Size + 1 Sofa Bed',
      amenities: ['Free WiFi', 'Smart TV', 'Full Mini Bar', 'Kitchenette', 'Air Conditioning', 'Private Garden', 'Butler Service', 'Breakfast Included'],
      images: [
        'https://i.imgur.com/0kxSgxX.jpeg',
        'https://i.imgur.com/BlW3QZc.jpeg',
        'https://i.imgur.com/RN4N7WJ.jpeg',
        'https://i.imgur.com/99TvfPW.jpeg',
        'https://i.imgur.com/iemY6Ff.jpeg'
      ]
    },
    {
      name: 'Ban Din Deluxe',
      slug: 'ban-din-deluxe',
      description: 'Your home away from home. BAN DELUXE suites are designed for those who demand the best of both worlds.',
      longDescription: 'Your home away from home. BAN DELUXE suites are designed for those who demand the best of both worlds. With ample space for work and relaxation, our deluxe rooms feature a private workspace and a comfortable living area, separate from our Ban Din Studio.',
      price: 300,
      size: 50,
      capacity: 2,
      beds: '1 King Size',
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Coffee & Tea', 'Air Conditioning', 'Private Terrace', 'Outdoor Shower', 'Breakfast Included'],
      images: [
        'https://i.imgur.com/qSPELyK.jpeg',
        'https://i.imgur.com/84I5pUx.jpeg',
        'https://i.imgur.com/b14bPrN.jpeg'
      ]
    },
    {
      name: 'Ban Din Studio',
      slug: 'ban-din-studio',
      description: 'Escape to Nature\'s Embrace in Our Earthen Cottage. After the challenges of the COVID-19 pandemic, many people are seeking a more sustainable and natural way of living.',
      longDescription: 'Escape to Nature\'s Embrace in Our Earthen Cottage. After the challenges of the COVID-19 pandemic, many people are seeking a more sustainable and natural way of living. Our Earthen Cottage offers a unique and eco-friendly retreat, built entirely from clay and natural materials. Immerse yourself in a peaceful and serene atmosphere, reminiscent of a cozy countryside cottage. Enjoy the fresh air and stunning views from your private terrace and take a refreshing dip in your personal plunge pool.',
      price: 240,
      size: 38,
      capacity: 2,
      beds: '1 King Size',
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Tea Kettle', 'Air Conditioning', 'Private Courtyard', 'Rain Shower', 'Breakfast Included'],
      images: [
        'https://i.imgur.com/M4X4JNc.jpeg',
        'https://i.imgur.com/M5m1sqN.jpeg',
        'https://i.imgur.com/adPeM4F.jpeg',
        'https://i.imgur.com/M4X4JNc.jpeg'
      ]
    },
    {
      name: 'Ban Lao Classic',
      slug: 'ban-lao-classic',
      description: 'Classic rooms inspired by Laotian heritage, featuring handcrafted wooden furniture and serene garden views.',
      longDescription: 'Ban Lao Classic rooms celebrate the cultural heritage of Laos with contemporary comforts. The space features polished teak floors, traditional textiles, and artifacts that tell the story of Laotian craftsmanship. The room offers a plush king-size bed, a reading nook with handwoven cushions, and a writing desk. The bathroom includes a deep terrazzo bathtub and separate shower. French doors open to a private veranda overlooking tranquil gardens, creating a peaceful retreat for relaxation and contemplation.',
      price: 220,
      size: 35,
      capacity: 2,
      beds: '1 King Size',
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Coffee & Tea', 'Air Conditioning', 'Garden View', 'Bathtub', 'Breakfast Included'],
      images: [
        'https://i.imgur.com/9K6spGU.jpeg',
        'https://i.imgur.com/8QXAYXU.jpeg',
        'https://i.imgur.com/rdxF1l6.jpeg',
        'https://i.imgur.com/Wk61KFQ.jpeg'
      ]
    },
    {
      name: 'Restaurant',
      slug: 'restaurant',
      description: 'Experience a Million Dollar Sunset Every Day.',
      longDescription: 'Experience a Million Dollar Sunset Every Day. Indulge in breathtaking views as the sun dips below the horizon, painting the sky with vibrant hues. Watch local fishermen cast their nets in the mighty Mekong River, and immerse yourself in the timeless traditions of the Khone people. With every moment, create unforgettable memories that will last a lifetime. Your journey awaits.',
      price: 220,
      size: 35,
      capacity: 2,
      beds: '1 King Size',
      amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Coffee & Tea', 'Air Conditioning', 'Garden View', 'Bathtub', 'Breakfast Included'],
      images: [
        'https://i.imgur.com/qT696bE.jpeg'
      ]
    }
  ];

  let allRooms: RoomType[] = [];
  let id = 1;

  roomTypes.forEach((type, typeIndex) => {
    // Generate 6 rooms for each type
    for (let i = 0; i < 6; i++) {
      const floor = typeIndex + 1;
      const roomNumber = `${floor}${(i + 1).toString().padStart(2, '0')}`;
      
      allRooms.push({
        id: String(id++),
        roomNumber,
        ...type,
        // Only make the first room of each type featured
        featured: i === 0
      });
    }
  });

  return allRooms;
};

const roomsData: RoomType[] = generateRooms();

export default roomsData;