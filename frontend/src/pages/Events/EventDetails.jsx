import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Bell, CheckCircle } from 'lucide-react';
import { getEventById as fetchEventById, setEventNotification } from '../../utils/eventApi';
import { useAuth } from '../../context/AuthContext';

export default function EventDetails() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, isAuthenticated } = useAuth();

    console.log('🔍 Auth Check:');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
    
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showNotifyModal, setShowNotifyModal] = useState(false);
    const [isNotified, setIsNotified] = useState(false);
    const [reminderPreferences, setReminderPreferences] = useState({
        oneDayBefore: true,
        oneWeekBefore: false,
        morningOf: false
    });
    
    // Fetch event from backend
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const response = await fetchEventById(eventId);
                
                if (response.success) {
                    setEvent(response.data);
                }
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);
    
    // Check if URL has notify parameter
    useEffect(() => {
        if (searchParams.get('notify') === 'true' && isAuthenticated) {
            setShowNotifyModal(true);
        }
    }, [searchParams, isAuthenticated]);
    
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (showNotifyModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showNotifyModal]);
    
    const handleBackClick = () => {
        navigate('/');
    };
    
    const handleNotifyClick = () => {
        console.log('🔔 Notify clicked');
        console.log('isAuthenticated:', isAuthenticated);
        console.log('user:', user);
        
        if (!isAuthenticated) {
            navigate('/auth/login', { state: { returnUrl: `/events/${event._id}` } });
        } else {
            setShowNotifyModal(true);
        }
    };
    
    const handleSetNotification = async () => {
        try {
            const reminderDays = [];
            if (reminderPreferences.oneDayBefore) reminderDays.push(1);
            if (reminderPreferences.oneWeekBefore) reminderDays.push(7);
            if (reminderPreferences.morningOf) reminderDays.push(0);
            
            if (reminderDays.length === 0) {
                alert('Please select at least one reminder option');
                return;
            }
            
            // Call API for each reminder preference
            for (const days of reminderDays) {
                await setEventNotification(event._id, days);
            }
            
            setIsNotified(true);
            setShowNotifyModal(false);
            alert('✓ Notification set successfully! You will receive email reminders.');
        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.message || 'Failed to set notification. Please try again.');
        }
    };
    
    const handlePreferenceChange = (key) => {
        setReminderPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };
    
    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-gray-600">Loading event details...</p>
            </div>
        );
    }
    
    // If event not found
    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
                    <button 
                        onClick={() => navigate('/')}
                        className="text-orange-500 hover:text-orange-600"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={handleBackClick}
                        className="flex items-center text-gray-600 hover:text-gray-900 
                        transition-colors duration-200 group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Home</span>
                    </button>
                </div>
            </div>
            
            {/* Hero Section */}
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="inline-block px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4"
                             style={{ backgroundColor: event.color, color: 'white' }}>
                            {event.type}
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                            {event.title}
                        </h1>
                        <p className="text-white/90 text-sm sm:text-base md:text-lg">
                            Empowering Sustainable Agriculture
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Event Info Card */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="flex items-start space-x-3">
                                    <Calendar className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: event.color }} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Date</p>
                                        <p className="text-sm sm:text-base text-gray-900 font-semibold">
                                            {new Date(event.date).toLocaleDateString('en-US', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: event.color }} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Time</p>
                                        <p className="text-sm sm:text-base text-gray-900 font-semibold">{event.time}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: event.color }} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Location</p>
                                        <p className="text-sm sm:text-base text-gray-900 font-semibold">{event.location}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <Users className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: event.color }} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Capacity</p>
                                        <p className="text-sm sm:text-base text-gray-900 font-semibold">
                                            {event.registeredCount} / {event.capacity} registered
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* About Section */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-6 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">About This Event</h2>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{event.fullDescription}</p>
                        </div>
                        
                        {/* Why Attend */}
                        {event.whyAttend && (
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-6 sm:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Why Attend?</h2>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">{event.whyAttend.intro}</p>
                                <ul className="space-y-2 sm:space-y-3">
                                    {event.whyAttend.points.map((point, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{ color: event.color }} />
                                            <span className="text-sm sm:text-base text-gray-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {/* Event Highlights */}
                        {event.highlights && (
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-6 sm:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Event Highlights</h2>
                                <div className="space-y-4 sm:space-y-6">
                                    {event.highlights.map((highlight, index) => (
                                        <div key={index}>
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                                • {highlight.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-700 ml-4">{highlight.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Right Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
                            <div className="text-center mb-4 sm:mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3 sm:mb-4"
                                     style={{ backgroundColor: `${event.color}20` }}>
                                    <Calendar className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: event.color }} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600">
                                    {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long' })}
                                </p>
                            </div>
                            
                            <div className="space-y-2 sm:space-y-3">
                                <button
                                    onClick={handleNotifyClick}
                                    disabled={isNotified}
                                    className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold 
                                    transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base
                                    ${isNotified 
                                        ? 'bg-green-500 text-white cursor-not-allowed'
                                        : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                                    }`}
                                >
                                    {isNotified ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span>Notification Set</span>
                                        </>
                                    ) : (
                                        <>
                                            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span>Notify Me</span>
                                        </>
                                    )}
                                </button>
                                
                                <button className="w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold 
                                    border-2 border-gray-300 hover:border-gray-400 
                                    text-gray-700 transition-all duration-200 hover:bg-gray-50 text-sm sm:text-base">
                                    Register Now
                                </button>
                            </div>
                            
                            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                                <div className="flex justify-between text-xs sm:text-sm mb-2">
                                    <span className="text-gray-600">Seats Available</span>
                                    <span className="font-semibold text-gray-900">
                                        {event.capacity - event.registeredCount} left
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="h-2 rounded-full transition-all duration-300"
                                        style={{ 
                                            width: `${(event.registeredCount / event.capacity) * 100}%`,
                                            backgroundColor: event.color
                                        }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Instructor Card */}
                        {event.instructor && (
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Event Instructor</h3>
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white text-base sm:text-xl font-bold flex-shrink-0"
                                         style={{ backgroundColor: event.color }}>
                                        {event.instructor.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm sm:text-base font-semibold text-gray-900">{event.instructor}</p>
                                        <p className="text-xs sm:text-sm text-gray-600">Agriculture Expert</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Tags */}
                        {event.tags && (
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Topics Covered</h3>
                                <div className="flex flex-wrap gap-2">
                                    {event.tags.map((tag, index) => (
                                        <span key={index} className="px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                                            style={{ 
                                                backgroundColor: `${event.color}20`,
                                                color: event.color
                                            }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Notification Modal - FIXED WITH SCROLLING */}
            {showNotifyModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full my-8 shadow-2xl max-h-[90vh] flex flex-col">
                        {/* Modal Header - Fixed */}
                        <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4"
                                     style={{ backgroundColor: `${event.color}20` }}>
                                    <Bell className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: event.color }} />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Set Event Reminder</h2>
                                <p className="text-sm sm:text-base text-gray-600">We'll notify you before the event starts</p>
                            </div>
                        </div>
                        
                        {/* Modal Content - Scrollable */}
                        <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
                            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">{event.title}</h3>
                                <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                                        <span>{new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                                        <span>{event.time}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-4 sm:mb-6">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Notification Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                            </div>
                            
                            <div className="mb-4 sm:mb-6">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">When to remind you</label>
                                <div className="space-y-2">
                                    <label className="flex items-center p-2.5 sm:p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            checked={reminderPreferences.oneDayBefore}
                                            onChange={() => handlePreferenceChange('oneDayBefore')}
                                            className="w-4 h-4 rounded flex-shrink-0"
                                            style={{ accentColor: event.color }}
                                        />
                                        <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">1 day before (Recommended)</span>
                                    </label>
                                    
                                    <label className="flex items-center p-2.5 sm:p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            checked={reminderPreferences.oneWeekBefore}
                                            onChange={() => handlePreferenceChange('oneWeekBefore')}
                                            className="w-4 h-4 rounded flex-shrink-0"
                                            style={{ accentColor: event.color }}
                                        />
                                        <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">1 week before</span>
                                    </label>
                                    
                                    <label className="flex items-center p-2.5 sm:p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            checked={reminderPreferences.morningOf}
                                            onChange={() => handlePreferenceChange('morningOf')}
                                            className="w-4 h-4 rounded flex-shrink-0"
                                            style={{ accentColor: event.color }}
                                        />
                                        <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">Morning of event</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        {/* Modal Footer - Fixed */}
                        <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <button
                                    onClick={() => setShowNotifyModal(false)}
                                    className="flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold 
                                    border-2 border-gray-300 hover:border-gray-400 
                                    text-gray-700 transition-all duration-200 text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSetNotification}
                                    className="flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold 
                                    text-white transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                    style={{ backgroundColor: event.color }}
                                >
                                    Set Reminder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}