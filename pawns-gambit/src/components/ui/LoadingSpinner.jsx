import React from 'react';
import { cn } from '../../lib/utils';

const LoadingSpinner = ({ size = 'md', className, fullScreen = false }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full border-primary border-t-transparent',
        sizes[size],
        className
      )}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;

