import { useState } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useRoomsStore } from '../store/roomsStore';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Users, 
  Maximize, 
  BedDouble,
  Share2,
  Heart,
  Star
} from 'lucide-react';

type ContextType = {
  toggleBookingWidget: (room?: { roomNumber: string; name: string; price: number }) => void;
};

const RoomDetailPage = () => {
  const { roomId, roomNumber } = useParams<{ roomId: string; roomNumber: string }>();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { toggleBookingWidget } = useOutletContext<ContextType>();
  const { getActiveRooms } = useRoomsStore();
  
  const rooms = getActiveRooms();
  const room = rooms.find(room => room.slug === roomId && room.roomNumber === roomNumber);
  
  if (!room) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Room not found</h2>
        <p className="mb-6">We couldn't find the room you're looking for.</p>
        <Link to="/rooms" className="btn btn-primary">
          Back to Rooms
        </Link>
      </div>
    );
  }
  
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };
  
  const handleBookNow = () => {
    toggleBookingWidget({
      roomNumber: room.roomNumber,
      name: room.name,
      price: room.price
    });
  };
  
  return (
    <div>
      {/* Room Gallery */}
      <div className="relative w-full h-screen-70 bg-navy">
        <img 
          src={room.images[activeImageIndex] || 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
          alt={room.name} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-4 left-4">
          <button 
            onClick={() => navigate('/rooms')} 
            className="flex items-center bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-full transition-all"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Rooms
          </button>
        </div>
        
        <div className="absolute top-4 right-4 flex space-x-2">
          {room.featured && (
            <div className="bg-gold text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Star size={14} className="mr-1" />
              Featured
            </div>
          )}
          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all">
            <Heart size={20} />
          </button>
          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all">
            <Share2 size={20} />
          </button>
        </div>
        
        {/* Navigation Arrows */}
        {room.images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-opacity-100 transition-all"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-opacity-100 transition-all"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        {/* Thumbnail Indicators */}
        {room.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex justify-center space-x-2">
              {room.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeImageIndex ? 'bg-gold w-6' : 'bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Room Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Room Info */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2">{room.name}</h1>
            <p className="text-xl text-gold mb-4">Room {room.roomNumber}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <Maximize size={20} className="mr-2 text-gold" />
                {room.size} m²
              </div>
              <div className="flex items-center text-gray-700">
                <Users size={20} className="mr-2 text-gold" />
                Up to {room.capacity} guests
              </div>
              <div className="flex items-center text-gray-700">
                <BedDouble size={20} className="mr-2 text-gold" />
                {room.beds}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About This Room</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {room.longDescription || room.description}
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={18} className="text-gold mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Room Policy</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Check-in time is 2:00 PM</li>
                <li>Check-out time is 12:00 PM</li>
                <li>Early check-in and late check-out available upon request</li>
                <li>Non-smoking room</li>
                <li>Pets are not allowed</li>
              </ul>
            </div>
          </div>
          
          {/* Right Column: Booking Form */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-gray-800">${room.price}</span>
                <span className="text-gray-500">per night</span>
              </div>
              
              <button 
                onClick={handleBookNow}
                className="btn btn-primary w-full"
              >
                Book Now
              </button>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                You won't be charged yet
              </p>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between mb-2">
                  <span>${room.price} x 1 night</span>
                  <span>${room.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Service fee</span>
                  <span>$25</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>${room.price + 25}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;