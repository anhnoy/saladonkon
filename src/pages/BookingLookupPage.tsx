import { useState } from 'react';
import { Search, Calendar, Phone, CreditCard, AlertCircle, CheckCircle, X, Clock, MapPin, Users } from 'lucide-react';

interface BookingDetails {
  id: string;
  bookingCode: string;
  guestName: string;
  phone: string;
  email: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: 'card' | 'bank' | 'hotel';
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  specialRequests?: string;
  canCancel: boolean;
  cancellationDeadline?: string;
}

// Mock booking data
const mockBooking: BookingDetails = {
  id: '1',
  bookingCode: 'SLK2024001',
  guestName: 'John Doe',
  phone: '+1234567890',
  email: 'john@example.com',
  roomType: 'Floating Studio',
  roomNumber: '101',
  checkIn: '2024-03-20',
  checkOut: '2024-03-23',
  guests: {
    adults: 2,
    children: 1
  },
  totalAmount: 850,
  paymentStatus: 'paid',
  paymentMethod: 'card',
  status: 'confirmed',
  specialRequests: 'Late check-in requested',
  canCancel: true,
  cancellationDeadline: '2024-03-18T14:00:00Z'
};

const BookingLookupPage = () => {
  const [bookingCode, setBookingCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBooking(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (bookingCode === 'SLK2024001' && phoneNumber === '+1234567890') {
        setBooking(mockBooking);
      } else {
        setError('Booking not found. Please check your booking code and phone number.');
      }
    } catch (err) {
      setError('An error occurred while looking up your booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBooking(prev => prev ? { ...prev, status: 'cancelled' } : null);
      setShowCancelModal(false);
      setCancelSuccess(true);
    } catch (err) {
      setError('Failed to cancel booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
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

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const canCancelBooking = (booking: BookingDetails) => {
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return false;
    }
    
    if (!booking.cancellationDeadline) {
      return false;
    }
    
    const deadline = new Date(booking.cancellationDeadline);
    const now = new Date();
    return now < deadline;
  };

  return (
    <div className="min-h-screen bg-beige-light py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
               <div className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-red-500">Sorry, this service is not available.</div>
            <div className="text-3xl font-playfair font-bold mb-4">Find Your Booking</div>
            <p className="text-gray-600">
              Enter your booking code and phone number to view your reservation details
            </p>
          </div>

          {/* Success Message */}
          {cancelSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="text-green-600 mr-3" size={20} />
                <div>
                  <h3 className="font-medium text-green-800">Booking Cancelled Successfully</h3>
                  <p className="text-green-600 text-sm">
                    Your booking has been cancelled. If you paid by card, a refund will be processed within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Lookup Form */}
          <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
            <form onSubmit={handleLookup} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Booking Code
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={bookingCode}
                      onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
                      className="input pl-10"
                      placeholder="e.g., SLK2024001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="input pl-10"
                      placeholder="+1234567890"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? 'Searching...' : 'Find Booking'}
              </button>
            </form>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="text-red-600 mr-3" size={20} />
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Booking Details */}
          {booking && (
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="bg-navy text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Booking Details</h2>
                    <p className="text-gold">Booking Code: {booking.bookingCode}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Guest Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Guest Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <p className="font-medium">{booking.guestName}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <p className="font-medium">{booking.email}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <p className="font-medium">{booking.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Room Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Room Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-500">Room Type:</span>
                        <p className="font-medium">{booking.roomType}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Room Number:</span>
                        <p className="font-medium">{booking.roomNumber}</p>
                      </div>
                      <div className="flex items-center">
                        <Users className="text-gray-400 mr-2" size={16} />
                        <span>{booking.guests.adults} Adults, {booking.guests.children} Children</span>
                      </div>
                    </div>
                  </div>

                  {/* Stay Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Stay Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="text-gray-400 mr-2" size={16} />
                        <div>
                          <span className="text-gray-500">Check-in:</span>
                          <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="text-gray-400 mr-2" size={16} />
                        <div>
                          <span className="text-gray-500">Check-out:</span>
                          <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-gray-400 mr-2" size={16} />
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <p className="font-medium">{calculateNights(booking.checkIn, booking.checkOut)} nights</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-500">Total Amount:</span>
                        <p className="font-medium text-lg">${booking.totalAmount}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Method:</span>
                        <p className="font-medium capitalize">{booking.paymentMethod}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-2">Special Requests</h3>
                    <p className="text-gray-600">{booking.specialRequests}</p>
                  </div>
                )}

                {/* Cancellation Section */}
                {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Cancellation Policy</h3>
                    
                    {canCancelBooking(booking) ? (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start">
                          <Clock className="text-yellow-600 mr-3 mt-1" size={20} />
                          <div>
                            <h4 className="font-medium text-yellow-800">Cancellation Available</h4>
                            <p className="text-yellow-700 text-sm">
                              You can cancel this booking until {new Date(booking.cancellationDeadline!).toLocaleString()}.
                              Free cancellation with full refund.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start">
                          <AlertCircle className="text-red-600 mr-3 mt-1" size={20} />
                          <div>
                            <h4 className="font-medium text-red-800">Cancellation Not Available</h4>
                            <p className="text-red-700 text-sm">
                              The cancellation deadline has passed. Please contact the hotel directly for assistance.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {canCancelBooking(booking) && (
                      <button
                        onClick={() => setShowCancelModal(true)}
                        className="btn bg-red-600 hover:bg-red-700 text-white"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Cancel Booking Modal */}
          {showCancelModal && (
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
                      Are you sure you want to cancel your booking? This action cannot be undone.
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-blue-800 mb-2">Refund Information</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Full refund will be processed to your original payment method</li>
                        <li>• Refunds typically take 3-5 business days to appear</li>
                        <li>• You will receive a confirmation email</li>
                      </ul>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Cancellation (Optional)
                      </label>
                      <textarea
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        className="input"
                        rows={3}
                        placeholder="Please let us know why you're cancelling..."
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
                      onClick={handleCancelBooking}
                      disabled={loading}
                      className="btn bg-red-600 hover:bg-red-700 text-white flex-1"
                    >
                      {loading ? 'Cancelling...' : 'Cancel Booking'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingLookupPage;