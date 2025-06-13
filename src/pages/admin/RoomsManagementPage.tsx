import { useState, useRef } from 'react';
import { Plus, Search, Edit, Trash2, BedDouble, X, Users, DollarSign, Maximize, Check, Upload, Star, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { useRoomsStore, Room } from '../../store/roomsStore';
import CrossReference from '../../components/shared/CrossReference';
import { useGlobalStore } from '../../store/globalStore';

const RoomsManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { rooms, addRoom, updateRoom, deleteRoom, toggleRoomStatus, toggleFeatured } = useRoomsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Partial<Room> | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [imageUploadMethod, setImageUploadMethod] = useState<'url' | 'file'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [customAmenity, setCustomAmenity] = useState('');
  const [customAmenityCategory, setCustomAmenityCategory] = useState('In-room Amenities');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addActivity } = useGlobalStore();

  const roomTypes = [
    'Floating Studio',
    'French Studio', 
    'French Heritage Villa',
    'Ban Din Deluxe',
    'Ban Din Studio',
    'Ban Lao Classic'
  ];

  const [amenityCategories] = useState({
    'In-room Amenities': [
      'King Bed', 'Queen Bed', 'Twin Beds', 'Air Conditioning', 'TV', 'Wi-Fi',
      'Mini Fridge', 'Electric Kettle', 'Work Desk', 'Wardrobe', 'Safe', 'Hair Dryer'
    ],
    'Food & Drinks': [
      'Breakfast Included', 'Minibar', 'Complimentary Water', 'Room Service', 'Tea/Coffee Making'
    ],
    'Bathroom': [
      'Rain Shower', 'Bathtub', 'Premium Towels', 'Toiletries', 'Bathrobes', 'Slippers'
    ],
    'Technology': [
      'Smart TV', 'Cable Channels', 'High-Speed Internet', 'Bedside Power Outlets', 'USB Charging Ports'
    ],
    'Additional Services': [
      'Daily Housekeeping', 'Turndown Service', 'Laundry Service', '24/7 Reception', 'Airport Transfer'
    ]
  });

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesType = typeFilter === 'all' || room.slug === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddRoom = () => {
    setEditingRoom({
      roomNumber: '',
      name: '',
      slug: '',
      description: '',
      longDescription: '',
      price: 0,
      size: 0,
      capacity: 1,
      beds: '',
      amenities: [],
      customAmenities: [],
      featured: false,
      images: [],
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom({ ...room });
    setIsModalOpen(true);
  };

  const handleDeleteRoom = (roomId: string) => {
    if (confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
      deleteRoom(roomId);
    }
  };

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setShowDetailsModal(true);
  };

  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoom) {
      // Generate slug from name if not provided
      if (!editingRoom.slug && editingRoom.name) {
        editingRoom.slug = editingRoom.name.toLowerCase().replace(/\s+/g, '-');
      }

      // Combine standard and custom amenities
      const allAmenities = [
        ...(editingRoom.amenities || []),
        ...(editingRoom.customAmenities || [])
      ];

      const roomData = {
        ...editingRoom,
        amenities: allAmenities
      } as Omit<Room, 'id' | 'createdAt' | 'updatedAt'>;

      if (editingRoom.id) {
        updateRoom(editingRoom.id, roomData);
      } else {
        addRoom(roomData);
      }

      setIsModalOpen(false);
      setEditingRoom(null);
      setImageUrl('');
      setCustomAmenity('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target?.result as string;
        setEditingRoom(prev => prev ? {
          ...prev,
          images: [...(prev.images || []), newImage]
        } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageAdd = () => {
    if (imageUrl && editingRoom) {
      setEditingRoom({
        ...editingRoom,
        images: [...(editingRoom.images || []), imageUrl]
      });
      setImageUrl('');
    }
  };

  const handleImageRemove = (index: number) => {
    if (editingRoom) {
      setEditingRoom({
        ...editingRoom,
        images: editingRoom.images?.filter((_, i) => i !== index) || []
      });
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    if (editingRoom) {
      const currentAmenities = editingRoom.amenities || [];
      const newAmenities = currentAmenities.includes(amenity)
        ? currentAmenities.filter(a => a !== amenity)
        : [...currentAmenities, amenity];
      
      setEditingRoom({
        ...editingRoom,
        amenities: newAmenities
      });
    }
  };

  const handleAddCustomAmenity = () => {
    if (editingRoom && customAmenity && !(editingRoom.customAmenities || []).includes(customAmenity)) {
      setEditingRoom({
        ...editingRoom,
        customAmenities: [...(editingRoom.customAmenities || []), customAmenity]
      });
      setCustomAmenity('');
    }
  };

  const handleRemoveCustomAmenity = (amenity: string) => {
    if (editingRoom) {
      setEditingRoom({
        ...editingRoom,
        customAmenities: (editingRoom.customAmenities || []).filter(a => a !== amenity)
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Rooms Management</h1>
        <button onClick={handleAddRoom} className="btn btn-primary flex items-center">
          <Plus size={20} className="mr-2" />
          Add New Room
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="all">All Types</option>
            {roomTypes.map(type => (
              <option key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-4 font-medium">Room</th>
                <th className="text-left py-4 px-4 font-medium">Type</th>
                <th className="text-left py-4 px-4 font-medium">Capacity</th>
                <th className="text-left py-4 px-4 font-medium">Price</th>
                <th className="text-left py-4 px-4 font-medium">Status</th>
                <th className="text-left py-4 px-4 font-medium">Featured</th>
                <th className="text-left py-4 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-beige flex items-center justify-center mr-3">
                        {room.images.length > 0 ? (
                          <img 
                            src={room.images[0]} 
                            alt={room.name}
                            className="h-full w-full object-cover rounded-lg"
                          />
                        ) : (
                          <BedDouble className="text-gold" size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{room.name}</p>
                        <p className="text-sm text-gray-500">Room {room.roomNumber} • {room.size}m²</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-beige text-gray-800">
                      {room.name}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-400 mr-1" />
                      {room.capacity} guests
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <DollarSign size={16} className="text-gray-400 mr-1" />
                      {room.price}/night
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleRoomStatus(room.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(room.status)}`}
                    >
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleFeatured(room.id)}
                      className="flex items-center"
                    >
                      {room.featured ? (
                        <ToggleRight className="text-gold\" size={24} />
                      ) : (
                        <ToggleLeft className="text-gray-400" size={24} />
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetails(room)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleEditRoom(room)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Edit Room"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteRoom(room.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete Room"
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

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <BedDouble size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No rooms found</h3>
            <p className="text-gray-500 mb-4">
              {rooms.length === 0 
                ? "Get started by adding your first room"
                : "Try adjusting your search or filters"
              }
            </p>
            {rooms.length === 0 && (
              <button onClick={handleAddRoom} className="btn btn-primary">
                <Plus size={18} className="mr-2" />
                Add Your First Room
              </button>
            )}
          </div>
        )}
      </div>

      {/* Room Details Modal */}
      {showDetailsModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{selectedRoom.name} - Details</h2>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Room Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Number:</span>
                      <span className="font-medium">{selectedRoom.roomNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedRoom.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{selectedRoom.size}m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{selectedRoom.capacity} guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beds:</span>
                      <span className="font-medium">{selectedRoom.beds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">${selectedRoom.price}/night</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRoom.status)}`}>
                        {selectedRoom.status.charAt(0).toUpperCase() + selectedRoom.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Featured:</span>
                      <span className="font-medium">{selectedRoom.featured ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Check size={14} className="text-green-500 mr-2" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Description</h3>
                <p className="text-gray-600 mb-4">{selectedRoom.description}</p>
                {selectedRoom.longDescription && (
                  <p className="text-gray-600">{selectedRoom.longDescription}</p>
                )}
              </div>

              {selectedRoom.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedRoom.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedRoom.name} ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              <CrossReference 
                type="room" 
                id={selectedRoom.id} 
                title={selectedRoom.name} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Room Modal */}
      {isModalOpen && editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {editingRoom.id ? 'Edit Room' : 'Add New Room'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveRoom} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Number *
                    </label>
                    <input
                      type="text"
                      value={editingRoom.roomNumber || ''}
                      onChange={(e) => setEditingRoom({ ...editingRoom, roomNumber: e.target.value })}
                      className="input"
                      required
                      placeholder="e.g., 101"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type *
                    </label>
                    <select
                      value={editingRoom.name || ''}
                      onChange={(e) => {
                        const selectedType = e.target.value;
                        setEditingRoom({ 
                          ...editingRoom, 
                          name: selectedType,
                          slug: selectedType.toLowerCase().replace(/\s+/g, '-')
                        });
                      }}
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
                      Price per Night *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="number"
                        value={editingRoom.price || 0}
                        onChange={(e) => setEditingRoom({ ...editingRoom, price: Number(e.target.value) })}
                        className="input pl-10"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Size (m²) *
                    </label>
                    <div className="relative">
                      <Maximize className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="number"
                        value={editingRoom.size || 0}
                        onChange={(e) => setEditingRoom({ ...editingRoom, size: Number(e.target.value) })}
                        className="input pl-10"
                        required
                        min="1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacity *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="number"
                        value={editingRoom.capacity || 1}
                        onChange={(e) => setEditingRoom({ ...editingRoom, capacity: Number(e.target.value) })}
                        className="input pl-10"
                        required
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bed Configuration *
                    </label>
                    <input
                      type="text"
                      value={editingRoom.beds || ''}
                      onChange={(e) => setEditingRoom({ ...editingRoom, beds: e.target.value })}
                      className="input"
                      required
                      placeholder="e.g., 1 King Size Bed"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description *
                    </label>
                    <textarea
                      value={editingRoom.description || ''}
                      onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                      className="input"
                      rows={2}
                      required
                      placeholder="Brief description for room cards"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Detailed Description
                    </label>
                    <textarea
                      value={editingRoom.longDescription || ''}
                      onChange={(e) => setEditingRoom({ ...editingRoom, longDescription: e.target.value })}
                      className="input"
                      rows={4}
                      placeholder="Detailed description for room detail page"
                    />
                  </div>
                </div>

                {/* Images */}
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
                      Upload
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
                        onClick={handleImageAdd}
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
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn btn-outline w-full"
                      >
                        <Upload size={18} className="mr-2" />
                        Choose Image
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {(editingRoom.images || []).map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Room ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageRemove(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Amenities</h3>
                  
                  {Object.entries(amenityCategories).map(([category, amenities]) => (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium text-gray-800">{category}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {amenities.map(amenity => (
                          <label key={amenity} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={(editingRoom.amenities || []).includes(amenity)}
                              onChange={() => handleAmenityToggle(amenity)}
                              className="rounded border-gray-300 text-gold focus:ring-gold"
                            />
                            <span className="text-sm">{amenity}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Custom Amenities */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800">Custom Amenities</h4>
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
                      {(editingRoom.customAmenities || []).map((amenity, index) => (
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

                {/* Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Room Settings</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={editingRoom.status || 'active'}
                        onChange={(e) => setEditingRoom({ ...editingRoom, status: e.target.value as Room['status'] })}
                        className="input"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editingRoom.featured || false}
                          onChange={(e) => setEditingRoom({ ...editingRoom, featured: e.target.checked })}
                          className="rounded border-gray-300 text-gold focus:ring-gold"
                        />
                        <span className="text-sm font-medium text-gray-700">Featured Room</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Check size={18} className="mr-2" />
                    {editingRoom.id ? 'Update Room' : 'Add Room'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsManagementPage;