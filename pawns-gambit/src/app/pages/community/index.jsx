import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MemberCard from './components/MemberCard';
import ActivityFeed from './components/ActivityFeed';
import CommunityStats from './components/CommunityStats';
import NewsCard from './components/NewsCard';
import AchievementBadge from './components/AchievementBadge';
import MemberSearch from './components/MemberSearch';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import communityService from '../../../services/communityService';

const Community = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Strapi data
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [membersData, statsData] = await Promise.all([
          communityService.fetchMembers({ pageSize: 100 }),
          communityService.fetchStats()
        ]);
        setMembers(membersData || []);
        setStats(statsData);
      } catch (err) {
        console.error('Failed to fetch community data:', err);
        setError('Failed to load community data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Mock data for community stats (fallback)
  const mockCommunityStats = {
    totalMembers: 2847,
    activePlayers: 1523,
    gamesPlayed: 15420,
    tournaments: 89,
    memberGrowth: 12,
    activeGrowth: 8,
    gamesGrowth: 23,
    tournamentGrowth: 15
  };

  // Mock data for community members (fallback)
  const mockCommunityMembers = [
  {
    id: 1,
    name: "Alexandra Chen",
    avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    avatarAlt: "Professional Asian woman with shoulder-length black hair smiling at camera",
    rating: 1847,
    location: "Downtown",
    bio: "Chess enthusiast and tournament organizer. Love teaching beginners and analyzing classical games.",
    gamesPlayed: 342,
    winRate: 68,
    isOnline: true,
    badges: [
    { name: "Tournament Winner", icon: "Trophy" },
    { name: "Community Helper", icon: "Heart" }]

  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    avatar: "https://images.unsplash.com/photo-1623967484275-7d59e4b9f151",
    avatarAlt: "Hispanic man with beard wearing casual blue shirt outdoors",
    rating: 2156,
    location: "Midtown",
    bio: "FIDE Master with 15 years of competitive experience. Available for coaching and analysis sessions.",
    gamesPlayed: 1247,
    winRate: 74,
    isOnline: false,
    badges: [
    { name: "Master Player", icon: "Crown" },
    { name: "Mentor", icon: "GraduationCap" }]

  },
  {
    id: 3,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1648466982925-65dac4ed0814",
    avatarAlt: "Young blonde woman in professional attire smiling warmly",
    rating: 1423,
    location: "Uptown",
    bio: "Returning to chess after a long break. Looking for friendly games and study partners.",
    gamesPlayed: 89,
    winRate: 52,
    isOnline: true,
    badges: [
    { name: "Comeback Player", icon: "RotateCcw" }]

  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1724128192920-a6f9083d6aac",
    avatarAlt: "Asian man with glasses in business casual attire",
    rating: 1789,
    location: "Downtown",
    bio: "Software engineer who loves tactical puzzles and rapid games. Active in weekend tournaments.",
    gamesPlayed: 567,
    winRate: 61,
    isOnline: true,
    badges: [
    { name: "Puzzle Master", icon: "Puzzle" },
    { name: "Regular Player", icon: "Calendar" }]

  }];


  // Mock data for recent activities
  const recentActivities = [
  {
    id: 1,
    type: 'tournament_win',
    user: {
      name: 'Alexandra Chen',
      avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      avatarAlt: 'Professional Asian woman with shoulder-length black hair smiling at camera'
    },
    description: 'Won the Weekly Rapid Tournament with a perfect 5/5 score!',
    timestamp: new Date(Date.now() - 1800000),
    metadata: {
      event: 'Weekly Rapid Tournament',
      rating: '+24 points'
    },
    actions: [
    { label: 'View Games', icon: 'Eye' },
    { label: 'Congratulate', icon: 'Heart' }]

  },
  {
    id: 2,
    type: 'new_member',
    user: {
      name: 'Emma Wilson',
      avatar: "https://images.unsplash.com/photo-1665615837076-9d5ac005529c",
      avatarAlt: 'Young woman with curly brown hair wearing casual sweater'
    },
    description: 'Joined The Pawns Gambit community and played their first tournament game!',
    timestamp: new Date(Date.now() - 3600000),
    actions: [
    { label: 'Welcome', icon: 'UserPlus' }]

  },
  {
    id: 3,
    type: 'achievement',
    user: {
      name: 'Marcus Rodriguez',
      avatar: "https://images.unsplash.com/photo-1623967484275-7d59e4b9f151",
      avatarAlt: 'Hispanic man with beard wearing casual blue shirt outdoors'
    },
    description: 'Earned the "Mentor" badge for helping 10+ new players improve their game.',
    timestamp: new Date(Date.now() - 7200000),
    actions: [
    { label: 'View Profile', icon: 'User' }]

  },
  {
    id: 4,
    type: 'game_result',
    user: {
      name: 'David Kim',
      avatar: "https://images.unsplash.com/photo-1724128192920-a6f9083d6aac",
      avatarAlt: 'Asian man with glasses in business casual attire'
    },
    description: 'Defeated a 1900-rated opponent in a brilliant tactical game.',
    timestamp: new Date(Date.now() - 10800000),
    metadata: {
      opponent: 'Robert Smith (1912)',
      rating: '+18 points'
    },
    actions: [
    { label: 'Analyze', icon: 'Search' }]

  }];


  // Mock data for chess news and articles
  const chessNews = [
  {
    id: 1,
    title: "Mastering the Sicilian Defense: A Complete Guide for Club Players",
    excerpt: "Learn the key principles and main variations of the Sicilian Defense, the most popular response to 1.e4. This comprehensive guide covers everything from basic setups to advanced tactical themes.",
    category: "Strategy",
    author: "GM Sarah Martinez",
    publishedAt: "2025-11-01",
    readTime: 8,
    views: 1247,
    comments: 23,
    likes: 89,
    image: "https://images.unsplash.com/photo-1705043694763-978b6e1bff6c",
    imageAlt: "Chess board showing Sicilian Defense opening position with black and white pieces"
  },
  {
    id: 2,
    title: "Local Tournament Spotlight: November Championship Results",
    excerpt: "Congratulations to all participants in our November Championship! See the final standings, memorable games, and photos from this exciting event.",
    category: "Tournament",
    author: "Tournament Director",
    publishedAt: "2025-11-02",
    readTime: 5,
    views: 892,
    comments: 34,
    likes: 67,
    image: "https://images.unsplash.com/photo-1705925652006-209d6d908895",
    imageAlt: "Chess tournament scene with multiple players competing at wooden tables"
  },
  {
    id: 3,
    title: "Building a Stronger Chess Community: Member Spotlight Series",
    excerpt: "Meet the amazing members who make our community special. This week we feature three players who have shown exceptional sportsmanship and dedication.",
    category: "Community",
    author: "Community Team",
    publishedAt: "2025-10-30",
    readTime: 6,
    views: 654,
    comments: 18,
    likes: 45,
    image: "https://images.unsplash.com/photo-1709973791180-f0f6780d5205",
    imageAlt: "Group of diverse chess players sitting around table discussing strategy"
  }];

  // Use Strapi data if available, otherwise use mock data
  const communityMembers = members.length > 0 ? members : mockCommunityMembers;
  const communityStats = stats || mockCommunityStats;

  // Mock data for achievements
  const featuredAchievements = [
  {
    name: "Tournament Champion",
    description: "Win a monthly tournament",
    icon: "Trophy",
    rarity: "legendary",
    isNew: false
  },
  {
    name: "Community Helper",
    description: "Help 5+ new members",
    icon: "Heart",
    rarity: "epic",
    isNew: true
  },
  {
    name: "Puzzle Master",
    description: "Solve 100 tactical puzzles",
    icon: "Puzzle",
    rarity: "rare",
    isNew: false
  },
  {
    name: "Regular Player",
    description: "Play 50+ games",
    icon: "Calendar",
    rarity: "common",
    isNew: false
  }];


  const tabs = [
  { id: 'members', label: 'Members', icon: 'Users' },
  { id: 'activity', label: 'Activity', icon: 'Activity' },
  { id: 'news', label: 'News & Tips', icon: 'FileText' },
  { id: 'achievements', label: 'Achievements', icon: 'Award' }];


  const handleSearch = (searchTerm) => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      if (searchTerm) {
        let filtered = communityMembers?.filter((member) =>
        member?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        member?.bio?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
        setSearchResults(filtered);
      } else {
        setSearchResults(communityMembers);
      }
      setIsSearching(false);
    }, 500);
  };

  const handleFilterChange = (filters) => {
    // Apply filters to member list
    let filtered = [...communityMembers];

    if (filters?.rating) {
      const [min, max] = filters?.rating?.includes('+') ?
      [2000, 3000] :
      filters?.rating?.split('-')?.map(Number);
      filtered = filtered?.filter((member) =>
      member?.rating >= min && (max ? member?.rating <= max : true)
      );
    }

    if (filters?.location) {
      filtered = filtered?.filter((member) =>
      member?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    setSearchResults(filtered);
  };

  const handleViewProfile = (memberId) => {
    console.log('View profile:', memberId);
    // Navigate to member profile
  };

  const handleMessage = (memberId) => {
    console.log('Message member:', memberId);
    // Open messaging interface
  };

  const handleReadMore = (articleId) => {
    console.log('Read article:', articleId);
    // Navigate to full article
  };

  useEffect(() => {
    setSearchResults(communityMembers);
  }, [communityMembers]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="xl" />
          </div>
        </main>
      </div>
    );
  }

  // Show error state with retry
  if (error && members.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <ErrorMessage
            title="Failed to Load Community"
            message={error}
            onRetry={() => window.location.reload()}
            fullScreen
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/95 to-accent/20 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Chess Community Hub
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Connect with fellow chess enthusiasts, track your progress, and be part of a thriving community where every pawn has the potential to become a queen.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="UserPlus"
                  iconPosition="left">

                  Join Community
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white hover:text-primary">

                  Start Discussion
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <CommunityStats stats={communityStats} />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-strategic border-b-2 ${
                activeTab === tab?.id ?
                'border-accent text-accent' : 'border-transparent text-muted-foreground hover:text-foreground'}`
                }>

                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'members' &&
              <div className="space-y-8">
                  <MemberSearch
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange} />

                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {isSearching ?
                  <div className="col-span-full text-center py-12">
                        <Icon name="Loader2" size={32} className="animate-spin text-accent mx-auto mb-4" />
                        <p className="text-muted-foreground">Searching members...</p>
                      </div> :
                  searchResults?.length > 0 ?
                  searchResults?.map((member) =>
                  <MemberCard
                    key={member?.id}
                    member={member}
                    onViewProfile={handleViewProfile}
                    onMessage={handleMessage} />

                  ) :

                  <div className="col-span-full text-center py-12">
                        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No members found matching your criteria.</p>
                      </div>
                  }
                  </div>
                </div>
              }

              {activeTab === 'activity' &&
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold text-foreground mb-6">Recent Activity</h2>
                    <ActivityFeed activities={recentActivities} />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Top Contributors</h3>
                      <div className="space-y-4">
                        {communityMembers?.slice(0, 3)?.map((member) =>
                      <div key={member?.id} className="flex items-center space-x-3">
                            <img
                          src={member?.avatar}
                          alt={member?.avatarAlt}
                          className="w-10 h-10 rounded-full object-cover" />

                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{member?.name}</p>
                              <p className="text-sm text-muted-foreground">{member?.rating} rating</p>
                            </div>
                            <div className="flex space-x-1">
                              {member?.badges?.slice(0, 2)?.map((badge, index) =>
                          <AchievementBadge
                            key={index}
                            achievement={badge}
                            size="small" />

                          )}
                            </div>
                          </div>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              }

              {activeTab === 'news' &&
              <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-foreground">Chess News & Strategy Tips</h2>
                    <Button
                    variant="outline"
                    iconName="Plus"
                    iconPosition="left">

                      Submit Article
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chessNews?.map((article) =>
                  <NewsCard
                    key={article?.id}
                    article={article}
                    onReadMore={handleReadMore} />

                  )}
                  </div>
                </div>
              }

              {activeTab === 'achievements' &&
              <div className="space-y-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-semibold text-foreground">Community Achievements</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Earn badges and recognition for your contributions to the chess community. 
                      From tournament victories to helping fellow players improve their game.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {featuredAchievements?.map((achievement, index) =>
                  <div key={index} className="text-center space-y-3">
                        <AchievementBadge achievement={achievement} size="large" />
                        <div>
                          <h3 className="font-medium text-foreground">{achievement?.name}</h3>
                          <p className="text-sm text-muted-foreground">{achievement?.description}</p>
                        </div>
                      </div>
                  )}
                  </div>
                  
                  <div className="card p-8 text-center">
                    <Icon name="Target" size={48} className="text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Ready to Earn Your First Badge?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Join a tournament, help a fellow player, or contribute to our community discussions.
                    </p>
                    <Button
                    variant="default"
                    iconName="Trophy"
                    iconPosition="left">

                      View All Achievements
                    </Button>
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-accent/10">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Join Our Chess Community?
            </h2>
            <p className="text-lg text-muted-foreground">
              Connect with players of all skill levels, participate in tournaments, 
              and improve your game in a supportive environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="UserPlus"
                iconPosition="left">

                Become a Member
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left">

                View Upcoming Events
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Crown" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">The Pawns Gambit</span>
              </div>
              <p className="text-gray-300">
                Building the strongest chess community, one move at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-quick">Members</a></li>
                <li><a href="#" className="hover:text-white transition-quick">Tournaments</a></li>
                <li><a href="#" className="hover:text-white transition-quick">Leaderboards</a></li>
                <li><a href="#" className="hover:text-white transition-quick">Achievements</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-quick">Chess Tips</a></li>
                <li><a href="#" className="hover:text-white transition-quick">Strategy Guides</a></li>
                <li><a href="#" className="hover:text-white transition-quick">Podcast</a></li>
                <li><a href="#" className="hover:text-white transition-quick">News</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-quick">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-quick">Join Discord</a></li>
                <li><a href="#" className="hover:text-white transition-quick">Follow Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-quick">Newsletter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date()?.getFullYear()} The Pawns Gambit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default Community;