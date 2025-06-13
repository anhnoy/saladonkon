import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Activity, X, Check } from 'lucide-react';
import { Activity as ActivityType } from '../../types/activity';
import activitiesData from '../../data/activitiesData';
import CrossReference from '../../components/shared/CrossReference';
import { useGlobalStore } from '../../store/globalStore';

const ActivitiesManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { addActivity } = useGlobalStore();

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
    const matchesCategory = categoryFilter === 'all' || activity.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatPricing = (pricing: ActivityType['pricing']): string => {
    switch (pricing.format) {
      case 'fixed':
        return `$${pricing.amount}`;
      case 'hourly':
        return `From $${pricing.hourlyRates?.[0].price}/hour`;
      case 'daily':
        return `From $${pricing.dailyRates?.[0].price}/day`;
      case 'tiered':
        return `From $${pricing.tiers?.[0].price}/person`;
      default:
        return 'Contact for pricing';
    }
  };

  const handleViewDetails = (activity: ActivityType) => {
    setSelectedActivity(activity);
    setShowDetailsModal(true);
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      const activity = activitiesData.find(a => a.id === id);
      addActivity({
        type: 'activity_update',
        description: `Activity deleted: ${activity?.name}`
      });
    }
  };

  const handleToggleStatus = (id: string) => {
    const activity = activitiesData.find(a => a.id === id);
    addActivity({
      type: 'activity_update',
      description: `Activity status changed: ${activity?.name}`
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Activities Management</h1>
        <button className="btn btn-primary flex items-center">
          <Plus size={20} className="mr-2" />
          Add New Activity
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">Activity</th>
                <th className="text-left py-4 px-4">Category</th>
                <th className="text-left py-4 px-4">Duration</th>
                <th className="text-left py-4 px-4">Capacity</th>
                <th className="text-left py-4 px-4">Price</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Performance</th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-beige flex items-center justify-center mr-3">
                        <Activity className="text-gold" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-beige text-gray-800">
                      {activity.categoryId}
                    </span>
                  </td>
                  <td className="py-4 px-4">{activity.duration}</td>
                  <td className="py-4 px-4">{activity.capacity.min}-{activity.capacity.max} people</td>
                  <td className="py-4 px-4">{formatPricing(activity.pricing)}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleStatus(activity.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activity.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleViewDetails(activity)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Stats
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Details Modal with Cross-Reference */}
      {showDetailsModal && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{selectedActivity.name} - Performance</h2>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Activity Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{selectedActivity.categoryId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{selectedActivity.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{selectedActivity.capacity.min}-{selectedActivity.capacity.max} people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">{formatPricing(selectedActivity.pricing)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">What's Included</h3>
                  <div className="space-y-2">
                    {selectedActivity.included.slice(0, 6).map((item, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Check size={14} className="text-green-500 mr-2" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cross-Reference Component */}
              <CrossReference 
                type="activity" 
                id={selectedActivity.id} 
                title={selectedActivity.name} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesManagementPage;