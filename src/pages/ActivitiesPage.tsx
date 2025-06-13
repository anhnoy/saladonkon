import { useState } from 'react';
import { Search, Tag, DollarSign, Clock, Users, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import activitiesData from '../data/activitiesData';
import ActivityCard from '../components/activities/ActivityCard';

const ActivitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'tour', name: 'Tours' },
    { id: 'relaxation', name: 'Relaxation' },
    { id: 'transportation', name: 'Transportation' },
    { id: 'photography', name: 'Photography' },
    { id: 'special', name: 'Special Activities' }
  ];

  const filteredActivities = activitiesData.filter(activity => {
    const matchesSearch = 
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || activity.categoryId === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === 'under50') {
      matchesPrice = activity.pricing.format === 'fixed' && activity.pricing.amount! < 50;
    } else if (priceRange === '50to100') {
      matchesPrice = activity.pricing.format === 'fixed' && 
                    activity.pricing.amount! >= 50 && activity.pricing.amount! <= 100;
    } else if (priceRange === 'over100') {
      matchesPrice = activity.pricing.format === 'fixed' && activity.pricing.amount! > 100;
    }

    let matchesDate = true;
    if (selectedDate) {
      const date = new Date(selectedDate);
      if (activity.schedule.type === 'specific') {
        matchesDate = activity.schedule.specificDates?.includes(selectedDate);
      } else if (activity.schedule.type === 'weekly') {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        matchesDate = activity.schedule.days?.includes(dayName);
      }
    }

    let matchesCapacity = true;
    if (selectedCapacity !== 'all') {
      const capacity = parseInt(selectedCapacity);
      matchesCapacity = capacity >= activity.capacity.min && capacity <= activity.capacity.max;
    }

    return matchesSearch && matchesCategory && matchesPrice && matchesDate && matchesCapacity;
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/5907619/pexels-photo-5907619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-red-500">Sorry, this service is not available.</h1>
           <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-white">Discover Our Experiences</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Immerse yourself in authentic experiences and create unforgettable memories.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-beige py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Activities
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by name or description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input pl-10"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input pl-10"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of People
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                  <select
                    value={selectedCapacity}
                    onChange={(e) => setSelectedCapacity(e.target.value)}
                    className="input pl-10"
                  >
                    <option value="all">Any Size</option>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="4">4 People</option>
                    <option value="6">6+ People</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="input pl-10"
                  >
                    <option value="all">All Prices</option>
                    <option value="under50">Under $50</option>
                    <option value="50to100">$50 - $100</option>
                    <option value="over100">Over $100</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-playfair font-semibold">
              {filteredActivities.length} Experiences Found
            </h2>
            <a href="/activities" className="btn btn-outline">
              Explore All Activities
            </a>
          </div>

          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ActivityCard activity={activity} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No activities match your search criteria
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search term
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;