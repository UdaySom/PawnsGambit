import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlayerSpotlight = ({ players, onPlayerClick }) => {
  const FeaturedPlayer = ({ player, rank }) => {
    const getRankIcon = (rank) => {
      switch (rank) {
        case 1: return 'Crown';
        case 2: return 'Medal';
        case 3: return 'Award';
        default: return 'Star';
      }
    };

    const getRankColor = (rank) => {
      switch (rank) {
        case 1: return 'text-yellow-500';
        case 2: return 'text-gray-400';
        case 3: return 'text-amber-600';
        default: return 'text-blue-500';
      }
    };

    return (
      <div className="card hover-elevate transition-strategic cursor-pointer bg-card border-border" onClick={() => onPlayerClick(player)}>
        <div className="relative">
          {/* Player Image */}
          <div className="h-48 overflow-hidden rounded-t-lg">
            <Image
              src={player?.image}
              alt={player?.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Rank Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-card/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-border">
              <Icon name={getRankIcon(rank)} size={20} className={getRankColor(rank)} />
            </div>
          </div>

          {/* Achievement Badge */}
          {player?.recentAchievement && (
            <div className="absolute top-4 right-4">
              <div className="achievement-badge">
                {player?.recentAchievement}
              </div>
            </div>
          )}
        </div>
        <div className="p-6">
          {/* Player Info */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-foreground">{player?.name}</h3>
              <p className="text-sm text-muted-foreground">{player?.title}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-accent">{player?.rating}</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{player?.wins}</div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{player?.tournaments}</div>
              <div className="text-xs text-muted-foreground">Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{player?.winRate}%</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
          </div>

          {/* Recent Performance */}
          <div className="mb-4">
            <div className="text-sm font-medium text-foreground mb-2">Recent Performance</div>
            <div className="flex space-x-1">
              {player?.recentGames?.map((result, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    result === 'W' ?'bg-success/20 text-success border border-success/30' 
                      : result === 'L' ?'bg-destructive/20 text-destructive border border-destructive/30' :'bg-muted text-muted-foreground border border-border'
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Opening */}
          <div className="mb-4">
            <div className="text-sm font-medium text-foreground">Favorite Opening</div>
            <div className="text-sm text-muted-foreground">{player?.favoriteOpening}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              fullWidth
              iconName="User"
              iconPosition="left"
            >
              View Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent/20 to-accent/10 border-b border-accent/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground">Player Spotlight</h3>
            <p className="text-sm text-muted-foreground">Top performers and rising stars</p>
          </div>
          <Icon name="Users" size={24} className="text-accent" />
        </div>
      </div>
      {/* Featured Players Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players?.map((player, index) => (
            <FeaturedPlayer 
              key={player?.id} 
              player={player} 
              rank={index + 1}
            />
          ))}
        </div>
      </div>
      {/* Community Stats */}
      <div className="bg-muted px-6 py-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">247</div>
            <div className="text-sm text-muted-foreground">Active Players</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">1,892</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">156</div>
            <div className="text-sm text-muted-foreground">Games This Week</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">23</div>
            <div className="text-sm text-muted-foreground">New Members</div>
          </div>
        </div>
      </div>
      {/* View All Players */}
      <div className="px-6 py-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="Users"
          iconPosition="left"
        >
          View All Community Players
        </Button>
      </div>
    </div>
  );
};

export default PlayerSpotlight;