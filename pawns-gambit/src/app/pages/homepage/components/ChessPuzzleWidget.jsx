import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChessPuzzleWidget = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [userScore, setUserScore] = useState(0);

  const dailyPuzzles = [
  {
    id: 1,
    title: "Mate in 2",
    difficulty: "Intermediate",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R",
    solution: "Qd5+ followed by Qxf7#",
    description: "White to move and deliver checkmate in exactly 2 moves",
    points: 150,
    solvedBy: 342,
    attempts: 567
  },
  {
    id: 2,
    title: "Tactical Shot",
    difficulty: "Advanced",
    fen: "r2qkb1r/ppp2ppp/2n1bn2/3pp3/3PP3/2N2N2/PPP2PPP/R1BQKB1R",
    solution: "Nxe5! wins material",
    description: "Find the tactical blow that wins material for White",
    points: 200,
    solvedBy: 189,
    attempts: 423
  }];


  const leaderboard = [
  {
    rank: 1,
    name: "Alexandra Chen",
    avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    avatarAlt: "Professional headshot of Asian woman with long black hair in business attire",
    score: 2850,
    streak: 15,
    badge: "Grandmaster"
  },
  {
    rank: 2,
    name: "Marcus Rodriguez",
    avatar: "https://images.unsplash.com/photo-1617711084511-5671fc295c50",
    avatarAlt: "Professional headshot of Hispanic man with beard wearing navy blue shirt",
    score: 2720,
    streak: 12,
    badge: "Master"
  },
  {
    rank: 3,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1587403655231-b1734312903f",
    avatarAlt: "Professional headshot of blonde woman in white blouse smiling at camera",
    score: 2680,
    streak: 8,
    badge: "Expert"
  },
  {
    rank: 4,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: "Professional headshot of Asian man with glasses in dark suit",
    score: 2590,
    streak: 6,
    badge: "Expert"
  }];


  const puzzle = dailyPuzzles?.[currentPuzzle];

  const handleSquareClick = (square) => {
    setSelectedSquare(square);
  };

  const handleShowSolution = () => {
    setShowSolution(!showSolution);
    if (!showSolution) {
      setUserScore((prev) => prev + puzzle?.points);
    }
  };

  const nextPuzzle = () => {
    setCurrentPuzzle((prev) => (prev + 1) % dailyPuzzles?.length);
    setShowSolution(false);
    setSelectedSquare(null);
  };

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">
            Daily Chess Puzzle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharpen your tactical skills with our daily puzzle challenge. Compete with the community and climb the leaderboard!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chess Puzzle Board */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-strategic border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-heading font-bold text-primary">
                    {puzzle?.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    puzzle?.difficulty === 'Intermediate' ? 'bg-warning/20 text-warning' : 'bg-destructive/20 text-destructive'}`
                    }>
                      {puzzle?.difficulty}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {puzzle?.points} points
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Solved by {puzzle?.solvedBy}/{puzzle?.attempts}
                  </p>
                  <div className="w-32 bg-muted rounded-full h-2 mt-1">
                    <div
                      className="bg-success h-2 rounded-full transition-all duration-300"
                      style={{ width: `${puzzle?.solvedBy / puzzle?.attempts * 100}%` }}>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simplified Chess Board Representation */}
              <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="grid grid-cols-8 gap-1 max-w-md mx-auto">
                  {Array.from({ length: 64 }, (_, i) => {
                    const row = Math.floor(i / 8);
                    const col = i % 8;
                    const isLight = (row + col) % 2 === 0;
                    const squareId = `${String.fromCharCode(97 + col)}${8 - row}`;

                    return (
                      <button
                        key={i}
                        onClick={() => handleSquareClick(squareId)}
                        className={`aspect-square flex items-center justify-center text-xs font-mono transition-all duration-200 ${
                        isLight ?
                        'bg-chess-light hover:bg-accent/20' : 'bg-chess-dark hover:bg-accent/30'} ${

                        selectedSquare === squareId ?
                        'ring-2 ring-accent' : ''}`
                        }
                        aria-label={`Chess square ${squareId}`}>

                        {/* Simplified piece representation */}
                        {(i === 4 || i === 60) && '♔'}
                        {(i === 3 || i === 59) && '♕'}
                        {(i === 2 || i === 5 || i === 58 || i === 61) && '♗'}
                        {(i === 1 || i === 6 || i === 57 || i === 62) && '♘'}
                        {(i === 0 || i === 7 || i === 56 || i === 63) && '♖'}
                      </button>);

                  })}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {puzzle?.description}
                </p>
                
                {showSolution &&
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="Lightbulb" size={20} className="text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium text-success mb-1">Solution:</h4>
                        <p className="text-sm text-foreground">{puzzle?.solution}</p>
                      </div>
                    </div>
                  </div>
                }

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant={showSolution ? "secondary" : "default"}
                    onClick={handleShowSolution}
                    iconName={showSolution ? "Eye" : "EyeOff"}
                    iconPosition="left"
                    className="flex-1">

                    {showSolution ? "Hide Solution" : "Show Solution"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={nextPuzzle}
                    iconName="RotateCcw"
                    iconPosition="left">

                    Next Puzzle
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-card rounded-xl shadow-strategic border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-heading font-bold text-primary">
                Puzzle Masters
              </h3>
              <Icon name="Trophy" size={20} className="text-accent" />
            </div>

            <div className="space-y-4">
              {leaderboard?.map((player) =>
              <div
                key={player?.rank}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-strategic">

                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                      src={player?.avatar}
                      alt={player?.avatarAlt}
                      className="w-10 h-10 rounded-full object-cover" />

                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {player?.rank}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-primary truncate">
                        {player?.name}
                      </p>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-accent/20 text-accent">
                        {player?.badge}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      <p className="text-sm text-muted-foreground">
                        {player?.score?.toLocaleString()} pts
                      </p>
                      <div className="flex items-center space-x-1">
                        <Icon name="Flame" size={12} className="text-orange-500" />
                        <span className="text-xs text-muted-foreground">
                          {player?.streak}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <Button
                variant="outline"
                fullWidth
                iconName="BarChart3"
                iconPosition="left">

                View Full Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default ChessPuzzleWidget;