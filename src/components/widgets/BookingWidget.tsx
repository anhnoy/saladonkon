import { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Users, 
  BedDouble, 
  MessageSquare, 
  CreditCard, 
  Building2, 
  Wallet,
  Info,
  X,
  Check,
  Upload,
  Image,
  Smartphone,
  Phone
} from 'lucide-react';
import { usePricingStore } from '../../store/pricingStore';
import { useGlobalStore } from '../../store/globalStore';

interface BookingWidgetProps {
  onClose: () => void;
  selectedRoom?: {
    roomNumber: string;
    name: string;
    price: number;
  };
}

const BookingWidget = ({ onClose, selectedRoom }: BookingWidgetProps) => {
  const pricing = usePricingStore();
  const { addActivity } = useGlobalStore();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [roomType, setRoomType] = useState(selectedRoom?.name || '');
  const [totalNights, setTotalNights] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'hotel'>('card');
  const [showPolicyInfo, setShowPolicyInfo] = useState(false);
  const [bankTransferReceipt, setBankTransferReceipt] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [priceDetails, setPriceDetails] = useState({
    basePrice: 0,
    extraAdultsCharge: 0,
    extraChildrenCharge: 0,
    serviceFee: pricing.serviceFee,
    total: 0
  });

  // Card form states
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

  // Update children ages array when children count changes
  useEffect(() => {
    setChildrenAges(prev => {
      if (prev.length < children) {
        return [...prev, ...Array(children - prev.length).fill(0)];
      }
      return prev.slice(0, children);
    });
  }, [children]);

  // Calculate total nights when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setTotalNights(nights > 0 ? nights : 1);
    }
  }, [checkInDate, checkOutDate]);

  // Calculate total price
  useEffect(() => {
    if (selectedRoom) {
      const basePrice = selectedRoom.price * totalNights;
      
      // Extra adults charge (if more than 2 adults)
      const extraAdultsCharge = Math.max(0, adults - 2) * pricing.extraAdultPrice * totalNights;
      
      // Extra children charge (only for children over free age)
      const extraChildrenCharge = childrenAges.reduce((total, age) => {
        return total + (age >= pricing.childFreeAge ? pricing.extraChildPrice * totalNights : 0);
      }, 0);

      setPriceDetails({
        basePrice,
        extraAdultsCharge,
        extraChildrenCharge,
        serviceFee: pricing.serviceFee,
        total: basePrice + extraAdultsCharge + extraChildrenCharge + pricing.serviceFee
      });
    }
  }, [selectedRoom, totalNights, adults, childrenAges, pricing]);

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry date with MM/YY format
  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\D/g, '');
    
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardExpiry(formatted);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBankTransferReceipt(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    if (paymentMethod === 'card') {
      const errors: typeof formErrors = {};
      const cleanCardNumber = cardNumber.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cleanCardNumber)) errors.card = 'Invalid card number';
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) errors.expiry = 'Invalid expiry date';
      if (!/^\d{3}$/.test(cardCVV)) errors.cvv = 'Invalid CVV';
      if (!cardName.trim()) errors.name = 'Name is required';
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
    }

    const bookingData = {
      roomNumber: selectedRoom?.roomNumber,
      roomType: selectedRoom?.name || roomType,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: {
        adults,
        children,
        childrenAges
      },
      pricing: priceDetails,
      specialRequests,
      paymentMethod,
      bankTransferReceipt,
      status: 'pending',
      bookingDate: new Date().toISOString(),
      ...(paymentMethod === 'card' && {
        payment: {
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiry: cardExpiry,
          cvv: cardCVV,
          name: cardName
        }
      })
    };

    // Log activity
    addActivity({
      type: 'booking',
      description: `New booking request: ${selectedRoom?.name || roomType} for ${adults + children} guests`
    });

    console.log('Booking Data:', bookingData);
    alert('Booking request submitted successfully!');
    onClose();
  };

  const renderPaymentMethodContent = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className={`input ${formErrors.card ? 'border-red-500' : ''}`}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
              {formErrors.card && <p className="text-red-500 text-xs mt-1">{formErrors.card}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={handleExpiryChange}
                  className={`input ${formErrors.expiry ? 'border-red-500' : ''}`}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
                {formErrors.expiry && <p className="text-red-500 text-xs mt-1">{formErrors.expiry}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardCVV}
                  onChange={(e) => setCVV(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className={`input ${formErrors.cvv ? 'border-red-500' : ''}`}
                  placeholder="123"
                  maxLength={3}
                  required
                />
                {formErrors.cvv && <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className={`input ${formErrors.name ? 'border-red-500' : ''}`}
                placeholder="John Doe"
                required
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
          </div>
        );
      
      case 'bank':
        return (
          <div className="space-y-4">
            <div className="bg-beige-light p-4 rounded-lg">
              <h4 className="font-medium mb-2">Bank Transfer Details</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Bank Name:</span> SaLaDonKon Bank</p>
                <p><span className="text-gray-600">Account Name:</span> SaLaDonKon Hotel Co., Ltd</p>
                <p><span className="text-gray-600">Account Number:</span> 1234567890</p>
                <p><span className="text-gray-600">Swift Code:</span> SLDKTHBK</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Transfer Receipt
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold transition-colors"
                >
                  <Upload size={20} className="mr-2 text-gray-400" />
                  <span className="text-gray-600">Choose Image</span>
                </button>

                {bankTransferReceipt && (
                  <div className="relative">
                    <img
                      src={bankTransferReceipt}
                      alt="Transfer Receipt"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setBankTransferReceipt(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Please upload a clear image of your transfer receipt
              </p>
            </div>
          </div>
        );
      
      case 'hotel':
        return (
          <div className="space-y-4">
            <div className="bg-beige-light p-4 rounded-lg">
              <h4 className="font-medium mb-2">Pay at Hotel</h4>
              <p className="text-sm text-gray-600">
                Payment will be collected at check-in. We accept:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                <li>Cash (THB, USD, EUR)</li>
                <li>Credit/Debit Cards</li>
                <li>Mobile Payment (Prompt Pay, WeChat Pay, Alipay)</li>
              </ul>
            </div>
            <p className="text-sm text-gray-500">
              Please note that a valid credit card is required to guarantee your booking.
              No charges will be made until check-in.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
                 <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-red-500">Sorry, this service is not available.</h1>
      <div className="p-4 sm:p-6 border-b">
        
        <div className="flex justify-between items-center">
          
          <h2 className="text-xl sm:text-2xl font-playfair font-semibold text-gray-900">
            Book Your Stay
          </h2>
          
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 p-1"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {selectedRoom ? (
            <div className="bg-beige p-4 rounded-lg mb-4 sm:mb-6">
              <h3 className="font-medium mb-2">{selectedRoom.name}</h3>
              <p className="text-gray-600">Room {selectedRoom.roomNumber}</p>
              <p className="text-gold font-medium mt-2">${selectedRoom.price} per night</p>
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Room Type</label>
              <div className="relative">
                <BedDouble className="absolute left-3 top-3 text-gray-400" size={20} />
                <select 
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  required
                  className="input pl-10"
                >
                  <option value="">Select Room Type</option>
                  <option value="floating-studio">Floating Studio</option>
                  <option value="french-studio">French Studio</option>
                  <option value="french-heritage-villa">French Heritage Villa</option>
                  <option value="ban-din-deluxe">Ban Din Deluxe</option>
                  <option value="ban-din-studio">Ban Din Studio</option>
                  <option value="ban-lao-classic">Ban Lao Classic</option>
                </select>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Check-in Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="date" 
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                  className="input pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Check-out Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="date" 
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                  className="input pl-10"
                  min={checkInDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Adults</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                <select 
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="input pl-10"
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                {adults > 2 && (
                  <p className="text-sm text-gray-500 mt-1">
                    +${pricing.extraAdultPrice}/night for each additional adult
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Children</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                <select 
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="input pl-10"
                >
                  {[0, 1, 2, 3].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {children > 0 && (
            <div className="space-y-3">
              <label className="block text-gray-700 font-medium">Children's Ages</label>
              <div className="grid grid-cols-2 gap-3">
                {childrenAges.map((age, index) => (
                  <div key={index}>
                    <label className="text-sm text-gray-600">Child {index + 1}</label>
                    <select
                      value={age}
                      onChange={(e) => {
                        const newAges = [...childrenAges];
                        newAges[index] = Number(e.target.value);
                        setChildrenAges(newAges);
                      }}
                      className="input mt-1"
                    >
                      {Array.from({ length: 18 }, (_, i) => (
                        <option key={i} value={i}>{i} years</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Children under {pricing.childFreeAge} years stay free. ${pricing.extraChildPrice}/night for each child over {pricing.childFreeAge} years.
              </p>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Special Requests</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requests or preferences?"
                className="input pl-10"
                rows={3}
              />
            </div>
          </div>
          
          {selectedRoom && (
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between mb-2">
                <span>${selectedRoom.price} × {totalNights} {totalNights === 1 ? 'night' : 'nights'}</span>
                <span>${priceDetails.basePrice}</span>
              </div>
              {priceDetails.extraAdultsCharge > 0 && (
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Additional adults charge</span>
                  <span>+${priceDetails.extraAdultsCharge}</span>
                </div>
              )}
              {priceDetails.extraChildrenCharge > 0 && (
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Children over {pricing.childFreeAge} years</span>
                  <span>+${priceDetails.extraChildrenCharge}</span>
                </div>
              )}
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Service fee</span>
                <span>${priceDetails.serviceFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${priceDetails.total}</span>
              </div>
            </div>
          )}

          <div className="space-y-4 border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-900">Payment Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 sm:p-4 border rounded-lg text-center transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-gold bg-gold/5'
                    : 'border-gray-200 hover:border-gold/50'
                }`}
              >
                <Smartphone className={`mx-auto mb-2 ${
                  paymentMethod === 'card' ? 'text-gold' : 'text-gray-400'
                }`} size={20} />
                <span className="text-sm font-medium block">Mobile Pay</span>
                <span className="text-xs text-gray-500 block">Card Payment</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`p-3 sm:p-4 border rounded-lg text-center transition-colors ${
                  paymentMethod === 'bank'
                    ? 'border-gold bg-gold/5'
                    : 'border-gray-200 hover:border-gold/50'
                }`}
              >
                <Phone className={`mx-auto mb-2 ${
                  paymentMethod === 'bank' ? 'text-gold' : 'text-gray-400'
                }`} size={20} />
                <span className="text-sm font-medium block"> Banking</span>
                <span className="text-xs text-gray-500 block">Bank Transfer</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('hotel')}
                className={`p-3 sm:p-4 border rounded-lg text-center transition-colors ${
                  paymentMethod === 'hotel'
                    ? 'border-gold bg-gold/5'
                    : 'border-gray-200 hover:border-gold/50'
                }`}
              >
                <Building2 className={`mx-auto mb-2 ${
                  paymentMethod === 'hotel' ? 'text-gold' : 'text-gray-400'
                }`} size={20} />
                <span className="text-sm font-medium block">At Hotel</span>
                <span className="text-xs text-gray-500 block">Pay on Arrival</span>
              </button>
            </div>

            <div className="mt-4">
              {renderPaymentMethodContent()}
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setShowPolicyInfo(!showPolicyInfo)}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <Info size={18} className="mr-2" />
              Booking Policies & Information
            </button>

            {showPolicyInfo && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Check-in & Check-out</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Check-in time: 2:00 PM</li>
                    <li>Check-out time: 12:00 PM</li>
                    <li>Early check-in and late check-out available upon request</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Cancellation Policy</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Free cancellation up to 48 hours before check-in</li>
                    <li>Cancellations within 48 hours: First night charge</li>
                    <li>No-shows: Full booking amount will be charged</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Payment Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>All rates are in USD</li>
                    <li>Credit card details required to guarantee booking</li>
                    <li>Service fees are non-refundable</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Additional Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Valid ID required at check-in</li>
                    <li>Non-smoking rooms</li>
                    <li>Pets not allowed</li>
                    <li>Extra bed subject to availability</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="p-4 sm:p-6 border-t bg-white">
        <button 
          type="submit"
          className="w-full btn btn-primary py-3 text-base sm:text-lg"
          onClick={handleSubmit}
        >
          <Check size={18} className="mr-2" />
          Confirm Booking
        </button>
        
        <p className="text-sm text-gray-500 text-center mt-4">
          By clicking "Confirm Booking", you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
};

export default BookingWidget;