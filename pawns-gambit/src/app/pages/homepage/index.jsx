import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ChessPuzzleWidget from './components/ChessPuzzleWidget';
import QuickAccessCards from './components/QuickAccessCards';
import LiveActivityFeed from './components/LiveActivityFeed';
import CommunityHighlights from './components/CommunityHighlights';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section with Featured Content Carousel */}
        <HeroSection />
        
        {/* Interactive Chess Puzzle Widget */}
        <ChessPuzzleWidget />
        
        {/* Quick Access Cards for Key Actions */}
        <QuickAccessCards />
        
        {/* Live Activity Feed */}
        <LiveActivityFeed />
        
        {/* Community Highlights and Success Stories */}
        <CommunityHighlights />
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border text-foreground py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-strategic rounded-lg flex items-center justify-center shadow-strategic">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                    <circle cx="12" cy="12" r="3" fill="var(--color-accent)" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground">The Pawns Gambit</h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    Strategic Chess Community
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                Where strategy meets community. Every pawn has the potential to become a queen. 
                Join our thriving chess community and discover your strategic potential.
              </p>
              
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-accent/20 transition-strategic"
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-foreground">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-accent/20 transition-strategic"
                  aria-label="Twitter"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-foreground">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-accent/20 transition-strategic"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-foreground">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/events" className="text-muted-foreground hover:text-accent transition-quick">
                    Tournaments
                  </a>
                </li>
                <li>
                  <a href="/podcast" className="text-muted-foreground hover:text-accent transition-quick">
                    Podcast
                  </a>
                </li>
                <li>
                  <a href="/community" className="text-muted-foreground hover:text-accent transition-quick">
                    Community
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-muted-foreground hover:text-accent transition-quick">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading font-semibold mb-4 text-foreground">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>contact@pawnsgambit.com</li>
                <li>(555) 123-CHESS</li>
                <li>123 Strategy Street<br />Chess City, CC 12345</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date()?.getFullYear()} The Pawns Gambit. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-accent text-sm transition-quick">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent text-sm transition-quick">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent text-sm transition-quick">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;