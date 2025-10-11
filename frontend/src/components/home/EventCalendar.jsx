import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Bell, CheckCircle } from 'lucide-react';
import { getAllEvents, getMyNotifications } from '../../utils/eventApi';
import { useAuth } from '../../context/AuthContext';

export default function EventCalendar() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notifiedEventIds, setNotifiedEventIds] = useState(new Set());
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

    // Fetch user's notifications if logged in
    useEffect(() => {
        const fetchNotifications = async () => {
            if (isAuthenticated) {
                try {
                    const response = await getMyNotifications();
                    if (response.success) {
                        const eventIds = new Set(
                            response.data.map(n => n.event._id || n.event)
                        );
                        setNotifiedEventIds(eventIds);
                    }
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };

        fetchNotifications();
    }, [isAuthenticated]);

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
        
        if (!isAuthenticated) {
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
            <div className="bg-white py-8 sm:py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-lg sm:text-xl text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-8 sm:py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 relative">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                        Event Calendar
                    </h2>
                    <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full" style={{ background: '#FB8B35' }}></div>
                    
                    {/* Month Selector - Desktop: top-right, Mobile: center below */}
                    <div className="relative mt-4 flex justify-center sm:mt-0 sm:absolute sm:top-0 sm:right-0">
                        <select
                            value={selectedMonth}
                            onChange={(e) => handleMonthChange(e.target.value)}
                            className="appearance-none bg-white text-gray-700 font-medium 
                            py-2 sm:py-2.5 px-4 sm:px-5 pr-10 rounded-lg border-2 border-gray-300
                            cursor-pointer focus:outline-none focus:border-gray-400
                            text-sm sm:text-base shadow-sm hover:border-gray-400 transition-colors
                            w-full max-w-xs sm:w-auto"
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 
                                    w-4 h-4 sm:w-5 sm:h-5 text-gray-600 pointer-events-none" />
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-4 sm:px-0 mt-4">
                        Stay updated with all upcoming events, workshops, and gatherings in one place.
                    </p>
                </div>

                {/* Events Grid Container */}
                <div className="relative px-2 sm:px-8 md:px-12">
                    {/* Navigation Buttons - Hide on mobile when single card */}
                    {totalPages > 1 && (
                        <>
                            <button
                                onClick={prevPage}
                                className="absolute -left-1 sm:-left-2 top-1/2 transform -translate-y-1/2 
                                z-10 transition-all duration-300 hover:scale-110 sm:hover:scale-125
                                bg-white rounded-full p-1 sm:p-0 shadow-lg sm:shadow-none"
                                aria-label="Previous events"
                            >
                                <ChevronLeft 
                                    className="w-6 h-6 sm:w-10 sm:h-10" 
                                    style={{ color: '#FB8B35' }} 
                                    strokeWidth={2.5} 
                                />
                            </button>

                            <button
                                onClick={nextPage}
                                className="absolute -right-1 sm:-right-2 top-1/2 transform -translate-y-1/2 
                                z-10 transition-all duration-300 hover:scale-110 sm:hover:scale-125
                                bg-white rounded-full p-1 sm:p-0 shadow-lg sm:shadow-none"
                                aria-label="Next events"
                            >
                                <ChevronRight 
                                    className="w-6 h-6 sm:w-10 sm:h-10" 
                                    style={{ color: '#FB8B35' }} 
                                    strokeWidth={2.5} 
                                />
                            </button>
                        </>
                    )}

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {currentEvents.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => handleCardClick(event.id)}
                                className="bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl 
                                transform hover:-translate-y-1 transition-all duration-300 
                                cursor-pointer border-2 flex flex-col h-full"
                                style={{ borderColor: event.color }}
                            >
                                {/* Image Section - Responsive Height */}
                                <div className="relative m-3 sm:m-4 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-40 sm:h-48 object-cover rounded-t-xl sm:rounded-t-2xl"
                                    />
                                    <div className="absolute top-0 left-0 bg-gray-800 text-white 
                                    rounded-br-lg sm:rounded-br-xl px-2 sm:px-3 py-1.5 sm:py-2 
                                    text-center shadow-lg min-w-[50px] sm:min-w-[60px]">
                                        <div className="text-xs font-medium uppercase">{event.monthAbbr}</div>
                                        <div className="text-xl sm:text-2xl font-bold mt-0.5">{event.day}</div>
                                    </div>
                                </div>

                                {/* Content Section - Flex Grow */}
                                <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-col flex-grow">
                                    {/* Title and Type - Fixed Height with Line Clamping */}
                                    <div className="mb-3 sm:mb-4">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2 min-h-[48px] sm:min-h-[56px]">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-1">
                                            {event.type}
                                        </p>
                                    </div>

                                    {/* Event Details - Fixed Height */}
                                    <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5 flex-grow">
                                        <div className="flex items-start text-gray-700 text-xs sm:text-sm min-h-[18px] sm:min-h-[20px]">
                                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-2">{event.date}</span>
                                        </div>

                                        <div className="flex items-start text-gray-700 text-xs sm:text-sm min-h-[18px] sm:min-h-[20px]">
                                            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-1">{event.time}</span>
                                        </div>

                                        <div className="flex items-start text-gray-700 text-xs sm:text-sm min-h-[18px] sm:min-h-[20px]">
                                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                                            <span className="line-clamp-2">{event.location}</span>
                                        </div>
                                    </div>

                                    {/* Buttons - Always at Bottom - Responsive */}
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
                                        <button
                                            onClick={(e) => handleNotifyClick(e, event.id)}
                                            disabled={notifiedEventIds.has(event.id)}
                                            className={`flex-1 font-medium py-2 sm:py-2.5 rounded-lg sm:rounded-xl 
                                            transition-colors duration-200 text-xs sm:text-sm shadow-sm 
                                            flex items-center justify-center space-x-1
                                            ${notifiedEventIds.has(event.id)
                                                ? 'bg-green-500 text-white cursor-not-allowed'
                                                : 'bg-orange-500 hover:bg-orange-600 text-white'
                                            }`}
                                        >
                                            {notifiedEventIds.has(event.id) ? (
                                                <>
                                                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    <span>Notified</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    <span>Notify Me</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={(e) => handleLearnMoreClick(e, event.id)}
                                            className="flex-1 border-2 border-gray-300 
                                            hover:border-gray-400 text-gray-700 font-medium 
                                            py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-colors duration-200 
                                            text-xs sm:text-sm bg-white"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State - Responsive */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                        <p className="text-lg sm:text-xl text-gray-600 px-4">
                            No events found for {selectedMonth}.
                        </p>
                    </div>
                )}

                {/* Pagination Dots - Mobile Only */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6 sm:hidden">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 
                                ${currentPage === index 
                                    ? 'w-6 bg-orange-500' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}