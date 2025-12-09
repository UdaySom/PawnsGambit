import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FounderSection = () => {
  const founderStory = {
    name: "Alexandra Chen",
    title: "Founder & Community Builder",
    image: "https://images.unsplash.com/photo-1730575959795-c55aba81e703",
    imageAlt: "Professional Asian woman with shoulder-length black hair smiling warmly in business casual attire",
    quote: `"I started The Pawns Gambit because I believe chess has the power to bring people together across all boundaries. Every player was once a beginner, and every master remembers their first checkmate."`,
    story: `Alexandra discovered chess at age 12 in her local library and fell in love with the game's perfect blend of art and science. After years of competitive play and teaching, she noticed a gap in the chess community—talented players were scattered across the city with no central hub to connect, learn, and grow together.\n\nIn 2019, she organized the first informal chess meetup in a downtown café with just 8 players. That small gathering sparked something magical: genuine connections formed over shared passion for the game. Players began helping each other improve, friendships developed, and a true community emerged.\n\nToday, The Pawns Gambit has grown into a thriving ecosystem of over 500 active members, hosting tournaments, producing educational content, and fostering the next generation of chess enthusiasts. Alexandra's vision of 'every pawn has potential' continues to guide everything we do.`
  };

  const achievements = [
  { icon: "Users", label: "Community Members", value: "500+" },
  { icon: "Calendar", label: "Events Hosted", value: "150+" },
  { icon: "Trophy", label: "Tournaments Organized", value: "45+" },
  { icon: "Headphones", label: "Podcast Episodes", value: "80+" }];


  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            The Story Behind The Pawns Gambit
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From a small café gathering to a thriving chess community—discover the passion 
            and vision that built The Pawns Gambit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-strategic-lg mx-auto lg:mx-0">
                <Image
                  src={founderStory?.image}
                  alt={founderStory?.imageAlt}
                  className="w-full h-full object-cover" />

              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Crown" size={16} className="text-white" />
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-primary mb-2">
                {founderStory?.name}
              </h3>
              <p className="text-accent font-medium mb-4">
                {founderStory?.title}
              </p>
              <blockquote className="text-lg italic text-muted-foreground border-l-4 border-accent pl-4">
                {founderStory?.quote}
              </blockquote>
            </div>
          </div>

          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              {founderStory?.story?.split('\n\n')?.map((paragraph, index) =>
              <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements?.map((achievement, index) =>
          <div key={index} className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={achievement?.icon} size={24} className="text-accent" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {achievement?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {achievement?.label}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default FounderSection;