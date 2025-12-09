import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickAccessCards = () => {
  const quickAccessItems = [
  {
    id: 1,
    title: "Join Tournament",
    description: "Register for upcoming tournaments and compete with players of your skill level",
    image: "https://images.unsplash.com/photo-1572013436440-f753e4340879",
    imageAlt: "Chess tournament registration desk with officials and players signing up",
    icon: "Trophy",
    link: "/events",
    badge: "3 Open",
    stats: "Next: Nov 15",
    color: "accent",
    features: [
    "Swiss System Format",
    "Rating-based Sections",
    "Prize Pool: $2,500"]

  },
  {
    id: 2,
    title: "Latest Podcast",
    description: "Listen to expert analysis, player interviews, and strategic insights from chess masters",
    image: "https://images.unsplash.com/photo-1714108433511-c752a7fa4e9c",
    imageAlt: "Professional podcast studio setup with microphones and chess-themed background",
    icon: "Headphones",
    link: "/podcast",
    badge: "New Episode",
    stats: "47 Episodes",
    color: "primary",
    features: [
    "Master Interviews",
    "Game Analysis",
    "Strategy Deep-dives"]

  },
  {
    id: 3,
    title: "Community Hub",
    description: "Connect with fellow chess enthusiasts, share games, and participate in discussions",
    image: "https://images.unsplash.com/photo-1629141650344-db693cfd6d48",
    imageAlt: "Diverse group of chess players engaged in friendly discussion around chess boards",
    icon: "Users",
    link: "/community",
    badge: "1000+ Members",
    stats: "24/7 Active",
    color: "success",
    features: [
    "Game Sharing",
    "Discussion Forums",
    "Player Ratings"]

  }];


  const getColorClasses = (color) => {
    const colorMap = {
      accent: {
        bg: "bg-accent/10",
        border: "border-accent/20",
        icon: "text-accent",
        badge: "bg-accent/20 text-accent border-accent/30"
      },
      primary: {
        bg: "bg-primary/10",
        border: "border-primary/20",
        icon: "text-primary",
        badge: "bg-primary/20 text-primary border-primary/30"
      },
      success: {
        bg: "bg-success/10",
        border: "border-success/20",
        icon: "text-success",
        badge: "bg-success/20 text-success border-success/30"
      }
    };
    return colorMap?.[color] || colorMap?.accent;
  };

  return (
    <section className="bg-muted/30 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">
            Your Chess Journey Starts Here
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking to compete, learn, or connect, we have everything you need to advance your chess game.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickAccessItems?.map((item) => {
            const colors = getColorClasses(item?.color);

            return (
              <div
                key={item?.id}
                className="group bg-card rounded-xl shadow-strategic border border-border overflow-hidden hover-elevate transition-strategic">

                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item?.image}
                    alt={item?.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  
                  {/* Badge Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors?.badge}`}>
                      <Icon name="Star" size={12} className="mr-1" />
                      {item?.badge}
                    </span>
                  </div>

                  {/* Icon Overlay */}
                  <div className={`absolute bottom-4 right-4 w-12 h-12 ${colors?.bg} ${colors?.border} border rounded-lg flex items-center justify-center backdrop-blur-sm`}>
                    <Icon name={item?.icon} size={24} className={colors?.icon} />
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-heading font-bold text-primary">
                        {item?.title}
                      </h3>
                      <span className="text-sm text-muted-foreground font-mono">
                        {item?.stats}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {item?.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {item?.features?.map((feature, index) =>
                      <li key={index} className="flex items-center space-x-2 text-sm">
                          <Icon name="Check" size={14} className={colors?.icon} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="default"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="group-hover:shadow-lg transition-all duration-300">

                    <Link to={item?.link} className="flex items-center justify-center w-full">
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>);

          })}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-2xl p-8 lg:p-12 border border-accent/20">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-primary mb-4">
                Ready to Make Your Move?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Join our thriving chess community and discover your potential. Every pawn has the power to become a queen.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="UserPlus"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90">

                  <Link to="/community" className="flex items-center">
                    Join Community
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left">

                  <Link to="/events" className="flex items-center">
                    View Events
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default QuickAccessCards;