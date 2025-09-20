import React from 'react';
import { clsx } from 'clsx';

const Input = React.forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder-gray-400 transition-colors focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;