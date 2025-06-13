import { useState } from 'react';
import { Search, ExternalLink, Calendar, Star, DollarSign } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { useReviewsStore } from '../../store/reviewsStore';

interface CrossReferenceProps {
  type: 'room' | 'activity' | 'guest';
  id: string;
  title: string;
}

const CrossReference = ({ type, id, title }: CrossReferenceProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { bookings } = useBookingStore();
  const { reviews } = useReviewsStore();

  const getRelatedData = () => {
    switch (type) {
      case 'room':
        return {
          bookings: bookings.filter(b => b.itemId === id),
          reviews: reviews.filter(r => r.text.toLowerCase().includes(title.toLowerCase()))
        };
      case 'activity':
        return {
          bookings: bookings.filter(b => b.type === 'activity' && b.itemId === id),
          reviews: reviews.filter(r => r.text.toLowerCase().includes(title.toLowerCase()))
        };
      case 'guest':
        return {
          bookings: bookings.filter(b => b.userId === id),
          reviews: reviews.filter(r => r.name === title)
        };
      default:
        return { bookings: [], reviews: [] };
    }
  };

  const relatedData = getRelatedData();
  const totalBookings = relatedData.bookings.length;
  const totalRevenue = relatedData.bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const averageRating = relatedData.reviews.length > 0 
    ? relatedData.reviews.reduce((sum, r) => sum + r.rating, 0) / relatedData.reviews.length 
    : 0;

  if (totalBookings === 0 && relatedData.reviews.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <h4 className="font-medium text-gray-900">Related Information</h4>
        <ExternalLink size={16} className="text-gray-500" />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Calendar size={16} className="text-blue-500 mr-1" />
                <span className="text-sm text-gray-600">Bookings</span>
              </div>
              <p className="font-semibold">{totalBookings}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <DollarSign size={16} className="text-green-500 mr-1" />
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <p className="font-semibold">${totalRevenue}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Star size={16} className="text-yellow-500 mr-1" />
                <span className="text-sm text-gray-600">Rating</span>
              </div>
              <p className="font-semibold">{averageRating.toFixed(1)}</p>
            </div>
          </div>

          {/* Recent Bookings */}
          {relatedData.bookings.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Recent Bookings</h5>
              <div className="space-y-2">
                {relatedData.bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {booking.checkIn} - {booking.checkOut}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Reviews */}
          {relatedData.reviews.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Recent Reviews</h5>
              <div className="space-y-2">
                {relatedData.reviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="text-sm">
                    <div className="flex items-center mb-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">{review.name}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CrossReference;