import { useParams, Link, useNavigate } from 'react-router-dom';
import activitiesData from '../data/activitiesData';
import { 
  ChevronLeft, 
  Clock, 
  DollarSign, 
  Check,
  Calendar,
  Users
} from 'lucide-react';

const ActivityDetailPage = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  
  const activity = activitiesData.find(activity => activity.slug === activityId);
  
  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Activity not found</h2>
        <p className="mb-6">We couldn't find the activity you're looking for.</p>
        <Link to="/activities" className="btn btn-primary">
          Back to Activities
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${activity.images[0]})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="container mx-auto px-4">
            <button 
              onClick={() => navigate('/activities')} 
              className="flex items-center bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-full transition-all mb-6 w-fit"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to Activities
            </button>
            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-2">
              {activity.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center">
                <Clock size={20} className="mr-2 text-gold" />
                {activity.duration}
              </div>
              <div className="flex items-center">
                <DollarSign size={20} className="mr-2 text-gold" />
                {activity.price} per person
              </div>
              <div className="inline-block bg-gold text-white text-sm px-3 py-1 rounded-full">
                {activity.category}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Activity Details */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About This Experience</h2>
              <p className="text-gray-600 leading-relaxed">
                {activity.longDescription}
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activity.included.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={18} className="text-gold mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activity.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden h-48">
                    <img 
                      src={image} 
                      alt={`${activity.name} image ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Please arrive 15 minutes before the scheduled time</li>
                <li>Comfortable clothing and shoes recommended</li>
                <li>Cancellation policy: Full refund if cancelled 24 hours in advance</li>
                <li>Private sessions available upon request</li>
                <li>Hotel pickup and drop-off can be arranged for an additional fee</li>
              </ul>
            </div>
          </div>
          
          {/* Right Column: Booking Form */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Book This Experience</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="date"
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Participants
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                    <select className="input pl-10">
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>${activity.price} x 1 person</span>
                    <span>${activity.price}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>${activity.price}</span>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="btn btn-primary w-full mt-4"
                >
                  Book Now
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  You won't be charged yet
                </p>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium mb-2">Need help?</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Contact our concierge for assistance with booking or custom arrangements.
                </p>
                <a href="tel:+66123456789" className="text-gold hover:underline">
                  +66 2 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;