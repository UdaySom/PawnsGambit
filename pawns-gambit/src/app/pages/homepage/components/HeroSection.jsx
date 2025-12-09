import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredContent = [
  {
    id: 1,
    type: "tournament",
    title: "November Championship Finals",
    subtitle: "Watch the best players compete for the crown",
    description: "Join us for the most anticipated tournament of the year featuring 64 players competing in a Swiss system format.",
    image: "https://images.unsplash.com/photo-1663449036254-dc098d3cd8e5",
    imageAlt: "Chess tournament hall with multiple players competing at wooden tables under bright lighting",
    cta: "View Tournament",
    ctaLink: "/events",
    badge: "Live Now"
  },
  {
    id: 2,
    type: "podcast",
    title: "Master\'s Mind: Tactical Brilliance",
    subtitle: "Episode 47 with GM Sarah Chen",
    description: "Dive deep into tactical patterns and combinations that separate masters from amateurs in this enlightening conversation.",
    image: "https://images.unsplash.com/photo-1576250670488-4a00a3ed480e",
    imageAlt: "Professional woman with headphones recording podcast in modern studio with chess board visible",
    cta: "Listen Now",
    ctaLink: "/podcast",
    badge: "New Episode"
  },
  {
    id: 3,
    type: "community",
    title: "Community Milestone: 1000 Members!",
    subtitle: "Celebrating our growing chess family",
    description: "From humble beginnings to a thriving community of chess enthusiasts. Thank you for making The Pawns Gambit special.",
    image: "https://images.unsplash.com/photo-1683107007541-7f189413d91c",
    imageAlt: "Group of diverse chess players celebrating together around multiple chess boards in community center",
    cta: "Join Community",
    ctaLink: "/community",
    badge: "Milestone"
  }];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredContent?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredContent?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredContent?.length) % featuredContent?.length);
  };

  const current = featuredContent?.[currentSlide];

  return (
    <section className="relative bg-animated-gradient overflow-hidden">
      <div className="absolute inset-0 overlay-gradient"></div>
      <div className="absolute inset-0 chess-grid opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
                  <Icon name="Star" size={14} className="mr-1" />
                  {current?.badge}
                </span>
                <span className="text-sm text-muted-foreground font-mono">
                  {current?.type?.toUpperCase()}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-primary leading-tight">
                {current?.title}
              </h1>
              
              <p className="text-xl text-accent font-medium">
                {current?.subtitle}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {current?.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="bg-primary hover:bg-primary/90">

                <Link to={current?.ctaLink} className="flex items-center">
                  {current?.cta}
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Users"
                iconPosition="left">

                <Link to="/community" className="flex items-center">
                  Join Community
                </Link>
              </Button>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center space-x-2">
              {featuredContent?.map((_, index) =>
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ?
                'bg-accent scale-110' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`
                }
                aria-label={`Go to slide ${index + 1}`} />

              )}
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-strategic-lg">
              <Image
                src={current?.image}
                alt={current?.imageAlt}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105" />

              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-strategic hover:bg-background transition-strategic"
                aria-label="Previous slide">

                <Icon name="ChevronLeft" size={20} className="text-primary" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-strategic hover:bg-background transition-strategic"
                aria-label="Next slide">

                <Icon name="ChevronRight" size={20} className="text-primary" />
              </button>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-strategic-lg p-6 border border-border">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Icon name="Trophy" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">1000+</p>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;