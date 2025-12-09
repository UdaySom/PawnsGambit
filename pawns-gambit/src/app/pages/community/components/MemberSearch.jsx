import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MemberSearch = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    rating: '',
    location: '',
    availability: '',
    timeControl: ''
  });

  const ratingOptions = [
    { value: '', label: 'All Ratings' },
    { value: '0-1200', label: 'Beginner (0-1200)' },
    { value: '1200-1600', label: 'Intermediate (1200-1600)' },
    { value: '1600-2000', label: 'Advanced (1600-2000)' },
    { value: '2000+', label: 'Expert (2000+)' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'downtown', label: 'Downtown' },
    { value: 'midtown', label: 'Midtown' },
    { value: 'uptown', label: 'Uptown' },
    { value: 'suburbs', label: 'Suburbs' }
  ];

  const availabilityOptions = [
    { value: '', label: 'Any Time' },
    { value: 'weekdays', label: 'Weekdays' },
    { value: 'weekends', label: 'Weekends' },
    { value: 'evenings', label: 'Evenings' },
    { value: 'mornings', label: 'Mornings' }
  ];

  const timeControlOptions = [
    { value: '', label: 'All Time Controls' },
    { value: 'blitz', label: 'Blitz (3-5 min)' },
    { value: 'rapid', label: 'Rapid (10-30 min)' },
    { value: 'classical', label: 'Classical (60+ min)' },
    { value: 'correspondence', label: 'Correspondence' }
  ];

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      rating: '',
      location: '',
      availability: '',
      timeControl: ''
    };
    setFilters(clearedFilters);
    setSearchTerm('');
    onFilterChange(clearedFilters);
    onSearch('');
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Search" size={20} className="text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Find Members</h3>
      </div>
      {/* Search Input */}
      <div className="flex space-x-3">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by name, username, or bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button
          variant="default"
          iconName="Search"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Rating Range"
          options={ratingOptions}
          value={filters?.rating}
          onChange={(value) => handleFilterChange('rating', value)}
        />
        
        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => handleFilterChange('location', value)}
        />
        
        <Select
          label="Availability"
          options={availabilityOptions}
          value={filters?.availability}
          onChange={(value) => handleFilterChange('availability', value)}
        />
        
        <Select
          label="Time Control"
          options={timeControlOptions}
          value={filters?.timeControl}
          onChange={(value) => handleFilterChange('timeControl', value)}
        />
      </div>
      {/* Clear Filters */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          iconName="X"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default MemberSearch;