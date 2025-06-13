import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/SalaDoneKhoneLogo.png" 
                alt="SaLaDonKon Hotel" 
                className="h-10 w-auto mr-3"
              />
              <span className="font-playfair font-semibold text-xl text-white">
                SaLaDonKon
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Experience the epitome of luxury and comfort at our premium hotel. 
              We provide exceptional service and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-playfair">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-300 hover:text-gold transition-colors">Rooms</Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-300 hover:text-gold transition-colors">Activities</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-gold transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-300 hover:text-gold transition-colors">History</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-playfair">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold mr-2 mt-0.5" />
                <span className="text-gray-300">No. 09 Unit 01 Ban Khone Village Khong District, Champassak Province, Lao PDR</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold mr-2" />
                <span className="text-gray-300">Tel: (+856) 20 9876 4429
                                                  whatapp : (+856) 2098764429</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold mr-2" />
                <span className="text-gray-300">saladonekhone@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-playfair">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="px-4 py-2 bg-navy-light border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <button 
                type="submit"
                className="bg-gold hover:bg-gold-dark text-white py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SaLaDonKon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;