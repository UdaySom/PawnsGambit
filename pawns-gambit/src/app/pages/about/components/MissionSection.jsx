import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionSection = () => {
  const missionPoints = [
    {
      icon: "Target",
      title: "Our Mission",
      description: `To transform local chess culture into a vibrant digital ecosystem where strategy meets community. We believe every player, from beginner to master, deserves a welcoming space to grow, compete, and connect with fellow chess enthusiasts.`
    },
    {
      icon: "Eye",
      title: "Our Vision", 
      description: `A world where chess transcends age, background, and skill level—where the ancient game becomes a bridge connecting diverse minds in pursuit of strategic excellence and meaningful community bonds.`
    },
    {
      icon: "Heart",
      title: "Our Values",
      description: `Inclusivity in every move, excellence in every game, and community in every interaction. We champion the underdog's journey while celebrating mastery, creating an environment where learning never stops.`
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Strategy Meets Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            More than just a chess club, we're building a movement that celebrates 
            strategic thinking and fosters genuine connections between players.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {missionPoints?.map((point, index) => (
            <div key={index} className="card p-8 text-center hover-elevate transition-strategic">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name={point?.icon} size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">
                {point?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {point?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;