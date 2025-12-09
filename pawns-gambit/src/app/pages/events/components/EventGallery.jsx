import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventGallery = ({ events, onImageClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Mock gallery data
  const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1635457236733-75fdd5f81a41",
    alt: "Chess tournament players concentrating during competitive match in well-lit community center",
    title: "Downtown Championship Finals",
    event: "Downtown Chess Championship",
    date: "2025-10-28",
    category: "tournament",
    photographer: "Sarah Johnson",
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1590061826933-c84b0891bc03",
    alt: "Young chess player making strategic move on wooden chess board during youth tournament",
    title: "Youth Tournament Action",
    event: "Youth Chess Festival",
    date: "2025-10-25",
    category: "youth",
    photographer: "Mike Chen",
    likes: 31,
    comments: 12
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1610183880942-75d5c3917f49",
    alt: "Chess community members socializing and playing casual games in park setting",
    title: "Community Gathering",
    event: "Washington Square Meetup",
    date: "2025-10-22",
    category: "casual",
    photographer: "Lisa Davis",
    likes: 18,
    comments: 5
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1687794504223-8bdc02e25ef6",
    alt: "Chess master teaching opening strategies to group of attentive students in classroom",
    title: "Master Class Session",
    event: "Opening Theory Workshop",
    date: "2025-10-20",
    category: "workshop",
    photographer: "David Wilson",
    likes: 42,
    comments: 15
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1558967664-03f6ab0c2bda",
    alt: "Tournament winner holding trophy with big smile surrounded by chess community members",
    title: "Championship Victory",
    event: "Monthly Blitz Tournament",
    date: "2025-10-18",
    category: "tournament",
    photographer: "Emma Taylor",
    likes: 67,
    comments: 23
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1727449144666-43f82b2faefa",
    alt: "Family playing chess together at outdoor community event with children learning from parents",
    title: "Family Chess Day",
    event: "Family Tournament",
    date: "2025-10-15",
    category: "family",
    photographer: "James Brown",
    likes: 35,
    comments: 9
  }];


  const categories = [
  { value: 'all', label: 'All Photos', icon: 'Image' },
  { value: 'tournament', label: 'Tournaments', icon: 'Trophy' },
  { value: 'casual', label: 'Casual Play', icon: 'Coffee' },
  { value: 'workshop', label: 'Workshops', icon: 'BookOpen' },
  { value: 'youth', label: 'Youth Events', icon: 'Users' },
  { value: 'family', label: 'Family Events', icon: 'Heart' }];


  const filteredImages = selectedCategory === 'all' ?
  galleryImages :
  galleryImages?.filter((img) => img?.category === selectedCategory);

  const ImageCard = ({ image }) =>
  <div
    className="group cursor-pointer overflow-hidden rounded-lg bg-card border border-border hover-elevate transition-strategic"
    onClick={() => onImageClick(image)}>

      <div className="relative overflow-hidden">
        <Image
        src={image?.src}
        alt={image?.alt}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />

        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <button className="bg-card/90 backdrop-blur-sm border border-border rounded-full p-2 hover:bg-card transition-colors">
              <Icon name="Heart" size={16} className="text-red-500" />
            </button>
            <button className="bg-card/90 backdrop-blur-sm border border-border rounded-full p-2 hover:bg-card transition-colors">
              <Icon name="Share2" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-2 left-2">
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {categories?.find((cat) => cat?.value === image?.category)?.label}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-foreground mb-1 line-clamp-1">
          {image?.title}
        </h4>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
          {image?.event}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{new Date(image.date)?.toLocaleDateString()}</span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={12} />
              <span>{image?.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={12} />
              <span>{image?.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>;


  const ImageList = ({ image }) =>
  <div
    className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer"
    onClick={() => onImageClick(image)}>

      <Image
      src={image?.src}
      alt={image?.alt}
      className="w-16 h-16 object-cover rounded-lg" />

      
      <div className="flex-1">
        <h4 className="font-semibold text-foreground mb-1">{image?.title}</h4>
        <p className="text-sm text-muted-foreground mb-1">{image?.event}</p>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>{new Date(image.date)?.toLocaleDateString()}</span>
          <span>by {image?.photographer}</span>
          <div className="flex items-center space-x-1">
            <Icon name="Heart" size={12} />
            <span>{image?.likes}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      image?.category === 'tournament' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
      image?.category === 'casual' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
      image?.category === 'workshop' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-muted text-muted-foreground border border-border'}`
      }>
          {categories?.find((cat) => cat?.value === image?.category)?.label}
        </span>
        <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
      </div>
    </div>;


  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-muted px-6 py-4 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-lg font-semibold text-foreground">Event Gallery</h3>
            <p className="text-sm text-muted-foreground">Capturing our chess community moments</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              iconName="Grid3X3" />

            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List" />

            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconPosition="left">

              Upload
            </Button>
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) =>
          <Button
            key={category?.value}
            variant={selectedCategory === category?.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category?.value)}
            iconName={category?.icon}
            iconPosition="left">

              {category?.label}
            </Button>
          )}
        </div>
      </div>
      {/* Gallery Content */}
      <div className="p-6">
        {viewMode === 'grid' ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages?.map((image) =>
          <ImageCard key={image?.id} image={image} />
          )}
          </div> :

        <div className="space-y-4">
            {filteredImages?.map((image) =>
          <ImageList key={image?.id} image={image} />
          )}
          </div>
        }
      </div>
      {/* Gallery Stats */}
      <div className="bg-muted px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {filteredImages?.length} of {galleryImages?.length} photos
          </div>
          <div className="flex items-center space-x-4">
            <span>Total likes: {galleryImages?.reduce((sum, img) => sum + img?.likes, 0)}</span>
            <span>Total comments: {galleryImages?.reduce((sum, img) => sum + img?.comments, 0)}</span>
          </div>
        </div>
      </div>
    </div>);

};

export default EventGallery;