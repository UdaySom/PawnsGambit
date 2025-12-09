import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PodcastFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  selectedGuest,
  onGuestChange,
  sortBy,
  onSortChange,
  onClearFilters 
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'strategy', label: 'Strategy & Tactics' },
    { value: 'openings', label: 'Chess Openings' },
    { value: 'endgames', label: 'Endgame Studies' },
    { value: 'interviews', label: 'Master Interviews' },
    { value: 'tournaments', label: 'Tournament Analysis' },
    { value: 'history', label: 'Chess History' },
    { value: 'puzzles', label: 'Puzzle Solutions' }
  ];

  const guestOptions = [
    { value: 'all', label: 'All Guests' },
    { value: 'gm-sarah-chen', label: 'GM Sarah Chen' },
    { value: 'im-marcus-rodriguez', label: 'IM Marcus Rodriguez' },
    { value: 'fm-elena-volkov', label: 'FM Elena Volkov' },
    { value: 'gm-david-kim', label: 'GM David Kim' },
    { value: 'wgm-anna-petrov', label: 'WGM Anna Petrov' },
    { value: 'cm-james-wright', label: 'CM James Wright' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'duration-short', label: 'Shortest First' },
    { value: 'duration-long', label: 'Longest First' }
  ];

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedGuest !== 'all' || sortBy !== 'newest';

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filter Episodes</span>
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search episodes, guests, topics..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Category Filter */}
        <Select
          options={categoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
          placeholder="Select category"
        />

        {/* Sort Options */}
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
          placeholder="Sort by"
        />

        {/* Guest Filter */}
        <div className="md:col-span-2 lg:col-span-1">
          <Select
            options={guestOptions}
            value={selectedGuest}
            onChange={onGuestChange}
            placeholder="Filter by guest"
          />
        </div>

        {/* Quick Filters */}
        <div className="md:col-span-2 lg:col-span-3 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Quick filters:</span>
          <Button
            variant={selectedCategory === 'strategy' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('strategy')}
          >
            Strategy
          </Button>
          <Button
            variant={selectedCategory === 'interviews' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('interviews')}
          >
            Interviews
          </Button>
          <Button
            variant={selectedCategory === 'openings' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('openings')}
          >
            Openings
          </Button>
          <Button
            variant={selectedCategory === 'tournaments' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('tournaments')}
          >
            Tournaments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PodcastFilters;