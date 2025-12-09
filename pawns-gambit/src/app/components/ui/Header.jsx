import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Events', path: '/events', icon: 'Calendar' },
    { name: 'Podcast', path: '/podcast', icon: 'Headphones' },
    { name: 'Community', path: '/community', icon: 'Users' },
    { name: 'About', path: '/about', icon: 'Info' }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/homepage" className="flex items-center space-x-3 hover:opacity-80 transition-quick">
              <div className="w-10 h-10 bg-gradient-strategic rounded-lg flex items-center justify-center shadow-strategic">
              <img
                  src="/assets/images/Pawn's%20gambit%20logo.png"
                  alt="The Pawns Gambit logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-bold text-primary">
                  The Pawns Gambit
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  Strategic Chess Community
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-md transition-strategic ${
                  isActivePath(item?.path)
                    ? 'nav-link-active' :'hover:bg-accent/10 hover:text-accent'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-medium">{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Search"
              iconPosition="left"
              className="text-muted-foreground"
            >
              Search
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="UserPlus"
              iconPosition="left"
            >
              Join Community
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-foreground"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-slide-in">
            <div className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-link flex items-center space-x-3 px-4 py-3 rounded-md transition-strategic w-full ${
                    isActivePath(item?.path)
                      ? 'nav-link-active' :'hover:bg-accent/10 hover:text-accent'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.name}</span>
                </Link>
              ))}
              
              {/* Mobile Actions */}
              <div className="pt-4 border-t border-border space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Search"
                  iconPosition="left"
                  className="justify-start"
                >
                  Search
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="UserPlus"
                  iconPosition="left"
                  className="justify-start"
                >
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;