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
  ChevronLeft, 
  ChevronRight,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Booking {
  id: string;
  bookingCode: string;
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
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: 'card' | 'bank' | 'hotel';
  refundRequest?: {
    id: string;
    amount: number;
    reason: string;
    requestDate: string;
    status: 'pending' | 'approved' | 'rejected';
  };
  canCancel: boolean;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    bookingCode: 'SLK2024001',
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
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    canCancel: true
  },
  {
    id: '2',
    bookingCode: 'SLK2024002',
    guest: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 891'
    },
    room: {
      number: '201',
      type: 'French Heritage Villa'
    },
    dates: {
      checkIn: '2024-03-20',
      checkOut: '2024-03-25',
      bookingDate: '2024-03-02'
    },
    guests: {
      adults: 3,
      children: 2,
      childrenAges: [7, 4]
    },
    pricing: {
      basePrice: 1200,
      extraAdultsCharge: 50,
      extraChildrenCharge: 30,
      serviceFee: 25,
      total: 1305
    },
    specialRequests: 'Need airport pickup service.',
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'card',
    refundRequest: {
      id: 'REF001',
      amount: 1305,
      reason: 'Family emergency',
      requestDate: '2024-03-10',
      status: 'approved'
    },
    canCancel: false
  },
  {
    id: '3',
    bookingCode: 'SLK2024003',
    guest: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234 567 892'
    },
    room: {
      number: '102',
      type: 'Ban Din Deluxe'
    },
    dates: {
      checkIn: '2024-03-25',
      checkOut: '2024-03-28',
      bookingDate: '2024-03-05'
    },
    guests: {
      adults: 2,
      children: 0,
      childrenAges: []
    },
    pricing: {
      basePrice: 600,
      extraAdultsCharge: 0,
      extraChildrenCharge: 0,
      serviceFee: 25,
      total: 625
    },
    status: 'cancelled',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    refundRequest: {
      id: 'REF002',
      amount: 625,
      reason: 'Change of travel plans',
      requestDate: '2024-03-12',
      status: 'pending'
    },
    canCancel: false
  }
];

const BookingManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<Booking['refundRequest'] | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [bookings, setBookings] = useState(mockBookings);

  const [filters, setFilters] = useState({
    dateRange: 'all',
    roomType: 'all',
    guestCount: 'all'
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guest.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const pendingRefunds = bookings.filter(booking => 
    booking.refundRequest && booking.refundRequest.status === 'pending'
  );

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const handleCancelBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancelBooking = () => {
    if (selectedBooking) {
      setBookings(prev => prev.map(booking => 
        booking.id === selectedBooking.id 
          ? { 
              ...booking, 
              status: 'cancelled' as const,
              refundRequest: booking.paymentStatus === 'paid' ? {
                id: `REF${Date.now()}`,
                amount: booking.pricing.total,
                reason: cancelReason || 'Cancelled by admin',
                requestDate: new Date().toISOString(),
                status: 'pending' as const
              } : undefined
            }
          : booking
      ));
      setShowCancelModal(false);
      setSelectedBooking(null);
      setCancelReason('');
    }
  };

  const handleRefundAction = (refund: Booking['refundRequest'], action: 'approve' | 'reject') => {
    if (refund) {
      setBookings(prev => prev.map(booking => 
        booking.refundRequest?.id === refund.id
          ? {
              ...booking,
              paymentStatus: action === 'approve' ? 'refunded' as const : booking.paymentStatus,
              refundRequest: {
                ...booking.refundRequest!,
                status: action === 'approve' ? 'approved' as const : 'rejected' as const
              }
            }
          : booking
      ));
      setShowRefundModal(false);
      setSelectedRefund(null);
    }
  };

  const exportBookings = () => {
    const csvContent = [
      ['Booking Code', 'Guest Name', 'Phone', 'Room', 'Check-in', 'Check-out', 'Status', 'Payment Status', 'Total'],
      ...filteredBookings.map(booking => [
        booking.bookingCode,
        booking.guest.name,
        booking.guest.phone,
        `${booking.room.type} - ${booking.room.number}`,
        booking.dates.checkIn,
        booking.dates.checkOut,
        booking.status,
        booking.paymentStatus,
        `$${booking.pricing.total}`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Booking Management</h1>
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
            Filters
          </button>
        </div>
      </div>

      {/* Pending Refunds Alert */}
      {pendingRefunds.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="text-yellow-600 mr-3" size={20} />
              <div>
                <h3 className="font-medium text-yellow-800">Pending Refund Requests</h3>
                <p className="text-yellow-700 text-sm">
                  You have {pendingRefunds.length} refund request{pendingRefunds.length !== 1 ? 's' : ''} awaiting approval.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedRefund(pendingRefunds[0].refundRequest!);
                setShowRefundModal(true);
              }}
              className="btn btn-primary text-sm"
            >
              Review Refunds
            </button>
          </div>
        </div>
      )}

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Booking Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Status
              </label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Payments</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Type
              </label>
              <select
                value={filters.roomType}
                onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
                className="input"
              >
                <option value="all">All Types</option>
                <option value="Floating Studio">Floating Studio</option>
                <option value="French Heritage Villa">French Heritage Villa</option>
                <option value="Ban Din Deluxe">Ban Din Deluxe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                className="input"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Search and Main Filters */}
      <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, phone, booking code, or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Refresh
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-4 font-medium">Booking Code</th>
                <th className="text-left py-4 px-4 font-medium">Guest</th>
                <th className="text-left py-4 px-4 font-medium">Room</th>
                <th className="text-left py-4 px-4 font-medium">Check-in</th>
                <th className="text-left py-4 px-4 font-medium">Check-out</th>
                <th className="text-left py-4 px-4 font-medium">Total</th>
                <th className="text-left py-4 px-4 font-medium">Status</th>
                <th className="text-left py-4 px-4 font-medium">Payment</th>
                <th className="text-left py-4 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{booking.bookingCode}</p>
                      <p className="text-sm text-gray-500">{booking.dates.bookingDate}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{booking.guest.name}</p>
                      <p className="text-sm text-gray-500">{booking.guest.phone}</p>
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
                  <td className="py-4 px-4">
                    <span className="font-medium">${booking.pricing.total}</span>
                    {booking.refundRequest && (
                      <div className="text-xs text-blue-600 mt-1">
                        Refund: {booking.refundRequest.status}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                        <button 
                          onClick={() => handleCancelBooking(booking)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Cancel Booking"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                      {booking.refundRequest && booking.refundRequest.status === 'pending' && (
                        <button 
                          onClick={() => {
                            setSelectedRefund(booking.refundRequest!);
                            setShowRefundModal(true);
                          }}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                          title="Review Refund"
                        >
                          <DollarSign size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && !showCancelModal && (
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

                  <div>
                    <h3 className="text-lg font-medium mb-4">Guest Count</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Adults:</span>
                        <span className="font-medium">{selectedBooking.guests.adults}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 w-24">Children:</span>
                        <span className="font-medium">{selectedBooking.guests.children}</span>
                      </div>
                      {selectedBooking.guests.childrenAges.length > 0 && (
                        <div className="flex items-start">
                          <span className="text-gray-500 w-24">Ages:</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedBooking.guests.childrenAges.map((age, index) => (
                              <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                                {age} years
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
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
                        <span className="text-gray-500 mr-2">Booking Code:</span>
                        <span className="font-medium">{selectedBooking.bookingCode}</span>
                      </div>
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
                      <div className="flex items-center">
                        <Clock className="text-gray-400 mr-2" size={18} />
                        <span className="text-gray-500 mr-2">Booked on:</span>
                        <span className="font-medium">{selectedBooking.dates.bookingDate}</span>
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
                        {selectedBooking.pricing.extraAdultsCharge > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Extra Adults Charge:</span>
                            <span className="font-medium">+${selectedBooking.pricing.extraAdultsCharge}</span>
                          </div>
                        )}
                        {selectedBooking.pricing.extraChildrenCharge > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Extra Children Charge:</span>
                            <span className="font-medium">+${selectedBooking.pricing.extraChildrenCharge}</span>
                          </div>
                        )}
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

                  <div>
                    <h3 className="text-lg font-medium mb-4">Status & Payment</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Booking Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                          {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Payment Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                          {selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Payment Method:</span>
                        <span className="font-medium capitalize">{selectedBooking.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {selectedBooking.refundRequest && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Refund Information</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-blue-700">Refund Amount:</span>
                            <span className="font-medium text-blue-800">${selectedBooking.refundRequest.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Reason:</span>
                            <span className="text-blue-800">{selectedBooking.refundRequest.reason}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Request Date:</span>
                            <span className="text-blue-800">{selectedBooking.refundRequest.requestDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              selectedBooking.refundRequest.status === 'approved' ? 'bg-green-100 text-green-800' :
                              selectedBooking.refundRequest.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {selectedBooking.refundRequest.status.charAt(0).toUpperCase() + selectedBooking.refundRequest.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 mt-8">
                    {selectedBooking.status !== 'cancelled' && selectedBooking.status !== 'completed' && (
                      <button 
                        onClick={() => handleCancelBooking(selectedBooking)}
                        className="btn bg-red-600 hover:bg-red-700 text-white flex-1"
                      >
                        Cancel Booking
                      </button>
                    )}
                    <button 
                      onClick={() => window.print()}
                      className="btn btn-outline flex-1"
                    >
                      Print Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Cancel Booking</h3>
                <button 
                  onClick={() => setShowCancelModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Are you sure you want to cancel booking <strong>{selectedBooking.bookingCode}</strong>?
                </p>
                
                {selectedBooking.paymentStatus === 'paid' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-blue-800 mb-2">Refund Information</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• A refund request will be created automatically</li>
                      <li>• Refund amount: ${selectedBooking.pricing.total}</li>
                      <li>• You can approve/reject the refund separately</li>
                    </ul>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Cancellation
                  </label>
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="input"
                    rows={3}
                    placeholder="Enter reason for cancellation..."
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="btn btn-outline flex-1"
                >
                  Keep Booking
                </button>
                <button
                  onClick={confirmCancelBooking}
                  className="btn bg-red-600 hover:bg-red-700 text-white flex-1"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Review Modal */}
      {showRefundModal && selectedRefund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Review Refund Request</h3>
                <button 
                  onClick={() => setShowRefundModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Refund ID:</span>
                      <span className="font-medium">{selectedRefund.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">${selectedRefund.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reason:</span>
                      <span className="font-medium">{selectedRefund.reason}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Request Date:</span>
                      <span className="font-medium">{new Date(selectedRefund.requestDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Review Required</h4>
                  <p className="text-yellow-700 text-sm">
                    Please review this refund request and choose to approve or reject it.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleRefundAction(selectedRefund, 'reject')}
                  className="btn bg-red-600 hover:bg-red-700 text-white flex-1"
                >
                  <XCircle size={18} className="mr-2" />
                  Reject
                </button>
                <button
                  onClick={() => handleRefundAction(selectedRefund, 'approve')}
                  className="btn bg-green-600 hover:bg-green-700 text-white flex-1"
                >
                  <CheckCircle size={18} className="mr-2" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagementPage;