import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const EpisodeDiscussion = ({ episodeId, episodeTitle }) => {
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const comments = [
  {
    id: 1,
    author: "ChessMaster2024",
    avatar: "https://images.unsplash.com/photo-1641479160067-5ae7bde244b0",
    avatarAlt: "Professional headshot of young man with brown hair in casual shirt",
    content: "Brilliant analysis of the Sicilian Defense! The way GM Chen explained the pawn structure really opened my eyes to new possibilities.",
    timestamp: new Date(Date.now() - 3600000),
    likes: 12,
    replies: 3,
    isLiked: false
  },
  {
    id: 2,
    author: "QueenSideAttack",
    avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    avatarAlt: "Professional headshot of woman with dark hair in business attire",
    content: "I\'ve been struggling with this opening for months. The tactical sequence at 23:45 was exactly what I needed to understand. Thank you!",
    timestamp: new Date(Date.now() - 7200000),
    likes: 8,
    replies: 1,
    isLiked: true
  },
  {
    id: 3,
    author: "RookiePlayer",
    avatar: "https://images.unsplash.com/photo-1666358086313-543412e1cdc2",
    avatarAlt: "Casual headshot of young man with beard wearing blue shirt",
    content: "As a beginner, I found this episode incredibly helpful. The step-by-step breakdown made complex concepts accessible.",
    timestamp: new Date(Date.now() - 10800000),
    likes: 15,
    replies: 2,
    isLiked: false
  },
  {
    id: 4,
    author: "TacticalGenius",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional photo of woman with blonde hair in white blazer",
    content: "The puzzle at the end was fantastic! Took me 15 minutes to solve, but the satisfaction was worth it. More puzzles please!",
    timestamp: new Date(Date.now() - 14400000),
    likes: 6,
    replies: 0,
    isLiked: false
  }];


  const handleSubmitComment = (e) => {
    e?.preventDefault();
    if (newComment?.trim()) {
      // Handle comment submission
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-semibold flex items-center space-x-2">
          <Icon name="MessageCircle" size={20} className="text-accent" />
          <span>Episode Discussion</span>
          <span className="text-sm text-muted-foreground font-normal">
            ({comments?.length} comments)
          </span>
        </h4>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button
            variant={sortBy === 'newest' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('newest')}>

            Newest
          </Button>
          <Button
            variant={sortBy === 'popular' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('popular')}>

            Popular
          </Button>
        </div>
      </div>
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex space-x-4">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={20} className="text-accent" />
          </div>
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Share your thoughts about this episode..."
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              className="mb-3" />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Info" size={14} />
                <span>Be respectful and constructive in your comments</span>
              </div>
              <Button
                type="submit"
                variant="default"
                size="sm"
                disabled={!newComment?.trim()}
                iconName="Send"
                iconPosition="left">

                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </form>
      {/* Comments List */}
      <div className="space-y-6">
        {comments?.map((comment) =>
        <div key={comment?.id} className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                src={comment?.avatar}
                alt={comment?.avatarAlt}
                className="w-full h-full object-cover" />

              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium text-sm">{comment?.author}</span>
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(comment?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {comment?.content}
              </p>
              
              <div className="flex items-center space-x-4">
                <Button
                variant="ghost"
                size="sm"
                className={`text-xs ${comment?.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                iconName="Heart"
                iconPosition="left">

                  {comment?.likes}
                </Button>
                
                <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                iconName="MessageCircle"
                iconPosition="left">

                  Reply
                </Button>
                
                {comment?.replies > 0 &&
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-accent">

                    View {comment?.replies} {comment?.replies === 1 ? 'reply' : 'replies'}
                  </Button>
              }
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Load More */}
      <div className="mt-8 text-center">
        <Button
          variant="outline"
          iconName="ChevronDown"
          iconPosition="left">

          Load More Comments
        </Button>
      </div>
    </div>);

};

export default EpisodeDiscussion;