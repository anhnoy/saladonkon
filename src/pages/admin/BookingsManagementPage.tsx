import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Calendar, 
  X, 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  DollarSign,
  Download,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import CrossReference from '../../components/shared/CrossReference';
import { useGlobalStore } from '../../store/globalStore';

interface Booking {
  id: string;
  guest: {
    name: string;
    email: string;
    phone: string;
  };
  room: {
    number: string;
    type: string;
  };
  dates: {
    checkIn: string;
    checkOut: string;
    bookingDate: string;
  };
  guests: {
    adults: number;
    children: number;
    childrenAges: number[];
  };
  pricing: {
    basePrice: number;
    extraAdultsCharge: number;
    extraChildrenCharge: number;
    serviceFee: number;
    total: number;
  };
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

const mockBookings: Booking[] = [
  {
    id: '1',
    guest: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890'
    },
    room: {
      number: '101',
      type: 'Floating Studio'
    },
    dates: {
      checkIn: '2024-03-15',
      checkOut: '2024-03-18',
      bookingDate: '2024-03-01'
    },
    guests: {
      adults: 2,
      children: 1,
      childrenAges: [5]
    },
    pricing: {
      basePrice: 750,
      extraAdultsCharge: 0,
      extraChildrenCharge: 0,
      serviceFee: 25,
      total: 775
    },
    specialRequests: 'Early check-in if possible. Need a baby crib.',
    status: 'confirmed'
  }
];

const BookingsManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { addActivity } = useGlobalStore();

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = 
      booking.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const exportBookings = () => {
    addActivity({
      type: 'booking',
      description: 'Bookings data exported'
    });
    // Export logic here
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Bookings Management</h1>
        <div className="flex gap-4">
          <button
            onClick={exportBookings}
            className="btn btn-outline flex items-center"
          >
            <Download size={20} className="mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="btn btn-primary flex items-center"
          >
            <Filter size={20} className="mr-2" />
            Advanced Filters
          </button>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select className="input">
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">Next 7 Days</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Type
              </label>
              <select className="input">
                <option value="all">All Types</option>
                <option value="Floating Studio">Floating Studio</option>
                <option value="French Heritage Villa">French Heritage Villa</option>
                <option value="Ban Din Deluxe">Ban Din Deluxe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guest Count
              </label>
              <select className="input">
                <option value="all">Any Size</option>
                <option value="1">1+ Guests</option>
                <option value="2">2+ Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select className="input">
                <option value="all">All Prices</option>
                <option value="under500">Under $500</option>
                <option value="500to1000">$500 - $1000</option>
                <option value="over1000">Over $1000</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">Guest</th>
                <th className="text-left py-4 px-4">Room</th>
                <th className="text-left py-4 px-4">Check-in</th>
                <th className="text-left py-4 px-4">Check-out</th>
                <th className="text-left py-4 px-4">Total</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{booking.guest.name}</p>
                      <p className="text-sm text-gray-500">{booking.guest.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{booking.room.type}</p>
                      <p className="text-sm text-gray-500">Room {booking.room.number}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">{booking.dates.checkIn}</td>
                  <td className="py-4 px-4">{booking.dates.checkOut}</td>
                  <td className="py-4 px-4">${booking.pricing.total}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={() => setSelectedBooking(booking)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal with Cross-Reference */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Booking Details</h2>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Guest Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Name:</span>
                        <span className="font-medium">{selectedBooking.guest.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="text-gray-400 mr-2" size={18} />
                        <span className="text-gray-500 mr-2">Email:</span>
                        <a href={`mailto:${selectedBooking.guest.email}`} className="text-blue-600 hover:underline">
                          {selectedBooking.guest.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="text-gray-400 mr-2" size={18} />
                        <span className="text-gray-500 mr-2">Phone:</span>
                        <a href={`tel:${selectedBooking.guest.phone}`} className="text-blue-600 hover:underline">
                          {selectedBooking.guest.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Room Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Room Type:</span>
                        <span className="font-medium">{selectedBooking.room.type}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Room Number:</span>
                        <span className="font-medium">{selectedBooking.room.number}</span>
                      </div>
                    </div>
                  </div>

                  {selectedBooking.specialRequests && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Special Requests</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <MessageSquare className="text-gray-400 mr-2 mt-1" size={18} />
                          <p className="text-gray-600">{selectedBooking.specialRequests}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Booking Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="text-gray-400 mr-2" size={18} />
                        <span className="text-gray-500 mr-2">Check-in:</span>
                        <span className="font-medium">{selectedBooking.dates.checkIn}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="text-gray-400 mr-2" size={18} />
                        <span className="text-gray-500 mr-2">Check-out:</span>
                        <span className="font-medium">{selectedBooking.dates.checkOut}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-gray-400 mr-2" size={18} />
                        <span className="text-gray-500 mr-2">Duration:</span>
                        <span className="font-medium">
                          {calculateNights(selectedBooking.dates.checkIn, selectedBooking.dates.checkOut)} nights
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Price Breakdown</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Price:</span>
                          <span className="font-medium">${selectedBooking.pricing.basePrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Fee:</span>
                          <span className="font-medium">${selectedBooking.pricing.serviceFee}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                          <span className="font-medium">Total Amount:</span>
                          <span className="font-bold text-lg">${selectedBooking.pricing.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cross-Reference Component */}
              <CrossReference 
                type="guest" 
                id={selectedBooking.guest.phone} 
                title={selectedBooking.guest.name} 
              />

              <div className="flex gap-4 mt-8">
                <button className="btn btn-outline flex-1">
                  Send Email
                </button>
                <button className="btn btn-primary flex-1">
                  Print Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManagementPage;