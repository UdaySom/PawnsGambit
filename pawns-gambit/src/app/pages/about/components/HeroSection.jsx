import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-accent/20 text-white overflow-hidden">
      <div className="absolute inset-0 chess-grid opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Every Pawn Has
                <span className="text-accent block">Potential</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                The Pawns Gambit transforms local chess culture into a thriving digital ecosystem, 
                building bridges between diverse players united by their love of the game.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Users"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-primary font-semibold">

                Join Our Community
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Heart"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary">

                Volunteer With Us
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-strategic-lg">
              <Image
                src="https://images.unsplash.com/photo-1666558893179-fe3ebf7c6e5c"
                alt="Diverse group of chess players of different ages gathered around chess boards in warm community setting"
                className="w-full h-96 object-cover" />

            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-accent/20 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;