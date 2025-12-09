import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PodcastPlayer from './components/PodcastPlayer';
import EpisodeCard from './components/EpisodeCard';
import FeaturedEpisode from './components/FeaturedEpisode';
import PodcastFilters from './components/PodcastFilters';
import InteractivePuzzle from './components/InteractivePuzzle';
import EpisodeDiscussion from './components/EpisodeDiscussion';
import PodcastStats from './components/PodcastStats';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import podcastService from '../../../services/podcastService';

const PodcastPage = () => {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGuest, setSelectedGuest] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showStats, setShowStats] = useState(false);
  
  // Strapi data
  const [episodes, setEpisodes] = useState([]);
  const [featuredEpisode, setFeaturedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch episodes from Strapi
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [allEpisodes, featured] = await Promise.all([
          podcastService.fetchEpisodes({ pageSize: 100 }),
          podcastService.fetchFeaturedEpisode()
        ]);
        
        setEpisodes(allEpisodes || []);
        setFeaturedEpisode(featured || allEpisodes?.[0]);
      } catch (err) {
        console.error('Failed to fetch podcasts:', err);
        setError('Failed to load podcast episodes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  // Mock podcast episodes data (fallback for when Strapi has no data)
  const mockEpisodes = [
  {
    id: 1,
    number: 127,
    title: "Mastering the Sicilian Defense: Advanced Tactical Patterns",
    description: "Join GM Sarah Chen as she breaks down the most effective tactical patterns in the Sicilian Defense. We explore key pawn structures, piece coordination, and winning endgame techniques that will elevate your understanding of this complex opening system.",
    guest: "GM Sarah Chen",
    duration: 78,
    publishDate: "2025-10-28",
    artwork: "https://images.unsplash.com/photo-1656986490630-669bd2d6bf55",
    artworkAlt: "Close-up of chess pieces on wooden board with dramatic lighting",
    audioUrl: "/audio/episode-127.mp3",
    category: "strategy",
    tags: ["Sicilian Defense", "Tactics", "Pawn Structure"],
    rating: 4.9,
    listens: 15420,
    isFavorite: true,
    transcript: "Welcome to The Pawns Gambit podcast. Today we're diving deep into the Sicilian Defense with Grandmaster Sarah Chen. Sarah, let's start with the fundamental pawn structure that defines this opening..."
  },
  {
    id: 2,
    number: 126,
    title: "Tournament Psychology: Mental Preparation for Competitive Play",
    description: "International Master Marcus Rodriguez shares his insights on developing mental resilience and maintaining focus during high-pressure tournament situations. Learn practical techniques for managing time pressure and emotional control.",
    guest: "IM Marcus Rodriguez",
    duration: 65,
    publishDate: "2025-10-21",
    artwork: "https://images.unsplash.com/photo-1635457236733-75fdd5f81a41",
    artworkAlt: "Chess tournament scene with focused players in competition hall",
    audioUrl: "/audio/episode-126.mp3",
    category: "tournaments",
    tags: ["Psychology", "Tournament Play", "Mental Training"],
    rating: 4.7,
    listens: 12890,
    isFavorite: false,
    transcript: "Mental preparation is often the difference between winning and losing in tournament play. Today we explore the psychological aspects of competitive chess..."
  },
  {
    id: 3,
    number: 125,
    title: "The Art of Endgame Calculation: Precision Under Pressure",
    description: "FM Elena Volkov demonstrates advanced endgame calculation techniques and shares her systematic approach to finding the most accurate moves in complex positions. Perfect for players rated 1800 and above.",
    guest: "FM Elena Volkov",
    duration: 82,
    publishDate: "2025-10-14",
    artwork: "https://images.unsplash.com/photo-1576430235848-a4b2c91c9708",
    artworkAlt: "Elegant chess endgame position with few pieces on marble board",
    audioUrl: "/audio/episode-125.mp3",
    category: "endgames",
    tags: ["Endgames", "Calculation", "Precision"],
    rating: 4.8,
    listens: 11250,
    isFavorite: false,
    transcript: "Endgame calculation requires a different mindset than middlegame tactics. Let's explore the systematic approach that separates masters from amateurs..."
  },
  {
    id: 4,
    number: 124,
    title: "Chess History Deep Dive: The Immortal Game Revisited",
    description: "Explore the legendary 1851 match between Adolf Anderssen and Lionel Kieseritzky. We analyze every move, discuss the historical context, and examine how this game influenced modern chess theory and romantic-era playing style.",
    guest: "GM David Kim",
    duration: 95,
    publishDate: "2025-10-07",
    artwork: "https://images.unsplash.com/photo-1688267161772-3be8423a2a5c",
    artworkAlt: "Vintage chess set with ornate pieces on antique wooden table",
    audioUrl: "/audio/episode-124.mp3",
    category: "history",
    tags: ["Chess History", "Classic Games", "Analysis"],
    rating: 4.9,
    listens: 18750,
    isFavorite: true,
    transcript: "The Immortal Game represents the pinnacle of romantic chess. Every move tells a story of sacrifice, beauty, and tactical brilliance..."
  },
  {
    id: 5,
    number: 123,
    title: "Opening Repertoire Building: The Modern Approach",
    description: "WGM Anna Petrov guides us through building a coherent opening repertoire for club players. Learn how to choose openings that match your playing style and develop a systematic study approach.",
    guest: "WGM Anna Petrov",
    duration: 71,
    publishDate: "2025-09-30",
    artwork: "https://images.unsplash.com/photo-1707980716730-bb5ee71051cd",
    artworkAlt: "Modern chess setup with digital board and analysis tools",
    audioUrl: "/audio/episode-123.mp3",
    category: "openings",
    tags: ["Opening Theory", "Repertoire", "Study Methods"],
    rating: 4.6,
    listens: 9870,
    isFavorite: false,
    transcript: "Building an opening repertoire is like constructing a house - you need a solid foundation and a clear architectural plan..."
  },
  {
    id: 6,
    number: 122,
    title: "Tactical Pattern Recognition: The Master\'s Secret",
    description: "CM James Wright breaks down the most common tactical motifs and teaches pattern recognition techniques used by masters. Includes interactive puzzles and practical exercises for immediate improvement.",
    guest: "CM James Wright",
    duration: 58,
    publishDate: "2025-09-23",
    artwork: "https://images.unsplash.com/photo-1705043694763-978b6e1bff6c",
    artworkAlt: "Chess tactical position showing complex piece interaction and combinations",
    audioUrl: "/audio/episode-122.mp3",
    category: "puzzles",
    tags: ["Tactics", "Pattern Recognition", "Puzzles"],
    rating: 4.8,
    listens: 14320,
    isFavorite: true,
    transcript: "Pattern recognition is the foundation of tactical vision. Today we\'ll explore how masters instantly recognize winning combinations..."
  }];

  // Use mock data if no episodes loaded from Strapi
  const displayEpisodes = episodes.length > 0 ? episodes : mockEpisodes;
  const displayFeaturedEpisode = featuredEpisode || displayEpisodes?.[0];

  // Interactive puzzle data
  const interactivePuzzle = {
    id: 1,
    objective: "White to move and win material",
    difficulty: 4,
    difficultyLabel: "Advanced",
    position: [
    { square: 'e1', type: 'K', color: 'white' },
    { square: 'd1', type: 'Q', color: 'white' },
    { square: 'a1', type: 'R', color: 'white' },
    { square: 'h1', type: 'R', color: 'white' },
    { square: 'c1', type: 'B', color: 'white' },
    { square: 'f1', type: 'B', color: 'white' },
    { square: 'b1', type: 'N', color: 'white' },
    { square: 'g1', type: 'N', color: 'white' },
    { square: 'e8', type: 'k', color: 'black' },
    { square: 'd8', type: 'q', color: 'black' },
    { square: 'a8', type: 'r', color: 'black' },
    { square: 'h8', type: 'r', color: 'black' },
    { square: 'c8', type: 'b', color: 'black' },
    { square: 'f8', type: 'b', color: 'black' },
    { square: 'b8', type: 'n', color: 'black' },
    { square: 'g8', type: 'n', color: 'black' }],

    solution: ['d1-d8', 'e8-d8'],
    solutionText: "1. Qd8+! forces the king to capture, winning the black queen for a queen trade that favors White's position due to better piece coordination."
  };

  // Filter episodes based on search and filters
  const filteredEpisodes = displayEpisodes?.filter((episode) => {
    const matchesSearch = episode?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    episode?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    episode?.guest?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || episode?.category === selectedCategory;
    const matchesGuest = selectedGuest === 'all' || episode?.guest?.toLowerCase()?.includes(selectedGuest?.toLowerCase());

    return matchesSearch && matchesCategory && matchesGuest;
  });

  // Sort episodes
  const sortedEpisodes = [...filteredEpisodes]?.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.publishDate) - new Date(b.publishDate);
      case 'popular':
        return b?.listens - a?.listens;
      case 'rating':
        return b?.rating - a?.rating;
      case 'duration-short':
        return a?.duration - b?.duration;
      case 'duration-long':
        return b?.duration - a?.duration;
      default: // newest
        return new Date(b.publishDate) - new Date(a.publishDate);
    }
  });

  const handlePlayEpisode = async (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
    
    // Increment listen count in Strapi
    if (episode?.id) {
      await podcastService.incrementListens(episode.id, episode.listens);
    }
  };

  const handleClosePlayer = () => {
    setCurrentEpisode(null);
    setIsPlaying(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedGuest('all');
    setSortBy('newest');
  };

  useEffect(() => {
    document.title = 'Podcast Universe - The Pawns Gambit';
  }, []);

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
  if (error && episodes.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <ErrorMessage
            title="Failed to Load Podcasts"
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
        <section className="relative bg-animated-gradient text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 overlay-gradient"></div>
          <div className="absolute inset-0 chess-grid opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-strategic">
                  <Icon name="Headphones" size={32} className="text-accent-foreground" />
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white">
                  Podcast Universe
                </h1>
              </div>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Master-level strategy analysis, expert interviews, and interactive chess content that establishes The Pawns Gambit as your trusted chess authority
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => handlePlayEpisode(displayFeaturedEpisode)}
                  iconName="Play"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90 min-w-[180px]">

                  Play Latest Episode
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Rss"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white hover:text-accent-foreground min-w-[180px]">

                  Subscribe to Podcast
                </Button>
              </div>

              {/* Platform Links */}
              <div className="flex items-center justify-center space-x-6 text-white/80">
                <span className="text-sm">Listen on:</span>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-white hover:text-accent">
                    Apple Podcasts
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:text-accent">
                    Spotify
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:text-accent">
                    Google Podcasts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Featured Episode */}
          <section className="mb-16">
            <FeaturedEpisode
              episode={displayFeaturedEpisode}
              onPlay={handlePlayEpisode} />

          </section>

          {/* Filters and Stats Toggle */}
          <section className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">All Episodes</h2>
                <p className="text-muted-foreground">
                  Explore our complete library of {displayEpisodes?.length} episodes
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowStats(!showStats)}
                iconName="BarChart3"
                iconPosition="left">

                {showStats ? 'Hide' : 'Show'} Analytics
              </Button>
            </div>

            <PodcastFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedGuest={selectedGuest}
              onGuestChange={setSelectedGuest}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={clearFilters} />

          </section>

          {/* Analytics Panel */}
          {showStats &&
          <section className="mb-12">
              <PodcastStats />
            </section>
          }

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Episodes List */}
            <section className="xl:col-span-2">
              <div className="space-y-6">
                {sortedEpisodes?.length > 0 ?
                sortedEpisodes?.map((episode) =>
                <EpisodeCard
                  key={episode?.id}
                  episode={episode}
                  onPlay={handlePlayEpisode}
                  isPlaying={currentEpisode?.id === episode?.id && isPlaying} />

                ) :

                <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-foreground">No episodes found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search terms or filters
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                }
              </div>

              {/* Load More */}
              {sortedEpisodes?.length > 0 &&
              <div className="text-center mt-12">
                  <Button
                  variant="outline"
                  size="lg"
                  iconName="ChevronDown"
                  iconPosition="left">

                    Load More Episodes
                  </Button>
                </div>
              }
            </section>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Interactive Puzzle */}
              <InteractivePuzzle
                puzzle={interactivePuzzle}
                episodeTitle={displayFeaturedEpisode?.title} />


              {/* Episode Discussion */}
              <EpisodeDiscussion
                episodeId={displayFeaturedEpisode?.id}
                episodeTitle={displayFeaturedEpisode?.title} />


              {/* Newsletter Signup */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                <h4 className="font-semibold mb-3 flex items-center space-x-2 text-foreground">
                  <Icon name="Mail" size={20} className="text-accent" />
                  <span>Never Miss an Episode</span>
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get notified when new episodes are released and receive exclusive chess content.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />

                  <Button
                    variant="default"
                    fullWidth
                    iconName="Send"
                    iconPosition="left"
                    className="bg-accent hover:bg-accent/90">

                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-semibold mb-4 text-foreground">Follow The Pawns Gambit</h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Twitter"
                    iconPosition="left"
                    className="justify-start">

                    @ThePawnsGambit
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Youtube"
                    iconPosition="left"
                    className="justify-start">

                    YouTube Channel
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Instagram"
                    iconPosition="left"
                    className="justify-start">

                    Instagram
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      {/* Podcast Player */}
      {currentEpisode &&
      <PodcastPlayer
        episode={currentEpisode}
        onClose={handleClosePlayer} />

      }
      {/* Footer */}
      <footer className="bg-card border-t border-border text-foreground py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-foreground">The Pawns Gambit Podcast</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted source for chess strategy, master interviews, and interactive learning content.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div><a href="/episodes" className="text-muted-foreground hover:text-accent transition-quick">All Episodes</a></div>
                <div><a href="/guests" className="text-muted-foreground hover:text-accent transition-quick">Featured Guests</a></div>
                <div><a href="/puzzles" className="text-muted-foreground hover:text-accent transition-quick">Interactive Puzzles</a></div>
                <div><a href="/subscribe" className="text-muted-foreground hover:text-accent transition-quick">Subscribe</a></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>podcast@thepawnsgambit.com</div>
                <div>Submit guest suggestions</div>
                <div>Request episode topics</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} The Pawns Gambit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default PodcastPage;