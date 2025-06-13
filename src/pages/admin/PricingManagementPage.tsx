import { useState } from 'react';
import { Save, DollarSign, Users, Baby } from 'lucide-react';
import { usePricingStore } from '../../store/pricingStore';

const PricingManagementPage = () => {
  const pricing = usePricingStore();
  const [formData, setFormData] = useState({
    extraAdultPrice: pricing.extraAdultPrice,
    extraChildPrice: pricing.extraChildPrice,
    childFreeAge: pricing.childFreeAge,
    serviceFee: pricing.serviceFee,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pricing.updatePricing(formData);
    alert('Pricing settings updated successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Pricing Management</h1>
        <button 
          onClick={handleSubmit}
          className="btn btn-primary flex items-center"
        >
          <Save size={20} className="mr-2" />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-soft p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Extra Adult Price (per night)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="number"
                  value={formData.extraAdultPrice}
                  onChange={(e) => setFormData({ ...formData, extraAdultPrice: Number(e.target.value) })}
                  className="input pl-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Applied for each adult beyond the base occupancy (2 adults)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Extra Child Price (per night)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="number"
                  value={formData.extraChildPrice}
                  onChange={(e) => setFormData({ ...formData, extraChildPrice: Number(e.target.value) })}
                  className="input pl-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Applied for children above the free age limit
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Child Free Age Limit
              </label>
              <div className="relative">
                <Baby className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="number"
                  value={formData.childFreeAge}
                  onChange={(e) => setFormData({ ...formData, childFreeAge: Number(e.target.value) })}
                  className="input pl-10"
                  min="0"
                  max="17"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Children under this age stay free
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Fee
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="number"
                  value={formData.serviceFee}
                  onChange={(e) => setFormData({ ...formData, serviceFee: Number(e.target.value) })}
                  className="input pl-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Fixed service fee applied to all bookings
              </p>
            </div>
          </div>

          <div className="bg-beige-light p-6 rounded-lg mt-8">
            <h2 className="text-lg font-semibold mb-4">Pricing Examples</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-medium mb-2">Example 1: Family with Extra Adult</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Base room rate: $200/night</li>
                  <li>• 3 adults (1 extra): +${formData.extraAdultPrice}/night</li>
                  <li>• Service fee: ${formData.serviceFee}</li>
                  <li className="font-medium text-gray-800">
                    Total for 1 night: ${200 + formData.extraAdultPrice + formData.serviceFee}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-medium mb-2">Example 2: Family with Children</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Base room rate: $200/night</li>
                  <li>• 2 adults (included)</li>
                  <li>• 1 child age 4 (free)</li>
                  <li>• 1 child age 8 (extra): +${formData.extraChildPrice}/night</li>
                  <li>• Service fee: ${formData.serviceFee}</li>
                  <li className="font-medium text-gray-800">
                    Total for 1 night: ${200 + formData.extraChildPrice + formData.serviceFee}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricingManagementPage;