import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import FounderSection from './components/FounderSection';
import TimelineSection from './components/TimelineSection';
import TeamSection from './components/TeamSection';
import ImpactSection from './components/ImpactSection';
import VolunteerSection from './components/VolunteerSection';
import PartnershipSection from './components/PartnershipSection';
import PressSection from './components/PressSection';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <MissionSection />
        <FounderSection />
        <TimelineSection />
        <TeamSection />
        <ImpactSection />
        <VolunteerSection />
        <PartnershipSection />
        <PressSection />
      </main>
      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
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
                  <h3 className="text-xl font-bold">The Pawns Gambit</h3>
                  <p className="text-sm text-gray-300">Strategic Chess Community</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Building bridges between diverse players united by their love of chess. 
                Every pawn has potential, and every move matters in our community.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/events" className="hover:text-accent transition-quick">Events</a></li>
                <li><a href="/podcast" className="hover:text-accent transition-quick">Podcast</a></li>
                <li><a href="/community" className="hover:text-accent transition-quick">Community</a></li>
                <li><a href="#volunteer" className="hover:text-accent transition-quick">Volunteer</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>info@thepawnsgambit.com</li>
                <li>(555) 123-4567</li>
                <li>Downtown Chess Hub</li>
                <li>123 Strategy Street</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date()?.getFullYear()} The Pawns Gambit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;