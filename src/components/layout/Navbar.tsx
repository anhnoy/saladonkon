import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
  toggleBookingWidget: () => void;
}

const Navbar = ({ scrolled, toggleBookingWidget }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/SalaDoneKhoneLogo.png" 
            alt="SaLaDonKon Hotel" 
            className="h-10 w-auto mr-3"
          />
          <span className={`font-playfair font-semibold text-xl ${scrolled ? 'text-navy' : 'text-white'}`}>
            SaLaDonKon
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `${scrolled ? 'text-gray-800' : 'text-white'} hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/rooms" 
            className={({ isActive }) => 
              `${scrolled ? 'text-gray-800' : 'text-white'} hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
            }
          >
            Rooms
          </NavLink>
          <NavLink 
            to="/activities" 
            className={({ isActive }) => 
              `${scrolled ? 'text-gray-800' : 'text-white'} hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
            }
          >
            Activities
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => 
              `${scrolled ? 'text-gray-800' : 'text-white'} hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
            }
          >
            Gallery
          </NavLink>
          <NavLink 
            to="/history" 
            className={({ isActive }) => 
              `${scrolled ? 'text-gray-800' : 'text-white'} hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
            }
          >
            History
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `${scrolled ? 'text-gray-800' : 'text-white'} hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
            }
          >
            Contact
          </NavLink>
          <NavLink 
            to="/booking-lookup" 
            className={({ isActive }) => 
              `${scrolled ? 'text-gray-800' : 'text-white'} hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
            }
          >
            Find Booking
          </NavLink>
          <button 
            onClick={toggleBookingWidget}
            className="btn btn-primary ml-4"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gold"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-navy pt-16">
          <div className="container mx-auto px-4 py-4 flex flex-col items-center space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-white text-lg hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/rooms" 
              className={({ isActive }) => 
                `text-white text-lg hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
              }
            >
              Rooms
            </NavLink>
            <NavLink 
              to="/activities" 
              className={({ isActive }) => 
                `text-white text-lg hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
              }
            >
              Activities
            </NavLink>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => 
                `text-white text-lg hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
              }
            >
              Gallery
            </NavLink>
            <NavLink 
              to="/history" 
              className={({ isActive }) => 
                `text-white text-lg hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
              }
            >
              History
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-white text-lg hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
              }
            >
              Contact
            </NavLink>
            <NavLink 
              to="/booking-lookup" 
              className={({ isActive }) => 
                `text-white text-lg hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`
              }
            >
              Find Booking
            </NavLink>
            <button 
              onClick={() => {
                toggleBookingWidget();
                toggleMobileMenu();
              }}
              className="btn btn-primary w-full mt-4"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;