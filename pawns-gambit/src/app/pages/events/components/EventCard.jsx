import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onRegister }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getSkillLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      case 'all levels': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'tournament': return 'Trophy';
      case 'casual': return 'Coffee';
      case 'lesson': return 'BookOpen';
      case 'workshop': return 'Users';
      default: return 'Calendar';
    }
  };

  return (
    <div className="card hover-elevate transition-strategic bg-card border border-border rounded-lg overflow-hidden">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event?.image}
          alt={event?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSkillLevelColor(event?.skillLevel)}`}>
            {event?.skillLevel}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-center">
            <div className="text-sm font-bold text-foreground">
              {new Date(event.date)?.getDate()}
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(event.date)?.toLocaleDateString('en-US', { month: 'short' })}
            </div>
          </div>
        </div>
      </div>
      {/* Event Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name={getEventTypeIcon(event?.type)} size={18} className="text-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-wide">
              {event?.type}
            </span>
          </div>
          {event?.featured && (
            <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
          {event?.title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event?.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>{formatTime(event?.time)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span>{event?.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} />
            <span>{event?.participants}/{event?.maxParticipants} participants</span>
          </div>
        </div>

        {/* Entry Fee */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-foreground">
            {event?.entryFee === 0 ? 'Free' : `$${event?.entryFee}`}
          </div>
          {event?.prizes && (
            <div className="text-sm text-muted-foreground">
              Prize: {event?.prizes}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={() => onRegister(event)}
            disabled={event?.participants >= event?.maxParticipants}
            iconName="UserPlus"
            iconPosition="left"
          >
            {event?.participants >= event?.maxParticipants ? 'Full' : 'Register'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;