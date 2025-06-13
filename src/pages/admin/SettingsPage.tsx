import { useState } from 'react';
import { Save, Hotel, Mail, Phone, MapPin, Globe, Facebook, Instagram, Twitter } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <button className="btn btn-primary flex items-center">
          <Save size={20} className="mr-2" />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-soft">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'general'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'contact'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Contact Information
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'social'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Social Media
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hotel Name
                </label>
                <div className="relative">
                  <Hotel className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    defaultValue="SaLaDonKon"
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="url"
                    defaultValue="https://www.saladonkon.com"
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Zone
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold">
                  <option value="UTC+7">Asia/Bangkok (UTC+7)</option>
                  <option value="UTC+8">Asia/Singapore (UTC+8)</option>
                  <option value="UTC+9">Asia/Tokyo (UTC+9)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus: ring-gold">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    defaultValue="saladonekhone@gmail.com"
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="tel"
                    defaultValue="+856 20 9876 4429"
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <textarea
                    defaultValue="No. 09 Unit 01 Ban Khone Village Khong District, Champassak Province, Lao PDR"
                    rows={3}
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="url"
                    placeholder="Facebook page URL"
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="url"
                    placeholder="Instagram profile URL"
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="url"
                    placeholder="Twitter profile URL"
                    className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;