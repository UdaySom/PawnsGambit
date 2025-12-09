import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');

  const mockActivities = [
  {
    id: 1,
    type: 'tournament',
    title: 'November Championship - Round 3 Results',
    description: 'Alexandra Chen defeats Marcus Rodriguez in a brilliant Queen\'s Gambit',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    user: {
      name: 'Tournament Director',
      avatar: "https://images.unsplash.com/photo-1591162717556-40db2857b5c4",
      avatarAlt: 'Professional headshot of tournament director in formal attire with chess board background'
    },
    metadata: {
      icon: 'Trophy',
      color: 'accent',
      badge: 'Live'
    }
  },
  {
    id: 2,
    type: 'community',
    title: 'New Member Spotlight',
    description: 'Welcome Sarah Kim to The Pawns Gambit! She just achieved her first tournament victory.',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    user: {
      name: 'Sarah Kim',
      avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      avatarAlt: 'Smiling Asian woman with short black hair in casual blue sweater'
    },
    metadata: {
      icon: 'UserPlus',
      color: 'success',
      badge: 'New'
    }
  },
  {
    id: 3,
    type: 'podcast',
    title: 'Episode 47: Tactical Brilliance Now Live',
    description: 'GM Sarah Chen shares insights on tactical pattern recognition and calculation methods',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    user: {
      name: 'Podcast Team',
      avatar: "https://images.unsplash.com/photo-1668609045837-5e2de3b006c6",
      avatarAlt: 'Professional woman with headphones in modern podcast studio'
    },
    metadata: {
      icon: 'Headphones',
      color: 'primary',
      badge: 'New Episode'
    }
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Rating Milestone Achieved',
    description: 'David Rodriguez just crossed 2000 rating! Congratulations on reaching Expert level.',
    timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
    user: {
      name: 'David Rodriguez',
      avatar: "https://images.unsplash.com/photo-1659080907105-64d884411c5a",
      avatarAlt: 'Hispanic man with beard smiling while holding chess trophy'
    },
    metadata: {
      icon: 'Award',
      color: 'warning',
      badge: 'Achievement'
    }
  },
  {
    id: 5,
    type: 'tournament',
    title: 'December Blitz Tournament Registration Open',
    description: 'Fast-paced 5+3 blitz tournament with $1000 prize pool. Registration closes Nov 30th.',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    user: {
      name: 'Event Coordinator',
      avatar: "https://images.unsplash.com/photo-1679666715451-600413fb0f5f",
      avatarAlt: 'Professional woman in business attire organizing chess tournament materials'
    },
    metadata: {
      icon: 'Clock',
      color: 'accent',
      badge: 'Registration'
    }
  },
  {
    id: 6,
    type: 'community',
    title: 'Weekly Puzzle Challenge Winner',
    description: 'Michael Chen solved this week\'s puzzle in record time! Check out his solution analysis.',
    timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
    user: {
      name: 'Michael Chen',
      avatar: "https://images.unsplash.com/photo-1723995766278-e28118f9f0d3",
      avatarAlt: 'Asian man with glasses concentrating over chess board in study room'
    },
    metadata: {
      icon: 'Puzzle',
      color: 'success',
      badge: 'Winner'
    }
  }];


  useEffect(() => {
    setActivities(mockActivities);
  }, []);

  const filteredActivities = activities?.filter((activity) =>
  filter === 'all' || activity?.type === filter
  );

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const getColorClasses = (color) => {
    const colorMap = {
      accent: 'text-accent bg-accent/10 border-accent/20',
      primary: 'text-primary bg-primary/10 border-primary/20',
      success: 'text-success bg-success/10 border-success/20',
      warning: 'text-warning bg-warning/10 border-warning/20'
    };
    return colorMap?.[color] || colorMap?.accent;
  };

  const filterOptions = [
  { value: 'all', label: 'All Activity', icon: 'Activity' },
  { value: 'tournament', label: 'Tournaments', icon: 'Trophy' },
  { value: 'podcast', label: 'Podcast', icon: 'Headphones' },
  { value: 'community', label: 'Community', icon: 'Users' },
  { value: 'achievement', label: 'Achievements', icon: 'Award' }];


  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">
              Live Activity Feed
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest happenings in our chess community
            </p>
          </div>

          {/* Activity Filters */}
          <div className="flex flex-wrap gap-2 mt-6 lg:mt-0">
            {filterOptions?.map((option) =>
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-strategic ${
              filter === option?.value ?
              'bg-accent text-white' : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'}`
              }>

                <Icon name={option?.icon} size={16} />
                <span>{option?.label}</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Activity Stream */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredActivities?.map((activity) =>
              <div
                key={activity?.id}
                className="bg-card rounded-xl shadow-strategic border border-border p-6 hover:shadow-strategic-lg transition-strategic">

                  <div className="flex items-start space-x-4">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <img
                      src={activity?.user?.avatar}
                      alt={activity?.user?.avatarAlt}
                      className="w-12 h-12 rounded-full object-cover" />

                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${getColorClasses(activity?.metadata?.color)}`}>
                          <Icon name={activity?.metadata?.icon} size={16} />
                        </div>
                        
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getColorClasses(activity?.metadata?.color)}`}>
                          {activity?.metadata?.badge}
                        </span>
                        
                        <span className="text-sm text-muted-foreground">
                          {getTimeAgo(activity?.timestamp)}
                        </span>
                      </div>

                      <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                        {activity?.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {activity?.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          by {activity?.user?.name}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <button className="text-muted-foreground hover:text-accent transition-quick">
                            <Icon name="Heart" size={16} />
                          </button>
                          <button className="text-muted-foreground hover:text-accent transition-quick">
                            <Icon name="MessageCircle" size={16} />
                          </button>
                          <button className="text-muted-foreground hover:text-accent transition-quick">
                            <Icon name="Share2" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left">

                Load More Activities
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card rounded-xl shadow-strategic border border-border p-6">
              <h3 className="text-lg font-heading font-bold text-primary mb-4">
                Community Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">1,247</p>
                      <p className="text-sm text-muted-foreground">Active Members</p>
                    </div>
                  </div>
                  <span className="text-xs text-success">+12 today</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name="Trophy" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">23</p>
                      <p className="text-sm text-muted-foreground">Tournaments</p>
                    </div>
                  </div>
                  <span className="text-xs text-success">+2 this week</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                      <Icon name="Headphones" size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">47</p>
                      <p className="text-sm text-muted-foreground">Podcast Episodes</p>
                    </div>
                  </div>
                  <span className="text-xs text-success">New episode</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-card rounded-xl shadow-strategic border border-border p-6">
              <h3 className="text-lg font-heading font-bold text-primary mb-4">
                Upcoming Events
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-primary text-sm">Blitz Tournament</p>
                    <p className="text-xs text-muted-foreground">Nov 15, 7:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-primary text-sm">Beginner Workshop</p>
                    <p className="text-xs text-muted-foreground">Nov 18, 2:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-primary text-sm">Monthly Meetup</p>
                    <p className="text-xs text-muted-foreground">Nov 22, 6:00 PM</p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                fullWidth
                iconName="Calendar"
                iconPosition="left"
                className="mt-4">

                <Link to="/events" className="flex items-center justify-center w-full">
                  View All Events
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default LiveActivityFeed;