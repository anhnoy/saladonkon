import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Contact Us</h1>
            <p className="max-w-2xl mx-auto text-lg">
              We're here to assist you. Reach out to us for any inquiries or to plan your perfect stay.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <section className="py-16 bg-beige-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-soft text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-gold" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <p className="text-gray-600">123 Luxury Street, Bangkok, Thailand 10110</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-soft text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-gold" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">Tel: (+856) 20 9876 4429</p>
              <p className="text-gray-600"> whatapp : (+856) 2098764429</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-soft text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-gold" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">saladonekhone@gmail.com</p>
              <p className="text-gray-600">reservations@luxuryhaven.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-playfair font-semibold mb-6">Send Us a Message</h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="input"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="input"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="btn btn-primary flex items-center justify-center"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Map */}
            <div>
              <h2 className="text-2xl font-playfair font-semibold mb-6">Find Us</h2>
              
              <div className="bg-white p-2 rounded-lg shadow-soft mb-6">
                <div className="h-80 w-full rounded overflow-hidden">
                  <iframe 
                    title="Luxury Haven Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.9204455958423!2d100.56344061744384!3d13.72339369037294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f01ede8f531%3A0x61811c0a18b6b170!2sSukhumvit%20Rd%2C%20Thailand!5e0!3m2!1sen!2sus!4v1631614561547!5m2!1sen!2sus"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-soft">
                <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Clock className="text-gold mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Reception</h4>
                      <p className="text-gray-600">24 hours, 7 days a week</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-gold mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Restaurant</h4>
                      <p className="text-gray-600">Breakfast: 6:30 AM - 10:30 AM</p>
                      <p className="text-gray-600">Lunch: 12:00 PM - 2:30 PM</p>
                      <p className="text-gray-600">Dinner: 6:00 PM - 10:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-gold mr-3 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Spa</h4>
                      <p className="text-gray-600">Daily: 9:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto">
              Find quick answers to common questions about our hotel and services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-beige-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">What are your check-in and check-out times?</h3>
                <p className="text-gray-600">
                  Check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in and late check-out can be arranged based on availability, please contact our reception.
                </p>
              </div>
              
              <div className="bg-beige-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Do you offer airport transfers?</h3>
                <p className="text-gray-600">
                  Yes, we offer airport transfer services at an additional cost. Please provide your flight details at least 24 hours before arrival so we can arrange your pick-up.
                </p>
              </div>
              
              <div className="bg-beige-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Is breakfast included in the room rate?</h3>
                <p className="text-gray-600">
                  Yes, all our room rates include a complimentary breakfast buffet featuring both international and local Thai cuisine.
                </p>
              </div>
              
              <div className="bg-beige-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Do you have facilities for guests with disabilities?</h3>
                <p className="text-gray-600">
                  Yes, we have specially designed rooms and facilities to accommodate guests with disabilities. Please inform us of any specific requirements when making your reservation.
                </p>
              </div>
              
              <div className="bg-beige-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">What is your cancellation policy?</h3>
                <p className="text-gray-600">
                  Cancellations made more than 48 hours before the check-in date will receive a full refund. Cancellations within 48 hours will be charged for one night's stay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;