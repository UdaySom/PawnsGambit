import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../app/components/AppIcon';
import Button from '../../app/components/ui/Button';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowRegister(true)}
          >
            Sign Up
          </Button>
        </div>

        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={handleSwitchToRegister}
        />
        <RegisterModal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </>
    );
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-medium hidden md:block">
            {user?.username}
          </span>
          <Icon name={showDropdown ? 'ChevronUp' : 'ChevronDown'} size={16} />
        </button>

        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-strategic-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
              
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              >
                <Icon name="User" size={16} />
                <span>Profile</span>
              </button>
              
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              >
                <Icon name="Settings" size={16} />
                <span>Settings</span>
              </button>
              
              <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                <button
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserMenu;

