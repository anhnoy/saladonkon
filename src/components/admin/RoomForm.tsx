import { useState, useRef } from 'react';
import { 
  BedDouble, 
  DollarSign, 
  Upload, 
  Link as LinkIcon, 
  Plus, 
  X,
  Coffee,
  Wifi,
  Tv,
  Bath,
  Globe,
  Bell
} from 'lucide-react';

interface RoomFormProps {
  initialData?: {
    name: string;
    type: string;
    price: number;
    images: string[];
    amenities: string[];
    customAmenities: string[];
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const RoomForm = ({ initialData, onSubmit, onCancel }: RoomFormProps) => {
  const [imageUploadMethod, setImageUploadMethod] = useState<'url' | 'file'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [customAmenity, setCustomAmenity] = useState('');
  const [customAmenities, setCustomAmenities] = useState<string[]>(initialData?.customAmenities || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || '',
    price: initialData?.price || 0,
    amenities: initialData?.amenities || [],
  });

  const roomTypes = [
    'Floating Studio',
    'French Studio',
    'French Heritage Villa',
    'Ban Din Deluxe',
    'Ban Din Studio',
    'Ban Lao Classic'
  ];

  const amenityCategories = {
    'In-room Amenities': [
      'King Bed',
      'Queen Bed',
      'Twin Beds',
      'Air Conditioning',
      'TV',
      'Wi-Fi',
      'Mini Fridge',
      'Electric Kettle',
      'Work Desk',
      'Wardrobe',
      'Safe',
      'Hair Dryer'
    ],
    'Food & Drinks': [
      'Breakfast Included',
      'Minibar',
      'Complimentary Water',
      'Room Service'
    ],
    'Bathroom': [
      'Rain Shower',
      'Bathtub',
      'Premium Towels',
      'Toiletries'
    ],
    'Technology': [
      'Smart TV',
      'Cable Channels',
      'Bedside Power Outlets',
      'USB Charging Ports'
    ],
    'Additional Services': [
      'Daily Housekeeping',
      'Airport Transfer',
      'Laundry Service',
      '24/7 Reception'
    ]
  };

  const categoryIcons = {
    'In-room Amenities': <BedDouble className="text-gold\" size={20} />,
    'Food & Drinks': <Coffee className="text-gold" size={20} />,
    'Bathroom': <Bath className="text-gold" size={20} />,
    'Technology': <Wifi className="text-gold" size={20} />,
    'Additional Services': <Bell className="text-gold" size={20} />
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target?.result as string;
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (imageUrl && !images.includes(imageUrl)) {
      setImages([...images, imageUrl]);
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAmenityChange = (amenity: string) => {
    const newAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: newAmenities });
  };

  const handleAddCustomAmenity = () => {
    if (customAmenity && !customAmenities.includes(customAmenity)) {
      setCustomAmenities([...customAmenities, customAmenity]);
      setCustomAmenity('');
    }
  };

  const handleRemoveCustomAmenity = (amenity: string) => {
    setCustomAmenities(customAmenities.filter(a => a !== amenity));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      images,
      customAmenities
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="input"
            required
          >
            <option value="">Select Room Type</option>
            {roomTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price per Night
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="input pl-10"
              min="0"
              required
            />
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Room Images</h3>
        
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setImageUploadMethod('url')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              imageUploadMethod === 'url'
                ? 'bg-gold text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <LinkIcon size={18} className="mr-2" />
            URL
          </button>
          <button
            type="button"
            onClick={() => setImageUploadMethod('file')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              imageUploadMethod === 'file'
                ? 'bg-gold text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Upload size={18} className="mr-2" />
            File Upload
          </button>
        </div>

        {imageUploadMethod === 'url' ? (
          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="input flex-1"
              placeholder="Enter image URL"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-outline w-full"
            >
              <Upload size={18} className="mr-2" />
              Choose File
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Room ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Amenities</h3>
        
        {Object.entries(amenityCategories).map(([category, amenities]) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center space-x-2">
              {categoryIcons[category as keyof typeof categoryIcons]}
              <h4 className="font-medium">{category}</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {amenities.map(amenity => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="rounded border-gray-300 text-gold focus:ring-gold"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Amenities */}
        <div className="space-y-3">
          <h4 className="font-medium">Custom Amenities</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              className="input flex-1"
              placeholder="Add custom amenity"
            />
            <button
              type="button"
              onClick={handleAddCustomAmenity}
              className="btn btn-primary"
            >
              <Plus size={18} className="mr-2" />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {customAmenities.map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {amenity}
                <button
                  type="button"
                  onClick={() => handleRemoveCustomAmenity(amenity)}
                  className="ml-2 text-gray-500 hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialData ? 'Update Room' : 'Add Room'}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;