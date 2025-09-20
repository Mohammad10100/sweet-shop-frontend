import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Package, Plus } from 'lucide-react';

const RestockModal = ({ isOpen, onClose, sweet, onRestock, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleRestockSubmit = async (data) => {
    await onRestock(sweet._id, parseInt(data.quantity));
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!sweet) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Restock Sweet">
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900">{sweet.name}</h3>
          <p className="text-sm text-gray-600">Category: {sweet.category}</p>
          <p className="text-sm text-gray-600">Current Stock: {sweet.quantity} items</p>
          <p className="text-sm text-gray-600">Price: ${sweet.price}</p>
        </div>

        <form onSubmit={handleSubmit(handleRestockSubmit)} className="space-y-4">
          <Input
            label="Quantity to Add"
            type="number"
            placeholder="Enter quantity to add"
            min="1"
            error={errors.quantity?.message}
            {...register('quantity', {
              required: 'Quantity is required',
              min: {
                value: 1,
                message: 'Quantity must be at least 1'
              }
            })}
          />

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              <Plus className="h-4 w-4 mr-2" />
              Restock
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RestockModal;