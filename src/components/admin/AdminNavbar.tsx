import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut } from 'lucide-react';

const AdminNavbar = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/admin/dashboard" className="flex items-center">
              <img 
                src="/SalaDoneKhoneLogo.png" 
                alt="SaLaDonKon Hotel" 
                className="h-8 w-auto mr-3"
              />
              <span className="font-semibold text-xl text-gray-900">
                SaLaDonKon Admin
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 mr-4">{user?.email}</span>
            <button
              onClick={logout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;