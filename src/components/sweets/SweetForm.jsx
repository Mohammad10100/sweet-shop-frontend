import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Save, X } from 'lucide-react';

const SweetForm = ({ sweet, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: sweet || {
      name: '',
      category: 'candy',
      price: '',
      quantity: '',
      description: ''
    }
  });

  const categories = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'candy', label: 'Candy' },
    { value: 'gummy', label: 'Gummy' },
    { value: 'lollipop', label: 'Lollipop' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Sweet Name"
        type="text"
        placeholder="Enter sweet name"
        error={errors.name?.message}
        {...register('name', {
          required: 'Sweet name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters'
          }
        })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register('category', { required: 'Category is required' })}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price ($)"
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0"
          error={errors.price?.message}
          {...register('price', {
            required: 'Price is required',
            min: {
              value: 0.01,
              message: 'Price must be greater than 0'
            }
          })}
        />

        <Input
          label="Quantity"
          type="number"
          placeholder="0"
          min="0"
          error={errors.quantity?.message}
          {...register('quantity', {
            required: 'Quantity is required',
            min: {
              value: 0,
              message: 'Quantity cannot be negative'
            }
          })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional)
        </label>
        <textarea
          rows={4}
          placeholder="Enter sweet description..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...register('description')}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
        >
          <Save className="h-4 w-4 mr-2" />
          {sweet ? 'Update Sweet' : 'Create Sweet'}
        </Button>
      </div>
    </form>
  );
};

export default SweetForm;