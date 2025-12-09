import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractivePuzzle = ({ puzzle, episodeTitle }) => {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [userMoves, setUserMoves] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [puzzleComplete, setPuzzleComplete] = useState(false);

  const chessBoard = Array(8)?.fill(null)?.map(() => Array(8)?.fill(null));
  
  // Initialize board with puzzle position
  if (puzzle?.position) {
    puzzle?.position?.forEach(piece => {
      const file = piece?.square?.charCodeAt(0) - 97; // a=0, b=1, etc.
      const rank = 8 - parseInt(piece?.square?.[1]); // 8=0, 7=1, etc.
      chessBoard[rank][file] = piece;
    });
  }

  const handleSquareClick = (rank, file) => {
    const square = String.fromCharCode(97 + file) + (8 - rank);
    
    if (selectedSquare) {
      const move = `${selectedSquare}-${square}`;
      setUserMoves([...userMoves, move]);
      
      // Check if move matches solution
      if (puzzle?.solution && move === puzzle?.solution?.[userMoves?.length]) {
        if (userMoves?.length + 1 === puzzle?.solution?.length) {
          setPuzzleComplete(true);
        }
      }
      setSelectedSquare(null);
    } else {
      setSelectedSquare(square);
    }
  };

  const resetPuzzle = () => {
    setSelectedSquare(null);
    setUserMoves([]);
    setShowSolution(false);
    setPuzzleComplete(false);
  };

  const getSquareColor = (rank, file) => {
    const isLight = (rank + file) % 2 === 0;
    const square = String.fromCharCode(97 + file) + (8 - rank);
    
    if (selectedSquare === square) {
      return 'bg-accent/50';
    }
    return isLight ? 'bg-gray-100' : 'bg-gray-800';
  };

  const getPieceSymbol = (piece) => {
    const symbols = {
      'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
      'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
    };
    return symbols?.[piece?.type] || '';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold text-lg flex items-center space-x-2">
            <Icon name="Puzzle" size={20} className="text-accent" />
            <span>Interactive Chess Puzzle</span>
          </h4>
          <p className="text-sm text-muted-foreground">
            From: {episodeTitle}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSolution(!showSolution)}
            iconName="Eye"
            iconPosition="left"
          >
            {showSolution ? 'Hide' : 'Show'} Solution
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetPuzzle}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chess Board */}
        <div className="flex justify-center">
          <div className="inline-block border-2 border-border rounded-lg overflow-hidden">
            {chessBoard?.map((row, rank) => (
              <div key={rank} className="flex">
                {row?.map((piece, file) => (
                  <div
                    key={`${rank}-${file}`}
                    className={`w-12 h-12 flex items-center justify-center cursor-pointer text-2xl select-none ${getSquareColor(rank, file)}`}
                    onClick={() => handleSquareClick(rank, file)}
                  >
                    {piece && (
                      <span className={piece?.color === 'white' ? 'text-white drop-shadow-lg' : 'text-black'}>
                        {getPieceSymbol(piece)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Puzzle Info */}
        <div className="space-y-4">
          <div>
            <h5 className="font-medium mb-2">Objective</h5>
            <p className="text-sm text-muted-foreground">
              {puzzle?.objective || "Find the best move for White"}
            </p>
          </div>

          <div>
            <h5 className="font-medium mb-2">Difficulty</h5>
            <div className="flex items-center space-x-2">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={i < (puzzle?.difficulty || 3) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                {puzzle?.difficultyLabel || 'Intermediate'}
              </span>
            </div>
          </div>

          {userMoves?.length > 0 && (
            <div>
              <h5 className="font-medium mb-2">Your Moves</h5>
              <div className="text-sm text-muted-foreground font-mono">
                {userMoves?.join(', ')}
              </div>
            </div>
          )}

          {showSolution && puzzle?.solutionText && (
            <div className="bg-muted p-4 rounded-lg">
              <h5 className="font-medium mb-2">Solution</h5>
              <p className="text-sm text-muted-foreground">
                {puzzle?.solutionText}
              </p>
            </div>
          )}

          {puzzleComplete && (
            <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="CheckCircle" size={20} />
                <span className="font-medium">Puzzle Solved!</span>
              </div>
              <p className="text-sm text-success/80 mt-1">
                Excellent work! You found the correct solution.
              </p>
            </div>
          )}

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Discuss
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Share"
              iconPosition="left"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractivePuzzle;