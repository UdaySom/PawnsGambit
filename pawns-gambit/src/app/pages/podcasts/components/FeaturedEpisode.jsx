import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const FeaturedEpisode = ({ episode, onPlay }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-xl overflow-hidden text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 chess-grid opacity-10"></div>
      <div className="relative p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Episode Artwork */}
          <div className="relative flex-shrink-0">
            <div className="w-64 h-64 lg:w-48 lg:h-48 rounded-xl overflow-hidden shadow-strategic-lg">
              <Image
                src={episode?.artwork}
                alt={episode?.artworkAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="default"
              size="lg"
              onClick={() => onPlay(episode)}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white text-primary hover:bg-white/90 shadow-strategic-lg"
            >
              <Icon name="Play" size={24} />
            </Button>
          </div>

          {/* Episode Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <span className="bg-accent/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow-strategic">
                Featured Episode
              </span>
              <span className="text-white/80 text-sm">Episode {episode?.number}</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-white">
              {episode?.title}
            </h2>

            {episode?.guest && (
              <p className="text-white text-lg font-medium mb-3">
                Guest: <span className="text-accent">{episode?.guest}</span>
              </p>
            )}

            <p className="text-white/90 text-lg mb-6 max-w-2xl">
              {episode?.description}
            </p>

            <div className="flex items-center justify-center lg:justify-start space-x-6 text-white/80 text-sm mb-8">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>{formatDuration(episode?.duration)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span>{new Date(episode.publishDate)?.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Headphones" size={16} />
                <span>{episode?.listens?.toLocaleString() || '0'} listens</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={() => onPlay(episode)}
                iconName="Play"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-accent-foreground min-w-[140px]"
              >
                Play Episode
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-accent-foreground min-w-[140px]"
              >
                Download
              </Button>
              <Button
                variant="ghost"
                size="lg"
                iconName="Share"
                iconPosition="left"
                className="text-white hover:bg-white/10 min-w-[120px]"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEpisode;