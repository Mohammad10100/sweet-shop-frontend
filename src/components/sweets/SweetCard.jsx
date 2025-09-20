import React, { useState } from 'react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { sweetsAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { ShoppingCart, Edit, Trash2, Package, Star, DollarSign } from 'lucide-react';

const SweetCard = ({ sweet, onUpdate, onEdit, isAdminView = false }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (sweet.quantity === 0) return;
    
    setIsLoading(true);
    try {
      await sweetsAPI.purchase(sweet._id);
      toast.success(`Purchased ${sweet.name}! 🍭`, {
        duration: 3000,
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });
      onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Purchase failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${sweet.name}"?`)) return;
    
    setIsLoading(true);
    try {
      await sweetsAPI.delete(sweet._id);
      toast.success('Sweet deleted successfully');
      onUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      chocolate: 'bg-amber-100 text-amber-800 border-amber-200',
      candy: 'bg-pink-100 text-pink-800 border-pink-200',
      gummy: 'bg-green-100 text-green-800 border-green-200',
      lollipop: 'bg-purple-100 text-purple-800 border-purple-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[category?.toLowerCase()] || colors.other;
  };

  const getStockStatus = () => {
    if (sweet.quantity === 0) return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' };
    if (sweet.quantity <= 5) return { text: 'Low Stock', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'In Stock', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">
                {sweet.name}
              </h3>
              <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
            </div>
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(sweet.category)}`}>
              {sweet.category}
            </span>
          </div>
          <div className="text-right ml-4">
            <div className="flex items-center justify-end mb-1">
              <DollarSign className="h-5 w-5 text-gray-600 group-hover:text-pink-600" />
              <p className="text-2xl font-bold text-gray-600 group-hover:text-pink-600">{sweet.price.toFixed(2)}</p>
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
              <Package className="h-3 w-3 mr-1" />
              {sweet.quantity > 0 ? `${sweet.quantity} left` : stockStatus.text}
            </div>
          </div>
        </div>

        {/* Description */}
        {sweet.description && (
          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
            {sweet.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Button
            onClick={handlePurchase}
            disabled={sweet.quantity === 0}
            isLoading={isLoading}
            size="md"
            className="flex-1 mr-3"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
          </Button>

          { isAdminView && user?.role === 'admin' && (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(sweet)}
                className="p-2 hover:bg-blue-50 hover:text-pink-600"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                isLoading={isLoading}
                className="p-2 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;