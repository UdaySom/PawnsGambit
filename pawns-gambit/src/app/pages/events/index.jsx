import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EventCard from './components/EventCard';
import EventFilters from './components/EventFilters';
import EventCalendar from './components/EventCalendar';
import EventMap from './components/EventMap';
import TournamentBracket from './components/TournamentBracket';
import PlayerSpotlight from './components/PlayerSpotlight';
import EventGallery from './components/EventGallery';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import eventService from '../../../services/eventService';

// Mock events data (fallback) - defined outside component to prevent re-creation
const mockEventsData = [
  {
    id: 1,
    title: "Downtown Chess Championship",
    description: "Annual championship tournament featuring players from across the city. Multiple rounds with Swiss system pairing.",
    type: "tournament",
    skillLevel: "all levels",
    date: "2025-11-15",
    time: "09:00",
    location: "Downtown Chess Club",
    entryFee: 25,
    prizes: "$500 Prize Pool",
    participants: 32,
    maxParticipants: 64,
    format: "classical",
    image: "https://images.unsplash.com/photo-1705925652006-209d6d908895",
    imageAlt: "Chess tournament scene with multiple players competing in organized tournament setting",
    featured: true,
    organizer: "The Pawns Gambit",
    registrationDeadline: "2025-11-10"
  },
  {
    id: 2,
    title: "Beginner\'s Workshop: Opening Principles",
    description: "Learn fundamental opening principles and common opening traps. Perfect for players rated under 1200.",
    type: "workshop",
    skillLevel: "beginner",
    date: "2025-11-08",
    time: "14:00",
    location: "Central Library",
    entryFee: 0,
    prizes: null,
    participants: 12,
    maxParticipants: 20,
    format: "lesson",
    image: "https://images.unsplash.com/photo-1702911702574-d19c882eae5b",
    imageAlt: "Chess instructor teaching opening strategies to group of beginner students around demonstration board",
    featured: false,
    organizer: "Master Elena Rodriguez",
    registrationDeadline: "2025-11-06"
  },
  {
    id: 3,
    title: "Rapid Fire Friday",
    description: "Fast-paced rapid games in a casual tournament setting. Great for improving time management skills.",
    type: "tournament",
    skillLevel: "intermediate",
    date: "2025-11-12",
    time: "18:30",
    location: "Community Center",
    entryFee: 15,
    prizes: "Trophies for Top 3",
    participants: 18,
    maxParticipants: 32,
    format: "rapid",
    image: "https://images.unsplash.com/photo-1725985791069-59f521271b27",
    imageAlt: "Players engaged in rapid chess games with chess clocks showing time pressure",
    featured: false,
    organizer: "Friday Night Chess",
    registrationDeadline: "2025-11-11"
  },
  {
    id: 4,
    title: "Washington Square Park Meetup",
    description: "Casual outdoor chess games in the iconic Washington Square Park. Bring your own set or use ours!",
    type: "casual",
    skillLevel: "all levels",
    date: "2025-11-09",
    time: "11:00",
    location: "Washington Square Park",
    entryFee: 0,
    prizes: null,
    participants: 25,
    maxParticipants: 50,
    format: "casual",
    image: "https://images.unsplash.com/photo-1728930685324-dc5d7b4136a7",
    imageAlt: "Chess players enjoying outdoor games in Washington Square Park with autumn trees in background",
    featured: false,
    organizer: "NYC Chess Meetup",
    registrationDeadline: null
  },
  {
    id: 5,
    title: "Youth Chess Festival",
    description: "Special tournament designed for young chess enthusiasts under 18. Age-group categories and coaching available.",
    type: "tournament",
    skillLevel: "all levels",
    date: "2025-11-16",
    time: "10:00",
    location: "Brooklyn Chess Academy",
    entryFee: 20,
    prizes: "Medals & Chess Sets",
    participants: 28,
    maxParticipants: 40,
    format: "rapid",
    image: "https://images.unsplash.com/photo-1635457236733-75fdd5f81a41",
    imageAlt: "Young chess players concentrating during youth tournament with parents watching supportively",
    featured: true,
    organizer: "Youth Chess Initiative",
    registrationDeadline: "2025-11-14"
  },
  {
    id: 6,
    title: "Endgame Mastery Workshop",
    description: "Advanced workshop focusing on essential endgame techniques. Suitable for players rated 1400+.",
    type: "workshop",
    skillLevel: "advanced",
    date: "2025-11-20",
    time: "15:00",
    location: "Marshall Chess Club",
    entryFee: 30,
    prizes: null,
    participants: 8,
    maxParticipants: 15,
    format: "lesson",
    image: "https://images.unsplash.com/photo-1576652255072-84872440574d",
    imageAlt: "Chess master demonstrating complex endgame positions to advanced students on large demonstration board",
    featured: false,
    organizer: "GM Alexander Petrov",
    registrationDeadline: "2025-11-18"
  }];

const Events = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    skillLevel: '',
    eventType: '',
    format: '',
    entryFee: '',
    startDate: '',
    endDate: ''
  });

  // Strapi data
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug: Track component mount/unmount
  useEffect(() => {
    console.log('🚀 Events component mounted');
    return () => console.log('💀 Events component unmounted');
  }, []);

  // Fetch events from Strapi
  useEffect(() => {
    console.log('📡 Fetching events from Strapi...');
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await eventService.fetchEvents({ pageSize: 100 });
        console.log('✅ Fetched events successfully:', data?.length || 0, 'events');
        setEvents(data || []);
      } catch (err) {
        console.error('❌ Failed to fetch events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
        console.log('🏁 Fetch completed');
      }
    };

    fetchEvents();
  }, []);

  // Use Strapi data if available, otherwise use mock data
  const eventsData = useMemo(() => {
    return events.length > 0 ? events : mockEventsData;
  }, [events]);

  // Mock featured tournament for bracket
  const featuredTournament = {
    id: 1,
    title: "Downtown Chess Championship",
    format: "Classical",
    prizes: "$500 Prize Pool"
  };

  // Mock featured players data
  const featuredPlayers = [
  {
    id: 1,
    name: "Michael Rodriguez",
    title: "FIDE Master",
    rating: 2245,
    wins: 127,
    tournaments: 23,
    winRate: 78,
    recentGames: ['W', 'W', 'D', 'W', 'L', 'W', 'W'],
    favoriteOpening: "Sicilian Defense",
    recentAchievement: "Tournament Winner",
    image: "https://images.unsplash.com/photo-1705497977562-45f98c64f4be",
    imageAlt: "Professional chess player Michael Rodriguez in formal attire holding chess piece with confident expression"
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Candidate Master",
    rating: 2156,
    wins: 89,
    tournaments: 18,
    winRate: 72,
    recentGames: ['W', 'D', 'W', 'W', 'W', 'L', 'D'],
    favoriteOpening: "Queen\'s Gambit",
    recentAchievement: "Rising Star",
    image: "https://images.unsplash.com/photo-1726661610906-a162f9cf30b5",
    imageAlt: "Professional chess player Sarah Chen smiling while analyzing chess position on board"
  },
  {
    id: 3,
    name: "David Thompson",
    title: "Expert",
    rating: 2089,
    wins: 156,
    tournaments: 31,
    winRate: 69,
    recentGames: ['L', 'W', 'W', 'D', 'W', 'W', 'W'],
    favoriteOpening: "English Opening",
    recentAchievement: "Most Improved",
    image: "https://images.unsplash.com/photo-1635457236733-75fdd5f81a41",
    imageAlt: "Experienced chess player David Thompson concentrating during competitive match in tournament hall"
  }];


  const [filteredEvents, setFilteredEvents] = useState([]);

  // Filter events based on current filters
  useEffect(() => {
    let filtered = eventsData;

    if (filters?.search) {
      filtered = filtered?.filter((event) =>
      event?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      event?.location?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      event?.organizer?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.skillLevel) {
      filtered = filtered?.filter((event) => event?.skillLevel === filters?.skillLevel);
    }

    if (filters?.eventType) {
      filtered = filtered?.filter((event) => event?.type === filters?.eventType);
    }

    if (filters?.format) {
      filtered = filtered?.filter((event) => event?.format === filters?.format);
    }

    if (filters?.entryFee) {
      if (filters?.entryFee === 'free') {
        filtered = filtered?.filter((event) => event?.entryFee === 0);
      } else if (filters?.entryFee === 'paid') {
        filtered = filtered?.filter((event) => event?.entryFee > 0);
      } else if (filters?.entryFee === 'under-20') {
        filtered = filtered?.filter((event) => event?.entryFee < 20);
      } else if (filters?.entryFee === 'under-50') {
        filtered = filtered?.filter((event) => event?.entryFee < 50);
      }
    }

    if (filters?.startDate) {
      filtered = filtered?.filter((event) => event?.date >= filters?.startDate);
    }

    if (filters?.endDate) {
      filtered = filtered?.filter((event) => event?.date <= filters?.endDate);
    }

    setFilteredEvents(filtered);
  }, [filters, eventsData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      skillLevel: '',
      eventType: '',
      format: '',
      entryFee: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleEventRegistration = (event) => {
    alert(`Registration for "${event?.title}" - This would open the registration modal in a real application.`);
  };

  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
  };

  const handlePlayerClick = (player) => {
    console.log('Player clicked:', player);
  };

  const handleImageClick = (image) => {
    console.log('Image clicked:', image);
  };

  const renderEventContent = () => {
    switch (viewMode) {
      case 'calendar':
        return (
          <EventCalendar
            events={filteredEvents}
            onEventClick={handleEventClick} />);


      case 'map':
        return (
          <EventMap
            events={filteredEvents}
            onEventClick={handleEventClick} />);


      case 'list':
        return (
          <div className="space-y-4">
            {filteredEvents?.map((event) =>
            <div key={event?.id} className="max-w-2xl">
                <EventCard
                event={event}
                onRegister={handleEventRegistration} />

              </div>
            )}
          </div>);

      default: // grid
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents?.map((event) =>
            <EventCard
              key={event?.id}
              event={event}
              onRegister={handleEventRegistration} />

            )}
          </div>);

    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Events - The Pawns Gambit | Chess Tournaments & Community Gatherings</title>
        </Helmet>
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
  if (error && events.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Events - The Pawns Gambit | Chess Tournaments & Community Gatherings</title>
        </Helmet>
        <Header />
        <main className="pt-16">
          <ErrorMessage
            title="Failed to Load Events"
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
      <Helmet>
        <title>Events - The Pawns Gambit | Chess Tournaments & Community Gatherings</title>
        <meta name="description" content="Join chess tournaments, workshops, and community gatherings. From beginner-friendly meetups to competitive championships - find your perfect chess event." />
        <meta name="keywords" content="chess tournaments, chess events, chess workshops, chess community, chess competitions, chess meetups" />
      </Helmet>
      <Header />
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 bg-animated-gradient text-white overflow-hidden">
        <div className="absolute inset-0 overlay-gradient"></div>
        <div className="absolute inset-0 chess-grid opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Chess Events & Tournaments
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Join our vibrant chess community through tournaments, workshops, and casual gatherings. 
              From beginner-friendly meetups to competitive championships.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">47</div>
              <div className="text-sm text-white/80">Events This Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">312</div>
              <div className="text-sm text-white/80">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">8</div>
              <div className="text-sm text-white/80">Venues</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">$2.5K</div>
              <div className="text-sm text-white/80">Monthly Prizes</div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <EventFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode} />


        {/* Events Content */}
        <div className="mb-12">
          {filteredEvents?.length > 0 ?
          renderEventContent() :

          <div className="text-center py-12">
              <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or check back later for new events.
              </p>
              <Button
              variant="outline"
              onClick={handleClearFilters}
              iconName="RotateCcw"
              iconPosition="left">

                Clear Filters
              </Button>
            </div>
          }
        </div>

        {/* Tournament Bracket Section */}
        <div className="mb-12">
          <TournamentBracket
            tournament={featuredTournament}
            onPlayerClick={handlePlayerClick} />

        </div>

        {/* Player Spotlight Section */}
        <div className="mb-12">
          <PlayerSpotlight
            players={featuredPlayers}
            onPlayerClick={handlePlayerClick} />

        </div>

        {/* Event Gallery Section */}
        <div className="mb-12">
          <EventGallery
            events={filteredEvents}
            onImageClick={handleImageClick} />

        </div>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 text-foreground rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Ready to Join Our Chess Community?
          </h2>
          <p className="text-lg mb-6 text-muted-foreground">
            Register for upcoming events and become part of The Pawns Gambit family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="UserPlus"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90">

              Join Community
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Calendar"
              iconPosition="left">

              View Calendar
            </Button>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border text-foreground py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Tournament Rules</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Registration Help</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Venue Information</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact Organizers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Event Types</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Tournaments</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Workshops</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Casual Play</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Youth Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Accessibility</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Code of Conduct</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Icon name="Youtube" size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} The Pawns Gambit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default Events;