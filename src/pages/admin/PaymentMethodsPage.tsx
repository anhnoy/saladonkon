import { useState } from 'react';
import { CreditCard, Building2, Wallet, Edit, Trash2, Plus, Check, X, AlertCircle } from 'lucide-react';

interface PaymentDetail {
  key: string;
  value: string;
}

interface PaymentMethod {
  id: string;
  type: 'bank' | 'card' | 'hotel';
  name: string;
  details: PaymentDetail[];
  enabled: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'bank',
    name: 'Bank Transfer',
    details: [
      { key: 'Bank Name', value: 'SaLaDonKon Bank' },
      { key: 'Account Name', value: 'SaLaDonKon Hotel Co., Ltd' },
      { key: 'Account Number', value: '1234567890' },
      { key: 'Swift Code', value: 'SLDKTHBK' }
    ],
    enabled: true
  },
  {
    id: '2',
    type: 'card',
    name: 'Credit/Debit Card',
    details: [
      { key: 'Accepted Cards', value: 'Visa, Mastercard, American Express' },
      { key: 'Processing Fee', value: '2.5%' },
      { key: 'Settlement Time', value: 'Instant' }
    ],
    enabled: true
  },
  {
    id: '3',
    type: 'hotel',
    name: 'Pay at Hotel',
    details: [
      { key: 'Accepted Methods', value: 'Cash (THB, USD, EUR), Cards' },
      { key: 'Mobile Payments', value: 'Prompt Pay, WeChat Pay, Alipay' },
      { key: 'Deposit Required', value: 'Credit card for guarantee' }
    ],
    enabled: true
  }
];

const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  const handleAddMethod = () => {
    setEditingMethod({
      id: String(Date.now()),
      type: 'bank',
      name: '',
      details: [{ key: '', value: '' }],
      enabled: true
    });
    setIsModalOpen(true);
  };

  const handleEditMethod = (method: PaymentMethod) => {
    setEditingMethod({ ...method });
    setIsModalOpen(true);
  };

  const handleDeleteMethod = (id: string) => {
    setDeleteConfirmation(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      setPaymentMethods(methods => methods.filter(method => method.id !== deleteConfirmation));
      setDeleteConfirmation(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  const handleSaveMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMethod) {
      // Filter out empty details
      const validDetails = editingMethod.details.filter(detail => detail.key && detail.value);
      const updatedMethod = { ...editingMethod, details: validDetails };

      setPaymentMethods(methods => {
        const index = methods.findIndex(m => m.id === editingMethod.id);
        if (index === -1) {
          return [...methods, updatedMethod];
        }
        const updatedMethods = [...methods];
        updatedMethods[index] = updatedMethod;
        return updatedMethods;
      });

      setIsModalOpen(false);
      setEditingMethod(null);
    }
  };

  const handleAddDetail = () => {
    if (editingMethod) {
      setEditingMethod({
        ...editingMethod,
        details: [...editingMethod.details, { key: '', value: '' }]
      });
    }
  };

  const handleRemoveDetail = (index: number) => {
    if (editingMethod) {
      const newDetails = editingMethod.details.filter((_, i) => i !== index);
      setEditingMethod({
        ...editingMethod,
        details: newDetails
      });
    }
  };

  const handleDetailChange = (index: number, field: 'key' | 'value', value: string) => {
    if (editingMethod) {
      const newDetails = [...editingMethod.details];
      newDetails[index] = { ...newDetails[index], [field]: value };
      setEditingMethod({
        ...editingMethod,
        details: newDetails
      });
    }
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return <Building2 size={24} />;
      case 'card':
        return <CreditCard size={24} />;
      case 'hotel':
        return <Wallet size={24} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Payment Methods</h1>
        <button 
          onClick={handleAddMethod}
          className="btn btn-primary flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Payment Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${method.enabled ? 'bg-gold/10 text-gold' : 'bg-gray-100 text-gray-400'}`}>
                  {getMethodIcon(method.type)}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{method.name}</h3>
                  <span className={`text-sm ${method.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                    {method.enabled ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditMethod(method)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleToggleStatus(method.id)}
                  className={`p-2 rounded-lg ${
                    method.enabled 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {method.enabled ? <X size={18} /> : <Check size={18} />}
                </button>
                <button 
                  onClick={() => handleDeleteMethod(method.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {method.details.map((detail, index) => (
                <div key={index}>
                  <span className="text-sm text-gray-500">{detail.key}:</span>
                  <p className="text-sm">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Method Form Modal */}
      {isModalOpen && editingMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6">
                {editingMethod.id ? 'Edit Payment Method' : 'Add Payment Method'}
              </h2>

              <form onSubmit={handleSaveMethod} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Type
                    </label>
                    <select 
                      className="input"
                      value={editingMethod.type}
                      onChange={(e) => setEditingMethod({ 
                        ...editingMethod, 
                        type: e.target.value as PaymentMethod['type']
                      })}
                    >
                      <option value="bank">Bank Transfer</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="hotel">Pay at Hotel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input 
                      type="text" 
                      className="input"
                      value={editingMethod.name}
                      onChange={(e) => setEditingMethod({ 
                        ...editingMethod, 
                        name: e.target.value 
                      })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Details
                  </label>
                  <div className="space-y-4">
                    {editingMethod.details.map((detail, index) => (
                      <div key={index} className="flex gap-4">
                        <input
                          type="text"
                          value={detail.key}
                          onChange={(e) => handleDetailChange(index, 'key', e.target.value)}
                          className="input flex-1"
                          placeholder="Key"
                          required
                        />
                        <input
                          type="text"
                          value={detail.value}
                          onChange={(e) => handleDetailChange(index, 'value', e.target.value)}
                          className="input flex-1"
                          placeholder="Value"
                          required
                        />
                        {editingMethod.details.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDetail(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddDetail}
                      className="text-gold hover:text-gold-dark text-sm flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Detail
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingMethod.enabled}
                    onChange={(e) => setEditingMethod({ 
                      ...editingMethod, 
                      enabled: e.target.checked 
                    })}
                    className="rounded border-gray-300 text-gold focus:ring-gold"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable this payment method</span>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Payment Method
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4 text-red-600">
              <AlertCircle size={24} className="mr-2" />
              <h3 className="text-lg font-medium">Confirm Deletion</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this payment method? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="btn bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsPage;