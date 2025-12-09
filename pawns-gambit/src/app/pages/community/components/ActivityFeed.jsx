import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'tournament_win': return 'Trophy';
      case 'new_member': return 'UserPlus';
      case 'achievement': return 'Award';
      case 'game_result': return 'Gamepad2';
      case 'article': return 'FileText';
      case 'event': return 'Calendar';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'tournament_win': return 'text-yellow-600 bg-yellow-50';
      case 'new_member': return 'text-blue-600 bg-blue-50';
      case 'achievement': return 'text-purple-600 bg-purple-50';
      case 'game_result': return 'text-green-600 bg-green-50';
      case 'article': return 'text-indigo-600 bg-indigo-50';
      case 'event': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-4">
      {activities?.map((activity) => (
        <div key={activity?.id} className="card p-4 hover:shadow-md transition-strategic">
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={18} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                {activity?.user?.avatar && (
                  <Image
                    src={activity?.user?.avatar}
                    alt={activity?.user?.avatarAlt}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="font-medium text-foreground">{activity?.user?.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-foreground mt-1">{activity?.description}</p>
              
              {activity?.metadata && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {activity?.metadata?.opponent && (
                    <span>vs {activity?.metadata?.opponent}</span>
                  )}
                  {activity?.metadata?.rating && (
                    <span className="ml-2">Rating: {activity?.metadata?.rating}</span>
                  )}
                  {activity?.metadata?.event && (
                    <span className="ml-2">Event: {activity?.metadata?.event}</span>
                  )}
                </div>
              )}
              
              {activity?.actions && activity?.actions?.length > 0 && (
                <div className="flex space-x-2 mt-3">
                  {activity?.actions?.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      iconName={action?.icon}
                    >
                      {action?.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;