import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const EventFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  viewMode, 
  onViewModeChange 
}) => {
  const skillLevelOptions = [
    { value: '', label: 'All Skill Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'all levels', label: 'All Levels' }
  ];

  const eventTypeOptions = [
    { value: '', label: 'All Event Types' },
    { value: 'tournament', label: 'Tournament' },
    { value: 'casual', label: 'Casual Play' },
    { value: 'lesson', label: 'Lesson' },
    { value: 'workshop', label: 'Workshop' }
  ];

  const formatOptions = [
    { value: '', label: 'All Formats' },
    { value: 'blitz', label: 'Blitz (≤10 min)' },
    { value: 'rapid', label: 'Rapid (10-60 min)' },
    { value: 'classical', label: 'Classical (≥60 min)' }
  ];

  const entryFeeOptions = [
    { value: '', label: 'Any Entry Fee' },
    { value: 'free', label: 'Free Events' },
    { value: 'paid', label: 'Paid Events' },
    { value: 'under-20', label: 'Under $20' },
    { value: 'under-50', label: 'Under $50' }
  ];

  const viewModes = [
    { mode: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { mode: 'list', icon: 'List', label: 'List View' },
    { mode: 'calendar', icon: 'Calendar', label: 'Calendar View' },
    { mode: 'map', icon: 'Map', label: 'Map View' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Search and View Mode */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex-1 max-w-md mb-4 lg:mb-0">
          <Input
            type="search"
            placeholder="Search events, locations, or organizers..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.mode}
              variant={viewMode === mode?.mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange(mode?.mode)}
              iconName={mode?.icon}
              className="hidden sm:flex"
            >
              {mode?.label}
            </Button>
          ))}
          
          {/* Mobile View Mode Selector */}
          <div className="sm:hidden">
            <Select
              options={viewModes?.map(mode => ({ 
                value: mode?.mode, 
                label: mode?.label 
              }))}
              value={viewMode}
              onChange={onViewModeChange}
              placeholder="View Mode"
            />
          </div>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
        <Select
          label="Skill Level"
          options={skillLevelOptions}
          value={filters?.skillLevel}
          onChange={(value) => onFilterChange('skillLevel', value)}
          placeholder="Select skill level"
        />

        <Select
          label="Event Type"
          options={eventTypeOptions}
          value={filters?.eventType}
          onChange={(value) => onFilterChange('eventType', value)}
          placeholder="Select event type"
        />

        <Select
          label="Format"
          options={formatOptions}
          value={filters?.format}
          onChange={(value) => onFilterChange('format', value)}
          placeholder="Select format"
        />

        <Select
          label="Entry Fee"
          options={entryFeeOptions}
          value={filters?.entryFee}
          onChange={(value) => onFilterChange('entryFee', value)}
          placeholder="Select fee range"
        />

        <Input
          type="date"
          label="Start Date"
          value={filters?.startDate}
          onChange={(e) => onFilterChange('startDate', e?.target?.value)}
        />

        <Input
          type="date"
          label="End Date"
          value={filters?.endDate}
          onChange={(e) => onFilterChange('endDate', e?.target?.value)}
        />
      </div>
      {/* Active Filters and Clear */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center space-x-2 mb-2 lg:mb-0">
          {Object.entries(filters)?.map(([key, value]) => {
            if (!value || key === 'search') return null;
            return (
              <div
                key={key}
                className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm flex items-center space-x-2"
              >
                <span>{key}: {value}</span>
                <button
                  onClick={() => onFilterChange(key, '')}
                  className="hover:text-accent/70"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default EventFilters;