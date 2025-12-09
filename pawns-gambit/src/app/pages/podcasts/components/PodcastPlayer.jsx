import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PodcastPlayer = ({ episode, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef(null);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio?.currentTime);
    const updateDuration = () => setDuration(audio?.duration);

    audio?.addEventListener('timeupdate', updateTime);
    audio?.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio?.removeEventListener('timeupdate', updateTime);
      audio?.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef?.current;
    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef?.current;
    const rect = e?.currentTarget?.getBoundingClientRect();
    const percent = (e?.clientX - rect?.left) / rect?.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const changeSpeed = () => {
    const currentIndex = speedOptions?.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speedOptions?.length;
    const newSpeed = speedOptions?.[nextIndex];
    setPlaybackSpeed(newSpeed);
    audioRef.current.playbackRate = newSpeed;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const skipTime = (seconds) => {
    const audio = audioRef?.current;
    audio.currentTime = Math.max(0, Math.min(duration, audio?.currentTime + seconds));
  };

  if (!episode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-strategic-lg z-40">
      <audio
        ref={audioRef}
        src={episode?.audioUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {/* Progress Bar */}
      <div 
        className="w-full h-1 bg-muted cursor-pointer hover:h-2 transition-all"
        onClick={handleSeek}
      >
        <div 
          className="h-full bg-accent transition-all"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Episode Info */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Headphones" size={20} className="text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm truncate">{episode?.title}</h4>
              <p className="text-xs text-muted-foreground truncate">
                Episode {episode?.number} • {episode?.guest}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => skipTime(-15)}
              className="w-8 h-8"
            >
              <Icon name="RotateCcw" size={16} />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={togglePlay}
              className="w-10 h-10"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => skipTime(30)}
              className="w-8 h-8"
            >
              <Icon name="RotateCw" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={changeSpeed}
              className="text-xs px-2 h-8"
            >
              {playbackSpeed}x
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTranscript(!showTranscript)}
              className="w-8 h-8"
            >
              <Icon name="FileText" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-8 h-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Time Display */}
          <div className="hidden sm:flex items-center space-x-2 text-xs text-muted-foreground ml-4">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Transcript Panel */}
        {showTranscript && (
          <div className="mt-4 p-4 bg-muted rounded-lg max-h-32 overflow-y-auto">
            <h5 className="font-medium text-sm mb-2">Transcript</h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {episode?.transcript || "Transcript not available for this episode."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastPlayer;