import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'chocolate', label: '🍫 Chocolate' },
    { value: 'candy', label: '🍬 Candy' },
    { value: 'gummy', label: '🐻 Gummy' },
    { value: 'lollipop', label: '🍭 Lollipop' },
    { value: 'other', label: '🍯 Other' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = {};
    if (searchTerm.trim()) params.name = searchTerm.trim();
    if (category) params.category = category;
    if (minPrice) params.minPrice = Number(minPrice);
    if (maxPrice) params.maxPrice = Number(maxPrice);
    
    onSearch(params);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    onSearch({});
  };

  const hasActiveFilters = category || minPrice || maxPrice;
  const activeFilterCount = [category, minPrice, maxPrice].filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Main Search Row */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for delicious sweets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-base h-12"
              />
            </div>
            
            <Button 
              type="button" 
              variant={hasActiveFilters ? 'primary' : 'ghost'}
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 h-12 relative"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              {hasActiveFilters && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            
            <Button type="submit" size="lg" className="px-8 h-12">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-gray-100 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 appearance-none bg-white"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    className="h-12"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="100.00"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    className="h-12"
                  />
                </div>
              </div>
              
              {hasActiveFilters && (
                <div className="flex justify-end mt-4">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleReset}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;