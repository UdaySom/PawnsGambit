import React from 'react';
import Icon from '../../app/components/AppIcon';
import Button from '../../app/components/ui/Button';

const ErrorMessage = ({ 
  title = 'Something went wrong', 
  message = 'We encountered an error. Please try again later.',
  onRetry,
  fullScreen = false 
}) => {
  const content = (
    <div className="text-center py-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <Icon name="AlertCircle" size={32} className="text-red-600 dark:text-red-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="default"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Try Again
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full px-4">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default ErrorMessage;

