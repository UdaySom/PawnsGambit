import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NewsCard = ({ article, onReadMore }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'tournament': return 'bg-yellow-100 text-yellow-800';
      case 'strategy': return 'bg-blue-100 text-blue-800';
      case 'community': return 'bg-green-100 text-green-800';
      case 'news': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card overflow-hidden hover-elevate transition-strategic">
      {article?.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article?.image}
            alt={article?.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article?.category)}`}>
              {article?.category}
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{formatDate(article?.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{article?.readTime} min read</span>
          </div>
          {article?.author && (
            <div className="flex items-center space-x-1">
              <Icon name="User" size={14} />
              <span>{article?.author}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
          {article?.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {article?.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{article?.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={14} />
              <span>{article?.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span>{article?.likes}</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => onReadMore(article?.id)}
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;