import { useState } from 'react';
import { useRoomsStore } from '../store/roomsStore';
import RoomCard from '../components/rooms/RoomCard';
import { Search, Users, BedDouble } from 'lucide-react';

const RoomsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [capacity, setCapacity] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { getActiveRooms } = useRoomsStore();
  
  const rooms = getActiveRooms();
  
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCapacity = capacity === 'all' || room.capacity >= parseInt(capacity);
    const matchesType = typeFilter === 'all' || room.slug === typeFilter;
    
    return matchesSearch && matchesCapacity && matchesType;
  });

  const roomTypes = [...new Set(rooms.map(room => room.slug))];
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Our Accommodations</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Discover our range of luxury rooms and villas, each designed to provide an unforgettable experience.
            </p>
          </div>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="bg-beige py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Rooms
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by name or features"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Type
                </label>
                <div className="relative">
                  <BedDouble className="absolute left-3 top-3 text-gray-400" size={18} />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="input pl-10"
                  >
                    <option value="all">All Types</option>
                    {roomTypes.map(type => (
                      <option key={type} value={type}>
                        {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                  <select
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="input pl-10"
                  >
                    <option value="all">Any Size</option>
                    <option value="1">1+ Guests</option>
                    <option value="2">2+ Guests</option>
                    <option value="3">3+ Guests</option>
                    <option value="4">4+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCapacity('all');
                    setTypeFilter('all');
                  }}
                  className="btn btn-outline w-full"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rooms List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-playfair font-semibold">
              {filteredRooms.length} Accommodation{filteredRooms.length !== 1 ? 's' : ''} Found
            </h2>
          </div>
          
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BedDouble size={64} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                {rooms.length === 0 ? 'No rooms available' : 'No rooms match your search criteria'}
              </h3>
              <p className="text-gray-500 mb-6">
                {rooms.length === 0 
                  ? 'Rooms will appear here once they are added by the administrator.'
                  : 'Try adjusting your filters or search term'
                }
              </p>
              {rooms.length === 0 ? (
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="btn btn-primary"
                >
                  Contact Us
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCapacity('all');
                    setTypeFilter('all');
                  }}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RoomsPage;