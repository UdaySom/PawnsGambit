import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TournamentBracket = ({ tournament, onPlayerClick }) => {
  const [selectedRound, setSelectedRound] = useState(0);

  // Mock tournament bracket data
  const bracketData = {
    rounds: [
    {
      name: "Round 1",
      matches: [
      {
        id: 1,
        player1: { name: "Alex Chen", rating: 1850, avatar: "https://images.unsplash.com/photo-1558356811-8e77884f44d3", avatarAlt: "Professional headshot of Asian man with glasses in white shirt" },
        player2: { name: "Maria Rodriguez", rating: 1820, avatar: "https://images.unsplash.com/photo-1630949018486-5582dd02684d", avatarAlt: "Professional headshot of Hispanic woman with long dark hair in blue blazer" },
        winner: "Alex Chen",
        result: "1-0"
      },
      {
        id: 2,
        player1: { name: "David Johnson", rating: 1900, avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f", avatarAlt: "Professional headshot of African American man with short hair in navy suit" },
        player2: { name: "Sarah Williams", rating: 1780, avatar: "https://images.unsplash.com/photo-1612275857880-57d3b7676179", avatarAlt: "Professional headshot of Caucasian woman with blonde hair in gray blazer" },
        winner: "David Johnson",
        result: "1-0"
      },
      {
        id: 3,
        player1: { name: "Michael Brown", rating: 1950, avatar: "https://images.unsplash.com/photo-1732492211739-16eea9575e84", avatarAlt: "Professional headshot of Caucasian man with brown hair in black suit" },
        player2: { name: "Lisa Davis", rating: 1830, avatar: "https://images.unsplash.com/photo-1700560970703-82fd3150d5ac", avatarAlt: "Professional headshot of African American woman with curly hair in red blazer" },
        winner: "Michael Brown",
        result: "1-0"
      },
      {
        id: 4,
        player1: { name: "James Wilson", rating: 1870, avatar: "https://images.unsplash.com/photo-1667575949231-fbf430640797", avatarAlt: "Professional headshot of Caucasian man with beard in blue shirt" },
        player2: { name: "Emma Taylor", rating: 1810, avatar: "https://images.unsplash.com/photo-1523180815360-02489213a812", avatarAlt: "Professional headshot of Caucasian woman with red hair in green blazer" },
        winner: "James Wilson",
        result: "1-0"
      }]

    },
    {
      name: "Semifinals",
      matches: [
      {
        id: 5,
        player1: { name: "Alex Chen", rating: 1850, avatar: "https://images.unsplash.com/photo-1558356811-8e77884f44d3", avatarAlt: "Professional headshot of Asian man with glasses in white shirt" },
        player2: { name: "David Johnson", rating: 1900, avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f", avatarAlt: "Professional headshot of African American man with short hair in navy suit" },
        winner: "David Johnson",
        result: "0-1"
      },
      {
        id: 6,
        player1: { name: "Michael Brown", rating: 1950, avatar: "https://images.unsplash.com/photo-1732492211739-16eea9575e84", avatarAlt: "Professional headshot of Caucasian man with brown hair in black suit" },
        player2: { name: "James Wilson", rating: 1870, avatar: "https://images.unsplash.com/photo-1667575949231-fbf430640797", avatarAlt: "Professional headshot of Caucasian man with beard in blue shirt" },
        winner: "Michael Brown",
        result: "1-0"
      }]

    },
    {
      name: "Final",
      matches: [
      {
        id: 7,
        player1: { name: "David Johnson", rating: 1900, avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f", avatarAlt: "Professional headshot of African American man with short hair in navy suit" },
        player2: { name: "Michael Brown", rating: 1950, avatar: "https://images.unsplash.com/photo-1732492211739-16eea9575e84", avatarAlt: "Professional headshot of Caucasian man with brown hair in black suit" },
        winner: "Michael Brown",
        result: "0-1"
      }]

    }]

  };

  const MatchCard = ({ match, roundIndex }) => {
    const isCompleted = match?.winner;
    const isUpcoming = !isCompleted;

    return (
      <div className={`bracket-match mb-4 ${isCompleted ? 'bg-card' : 'bg-muted'}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-muted-foreground">
            Match #{match?.id}
          </div>
          {isCompleted &&
          <div className="text-xs text-success font-medium">
              Completed
            </div>
          }
        </div>
        {/* Player 1 */}
        <div
          className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
          match?.winner === match?.player1?.name ?
          'bg-success/20 border-2 border-success/30' : 'bg-muted hover:bg-muted/80'}`
          }
          onClick={() => onPlayerClick(match?.player1)}>

          <div className="flex items-center space-x-3">
            <Image
              src={match?.player1?.avatar}
              alt={match?.player1?.avatarAlt}
              className="w-8 h-8 rounded-full object-cover" />

            <div>
              <div className="font-medium text-foreground">{match?.player1?.name}</div>
              <div className="text-sm text-muted-foreground">Rating: {match?.player1?.rating}</div>
            </div>
          </div>
          {match?.winner === match?.player1?.name &&
          <Icon name="Crown" size={20} className="text-accent" />
          }
        </div>
        {/* VS Divider */}
        <div className="flex items-center justify-center my-2">
          <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            VS
          </div>
        </div>
        {/* Player 2 */}
        <div
          className={`flex items-center justify-between p-3 rounded-lg mb-3 cursor-pointer transition-colors ${
          match?.winner === match?.player2?.name ?
          'bg-success/20 border-2 border-success/30' : 'bg-muted hover:bg-muted/80'}`
          }
          onClick={() => onPlayerClick(match?.player2)}>

          <div className="flex items-center space-x-3">
            <Image
              src={match?.player2?.avatar}
              alt={match?.player2?.avatarAlt}
              className="w-8 h-8 rounded-full object-cover" />

            <div>
              <div className="font-medium text-foreground">{match?.player2?.name}</div>
              <div className="text-sm text-muted-foreground">Rating: {match?.player2?.rating}</div>
            </div>
          </div>
          {match?.winner === match?.player2?.name &&
          <Icon name="Crown" size={20} className="text-accent" />
          }
        </div>
        {/* Match Result */}
        {isCompleted &&
        <div className="text-center">
            <div className="text-sm font-medium text-foreground">
              Result: {match?.result}
            </div>
            <div className="text-xs text-muted-foreground">
              Winner: {match?.winner}
            </div>
          </div>
        }
        {isUpcoming &&
        <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Match scheduled
            </div>
          </div>
        }
      </div>);

  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Tournament Header */}
      <div className="bg-gradient-to-r from-accent/20 to-accent/10 border-b border-accent/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground">{tournament?.title}</h3>
            <p className="text-sm text-muted-foreground">{tournament?.format} Tournament Bracket</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Prize Pool</div>
            <div className="text-lg font-bold text-accent">{tournament?.prizes}</div>
          </div>
        </div>
      </div>
      {/* Round Navigation */}
      <div className="bg-muted px-6 py-3 border-b border-border">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {bracketData?.rounds?.map((round, index) =>
          <Button
            key={index}
            variant={selectedRound === index ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRound(index)}
            className="whitespace-nowrap">

              {round?.name}
            </Button>
          )}
        </div>
      </div>
      {/* Bracket Content */}
      <div className="p-6">
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-foreground mb-2">
            {bracketData?.rounds?.[selectedRound]?.name}
          </h4>
          <p className="text-sm text-muted-foreground">
            {bracketData?.rounds?.[selectedRound]?.matches?.length} match{bracketData?.rounds?.[selectedRound]?.matches?.length !== 1 ? 'es' : ''}
          </p>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bracketData?.rounds?.[selectedRound]?.matches?.map((match) =>
          <MatchCard
            key={match?.id}
            match={match}
            roundIndex={selectedRound} />

          )}
        </div>
      </div>
      {/* Tournament Stats */}
      <div className="bg-muted px-6 py-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">16</div>
            <div className="text-sm text-muted-foreground">Total Players</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">15</div>
            <div className="text-sm text-muted-foreground">Total Matches</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">11</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">4</div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </div>
        </div>
      </div>
    </div>);

};

export default TournamentBracket;