import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <div className="text-lg font-medium text-gray-700">Loading dashboard...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;