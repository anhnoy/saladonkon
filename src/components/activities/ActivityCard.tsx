import { useState } from 'react';
import { Activity } from '../../types/activity';
import { Clock, DollarSign, Users, Calendar, ArrowRight, X, Check, CreditCard, Building2 } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState(activity.capacity.min);
  const [paymentMethod, setPaymentMethod] = useState<'hotel' | 'card'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCVV] = useState('');
  const [cardName, setCardName] = useState('');
  const [formErrors, setFormErrors] = useState<{
    card?: string;
    expiry?: string;
    cvv?: string;
    name?: string;
  }>({});

  const formatPricing = (pricing: Activity['pricing']): string => {
    switch (pricing.format) {
      case 'fixed': return `$${pricing.amount}`;
      case 'hourly': return `From $${pricing.hourlyRates?.[0].price}/hour`;
      case 'daily': return `From $${pricing.dailyRates?.[0].price}/day`;
      case 'tiered': return `From $${pricing.tiers?.[0].price}/person`;
      default: return 'Contact for pricing';
    }
  };

  const formatSchedule = (schedule: Activity['schedule']): string => {
    switch (schedule.type) {
      case 'specific': return 'Available on specific dates';
      case 'weekly': return `Available ${schedule.days?.join(', ')}`;
      case 'flexible': return 'Flexible scheduling';
      default: return 'Contact for availability';
    }
  };

  const calculateTotal = (): number => {
    if (!activity.pricing) return 0;
    let basePrice = 0;
    
    switch (activity.pricing.format) {
      case 'fixed':
        basePrice = activity.pricing.amount || 0;
        break;
      case 'hourly':
        const [hours] = selectedTime.split(':').map(Number);
        const hourlyRate = activity.pricing.hourlyRates?.find(rate => rate.hours === hours);
        basePrice = (hourlyRate?.price || 0);
        break;
      case 'daily':
        const days = 1;
        const dailyRate = activity.pricing.dailyRates?.find(rate => rate.days === days);
        basePrice = (dailyRate?.price || 0);
        break;
      case 'tiered':
        const tier = activity.pricing.tiers?.find(t => participants >= t.min && participants <= t.max);
        basePrice = (tier?.price || 0);
        break;
    }

    return activity.pricing.format === 'tiered' ? basePrice * participants : 
           activity.pricing.perPerson ? basePrice * participants : basePrice;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    if (paymentMethod === 'card') {
      const errors: typeof formErrors = {};
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) errors.card = 'Invalid card number';
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) errors.expiry = 'Invalid expiry date';
      if (!/^\d{3}$/.test(cardCVV)) errors.cvv = 'Invalid CVV';
      if (!cardName.trim()) errors.name = 'Name is required';
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
    }

    const bookingData = {
      activityId: activity.id,
      date: selectedDate,
      time: selectedTime,
      participants,
      paymentMethod,
      total: calculateTotal() + 5,
      ...(paymentMethod === 'card' && {
        payment: {
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiry: cardExpiry,
          cvv: cardCVV,
          name: cardName
        }
      })
    };

    console.log('Booking data:', bookingData);
    setShowBookingForm(false);
    alert('Booking confirmed successfully!');
  };

  return (
    <>
      <div className="card hover:shadow-lg transition-all h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={activity.images[0]} 
            alt={activity.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-gold text-white text-xs px-2 py-1 rounded">
            {activity.categoryId}
          </div>
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-xl font-semibold mb-2">{activity.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <Clock size={16} className="mr-2 text-gold" />
              {activity.duration}
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Users size={16} className="mr-2 text-gold" />
              {activity.capacity.min}-{activity.capacity.max} people
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Calendar size={16} className="mr-2 text-gold" />
              {formatSchedule(activity.schedule)}
            </div>
            <div className="flex items-center text-sm font-medium">
              <DollarSign size={16} className="mr-2 text-gold" />
              {formatPricing(activity.pricing)}
            </div>
          </div>
          
          <div className="flex gap-2 mt-auto">
            {activity.contactOptions.booking && (
              <button onClick={() => setShowBookingForm(true)} className="btn btn-primary flex-1">
                Book Now
              </button>
            )}
            {activity.contactOptions.info && (
              <button onClick={() => setShowDetailsModal(true)} className="btn btn-outline flex-1 flex items-center justify-center">
                More Info
                <ArrowRight size={16} className="ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{activity.name}</h2>
                <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Available Times</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {activity.schedule.type === 'weekly' && (
                      <p>Available on: {activity.schedule.days?.join(', ')}</p>
                    )}
                    {activity.schedule.timeSlots && (
                      <p>Time slots: {activity.schedule.timeSlots.join(', ')}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">What's Included</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {activity.included.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {activity.requirements && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {activity.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium mb-2">Terms & Conditions</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-600">
                    <p>• Cancellation Policy: Full refund if cancelled 24 hours before the activity.</p>
                    <p>• Minimum participants: {activity.capacity.min} people</p>
                    <p>• Maximum participants: {activity.capacity.max} people</p>
                    <p>• Please arrive 15 minutes before the scheduled time</p>
                    <p>• Activity duration: {activity.duration}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowBookingForm(true);
                  }}
                  className="btn btn-primary"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Book {activity.name}</h2>
                <button onClick={() => setShowBookingForm(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="input"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="input"
                      required
                    >
                      <option value="">Select time</option>
                      {activity.schedule.timeSlots?.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Participants
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={participants}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          setParticipants(Math.min(Math.max(value, activity.capacity.min), activity.capacity.max));
                        }
                      }}
                      className="input"
                      required
                      min={activity.capacity.min}
                      max={activity.capacity.max}
                    />
                    <span className="text-sm text-gray-500">
                      Min: {activity.capacity.min} | Max: {activity.capacity.max}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        paymentMethod === 'card' ? 'border-gold bg-gold/5' : 'border-gray-200'
                      }`}
                    >
                      <CreditCard className={paymentMethod === 'card' ? 'text-gold' : 'text-gray-400'} size={20} />
                      <span className="text-sm block mt-1">Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('hotel')}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        paymentMethod === 'hotel' ? 'border-gold bg-gold/5' : 'border-gray-200'
                      }`}
                    >
                      <Building2 className={paymentMethod === 'hotel' ? 'text-gold' : 'text-gray-400'} size={20} />
                      <span className="text-sm block mt-1">Pay at Hotel</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setCardNumber(value.replace(/(\d{4})/g, '$1 ').trim());
                        }}
                        className={`input ${formErrors.card ? 'border-red-500' : ''}`}
                        placeholder="Card Number"
                        maxLength={19}
                        required
                      />
                      {formErrors.card && <p className="text-red-500 text-xs mt-1">{formErrors.card}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setCardExpiry(value);
                          }}
                          className={`input ${formErrors.expiry ? 'border-red-500' : ''}`}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                        {formErrors.expiry && <p className="text-red-500 text-xs mt-1">{formErrors.expiry}</p>}
                      </div>

                      <div>
                        <input
                          type="text"
                          value={cardCVV}
                          onChange={(e) => setCVV(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          className={`input ${formErrors.cvv ? 'border-red-500' : ''}`}
                          placeholder="CVV"
                          maxLength={3}
                          required
                        />
                        {formErrors.cvv && <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>}
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className={`input ${formErrors.name ? 'border-red-500' : ''}`}
                        placeholder="Cardholder Name"
                        required
                      />
                      {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                  </div>
                )}

                {paymentMethod === 'hotel' && (
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <p className="text-gray-600">Payment will be collected at check-in.</p>
                    <p className="text-gray-500 mt-2">We accept: Cash, Cards, Mobile Payments</p>
                  </div>
                )}

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Activity Price</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Service Fee</span>
                    <span>$5</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${calculateTotal() + 5}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowBookingForm(false)} className="btn btn-outline flex-1">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex-1">
                    <Check size={18} className="mr-2" />
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityCard;