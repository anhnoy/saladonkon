import { useState } from 'react';
import { Search, Filter, Mail, Phone, Eye } from 'lucide-react';

const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    totalBookings: 3,
    totalSpent: 2250,
    lastBooking: '2024-03-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234 567 891',
    totalBookings: 1,
    totalSpent: 1200,
    lastBooking: '2024-03-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 234 567 892',
    totalBookings: 2,
    totalSpent: 1800,
    lastBooking: '2024-03-16',
    status: 'inactive'
  }
];

const CustomersManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Customers Management</h1>
        <button className="btn btn-primary flex items-center">
          <Filter size={20} className="mr-2" />
          Advanced Filters
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">Customer</th>
                <th className="text-left py-4 px-4">Contact</th>
                <th className="text-left py-4 px-4">Total Bookings</th>
                <th className="text-left py-4 px-4">Total Spent</th>
                <th className="text-left py-4 px-4">Last Booking</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500">ID: {customer.id}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Mail size={14} className="mr-1" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone size={14} className="mr-1" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{customer.totalBookings}</td>
                  <td className="py-4 px-4">${customer.totalSpent}</td>
                  <td className="py-4 px-4">{customer.lastBooking}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersManagementPage;