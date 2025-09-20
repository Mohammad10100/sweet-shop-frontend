import React, { useState, useEffect } from 'react';
import { sweetsAPI } from '../services/api';
import SweetCard from '../components/sweets/SweetCard';
import SearchBar from '../components/sweets/SearchBar';
import toast from 'react-hot-toast';
import { Candy, TrendingUp, Package, DollarSign } from 'lucide-react';

const DashboardPage = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSweets: 0,
    totalValue: 0,
    outOfStock: 0,
    categories: 0
  });

  const fetchSweets = async () => {
    try {
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
    const outOfStock = sweetsData.filter(sweet => sweet.quantity === 0).length;
    const categories = new Set(sweetsData.map(sweet => sweet.category)).size;
    
    setStats({ totalSweets, totalValue, outOfStock, categories });
  };

  useEffect(() => {
    fetchSweets();
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sweet treats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sweets</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSweets}</p>
            </div>
            <Candy className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
            </div>
            <Package className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Sweet Collection ({filteredSweets.length})
        </h1>
      </div>

      {/* Sweet Cards Grid */}
      {filteredSweets.length === 0 ? (
        <div className="text-center py-12">
          <Candy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">No sweets found</p>
          <p className="text-gray-400">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSweets.map((sweet) => (
            <SweetCard
              key={sweet._id}
              sweet={sweet}
              onUpdate={fetchSweets}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;