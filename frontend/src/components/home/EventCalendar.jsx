import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';

export default function EventCalendar() {
    const navigate = (path) => console.log('Navigate to:', path);

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
            monthAbbr: "Sep",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
            color: "#81C784"
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
            monthAbbr: "Sep",
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
            color: "#FFB74D"
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
            monthAbbr: "Oct",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
            color: "#4DB6AC"
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
            monthAbbr: "Aug",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
            color: "#FFB74D"
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
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop",
            color: "#81C784"
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
            image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=250&fit=crop",
            color: "#4DB6AC"
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
            image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
            color: "#FFB74D"
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
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
            color: "#81C784"
        }
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('August');
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
                setEventsPerPage(1);
                setIsMobile(true);
            } else if (width >= 640 && width < 768) {
                setEventsPerPage(2);
                setIsMobile(false);
            } else if (width >= 768 && width < 1024) {
                setEventsPerPage(2);
                setIsMobile(false);
            } else if (width >= 1024 && width < 1280) {
                setEventsPerPage(3);
                setIsMobile(false);
            } else {
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
        navigate(`/event/${eventId}`);
    };

    const handleNotifyClick = (e, eventId) => {
        e.stopPropagation();
        console.log(`Setting notification for event ${eventId}`);
        alert(`Notification set for event ${eventId}`);
    };

    const handleLearnMoreClick = (e, eventId) => {
        e.stopPropagation();
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
        <div className="min-h-screen bg-white py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 relative">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
          Event Calender
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full" style={{ background: '#FB8B35' }}></div>
                    
                    {/* Month Filter Dropdown - Top Right */}
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

                {/* Event Cards Container */}
                <div className="relative px-12">
                    {/* Navigation Arrows */}
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

                    {/* Event Cards Grid */}
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
                                {/* Image with Date Badge */}
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

                                {/* Card Content */}
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

                                    {/* Action Buttons */}
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

                {/* No Events Message */}
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