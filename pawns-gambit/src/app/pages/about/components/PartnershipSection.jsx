import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PartnershipSection = () => {
  const partnershipTypes = [
  {
    icon: "Building",
    title: "Venue Partners",
    description: "Cafés, libraries, and community centers that host our events and provide welcoming spaces for chess players to gather.",
    benefits: ["Increased foot traffic", "Community engagement", "Brand association", "Event promotion"],
    examples: ["Coffee shops", "Libraries", "Community centers", "Bookstores"]
  },
  {
    icon: "Briefcase",
    title: "Corporate Sponsors",
    description: "Businesses that support our mission through financial sponsorship, equipment donations, or employee engagement programs.",
    benefits: ["Brand visibility", "CSR opportunities", "Employee engagement", "Networking events"],
    examples: ["Tech companies", "Financial services", "Educational institutions", "Local businesses"]
  },
  {
    icon: "Users",
    title: "Chess Organizations",
    description: "Chess clubs, federations, and educational institutions that collaborate on events, tournaments, and educational initiatives.",
    benefits: ["Resource sharing", "Joint events", "Knowledge exchange", "Expanded reach"],
    examples: ["Chess federations", "School chess clubs", "Online platforms", "Chess academies"]
  }];


  const currentPartners = [
  {
    name: "Central Library",
    type: "Venue Partner",
    logo: "https://images.unsplash.com/photo-1706246612316-989af8e54658",
    logoAlt: "Modern library interior with bookshelves and reading areas",
    description: "Hosts our weekly beginner workshops and provides a quiet, focused environment for chess learning.",
    since: "2020"
  },
  {
    name: "TechFlow Solutions",
    type: "Corporate Sponsor",
    logo: "https://images.unsplash.com/photo-1513165710289-24fbfb0d62d6",
    logoAlt: "Modern office building with glass facade and corporate branding",
    description: "Sponsors our annual championship tournament and provides prizes for youth competitions.",
    since: "2022"
  },
  {
    name: "City Chess Federation",
    type: "Chess Organization",
    logo: "https://images.unsplash.com/photo-1709020873067-66dbb6faf922",
    logoAlt: "Chess tournament hall with multiple boards and players competing",
    description: "Official rating partner for our tournaments and collaborative event organizer.",
    since: "2021"
  },
  {
    name: "Brew & Books Café",
    type: "Venue Partner",
    logo: "https://images.unsplash.com/photo-1689475299375-b6b45ca0c56b",
    logoAlt: "Cozy coffee shop interior with wooden tables and warm lighting",
    description: "Weekend tournament venue and casual play location with a welcoming atmosphere.",
    since: "2019"
  }];


  const partnershipBenefits = [
  "Brand visibility at all events and marketing materials",
  "Social media promotion and website recognition",
  "Networking opportunities with chess community",
  "Custom partnership packages tailored to your goals",
  "Community impact and CSR enhancement",
  "Access to engaged, strategic-thinking audience"];


  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Partnership Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join forces with The Pawns Gambit to build stronger communities through chess. 
            Together, we can create meaningful connections and strategic partnerships.
          </p>
        </div>

        {/* Partnership Types */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {partnershipTypes?.map((type, index) =>
          <div key={index} className="card p-8 hover-elevate transition-strategic">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Icon name={type?.icon} size={32} className="text-accent" />
              </div>
              
              <h3 className="text-xl font-semibold text-primary mb-4">
                {type?.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {type?.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-primary mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {type?.benefits?.map((benefit, benefitIndex) =>
                  <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                        <Icon name="Check" size={14} className="text-accent mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                  )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary mb-2">Examples:</h4>
                  <div className="flex flex-wrap gap-1">
                    {type?.examples?.map((example, exampleIndex) =>
                  <span
                    key={exampleIndex}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">

                        {example}
                      </span>
                  )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current Partners */}
        <div className="bg-muted/30 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
              Our Valued Partners
            </h3>
            <p className="text-muted-foreground">
              Organizations that share our vision and help make chess accessible to everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {currentPartners?.map((partner, index) =>
            <div key={index} className="card p-6 flex items-start space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-strategic">
                  <Image
                  src={partner?.logo}
                  alt={partner?.logoAlt}
                  className="w-full h-full object-cover" />

                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-primary">
                      {partner?.name}
                    </h4>
                    <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                      Since {partner?.since}
                    </span>
                  </div>
                  <p className="text-sm text-accent font-medium mb-2">
                    {partner?.type}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {partner?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Partnership Benefits & CTA */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">
              Why Partner With Us?
            </h3>
            <ul className="space-y-3 mb-8">
              {partnershipBenefits?.map((benefit, index) =>
              <li key={index} className="flex items-start">
                  <Icon name="CheckCircle" size={20} className="text-accent mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              )}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Handshake"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90">

                Become a Partner
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left">

                Download Partnership Kit
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-strategic-lg">
              <Image
                src="https://images.unsplash.com/photo-1685375474460-d81fe2f7aaa3"
                alt="Business professionals shaking hands in modern office setting with chess board visible on conference table"
                className="w-full h-80 object-cover" />

            </div>
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-accent/20 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>);

};

export default PartnershipSection;