import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHomepageStore } from '../../store/homepageStore';
import { useRoomsStore } from '../../store/roomsStore';

const FeaturedRooms = () => {
  const { sections } = useHomepageStore();
  const { getFeaturedRooms } = useRoomsStore();
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  
  // Get featured rooms from the store, fallback to static data if none exist
  const featuredRooms = getFeaturedRooms();
  
  // If no featured rooms in store, show message
  if (featuredRooms.length === 0) {
    return (
      <section className="py-16 bg-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">{sections.rooms.title}</h2>
            <p className="section-subtitle mx-auto">
              {sections.rooms.subtitle}
            </p>
          </div>
          
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              No featured rooms available
            </h3>
            <p className="text-gray-500 mb-6">
              Featured rooms will appear here once they are added by the administrator.
            </p>
            <Link to="/rooms" className="btn btn-primary">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">{sections.rooms.title}</h2>
          <p className="section-subtitle mx-auto">
            {sections.rooms.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <div 
              key={room.id}
              className="card group overflow-hidden"
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.images[0] || 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                  alt={room.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredRoom === room.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <p className="text-sm text-gold">Room {room.roomNumber}</p>
                  <p className="text-gold">From ${room.price} per night</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{room.description}</p>
                
                <ul className="mb-4 grid grid-cols-2 gap-2">
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="mr-2">•</span> {room.size} m²
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="mr-2">•</span> {room.capacity} Guests
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="mr-2">•</span> {room.beds}
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="mr-2">•</span> {room.amenities[0] || 'Premium Amenities'}
                  </li>
                </ul>
                
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/rooms/${room.slug}/${room.roomNumber}`}
                    className="text-gold hover:text-gold-dark font-medium transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/rooms/${room.slug}/${room.roomNumber}`}
                    className="btn btn-outline text-sm px-4 py-2"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/rooms" className="btn btn-primary">
            View All Rooms
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;