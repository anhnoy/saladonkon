import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsAppClick = () => {
    const whatsappNumber = '8562098764429';
    const text = `Hi, I would like to inquire about SaLaDonKon Hotel.${name ? `\nName: ${name}` : ''}${email ? `\nEmail: ${email}` : ''}${message ? `\nMessage: ${message}` : ''}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleWhatsAppClick();
  };

  return (
    <section className="py-16 bg-beige-light">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-playfair font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-6">
                Whether you have questions about your reservation, special requests, or would like to learn more about our hotel, our team is here to help.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-gold mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">No. 09 Unit 01 Ban Khone Village Khong District, Champassak Province, Lao PDR</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-gold mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">Tel: (+856) 20 9876 4429</p>
                    <p className="text-gray-600">WhatsApp: (+856) 2098764429</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-gold mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">saladonekhone@gmail.com</p>
                  </div>
                </div>
              </div>
              
              <Link to="/contact" className="btn btn-primary mt-6 inline-block">
                Get in Touch
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="text-xl font-medium mb-4">Quick Inquiry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <div className="flex gap-3">
                  <button type="submit" className="btn btn-primary flex-1 items-center justify-center">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </button>
                  <button 
                    type="button" 
                    onClick={handleWhatsAppClick}
                    className="btn btn-outline flex-1 items-center justify-center bg-[#25D366] text-white border-[#25D366] hover:bg-[#128C7E]"
                  >
                    <MessageSquare size={18} className="mr-2" />
                    WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;