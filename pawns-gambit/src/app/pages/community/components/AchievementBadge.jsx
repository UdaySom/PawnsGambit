import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ achievement, size = 'default' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const iconSizes = {
    small: 16,
    default: 20,
    large: 24
  };

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white';
      case 'epic': return 'bg-gradient-to-br from-purple-500 to-pink-500 text-white';
      case 'rare': return 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white';
      case 'common': return 'bg-gradient-to-br from-green-500 to-emerald-500 text-white';
      default: return 'bg-gradient-to-br from-gray-400 to-gray-500 text-white';
    }
  };

  return (
    <div 
      className={`${sizeClasses?.[size]} rounded-full flex items-center justify-center shadow-strategic ${getBadgeColor(achievement?.rarity)} relative group cursor-pointer`}
      title={achievement?.description}
    >
      <Icon name={achievement?.icon} size={iconSizes?.[size]} />
      {achievement?.isNew && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      )}
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
        <div className="font-medium">{achievement?.name}</div>
        <div className="text-xs text-gray-300">{achievement?.description}</div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
};

export default AchievementBadge;