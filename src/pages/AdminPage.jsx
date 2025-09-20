import React, { useState, useEffect } from 'react';
import { sweetsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import SweetCard from '../components/sweets/SweetCard';
import SweetForm from '../components/sweets/SweetForm';
import RestockModal from '../components/sweets/RestockModal';
import SearchBar from '../components/sweets/SearchBar';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Candy,
  Settings,
  BarChart3
} from 'lucide-react';

const AdminPage = () => {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({
    totalSweets: 0,
    totalValue: 0,
    lowStock: 0,
    categories: 0
  });

  const fetchSweets = async () => {
    try {
      setIsLoading(true);
      const data = await sweetsAPI.getAll();
      setSweets(data);
      setFilteredSweets(data);
      calculateStats(data);
    } catch (error) {
      toast.error('Failed to load sweets');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (sweetsData) => {
    const totalSweets = sweetsData.length;
    const totalValue = sweetsData.reduce((sum, sweet) => sum + (sweet.price * sweet.quantity), 0);
    const lowStock = sweetsData.filter(sweet => sweet.quantity <= 5).length;
    const categories = new Set(sweetsData.map(sweet => sweet.category)).size;
    
    setStats({ totalSweets, totalValue, lowStock, categories });
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleCreateSweet = async (data) => {
    setIsSubmitting(true);
    try {
      await sweetsAPI.create({
        ...data,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity)
      });
      toast.success('Sweet created successfully! 🍭');
      setIsCreateModalOpen(false);
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create sweet');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSweet = async (data) => {
    setIsSubmitting(true);
    try {
      await sweetsAPI.update(selectedSweet._id, {
        ...data,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity)
      });
      toast.success('Sweet updated successfully!');
      setIsEditModalOpen(false);
      setSelectedSweet(null);
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update sweet');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestock = async (sweetId, quantity) => {
    setIsSubmitting(true);
    try {
      await sweetsAPI.restock(sweetId, quantity);
      toast.success('Sweet restocked successfully!');
      setIsRestockModalOpen(false);
      setSelectedSweet(null);
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to restock sweet');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = async (searchParams) => {
    if (Object.keys(searchParams).length === 0) {
      setFilteredSweets(sweets);
      return;
    }

    try {
      const data = await sweetsAPI.search(searchParams);
      setFilteredSweets(data);
    } catch (error) {
      toast.error('Search failed');
    }
  };

  const openEditModal = (sweet) => {
    setSelectedSweet(sweet);
    setIsEditModalOpen(true);
  };

  const openRestockModal = (sweet) => {
    setSelectedSweet(sweet);
    setIsRestockModalOpen(true);
  };

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Settings className="h-8 w-8 mr-3 text-blue-600" />
            Admin Panel
          </h1>
          <p className="text-gray-600 mt-2">Manage your sweet inventory and view analytics</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add New Sweet
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sweets</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalSweets}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Candy className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-3xl font-bold text-gray-900">${stats.totalValue.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-3xl font-bold text-gray-900">{stats.lowStock}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-gray-900">{stats.categories}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Sweet Inventory ({filteredSweets.length})
        </h2>
        {stats.lowStock > 0 && (
          <div className="flex items-center text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            <AlertTriangle className="h-4 w-4 mr-2" />
            {stats.lowStock} items low on stock
          </div>
        )}
      </div>

      {/* Sweet Cards Grid */}
      {filteredSweets.length === 0 ? (
        <div className="text-center py-12">
          <Candy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">No sweets found</p>
          <p className="text-gray-400">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSweets.map((sweet) => (
            <div key={sweet._id} className="relative">
              <SweetCard
                sweet={sweet}
                onUpdate={fetchSweets}
                onEdit={openEditModal}
                isAdminView = {true}
              />
              {sweet.quantity <= 5 && (
                <div className="absolute top-0 right-2 ">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => openRestockModal(sweet)}
                  >
                    <Package className="h-4 w-4 mr-1" />
                    Restock
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Sweet"
        size="lg"
      >
        <SweetForm
          onSubmit={handleCreateSweet}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSweet(null);
        }}
        title="Edit Sweet"
        size="lg"
      >
        <SweetForm
          sweet={selectedSweet}
          onSubmit={handleEditSweet}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedSweet(null);
          }}
          isLoading={isSubmitting}
        />
      </Modal>

      {/* Restock Modal */}
      <RestockModal
        isOpen={isRestockModalOpen}
        onClose={() => {
          setIsRestockModalOpen(false);
          setSelectedSweet(null);
        }}
        sweet={selectedSweet}
        onRestock={handleRestock}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AdminPage;