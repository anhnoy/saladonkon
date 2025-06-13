import { TrendingUp, Users, DollarSign, Star, Calendar } from 'lucide-react';
import { useGlobalStore } from '../../store/globalStore';
import { useBookingStore } from '../../store/bookingStore';
import { useReviewsStore } from '../../store/reviewsStore';
import { useEffect } from 'react';

const QuickStats = () => {
  const { stats, updateStats } = useGlobalStore();
  const { bookings } = useBookingStore();
  const { reviews } = useReviewsStore();

  useEffect(() => {
    // Calculate real-time stats
    const totalBookings = bookings.length;
    const totalRevenue = bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.totalAmount, 0);
    
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const occupancyRate = totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0;
    
    const approvedReviews = reviews.filter(r => r.status === 'approved');
    const averageRating = approvedReviews.length > 0 
      ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length 
      : 0;

    const totalGuests = bookings.reduce((sum, b) => sum + b.guests, 0);

    updateStats({
      totalBookings,
      totalRevenue,
      occupancyRate,
      averageRating,
      totalGuests
    });
  }, [bookings, reviews, updateStats]);

  const statItems = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toString(),
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Occupancy Rate',
      value: `${stats.occupancyRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'bg-gold',
      change: '+5%'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: 'bg-purple-500',
      change: '+0.2'
    },
    {
      title: 'Total Guests',
      value: stats.totalGuests.toString(),
      icon: Users,
      color: 'bg-indigo-500',
      change: '+15%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {statItems.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="bg-white rounded-lg p-4 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <div className={`${stat.color} p-2 rounded-lg`}>
                <Icon className="text-white" size={20} />
              </div>
              <span className="text-green-500 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <p className="text-xl font-semibold">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;