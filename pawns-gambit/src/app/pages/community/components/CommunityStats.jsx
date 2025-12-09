import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Members',
      value: stats?.totalMembers,
      icon: 'Users',
      color: 'text-blue-600 bg-blue-50',
      change: stats?.memberGrowth
    },
    {
      label: 'Active Players',
      value: stats?.activePlayers,
      icon: 'Activity',
      color: 'text-green-600 bg-green-50',
      change: stats?.activeGrowth
    },
    {
      label: 'Games Played',
      value: stats?.gamesPlayed,
      icon: 'Gamepad2',
      color: 'text-purple-600 bg-purple-50',
      change: stats?.gamesGrowth
    },
    {
      label: 'Tournaments',
      value: stats?.tournaments,
      icon: 'Trophy',
      color: 'text-yellow-600 bg-yellow-50',
      change: stats?.tournamentGrowth
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'k';
    }
    return num?.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems?.map((item, index) => (
        <div key={index} className="card p-6 text-center hover-elevate transition-strategic">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${item?.color}`}>
            <Icon name={item?.icon} size={24} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">
              {formatNumber(item?.value)}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              {item?.label}
            </p>
            
            {item?.change && (
              <div className={`flex items-center justify-center space-x-1 text-xs ${
                item?.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <Icon 
                  name={item?.change > 0 ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                />
                <span>{Math.abs(item?.change)}% this month</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityStats;