import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EpisodeCard = ({ episode, onPlay, isPlaying }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="card p-6 hover-elevate transition-strategic">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Episode Artwork */}
        <div className="relative flex-shrink-0">
          <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden bg-muted">
            <Image
              src={episode?.artwork}
              alt={episode?.artworkAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="default"
            size="icon"
            onClick={() => onPlay(episode)}
            className="absolute inset-0 m-auto w-12 h-12 rounded-full shadow-strategic opacity-90 hover:opacity-100"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
          </Button>
        </div>

        {/* Episode Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
                Episode {episode?.number}
              </span>
              <span>{formatDate(episode?.publishDate)}</span>
              <span>•</span>
              <span>{formatDuration(episode?.duration)}</span>
            </div>
            <div className="flex items-center space-x-1">
              {episode?.rating && (
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                  <span className="text-sm text-muted-foreground">{episode?.rating}</span>
                </div>
              )}
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{episode?.title}</h3>
          
          {episode?.guest && (
            <p className="text-accent font-medium text-sm mb-2">
              Guest: {episode?.guest}
            </p>
          )}

          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {episode?.description}
          </p>

          {/* Episode Tags */}
          {episode?.tags && episode?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {episode?.tags?.slice(0, 3)?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {episode?.tags?.length > 3 && (
                <span className="text-muted-foreground text-xs px-2 py-1">
                  +{episode?.tags?.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Share"
              iconPosition="left"
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName={episode?.isFavorite ? "Heart" : "Heart"}
              iconPosition="left"
              className={episode?.isFavorite ? "text-red-500" : ""}
            >
              {episode?.isFavorite ? "Favorited" : "Favorite"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;