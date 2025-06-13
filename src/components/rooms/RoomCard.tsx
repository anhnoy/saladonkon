import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Room } from '../../store/roomsStore';
import { Users, ArrowRight, Maximize, Star } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={room.images[0] || 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
          alt={room.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
        
        {room.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-gold text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Star size={14} className="mr-1" />
              Featured
            </span>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-semibold">{room.name}</h3>
          <p className="text-gold">Room {room.roomNumber}</p>
          <p className="text-gold">${room.price} <span className="text-sm text-gray-300">per night</span></p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">{room.description}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <Maximize size={16} className="mr-1" />
            {room.size} m²
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Users size={16} className="mr-1" />
            {room.capacity} Guests
          </div>
          <div className="text-sm text-gray-700">
            {room.beds}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index} 
              className="text-xs bg-beige px-2 py-1 rounded-full text-gray-700"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-xs bg-beige px-2 py-1 rounded-full text-gray-700">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/rooms/${room.slug}/${room.roomNumber}`}
            className="flex items-center text-gold hover:text-gold-dark font-medium transition-colors"
          >
            View Details
            <ArrowRight size={16} className="ml-1" />
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
  );
};

export default RoomCard;