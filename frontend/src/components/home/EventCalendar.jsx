import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EventCalendar() {
    // Note: In your actual app, uncomment this and import from 'react-router-dom':
    const navigate = useNavigate();

    const events = [
        {
            id: 1,
            title: "Nature Farming",
            type: "Workshop",
            date: "Tuesday June, 2025",
            time: "12:00 AM - 2:00 PM",
            location: "Dharmapuri Community Center",
            month: "June",
            day: "15",
            monthAbbr: "Jun",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop"
        },
        {
            id: 2,
            title: "Bio Fencing",
            type: "Workshop",
            date: "Saturday April, 2025",
            time: "10:00 AM - 1:00 PM",
            location: "Dharmapuri Community Center",
            month: "April",
            day: "23",
            monthAbbr: "Apr",
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop"
        },
        {
            id: 3,
            title: "Organic Farming",
            type: "Workshop",
            date: "Sunday May, 2025",
            time: "5:00 PM - 7:00 PM",
            location: "Dharmapuri Community Center",
            month: "May",
            day: "12",
            monthAbbr: "May",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop"
        },
        {
            id: 4,
            title: "Agriculture Marketing",
            type: "Workshop",
            date: "Friday September, 2025",
            time: "11:00 AM - 1:00 PM",
            location: "Dharmapuri Community Center",
            month: "September",
            day: "28",
            monthAbbr: "Sep",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop"
        },
        {
            id: 5,
            title: "Sustainable Agriculture",
            type: "Workshop",
            date: "Monday August, 2025",
            time: "9:00 AM - 12:00 PM",
            location: "Dharmapuri Community Center",
            month: "August",
            day: "18",
            monthAbbr: "Aug",
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop"
        },
        {
            id: 6,
            title: "Water Conservation",
            type: "Workshop",
            date: "Wednesday July, 2025",
            time: "2:00 PM - 5:00 PM",
            location: "Dharmapuri Community Center",
            month: "July",
            day: "16",
            monthAbbr: "Jul",
            image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=250&fit=crop"
        },
        {
            id: 7,
            title: "Crop Rotation",
            type: "Workshop",
            date: "Thursday October, 2025",
            time: "10:00 AM - 2:00 PM",
            location: "Dharmapuri Community Center",
            month: "October",
            day: "24",
            monthAbbr: "Oct",
            image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop"
        },
        {
            id: 8,
            title: "Pest Management",
            type: "Workshop",
            date: "Saturday November, 2025",
            time: "1:00 PM - 4:00 PM",
            location: "Dharmapuri Community Center",
            month: "November",
            day: "22",
            monthAbbr: "Nov",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop"
        }
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('All');
    const [eventsPerPage, setEventsPerPage] = useState(4);
    const [isMobile, setIsMobile] = useState(false);

    const months = ['All', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];

    const filteredEvents = selectedMonth === 'All'
        ? events
        : events.filter(event => event.month === selectedMonth);

    useEffect(() => {
        const updateEventsPerPage = () => {
            const width = window.innerWidth;
            if (width < 640) {
                // Mobile phones (including iPhone)
                setEventsPerPage(1);
                setIsMobile(true);
            } else if (width >= 640 && width < 768) {
                // Small tablets
                setEventsPerPage(2);
                setIsMobile(false);
            } else if (width >= 768 && width < 1024) {
                // Tablets (iPad, etc.)
                setEventsPerPage(2);
                setIsMobile(false);
            } else if (width >= 1024 && width < 1280) {
                // Small desktop/large tablets
                setEventsPerPage(3);
                setIsMobile(false);
            } else {
                // Desktop
                setEventsPerPage(4);
                setIsMobile(false);
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
        // Navigate to event details page with the event ID
        navigate(`/event/${eventId}`);
    };

    const handleNotifyClick = (e, eventId) => {
        e.stopPropagation();
        console.log(`Setting notification for event ${eventId}`);
        alert(`Notification set for event ${eventId}`);
    };


    const handleLearnMoreClick = (e, eventId) => {
        e.stopPropagation(); // Prevent card click navigation
        navigate(`/event/${eventId}`);
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8 md:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 px-2">
                        Event Calendar
                    </h2>
                    <div className="w-16 sm:w-20 md:w-24 h-1 bg-orange-500 mx-auto"></div>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mt-3 sm:mt-4 md:mt-5 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
                        Stay updated with all upcoming events, workshops, and gatherings in one place.
                    </p>
                </div>

                {/* Month Filter */}
                <div className="flex justify-center sm:justify-end mb-6 sm:mb-8 px-3 sm:px-4">
                    <div className="relative">
                        <select
                            value={selectedMonth}
                            onChange={(e) => handleMonthChange(e.target.value)}
                            className="appearance-none bg-orange-500 hover:bg-orange-600 
             text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 
             rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg 
             text-sm sm:text-base whitespace-nowrap cursor-pointer 
             focus:outline-none focus:ring-2 focus:ring-orange-300"
                        >
                            {months.map((month) => (
                                <option key={month} value={month} className="bg-white text-gray-700">
                                    {month}
                                </option>
                            ))}
                        </select>

                        <ChevronRight className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 rotate-90 
                                    w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Event Cards Container */}
                <div className="relative px-2 sm:px-4 md:px-6 lg:px-8">
                    {/* Navigation Arrows - Adjusted for mobile */}
                    {totalPages > 1 && (
                        <>
                            <button
                                onClick={prevPage}
                                className="absolute left-0 sm:left-0 md:-left-4 top-1/2 transform -translate-y-1/2 
                          z-10 bg-white rounded-full p-2 sm:p-2.5 md:p-3 
                          shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-200 
                          border border-gray-200 sm:border-2 hover:border-orange-300
                          opacity-90 sm:opacity-100"
                            >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600" />
                            </button>

                            <button
                                onClick={nextPage}
                                className="absolute right-0 sm:right-0 md:-right-4 top-1/2 transform -translate-y-1/2 
                          z-10 bg-white rounded-full p-2 sm:p-2.5 md:p-3 
                          shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-200 
                          border border-gray-200 sm:border-2 hover:border-orange-300
                          opacity-90 sm:opacity-100"
                            >
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600" />
                            </button>
                        </>
                    )}

                    {/* Event Cards Grid - Responsive layout */}
                    <div className={`grid gap-4 sm:gap-5 md:gap-6 
                          ${isMobile ? 'px-8' : 'px-0 sm:px-4 md:px-6 lg:px-8'}
                          grid-cols-1 
                          sm:grid-cols-2 
                          lg:grid-cols-3 
                          xl:grid-cols-4`}>
                        {currentEvents.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => handleCardClick(event.id)}
                                className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl sm:hover:shadow-2xl 
                          transform hover:-translate-y-1 sm:hover:-translate-y-2 
                          transition-all duration-300 overflow-hidden cursor-pointer 
                          border border-gray-100 sm:border-2 hover:border-orange-200"
                            >
                                {/* Date Badge */}
                                <div className="relative">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-40 sm:h-44 md:h-48 object-cover"
                                    />
                                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 
                                bg-black bg-opacity-70 text-white 
                                rounded-md sm:rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-center">
                                        <div className="text-xs font-medium opacity-80">{event.monthAbbr}</div>
                                        <div className="text-lg sm:text-xl md:text-2xl font-bold">{event.day}</div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-4 sm:p-5 md:p-6">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1.5 sm:mb-2 line-clamp-1">
                                        {event.title}
                                    </h3>
                                    <p className="text-orange-600 font-medium text-sm sm:text-base mb-3 sm:mb-4">
                                        {event.type}
                                    </p>

                                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                                        <div className="flex items-start sm:items-center text-gray-600 text-xs sm:text-sm">
                                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                                            <span className="line-clamp-1">{event.date}</span>
                                        </div>

                                        <div className="flex items-start sm:items-center text-gray-600 text-xs sm:text-sm">
                                            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                                            <span className="line-clamp-1">{event.time}</span>
                                        </div>

                                        <div className="flex items-start sm:items-center text-gray-600 text-xs sm:text-sm">
                                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                                            <span className="line-clamp-2 sm:line-clamp-1">{event.location}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-6">
                                        <button
                                            onClick={(e) => handleNotifyClick(e, event.id)}
                                            className="flex-1 bg-orange-500 hover:bg-orange-600 
                                text-white font-medium py-2 sm:py-2.5 md:py-3 
                                rounded-md sm:rounded-lg transition-colors duration-200
                                text-xs sm:text-sm active:scale-95"
                                        >
                                            Notify Me
                                        </button>
                                        <button
                                            onClick={(e) => handleLearnMoreClick(e, event.id)}
                                            className="flex-1 border border-gray-300 sm:border-2 
                                hover:border-gray-400 text-gray-700 font-medium 
                                py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg 
                                transition-colors duration-200 text-xs sm:text-sm
                                active:scale-95 bg-white"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 space-x-1.5 sm:space-x-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 
                          ${currentPage === index
                                        ? 'bg-orange-500 w-6 sm:w-7 md:w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'}`}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* No Events Message */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-8 sm:py-10 md:py-12 px-4">
                        <p className="text-base sm:text-lg md:text-xl text-gray-600">
                            No events found for {selectedMonth}.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}