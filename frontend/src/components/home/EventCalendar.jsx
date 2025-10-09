import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import { getAllEvents } from '../../utils/eventApi';

export default function EventCalendar() {
    const navigate = useNavigate();
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('All');
    const [eventsPerPage, setEventsPerPage] = useState(4);

    const months = ['All', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];

    // Fetch events from backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await getAllEvents();
                
                if (response.success) {
                    // Transform backend data to match frontend format
                    const transformedEvents = response.data.map(event => ({
                        id: event._id,
                        title: event.title,
                        type: event.type,
                        date: new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            year: 'numeric' 
                        }),
                        time: event.time,
                        location: event.location,
                        month: new Date(event.date).toLocaleDateString('en-US', { month: 'long' }),
                        day: new Date(event.date).getDate().toString(),
                        monthAbbr: new Date(event.date).toLocaleDateString('en-US', { month: 'short' }),
                        image: event.image,
                        color: event.color
                    }));
                    setEvents(transformedEvents);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = selectedMonth === 'All'
        ? events
        : events.filter(event => event.month === selectedMonth);

    useEffect(() => {
        const updateEventsPerPage = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setEventsPerPage(1);
            } else if (width >= 640 && width < 768) {
                setEventsPerPage(2);
            } else if (width >= 768 && width < 1024) {
                setEventsPerPage(2);
            } else if (width >= 1024 && width < 1280) {
                setEventsPerPage(3);
            } else {
                setEventsPerPage(4);
            }
        };

        updateEventsPerPage();
        window.addEventListener('resize', updateEventsPerPage);

        return () => window.removeEventListener('resize', updateEventsPerPage);
    }, []);

    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    const currentEvents = filteredEvents.slice(
        currentPage * eventsPerPage,
        (currentPage + 1) * eventsPerPage
    );
    
    const handleCardClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    const handleNotifyClick = (e, eventId) => {
        e.stopPropagation();
        const isLoggedIn = !!localStorage.getItem('authToken');
        
        if (!isLoggedIn) {
            navigate('/auth/login', { state: { returnUrl: `/events/${eventId}` } });
        } else {
            navigate(`/events/${eventId}?notify=true`);
        }
    };

    const handleLearnMoreClick = (e, eventId) => {
        e.stopPropagation();
        navigate(`/events/${eventId}`);
    };

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        setCurrentPage(0);
    };

    if (loading) {
        return (
            <div className="bg-white py-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-xl text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 relative">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                        Event Calendar
                    </h2>
                    <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full" style={{ background: '#FB8B35' }}></div>
                    
                    <div className="absolute top-0 right-0">
                        <select
                            value={selectedMonth}
                            onChange={(e) => handleMonthChange(e.target.value)}
                            className="appearance-none bg-white text-gray-700 font-medium 
                            py-2.5 px-5 pr-10 rounded-lg border-2 border-gray-300
                            cursor-pointer focus:outline-none focus:border-gray-400
                            text-base shadow-sm hover:border-gray-400 transition-colors"
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 
                                    w-5 h-5 text-gray-600 pointer-events-none" />
                    </div>
                    
                    <p className="text-base text-gray-600 max-w-3xl mx-auto">
                        Stay updated with all upcoming events, workshops, and gatherings in one place.
                    </p>
                </div>

                <div className="relative px-12">
                    {totalPages > 1 && (
                        <>
                            <button
                                onClick={prevPage}
                                className="absolute -left-2 top-1/2 transform -translate-y-1/2 
                                z-10 transition-all duration-300 hover:scale-125"
                            >
                                <ChevronLeft className="w-10 h-10" style={{ color: '#FB8B35' }} strokeWidth={2.5} />
                            </button>

                            <button
                                onClick={nextPage}
                                className="absolute -right-2 top-1/2 transform -translate-y-1/2 
                                z-10 transition-all duration-300 hover:scale-125"
                            >
                                <ChevronRight className="w-10 h-10" style={{ color: '#FB8B35' }} strokeWidth={2.5} />
                            </button>
                        </>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentEvents.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => handleCardClick(event.id)}
                                className="bg-white rounded-3xl shadow-md hover:shadow-xl 
                                transform hover:-translate-y-1 transition-all duration-300 
                                cursor-pointer border-2"
                                style={{ borderColor: event.color }}
                            >
                                <div className="relative m-4 overflow-hidden rounded-t-2xl">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-48 object-cover rounded-t-2xl"
                                    />
                                    <div className="absolute top-0 left-0 bg-gray-800 text-white 
                                    rounded-br-xl px-3 py-2 text-center shadow-lg min-w-[60px]">
                                        <div className="text-xs font-medium uppercase">{event.monthAbbr}</div>
                                        <div className="text-2xl font-bold mt-0.5">{event.day}</div>
                                    </div>
                                </div>

                                <div className="px-5 pb-5">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {event.type}
                                    </p>

                                    <div className="space-y-2.5 mb-5">
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <Calendar className="w-4 h-4 mr-3 flex-shrink-0" />
                                            <span>{event.date}</span>
                                        </div>

                                        <div className="flex items-center text-gray-700 text-sm">
                                            <Clock className="w-4 h-4 mr-3 flex-shrink-0" />
                                            <span>{event.time}</span>
                                        </div>

                                        <div className="flex items-center text-gray-700 text-sm">
                                            <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={(e) => handleNotifyClick(e, event.id)}
                                            className="flex-1 bg-orange-500 hover:bg-orange-600 
                                            text-white font-medium py-2.5 rounded-xl 
                                            transition-colors duration-200 text-sm shadow-sm"
                                        >
                                            Notify Me
                                        </button>
                                        <button
                                            onClick={(e) => handleLearnMoreClick(e, event.id)}
                                            className="flex-1 border-2 border-gray-300 
                                            hover:border-gray-400 text-gray-700 font-medium 
                                            py-2.5 rounded-xl transition-colors duration-200 
                                            text-sm bg-white"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">
                            No events found for {selectedMonth}.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
// Home Page
//     ↓
// Event Calendar Section (shows 4-8 events)
//     ↓
// User clicks "Learn More"
//     ↓
// Navigate to /events/:eventId
//     ↓
// EventDetails Page displays:
//     • Full description
//     • Why Attend section
//     • Event Highlights
//     • Notify Me button
//     • Register button
//     ↓
// User clicks "Notify Me"
//     ↓
// Check if logged in:
//     ├─ NOT logged in → Redirect to /auth/login
//     └─ Logged in → Show notification modal
//         ↓
//     Select preferences:
//         □ 1 day before
//         □ 1 week before  
//         □ Morning of event
//         ↓
//     Click "Set Reminder"
//         ↓
//     Success! (Currently just console.log + alert)