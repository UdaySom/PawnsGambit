import React from 'react';
import Icon from '../../../components/AppIcon';

const PodcastStats = () => {
  const stats = [
    {
      icon: "Headphones",
      label: "Total Listens",
      value: "2.4M",
      change: "+12%",
      changeType: "positive"
    },
    {
      icon: "Users",
      label: "Subscribers",
      value: "45.2K",
      change: "+8%",
      changeType: "positive"
    },
    {
      icon: "MessageCircle",
      label: "Episode Discussions",
      value: "1,247",
      change: "+23%",
      changeType: "positive"
    },
    {
      icon: "Star",
      label: "Average Rating",
      value: "4.8",
      change: "+0.2",
      changeType: "positive"
    }
  ];

  const platforms = [
    {
      name: "Apple Podcasts",
      icon: "Smartphone",
      listeners: "1.2M",
      percentage: 50
    },
    {
      name: "Spotify",
      icon: "Music",
      listeners: "720K",
      percentage: 30
    },
    {
      name: "Google Podcasts",
      icon: "Radio",
      listeners: "360K",
      percentage: 15
    },
    {
      name: "Other Platforms",
      icon: "Globe",
      listeners: "120K",
      percentage: 5
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
        <Icon name="BarChart3" size={20} className="text-accent" />
        <span>Podcast Analytics</span>
      </h4>
      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name={stat?.icon} size={20} className="text-accent" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">{stat?.value}</div>
            <div className="text-sm text-muted-foreground mb-2">{stat?.label}</div>
            <div className={`text-xs font-medium ${
              stat?.changeType === 'positive' ? 'text-success' : 'text-destructive'
            }`}>
              {stat?.change} this month
            </div>
          </div>
        ))}
      </div>
      {/* Platform Distribution */}
      <div>
        <h5 className="font-medium mb-4">Listener Distribution by Platform</h5>
        <div className="space-y-4">
          {platforms?.map((platform, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name={platform?.icon} size={16} className="text-accent" />
                </div>
                <span className="font-medium text-sm">{platform?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-muted rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${platform?.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground font-medium min-w-[60px] text-right">
                  {platform?.listeners}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="mt-8 pt-6 border-t border-border">
        <h5 className="font-medium mb-4">Recent Achievements</h5>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="Trophy" size={12} className="text-success" />
            </div>
            <span className="text-muted-foreground">
              Reached <span className="font-medium text-foreground">2M total downloads</span> milestone
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Star" size={12} className="text-accent" />
            </div>
            <span className="text-muted-foreground">
              Featured in <span className="font-medium text-foreground">Apple Podcasts</span> chess category
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Users" size={12} className="text-primary" />
            </div>
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">40K+ subscribers</span> across all platforms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastStats;