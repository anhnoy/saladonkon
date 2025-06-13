import { useState, useRef } from 'react';
import { Save, Plus, Trash2, MoveUp, MoveDown, Image, Upload, Link as LinkIcon, X, Eye, EyeOff, Palette } from 'lucide-react';
import { useHomepageStore, HeroSlide, SectionContent } from '../../store/homepageStore';

const HomeManagementPage = () => {
  const { 
    heroSlides, 
    sections, 
    updateHeroSlides, 
    updateSection, 
    addHeroSlide, 
    removeHeroSlide, 
    updateHeroSlide, 
    moveHeroSlide 
  } = useHomepageStore();

  const [imageUploadMethod, setImageUploadMethod] = useState<'url' | 'file'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewSlide, setPreviewSlide] = useState(0);
  const [editingSections, setEditingSections] = useState(sections);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Predefined color options
  const colorOptions = [
    { name: 'White', value: '#FFFFFF', textClass: 'text-white' },
    { name: 'Black', value: '#000000', textClass: 'text-black' },
    { name: 'Gold', value: '#D4AF37', textClass: 'text-gold' },
    { name: 'Navy', value: '#0F172A', textClass: 'text-navy' },
    { name: 'Gray Light', value: '#F3F4F6', textClass: 'text-gray-100' },
    { name: 'Gray Dark', value: '#374151', textClass: 'text-gray-700' },
    { name: 'Blue', value: '#3B82F6', textClass: 'text-blue-500' },
    { name: 'Green', value: '#10B981', textClass: 'text-green-500' },
    { name: 'Red', value: '#EF4444', textClass: 'text-red-500' },
    { name: 'Purple', value: '#8B5CF6', textClass: 'text-purple-500' },
    { name: 'Pink', value: '#EC4899', textClass: 'text-pink-500' },
    { name: 'Yellow', value: '#F59E0B', textClass: 'text-yellow-500' }
  ];

  const handleSlideMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      moveHeroSlide(index, index - 1);
    } else if (direction === 'down' && index < heroSlides.length - 1) {
      moveHeroSlide(index, index + 1);
    }
  };

  const handleSlideDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      removeHeroSlide(id);
    }
  };

  const handleAddSlide = () => {
    addHeroSlide({
      image: '',
      title: 'New Slide',
      subtitle: 'Add your subtitle here',
      titleColor: '#FFFFFF',
      subtitleColor: '#FFFFFF'
    });
  };

  const handleSlideChange = (id: string, field: keyof Omit<HeroSlide, 'id'>, value: string) => {
    updateHeroSlide(id, { [field]: value });
  };

  const handleSectionChange = (section: 'rooms' | 'activities', field: keyof SectionContent, value: string) => {
    const updatedSections = {
      ...editingSections,
      [section]: {
        ...editingSections[section],
        [field]: value
      }
    };
    setEditingSections(updatedSections);
  };

  const handleFileUpload = (slideId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateHeroSlide(slideId, { image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageAdd = (slideId: string) => {
    if (imageUrl) {
      updateHeroSlide(slideId, { image: imageUrl });
      setImageUrl('');
    }
  };

  const handleSave = () => {
    // Update sections
    Object.entries(editingSections).forEach(([key, value]) => {
      updateSection(key as 'rooms' | 'activities', value);
    });
    
    alert('Homepage content saved successfully! Changes are now live on the website.');
  };

  const handlePreview = () => {
    setShowPreview(true);
    setPreviewSlide(0);
  };

  const getColorFromValue = (colorValue: string) => {
    const color = colorOptions.find(c => c.value === colorValue);
    return color || { name: 'Custom', value: colorValue, textClass: '' };
  };

  const getPreviewTextStyle = (colorValue: string) => {
    return { color: colorValue };
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Homepage Management</h1>
        <div className="flex gap-4">
          <button 
            onClick={handlePreview}
            className="btn btn-outline flex items-center"
          >
            <Eye size={20} className="mr-2" />
            Preview
          </button>
          <button onClick={handleSave} className="btn btn-primary flex items-center">
            <Save size={20} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Hero Slides Section */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Hero Slides</h2>
          <button 
            onClick={handleAddSlide}
            className="btn btn-outline flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add Slide
          </button>
        </div>

        <div className="space-y-6">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">Slide {index + 1}</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleSlideMove(index, 'up')}
                    disabled={index === 0}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    <MoveUp size={18} />
                  </button>
                  <button 
                    onClick={() => handleSlideMove(index, 'down')}
                    disabled={index === heroSlides.length - 1}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    <MoveDown size={18} />
                  </button>
                  <button 
                    onClick={() => handleSlideDelete(slide.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Form Fields */}
                <div className="space-y-4">
                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Upload Method
                    </label>
                    <div className="flex space-x-2">
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
                  </div>

                  {imageUploadMethod === 'url' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Image className="absolute left-3 top-3 text-gray-400" size={18} />
                          <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                            placeholder="Enter image URL"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleImageAdd(slide.id)}
                          className="btn btn-primary"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Image
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => handleFileUpload(slide.id, e)}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Upload size={18} className="mr-2" />
                          Choose File
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Title Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleSlideChange(slide.id, 'title', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="Enter slide title"
                    />
                  </div>

                  {/* Title Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title Color
                    </label>
                    <div className="grid grid-cols-6 gap-2 mb-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => handleSlideChange(slide.id, 'titleColor', color.value)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            slide.titleColor === color.value 
                              ? 'border-gray-800 scale-110' 
                              : 'border-gray-300 hover:border-gray-500'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={slide.titleColor || '#FFFFFF'}
                        onChange={(e) => handleSlideChange(slide.id, 'titleColor', e.target.value)}
                        className="w-12 h-8 border rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={slide.titleColor || '#FFFFFF'}
                        onChange={(e) => handleSlideChange(slide.id, 'titleColor', e.target.value)}
                        className="flex-1 px-3 py-1 border rounded text-sm"
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>

                  {/* Subtitle Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={slide.subtitle}
                      onChange={(e) => handleSlideChange(slide.id, 'subtitle', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="Enter slide subtitle"
                    />
                  </div>

                  {/* Subtitle Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle Color
                    </label>
                    <div className="grid grid-cols-6 gap-2 mb-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => handleSlideChange(slide.id, 'subtitleColor', color.value)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            slide.subtitleColor === color.value 
                              ? 'border-gray-800 scale-110' 
                              : 'border-gray-300 hover:border-gray-500'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={slide.subtitleColor || '#FFFFFF'}
                        onChange={(e) => handleSlideChange(slide.id, 'subtitleColor', e.target.value)}
                        className="w-12 h-8 border rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={slide.subtitleColor || '#FFFFFF'}
                        onChange={(e) => handleSlideChange(slide.id, 'subtitleColor', e.target.value)}
                        className="flex-1 px-3 py-1 border rounded text-sm"
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div className="space-y-4">
                  {/* Image Preview */}
                  {slide.image && (
                    <div className="relative">
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleSlideChange(slide.id, 'image', '')}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  {/* Text Preview */}
                  <div className="bg-gray-900 rounded-lg p-6 relative overflow-hidden">
                    {slide.image && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{ backgroundImage: `url(${slide.image})` }}
                      />
                    )}
                    <div className="relative z-10 text-center">
                      <h1 
                        className="text-2xl md:text-3xl font-playfair font-bold mb-2"
                        style={getPreviewTextStyle(slide.titleColor || '#FFFFFF')}
                      >
                        {slide.title || 'Your Title Here'}
                      </h1>
                      <p 
                        className="text-lg"
                        style={getPreviewTextStyle(slide.subtitleColor || '#FFFFFF')}
                      >
                        {slide.subtitle || 'Your subtitle here'}
                      </p>
                    </div>
                  </div>

                  {/* Color Preview Info */}
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Title Color:</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: slide.titleColor || '#FFFFFF' }}
                        />
                        <span className="font-mono text-xs">
                          {slide.titleColor || '#FFFFFF'}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtitle Color:</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: slide.subtitleColor || '#FFFFFF' }}
                        />
                        <span className="font-mono text-xs">
                          {slide.subtitleColor || '#FFFFFF'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {heroSlides.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No hero slides added yet. Click "Add Slide" to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Sections Content */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h2 className="text-xl font-semibold mb-6">Section Content</h2>

        <div className="space-y-6">
          {/* Rooms Section */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Rooms Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingSections.rooms.title}
                  onChange={(e) => handleSectionChange('rooms', 'title', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <textarea
                  value={editingSections.rooms.subtitle}
                  onChange={(e) => handleSectionChange('rooms', 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Activities Section */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Activities Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingSections.activities.title}
                  onChange={(e) => handleSectionChange('activities', 'title', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <textarea
                  value={editingSections.activities.subtitle}
                  onChange={(e) => handleSectionChange('activities', 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <button 
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 text-white p-2 hover:text-gold z-10"
            >
              <X size={24} />
            </button>

            {heroSlides.length > 0 && (
              <>
                <div className="relative w-full h-full">
                  <img 
                    src={heroSlides[previewSlide]?.image} 
                    alt={heroSlides[previewSlide]?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h1 
                        className="text-4xl md:text-6xl font-playfair font-bold mb-4"
                        style={getPreviewTextStyle(heroSlides[previewSlide]?.titleColor || '#FFFFFF')}
                      >
                        {heroSlides[previewSlide]?.title}
                      </h1>
                      <p 
                        className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
                        style={getPreviewTextStyle(heroSlides[previewSlide]?.subtitleColor || '#FFFFFF')}
                      >
                        {heroSlides[previewSlide]?.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {heroSlides.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
                      onClick={() => setPreviewSlide(prev => prev === 0 ? heroSlides.length - 1 : prev - 1)}
                    >
                      <MoveUp size={24} />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
                      onClick={() => setPreviewSlide(prev => prev === heroSlides.length - 1 ? 0 : prev + 1)}
                    >
                      <MoveDown size={24} />
                    </button>

                    <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
                      {heroSlides.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === previewSlide ? 'bg-gold w-6' : 'bg-white bg-opacity-50'
                          }`}
                          onClick={() => setPreviewSlide(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Preview Mode</h3>
              <p className="text-sm">This is how your hero section will appear to visitors</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeManagementPage;