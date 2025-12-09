import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PressSection = () => {
  const pressArticles = [
  {
    id: 1,
    title: "Local Chess Community Thrives Under The Pawns Gambit Leadership",
    publication: "City Tribune",
    date: "October 15, 2024",
    excerpt: "What started as a small gathering in a downtown café has grown into the city's premier chess community, bringing together players of all skill levels...",
    image: "https://images.unsplash.com/photo-1563896547039-d3fc7ff10128",
    imageAlt: "Newspaper front page with chess-related headline and community photos",
    type: "Feature Article",
    link: "#"
  },
  {
    id: 2,
    title: "The Pawns Gambit Podcast Reaches 50,000 Downloads Milestone",
    publication: "Chess Weekly",
    date: "September 22, 2024",
    excerpt: "The popular chess podcast has become a go-to resource for players seeking strategic insights and master-level analysis...",
    image: "https://images.unsplash.com/photo-1615458317303-4bb49df432cc",
    imageAlt: "Professional podcast recording studio with microphones and chess board setup",
    type: "Industry News",
    link: "#"
  },
  {
    id: 3,
    title: "Youth Chess Program Sees Record Enrollment",
    publication: "Education Today",
    date: "August 8, 2024",
    excerpt: "The Pawns Gambit's innovative approach to chess education has attracted over 200 young players this year, with remarkable improvement in critical thinking skills...",
    image: "https://images.unsplash.com/photo-1578425743428-fd163c2a26e1",
    imageAlt: "Children of diverse backgrounds playing chess in bright classroom setting with instructor guiding them",
    type: "Education Feature",
    link: "#"
  },
  {
    id: 4,
    title: "Tournament Success Puts City on Chess Map",
    publication: "Sports Digest",
    date: "July 12, 2024",
    excerpt: "The annual championship tournament organized by The Pawns Gambit attracted players from across the region, establishing the city as a chess destination...",
    image: "https://images.unsplash.com/photo-1709020873067-66dbb6faf922",
    imageAlt: "Large tournament hall filled with chess players competing at multiple boards with tournament banners visible",
    type: "Sports Coverage",
    link: "#"
  }];


  const mediaKit = [
  {
    icon: "Image",
    title: "Logo Package",
    description: "High-resolution logos in various formats (PNG, SVG, EPS) for print and digital use",
    fileSize: "2.3 MB"
  },
  {
    icon: "FileText",
    title: "Fact Sheet",
    description: "Key statistics, milestones, and organizational information for media reference",
    fileSize: "156 KB"
  },
  {
    icon: "Camera",
    title: "Photo Gallery",
    description: "Professional event photos, team headshots, and community images",
    fileSize: "15.7 MB"
  },
  {
    icon: "Video",
    title: "Video Assets",
    description: "Promotional videos, tournament highlights, and interview footage",
    fileSize: "45.2 MB"
  }];


  const awards = [
  {
    year: "2024",
    title: "Community Organization of the Year",
    organization: "City Council",
    description: "Recognized for outstanding contribution to community building and youth development"
  },
  {
    year: "2023",
    title: "Best Chess Content Creator",
    organization: "Chess Media Awards",
    description: "Honored for excellence in chess education and podcast production"
  },
  {
    year: "2022",
    title: "Innovation in Chess Education",
    organization: "National Chess Federation",
    description: "Acknowledged for creative approaches to teaching chess to diverse audiences"
  }];


  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
            Press & Media
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how The Pawns Gambit is making headlines and building recognition 
            as a leader in chess community development and education.
          </p>
        </div>

        {/* Press Articles */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">
            Recent Press Coverage
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pressArticles?.map((article) =>
            <div key={article?.id} className="card overflow-hidden hover-elevate transition-strategic">
                <div className="h-48 overflow-hidden">
                  <Image
                  src={article?.image}
                  alt={article?.imageAlt}
                  className="w-full h-full object-cover" />

                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-accent">
                      {article?.publication}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {article?.date}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-primary mb-3 leading-tight">
                    {article?.title}
                  </h4>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {article?.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                      {article?.type}
                    </span>
                    <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right">

                      Read Article
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="bg-background rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
              Awards & Recognition
            </h3>
            <p className="text-muted-foreground">
              External validation of our commitment to chess community excellence
            </p>
          </div>

          <div className="space-y-6">
            {awards?.map((award, index) =>
            <div key={index} className="flex items-start space-x-4 p-6 border border-border rounded-lg hover:border-accent/50 transition-quick">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Award" size={24} className="text-accent" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-primary">
                      {award?.title}
                    </h4>
                    <span className="text-sm bg-accent/10 text-accent px-2 py-1 rounded">
                      {award?.year}
                    </span>
                  </div>
                  <p className="text-sm text-accent font-medium mb-2">
                    {award?.organization}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {award?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Media Kit */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">
              Media Kit & Resources
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Everything you need to cover The Pawns Gambit story. Our comprehensive 
              media kit includes logos, photos, videos, and detailed information about 
              our organization and impact.
            </p>
            
            <div className="space-y-4 mb-8">
              {mediaKit?.map((item, index) =>
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent/50 transition-quick">
                  <div className="flex items-center space-x-3">
                    <Icon name={item?.icon} size={20} className="text-accent" />
                    <div>
                      <h4 className="font-medium text-primary">
                        {item?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item?.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">
                      {item?.fileSize}
                    </div>
                    <Button variant="ghost" size="sm" iconName="Download">
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90">

                Download Full Kit
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Mail"
                iconPosition="left">

                Contact Media Team
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="card p-6">
              <h4 className="font-semibold text-primary mb-4">
                Media Contact Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="User" size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">
                    Sarah Kim, Community Manager
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">
                    media@thepawnsgambit.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">
                    (555) 123-4567
                  </span>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h4 className="font-semibold text-primary mb-4">
                Quick Facts
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Founded: 2019</div>
                <div>Members: 500+ active players</div>
                <div>Events: 150+ hosted to date</div>
                <div>Podcast: 80+ episodes published</div>
                <div>Youth Programs: 200+ students taught</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default PressSection;