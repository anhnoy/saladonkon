import { useState } from 'react';
import QuickStats from '../../components/shared/QuickStats';
import ActivityFeed from '../../components/shared/ActivityFeed';
import { Calendar, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { useReviewsStore } from '../../store/reviewsStore';
import { useGlobalStore } from '../../store/globalStore';

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState('week');
  const { bookings } = useBookingStore();
  const { reviews } = useReviewsStore();
  const { activityLog } = useGlobalStore();

  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const pendingReviews = reviews.filter(r => r.status === 'pending');
  const upcomingCheckIns = bookings.filter(b => {
    const checkIn = new Date(b.checkIn || '');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return checkIn >= today && checkIn <= tomorrow && b.status === 'confirmed';
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Alerts */}
      {(pendingReviews.length > 0 || upcomingCheckIns.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {pendingReviews.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="text-yellow-600 mr-3\" size={20} />
                <div>
                  <h3 className="font-medium text-yellow-800">Pending Reviews</h3>
                  <p className="text-yellow-700 text-sm">
                    {pendingReviews.length} review{pendingReviews.length !== 1 ? 's' : ''} awaiting moderation
                  </p>
                </div>
              </div>
            </div>
          )}

          {upcomingCheckIns.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="text-blue-600 mr-3" size={20} />
                <div>
                  <h3 className="font-medium text-blue-800">Upcoming Check-ins</h3>
                  <p className="text-blue-700 text-sm">
                    {upcomingCheckIns.length} guest{upcomingCheckIns.length !== 1 ? 's' : ''} checking in today/tomorrow
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg p-6 shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{booking.userId}</p>
                  <p className="text-sm text-gray-500">
                    {booking.type === 'room' ? 'Room Booking' : 'Activity Booking'} - {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${booking.totalAmount}</p>
                  <p className="text-sm text-gray-500">
                    {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'Activity'}
                  </p>
                </div>
              </div>
            ))}
            {recentBookings.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No recent bookings</p>
              </div>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <ActivityFeed />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg p-6 shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Booking Trends</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Booking trends chart would go here</p>
              <p className="text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-soft">
          <h2 className="text-xl font-semibold mb-4">Guest Demographics</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Users size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Guest demographics chart would go here</p>
              <p className="text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;