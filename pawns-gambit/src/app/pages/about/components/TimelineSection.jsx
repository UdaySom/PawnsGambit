import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineSection = () => {
  const milestones = [
    {
      year: "2019",
      title: "The First Move",
      description: "Started with 8 players in a downtown café, sharing our love for chess over coffee and friendly games.",
      icon: "Coffee",
      highlight: true
    },
    {
      year: "2020", 
      title: "Digital Transformation",
      description: "Launched online tournaments and virtual meetups during the pandemic, keeping our community connected.",
      icon: "Monitor"
    },
    {
      year: "2021",
      title: "Podcast Launch",
      description: "Began 'The Pawns Gambit Podcast' featuring master interviews and strategic analysis, reaching chess enthusiasts worldwide.",
      icon: "Headphones"
    },
    {
      year: "2022",
      title: "Tournament Excellence",
      description: "Hosted our first major tournament with 120 participants, establishing ourselves as a premier chess organization.",
      icon: "Trophy",
      highlight: true
    },
    {
      year: "2023",
      title: "Community Growth",
      description: "Reached 300 active members and partnered with local venues to expand our reach across the city.",
      icon: "Users"
    },
    {
      year: "2024",
      title: "Educational Impact",
      description: "Launched youth programs and chess education initiatives, introducing 200+ children to the game.",
      icon: "GraduationCap"
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Expanding to multiple cities while maintaining our core values of community, inclusivity, and strategic excellence.",
      icon: "Rocket",
      highlight: true
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Our Journey Through Time
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From humble beginnings to a thriving community—every move has been strategic, 
            every milestone a testament to our shared passion for chess.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-accent/30 hidden lg:block"></div>
          
          <div className="space-y-12">
            {milestones?.map((milestone, index) => (
              <div key={index} className={`relative flex items-center ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-strategic hidden lg:block z-10"></div>
                
                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className={`card p-8 hover-elevate transition-strategic ${
                    milestone?.highlight ? 'border-accent shadow-strategic-lg' : ''
                  }`}>
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        milestone?.highlight ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
                      }`}>
                        <Icon name={milestone?.icon} size={20} />
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${
                          milestone?.highlight ? 'text-accent' : 'text-primary'
                        }`}>
                          {milestone?.year}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      {milestone?.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone?.description}
                    </p>
                  </div>
                </div>
                
                {/* Spacer for opposite side */}
                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;