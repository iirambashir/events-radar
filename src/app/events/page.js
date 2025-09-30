'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, Filter, AlertCircle } from 'lucide-react';

// Mock data as fallback
const mockEvents = [
  {
    _id: '1',
    title: 'Tech Meetup: AI & Machine Learning',
    date: new Date('2025-10-02T18:00:00'),
    location: 'Innovation Hub, Downtown',
    description: 'Join us for an evening of AI discussions, demos, and networking with local tech professionals.',
    link: 'https://example.com/event1',
    source: 'TechEvents.com',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&h=400&fit=crop'
  },
  {
    _id: '2',
    title: 'Community Farmers Market',
    date: new Date('2025-10-03T08:00:00'),
    location: 'City Square Park',
    description: 'Fresh produce, local crafts, and live music every Saturday morning.',
    link: 'https://example.com/event2',
    source: 'LocalEvents.org',
    category: 'Community',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=400&fit=crop'
  },
  {
    _id: '3',
    title: 'Jazz Night at The Blue Note',
    date: new Date('2025-10-05T20:00:00'),
    location: 'The Blue Note Jazz Club',
    description: 'Live jazz performance featuring local artists. Dinner and drinks available.',
    link: 'https://example.com/event3',
    source: 'MusicVenue.com',
    category: 'Music',
    imageUrl: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=400&fit=crop'
  },
  {
    _id: '4',
    title: 'Startup Pitch Competition',
    date: new Date('2025-10-08T14:00:00'),
    location: 'Business Incubator, Tech District',
    description: 'Watch innovative startups pitch their ideas to investors. Free admission.',
    link: 'https://example.com/event4',
    source: 'StartupHub.io',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop'
  },
  {
    _id: '5',
    title: 'Yoga in the Park',
    date: new Date('2025-10-10T07:00:00'),
    location: 'Riverside Park',
    description: 'Free outdoor yoga session for all skill levels. Bring your own mat.',
    link: 'https://example.com/event5',
    source: 'FitnessLocal.com',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop'
  },
  {
    _id: '6',
    title: 'Art Gallery Opening',
    date: new Date('2025-10-15T19:00:00'),
    location: 'Modern Art Gallery',
    description: 'Opening reception for "Urban Landscapes" exhibition. Wine and refreshments provided.',
    link: 'https://example.com/event6',
    source: 'ArtScene.com',
    category: 'Arts',
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=400&fit=crop'
  },
  {
    _id: '7',
    title: 'Film Festival Kickoff',
    date: new Date('2025-09-28T18:00:00'),
    location: 'Historic Cinema',
    description: 'Opening night of the annual independent film festival.',
    link: 'https://example.com/event7',
    source: 'FilmSociety.org',
    category: 'Entertainment',
    imageUrl: null
  }
];

const EventCard = ({ event, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const formatDate = (date) => {
    const eventDate = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(eventDate);
  };

  const formatTime = (date) => {
    const eventDate = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(eventDate);
  };

  const getCategoryGradient = (category) => {
    const gradients = {
      Technology: 'from-blue-500 to-cyan-500',
      Community: 'from-green-500 to-emerald-500',
      Music: 'from-purple-500 to-pink-500',
      Business: 'from-orange-500 to-red-500',
      Health: 'from-teal-500 to-green-500',
      Arts: 'from-violet-500 to-purple-500',
      Entertainment: 'from-rose-500 to-pink-500',
      Other: 'from-gray-500 to-gray-600'
    };
    return gradients[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Event Image */}
      {event.imageUrl && !imageError ? (
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={() => setImageError(true)}
          />
          <div className={`absolute top-3 right-3 px-3 py-1 bg-gradient-to-r ${getCategoryGradient(event.category)} text-white text-xs font-semibold rounded-full shadow-lg`}>
            {event.category}
          </div>
        </div>
      ) : (
        <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(event.category)} flex items-center justify-center relative`}>
          <div className="text-center text-white">
            <Calendar className="w-16 h-16 mx-auto mb-2 opacity-50" />
            <span className="text-sm font-semibold opacity-75">{event.category}</span>
          </div>
          <div className="absolute top-3 right-3 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            {event.category}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{formatTime(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">via {event.source}</span>
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
          >
            View Event
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('3days');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Fetch events from API
  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/events?range=${activeTab}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if API returned events
        if (data.success && data.events && data.events.length > 0) {
          setEvents(data.events);
          setUsingMockData(false);
        } else {
          // No events from API, use mock data
          console.log('No events from API, using mock data');
          setEvents(mockEvents);
          setUsingMockData(true);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError(err.message);
        // Fallback to mock data
        setEvents(mockEvents);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [activeTab]);

  // Filter events based on active tab
  useEffect(() => {
    const now = new Date();
    const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    let filtered = [];
    
    switch (activeTab) {
      case '3days':
        filtered = events.filter(e => {
          const eventDate = new Date(e.date);
          return eventDate >= now && eventDate <= threeDays;
        });
        break;
      case 'week':
        filtered = events.filter(e => {
          const eventDate = new Date(e.date);
          return eventDate >= now && eventDate <= oneWeek;
        });
        break;
      case 'month':
        filtered = events.filter(e => {
          const eventDate = new Date(e.date);
          return eventDate >= now && eventDate <= oneMonth;
        });
        break;
      case 'past':
        filtered = events.filter(e => {
          const eventDate = new Date(e.date);
          return eventDate < now;
        });
        break;
      default:
        filtered = events;
    }
    
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredEvents(filtered);
  }, [events, activeTab]);

  // Calculate tab counts
  const getTabCount = (range) => {
    const now = new Date();
    
    switch (range) {
      case '3days':
        const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        return events.filter(e => {
          const eventDate = new Date(e.date);
          return eventDate >= now && eventDate <= threeDays;
        }).length;
      case 'week':
        const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        return events.filter(e => {
          const eventDate = new Date(e.date);
          return eventDate >= now && eventDate <= oneWeek;
        }).length;
      case 'month':
        const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        return events.filter(e => {
          const eventDate = new Date(e.date);
          return eventDate >= now && eventDate <= oneMonth;
        }).length;
      case 'past':
        return events.filter(e => new Date(e.date) < now).length;
      default:
        return 0;
    }
  };

  const tabs = [
    { id: '3days', label: 'Next 3 Days', count: getTabCount('3days') },
    { id: 'week', label: 'Next Week', count: getTabCount('week') },
    { id: 'month', label: 'Next Month', count: getTabCount('month') },
    { id: 'past', label: 'Past Events', count: getTabCount('past') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Local Events Radar
              </h1>
              <p className="text-gray-600 mt-1">Discover what's happening in your community</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className={`w-2 h-2 ${usingMockData ? 'bg-yellow-500' : 'bg-green-500'} rounded-full animate-pulse`}></div>
              <span>{usingMockData ? 'Demo Mode' : 'Live Data'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Alert for mock data */}
      {usingMockData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
              <div>
                <p className="text-sm text-yellow-700">
                  <strong>Demo Mode:</strong> Displaying sample events. 
                  {error && ` (${error})`}
                  {!error && ' Run the scraper to see real events.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          </div>
        ) : filteredEvents.length > 0 ? (
          /* Events Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard 
                key={event._id || event.id} 
                event={event} 
                delay={index * 100} 
              />
            ))}
          </div>
        ) : (
          /* No Events */
          <div className="text-center py-16">
            <Filter className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500">Try selecting a different time range</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
          <p>Events {usingMockData ? 'demo data' : 'scraped from local sources'} • Updated every 12 hours</p>
        </div>
      </footer>
    </div>
  );
}