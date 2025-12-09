import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityHighlights = () => {
  const highlights = [
  {
    id: 1,
    type: 'success_story',
    title: 'From Beginner to Expert: Sarah\'s Journey',
    description: `Sarah joined our community 18 months ago as a complete beginner. Through dedicated practice, tournament participation, and community support, she recently achieved her Expert rating of 2000+. Her story inspires newcomers that with persistence and the right guidance, remarkable progress is possible.`,
    image: "https://images.unsplash.com/photo-1659080907059-00adb7e98f3e",
    imageAlt: 'Smiling woman holding chess trophy at tournament table with other players in background',
    author: {
      name: 'Sarah Johnson',
      avatar: "https://images.unsplash.com/photo-1587403655231-b1734312903f",
      avatarAlt: 'Professional headshot of blonde woman in white blouse smiling at camera',
      rating: 2034,
      title: 'Expert Player'
    },
    stats: {
      timeframe: '18 months',
      rating_gain: '+800 points',
      tournaments: '12 tournaments'
    },
    badge: 'Success Story'
  },
  {
    id: 2,
    type: 'tournament_highlight',
    title: 'October Championship: Record Breaking Event',
    description: `Our October Championship saw unprecedented participation with 128 players across all skill levels. The tournament featured intense battles, brilliant combinations, and sportsmanship that exemplifies our community values. Congratulations to all participants and especially our champions!`,
    image: "https://images.unsplash.com/photo-1709020873067-66dbb6faf922",
    imageAlt: 'Large chess tournament hall filled with players competing at multiple tables under professional lighting',
    author: {
      name: 'Tournament Director',
      avatar: "https://images.unsplash.com/photo-1591162717556-40db2857b5c4",
      avatarAlt: 'Professional headshot of tournament director in formal attire with chess board background',
      rating: null,
      title: 'Event Organizer'
    },
    stats: {
      participants: '128 players',
      prize_pool: '$2,500',
      duration: '3 days'
    },
    badge: 'Tournament'
  },
  {
    id: 3,
    type: 'community_milestone',
    title: 'Celebrating 1000+ Active Members',
    description: `We\'ve reached an incredible milestone - over 1000 active members in our chess community! This achievement reflects the welcoming environment we\'ve built together. From casual players to serious competitors, everyone contributes to making The Pawns Gambit a special place for chess enthusiasts.`,
    image: "https://images.unsplash.com/photo-1594121157983-cad36915c6a0", imageAlt: 'Diverse group of chess players of all ages celebrating together in community center with chess boards',
    author: {
      name: 'Community Team', avatar: "https://images.unsplash.com/photo-1668609045837-5e2de3b006c6", avatarAlt: 'Professional woman with headphones in modern podcast studio', rating: null, title: 'Community Manager'
    },
    stats: {
      members: '1,247 active', growth: '+15% this month', retention: '89% retention'
    },
    badge: 'Milestone'
  }];


  const testimonials = [
  {
    id: 1,
    quote: `The Pawns Gambit transformed my understanding of chess. The community support and expert guidance helped me improve faster than I ever thought possible.`,
    author: 'Michael Rodriguez',
    avatar: "https://images.unsplash.com/photo-1617711084511-5671fc295c50",
    avatarAlt: 'Professional headshot of Hispanic man with beard wearing navy blue shirt',
    rating: 1850,
    improvement: '+400 points'
  },
  {
    id: 2,
    quote: `As a parent, I love how welcoming this community is for families. My daughter has grown so much in confidence through the youth programs.`,
    author: 'Jennifer Chen',
    avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    avatarAlt: 'Smiling Asian woman with short black hair in casual blue sweater',
    rating: null,
    improvement: 'Parent Member'
  },
  {
    id: 3,
    quote: `The podcast content is exceptional. Every episode teaches me something new about strategy and helps me see the game from different perspectives.`,
    author: 'David Kim',
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: 'Professional headshot of Asian man with glasses in dark suit',
    rating: 2150,
    improvement: 'Podcast Fan'
  }];


  const getBadgeColor = (type) => {
    const colorMap = {
      success_story: 'bg-success/20 text-success border-success/30',
      tournament_highlight: 'bg-accent/20 text-accent border-accent/30',
      community_milestone: 'bg-primary/20 text-primary border-primary/30'
    };
    return colorMap?.[type] || colorMap?.success_story;
  };

  return (
    <section className="bg-muted/30 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">
            Community Highlights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating the achievements, stories, and milestones that make our chess community extraordinary
          </p>
        </div>

        {/* Featured Highlights */}
        <div className="space-y-12 mb-16">
          {highlights?.map((highlight, index) =>
          <div
            key={highlight?.id}
            className={`grid lg:grid-cols-2 gap-8 items-center ${
            index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`
            }>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBadgeColor(highlight?.type)}`}>
                      <Icon name="Star" size={12} className="mr-1" />
                      {highlight?.badge}
                    </span>
                    <span className="text-sm text-muted-foreground font-mono">
                      FEATURED
                    </span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-primary">
                    {highlight?.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {highlight?.description}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4 p-4 bg-background rounded-lg border border-border">
                  <img
                  src={highlight?.author?.avatar}
                  alt={highlight?.author?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover" />

                  <div className="flex-1">
                    <p className="font-semibold text-primary">{highlight?.author?.name}</p>
                    <p className="text-sm text-muted-foreground">{highlight?.author?.title}</p>
                  </div>
                  {highlight?.author?.rating &&
                <div className="text-right">
                      <p className="font-bold text-accent">{highlight?.author?.rating}</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                }
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(highlight?.stats)?.map(([key, value]) =>
                <div key={key} className="text-center p-3 bg-background rounded-lg border border-border">
                      <p className="font-bold text-primary">{value}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {key?.replace('_', ' ')}
                      </p>
                    </div>
                )}
                </div>
              </div>

              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative overflow-hidden rounded-xl shadow-strategic-lg">
                  <Image
                  src={highlight?.image}
                  alt={highlight?.imageAlt}
                  className="w-full h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-500" />

                </div>
              </div>
            </div>
          )}
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 lg:p-12 border border-accent/20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-primary mb-4">
              What Our Members Say
            </h3>
            <p className="text-muted-foreground">
              Real stories from real members of The Pawns Gambit community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) =>
            <div
              key={testimonial?.id}
              className="bg-background rounded-xl p-6 shadow-strategic border border-border hover:shadow-strategic-lg transition-strategic">

                <div className="mb-4">
                  <Icon name="Quote" size={24} className="text-accent mb-3" />
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial?.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <img
                  src={testimonial?.avatar}
                  alt={testimonial?.avatarAlt}
                  className="w-10 h-10 rounded-full object-cover" />

                  <div className="flex-1">
                    <p className="font-semibold text-primary text-sm">
                      {testimonial?.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial?.rating ? `${testimonial?.rating} Rating` : testimonial?.improvement}
                    </p>
                  </div>
                  {testimonial?.improvement && testimonial?.rating &&
                <span className="text-xs text-success font-medium">
                      {testimonial?.improvement}
                    </span>
                }
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="default"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90">

              <Link to="/community" className="flex items-center">
                Share Your Story
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>);

};

export default CommunityHighlights;