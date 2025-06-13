import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedRooms from '../components/home/FeaturedRooms';
import FeaturedActivities from '../components/home/FeaturedActivities';
import TestimonialSection from '../components/home/TestimonialSection';
import ContactSection from '../components/home/ContactSection';
import { useOutletContext } from 'react-router-dom';

type ContextType = {
  toggleBookingWidget: () => void;
};

const HomePage = () => {
  const { toggleBookingWidget } = useOutletContext<ContextType>();
  
  return (
    <div>
      <HeroSection toggleBookingWidget={toggleBookingWidget} />
      <FeaturedRooms />
      <FeaturedActivities />
      <TestimonialSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;