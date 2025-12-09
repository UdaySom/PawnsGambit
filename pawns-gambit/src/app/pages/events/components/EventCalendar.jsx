import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const EventCalendar = ({ events, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const getEventsForDate = (date) => {
    const dateString = date?.toISOString()?.split('T')?.[0];
    return events?.filter(event => event?.date === dateString);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-100"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date?.toDateString() === today?.toDateString();
      const isPast = date < today && !isToday;

      days?.push(
        <div
          key={day}
          className={`h-24 border border-gray-100 p-1 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-accent/10 border-accent' : ''
          } ${isPast ? 'opacity-60' : ''}`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-accent font-bold' : 'text-gray-700'
          }`}>
            {day}
          </div>
          
          <div className="space-y-1">
            {dayEvents?.slice(0, 2)?.map((event, index) => (
              <div
                key={event?.id}
                onClick={() => onEventClick(event)}
                className="bg-accent/20 text-accent text-xs px-1 py-0.5 rounded truncate hover:bg-accent/30 transition-colors"
              >
                {event?.title}
              </div>
            ))}
            {dayEvents?.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayEvents?.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
          </h3>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              iconName="Calendar"
              iconPosition="left"
            >
              Today
            </Button>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth(-1)}
                iconName="ChevronLeft"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth(1)}
                iconName="ChevronRight"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-2">
          {dayNames?.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
          {renderCalendarDays()}
        </div>
      </div>
      {/* Calendar Legend */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent/20 rounded"></div>
              <span>Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent border-2 border-accent rounded"></div>
              <span>Today</span>
            </div>
          </div>
          
          <div className="text-xs">
            Click on events to view details
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;