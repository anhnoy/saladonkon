import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BedDouble, 
  CalendarRange, 
  MessageSquare, 
  Settings,
  Activity,
  Home,
  DollarSign,
  CreditCard,
  Search
} from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Home, label: 'Homepage', path: '/admin/homepage' },
    { icon: BedDouble, label: 'Rooms', path: '/admin/rooms' },
    { icon: CalendarRange, label: 'Bookings', path: '/admin/bookings' },
    { icon: Search, label: 'Booking Management', path: '/admin/booking-management' },
    { icon: Activity, label: 'Activities', path: '/admin/activities' },
    { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews' },
    { icon: DollarSign, label: 'Pricing', path: '/admin/pricing' },
    { icon: CreditCard, label: 'Payment Methods', path: '/admin/payment-methods' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-white h-[calc(100vh-4rem)] shadow-md">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gold text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;