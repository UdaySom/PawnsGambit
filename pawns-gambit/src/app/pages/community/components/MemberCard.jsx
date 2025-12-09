import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MemberCard = ({ member, onViewProfile, onMessage }) => {
  const getRatingColor = (rating) => {
    if (rating >= 2000) return 'text-yellow-600';
    if (rating >= 1600) return 'text-blue-600';
    if (rating >= 1200) return 'text-green-600';
    return 'text-gray-600';
  };

  const getRatingTitle = (rating) => {
    if (rating >= 2000) return 'Expert';
    if (rating >= 1600) return 'Advanced';
    if (rating >= 1200) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="card p-6 hover-elevate transition-strategic">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={member?.avatar}
            alt={member?.avatarAlt}
            className="w-16 h-16 rounded-full object-cover"
          />
          {member?.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {member?.name}
            </h3>
            {member?.badges?.length > 0 && (
              <div className="flex space-x-1">
                {member?.badges?.slice(0, 2)?.map((badge, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                    title={badge?.name}
                  >
                    <Icon name={badge?.icon} size={14} className="text-white" />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <Icon name="Trophy" size={16} className={getRatingColor(member?.rating)} />
              <span className={`font-medium ${getRatingColor(member?.rating)}`}>
                {member?.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                {getRatingTitle(member?.rating)}
              </span>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span>{member?.location}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {member?.bio}
          </p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{member?.gamesPlayed} games</span>
              <span>{member?.winRate}% win rate</span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="User"
                onClick={() => onViewProfile(member?.id)}
              >
                Profile
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="MessageCircle"
                onClick={() => onMessage(member?.id)}
              >
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;