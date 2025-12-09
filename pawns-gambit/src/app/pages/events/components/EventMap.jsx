import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventMap = ({ events, onEventClick }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock coordinates for different venues
  const venueCoordinates = {
    "Downtown Chess Club": { lat: 40.7589, lng: -73.9851 },
    "Central Library": { lat: 40.7614, lng: -73.9776 },
    "Community Center": { lat: 40.7505, lng: -73.9934 },
    "Washington Square Park": { lat: 40.7308, lng: -73.9973 },
    "Bryant Park": { lat: 40.7536, lng: -73.9832 },
    "Chess Forum": { lat: 40.7282, lng: -73.9942 },
    "Marshall Chess Club": { lat: 40.7614, lng: -73.9776 },
    "Brooklyn Chess Academy": { lat: 40.6892, lng: -73.9442 }
  };

  const getEventCoordinates = (location) => {
    return venueCoordinates?.[location] || { lat: 40.7589, lng: -73.9851 };
  };

  const handleMarkerClick = (event) => {
    setSelectedEvent(event);
    onEventClick(event);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Map Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Event Locations</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Navigation"
              iconPosition="left"
            >
              My Location
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Maximize2"
              iconPosition="left"
            >
              Fullscreen
            </Button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-gray-100">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Chess Events Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7589,-73.9851&z=12&output=embed"
          className="w-full h-full"
        />

        {/* Map Overlay with Event Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {events?.map((event, index) => {
            const coords = getEventCoordinates(event?.location);
            // Calculate position based on coordinates (mock positioning)
            const x = ((coords?.lng + 74) * 100) % 90;
            const y = ((40.8 - coords?.lat) * 100) % 80;
            
            return (
              <div
                key={event?.id}
                className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => handleMarkerClick(event)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${
                  selectedEvent?.id === event?.id 
                    ? 'bg-accent text-white' :'bg-white text-accent border-2 border-accent'
                }`}>
                  <Icon name="MapPin" size={16} />
                </div>
                {/* Event Tooltip */}
                {selectedEvent?.id === event?.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {event?.title}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {event?.location}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {new Date(event.date)?.toLocaleDateString()}
                      </span>
                      <span className="text-accent font-medium">
                        {event?.entryFee === 0 ? 'Free' : `$${event?.entryFee}`}
                      </span>
                    </div>
                    
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Location List */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Venue Locations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(venueCoordinates)?.map(([venue, coords]) => {
            const venueEvents = events?.filter(event => event?.location === venue);
            if (venueEvents?.length === 0) return null;
            
            return (
              <div
                key={venue}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setSelectedEvent(venueEvents?.[0])}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-accent" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{venue}</div>
                    <div className="text-xs text-gray-500">
                      {venueEvents?.length} event{venueEvents?.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <Icon name="ExternalLink" size={14} className="text-gray-400" />
              </div>
            );
          })}
        </div>
      </div>
      {/* Map Legend */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <Icon name="MapPin" size={10} className="text-white" />
              </div>
              <span>Event Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white border-2 border-accent rounded-full flex items-center justify-center">
                <Icon name="MapPin" size={10} className="text-accent" />
              </div>
              <span>Available Venue</span>
            </div>
          </div>
          
          <div className="text-xs">
            Click markers for event details
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMap;