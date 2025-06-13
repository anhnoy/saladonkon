import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import HomeManagementPage from './pages/admin/HomeManagementPage';
import RoomsManagementPage from './pages/admin/RoomsManagementPage';
import BookingsManagementPage from './pages/admin/BookingsManagementPage';
import BookingManagementPage from './pages/admin/BookingManagementPage';
import ActivitiesManagementPage from './pages/admin/ActivitiesManagementPage';
import ReviewsManagementPage from './pages/admin/ReviewsManagementPage';
import SettingsPage from './pages/admin/SettingsPage';
import PricingManagementPage from './pages/admin/PricingManagementPage';
import PaymentMethodsPage from './pages/admin/PaymentMethodsPage';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import GalleryPage from './pages/GalleryPage';
import HistoryPage from './pages/HistoryPage';
import ContactPage from './pages/ContactPage';
import BookingLookupPage from './pages/BookingLookupPage';
import NotFoundPage from './pages/NotFoundPage';
import { useReviewsStore } from './store/reviewsStore';
import { useBookingStore } from './store/bookingStore';
import { useRoomsStore } from './store/roomsStore';
import roomsData from './data/roomsData';

function App() {
  const { fetchReviews } = useReviewsStore();
  const { fetchBookings } = useBookingStore();
  const { rooms, addRoom } = useRoomsStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Fetch initial data with error handling
        try {
          await fetchReviews();
        } catch (error) {
          console.warn('Reviews data not available yet:', error);
        }

        try {
          await fetchBookings();
        } catch (error) {
          console.warn('Bookings data not available yet:', error);
        }

        // Initialize rooms data if store is empty
        if (rooms.length === 0) {
          roomsData.forEach(room => {
            addRoom({
              roomNumber: room.roomNumber,
              name: room.name,
              slug: room.slug,
              description: room.description,
              longDescription: room.longDescription,
              price: room.price,
              size: room.size,
              capacity: room.capacity,
              beds: room.beds,
              amenities: room.amenities,
              customAmenities: [],
              featured: room.featured,
              images: room.images,
              status: 'active'
            });
          });
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [fetchReviews, fetchBookings, rooms.length, addRoom]);

  return (
    <Routes>
      {/* Admin Login Route - Outside of AdminLayout */}
      <Route path="/admin/login" element={<LoginPage />} />
      
      {/* Protected Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="homepage" element={<HomeManagementPage />} />
        <Route path="rooms" element={<RoomsManagementPage />} />
        <Route path="bookings" element={<BookingsManagementPage />} />
        <Route path="booking-management" element={<BookingManagementPage />} />
        <Route path="activities" element={<ActivitiesManagementPage />} />
        <Route path="reviews" element={<ReviewsManagementPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="pricing" element={<PricingManagementPage />} />
        <Route path="payment-methods" element={<PaymentMethodsPage />} />
      </Route>
      
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="rooms/:roomId/:roomNumber" element={<RoomDetailPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="activities/:activityId" element={<ActivityDetailPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="booking-lookup" element={<BookingLookupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
