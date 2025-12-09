import React from 'react';
import Icon from '../../../components/AppIcon';

const ImpactSection = () => {
  const impactStats = [
    {
      icon: "Users",
      value: "500+",
      label: "Active Members",
      description: "Growing community of chess enthusiasts from beginners to masters"
    },
    {
      icon: "Calendar",
      value: "150+",
      label: "Events Hosted",
      description: "Tournaments, workshops, and social gatherings bringing players together"
    },
    {
      icon: "GraduationCap", 
      value: "200+",
      label: "Students Taught",
      description: "Children and adults introduced to chess through our education programs"
    },
    {
      icon: "MapPin",
      value: "12",
      label: "Partner Venues",
      description: "Local cafés, libraries, and community centers hosting our events"
    },
    {
      icon: "Headphones",
      value: "80+",
      label: "Podcast Episodes",
      description: "Hours of chess content reaching thousands of listeners worldwide"
    },
    {
      icon: "Trophy",
      value: "45+",
      label: "Tournaments",
      description: "Competitive events fostering skill development and sportsmanship"
    }
  ];

  const testimonials = [
    {
      quote: "The Pawns Gambit transformed my chess journey. I went from knowing just the basics to competing in tournaments and making lifelong friends.",
      author: "Jennifer Walsh",
      role: "Community Member since 2020",
      rating: 1650
    },
    {
      quote: "As a parent, I'm amazed by how chess has improved my daughter's critical thinking and confidence. The youth programs here are exceptional.",
      author: "Michael Chen",
      role: "Parent & Volunteer",
      rating: null
    },
    {
      quote: "The podcast and community events have elevated my understanding of chess strategy. This organization truly cares about player development.",
      author: "Roberto Silva",
      role: "Tournament Regular",
      rating: 1850
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Our Community Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Measuring success through the growth, connections, and achievements of our 
            chess community members across the city and beyond.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {impactStats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={28} className="text-accent" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                {stat?.value}
              </div>
              <div className="text-lg font-semibold text-primary mb-2">
                {stat?.label}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Community Testimonials */}
        <div className="bg-muted/30 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
              What Our Community Says
            </h3>
            <p className="text-muted-foreground">
              Real stories from real members about their chess journey with us
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial?.quote}"
                </blockquote>
                
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-primary">
                    {testimonial?.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial?.role}
                    {testimonial?.rating && (
                      <span className="ml-2 text-accent font-medium">
                        • Rating: {testimonial?.rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;