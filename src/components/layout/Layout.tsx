import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BookingWidget from '../widgets/BookingWidget';

const Layout = () => {
  const [showBookingWidget, setShowBookingWidget] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{
    roomNumber: string;
    name: string;
    price: number;
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleBookingWidget = (room?: { roomNumber: string; name: string; price: number }) => {
    setSelectedRoom(room || null);
    setShowBookingWidget(!showBookingWidget);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scrolled={scrolled} toggleBookingWidget={() => toggleBookingWidget()} />
      <main className="flex-grow">
        <Outlet context={{ toggleBookingWidget }} />
      </main>
      <Footer />
      {showBookingWidget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => toggleBookingWidget()}
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <BookingWidget onClose={() => toggleBookingWidget()} selectedRoom={selectedRoom || undefined} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;