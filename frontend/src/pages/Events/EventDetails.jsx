

// src/pages/Events/EventDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Bell, CheckCircle } from 'lucide-react';
import { getEventById } from '../../data/EventData';
import { useAuth } from '../../context/AuthContext';


import { setEventNotification } from '../../utils/eventApi';




export default function EventDetails() {

    
 const { eventId } = useParams();
const navigate = useNavigate();
const [searchParams] = useSearchParams();
const { user, isAuthenticated } = useAuth();
    
    const [showNotifyModal, setShowNotifyModal] = useState(false);
    const [isNotified, setIsNotified] = useState(false);
    
    const [reminderPreferences, setReminderPreferences] = useState({
        oneDayBefore: true,
        oneWeekBefore: false,
        morningOf: false
    });
    
 


// ADD this line:
const event = getEventById(eventId);
    
    // Check if URL has notify parameter
  useEffect(() => {
    if (searchParams.get('notify') === 'true' && isAuthenticated) {
        setShowNotifyModal(true);
    }
}, [searchParams, isAuthenticated]);
    
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
    
    const handleBackClick = () => {
        navigate('/');
    };
    
    const handleNotifyClick = () => {
        if (!isAuthenticated) {
            // Save current page to return after login
            navigate('/auth/login', { state: { returnUrl: `/events/${event.id}` } });
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
        
        await setEventNotification(event.id, {
            reminderDays,
            email: user.email
        });
        
        setIsNotified(true);
        setShowNotifyModal(false);
        alert('✓ Notification set successfully!');
    } catch (error) {
        alert('Failed to set notification. Please try again.');
    }
};
    
    const handlePreferenceChange = (key) => {
        setReminderPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };
    
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
            
            {/* Hero Section with Image */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
                             style={{ backgroundColor: event.color, color: 'white' }}>
                            {event.type}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            {event.title}
                        </h1>
                        <p className="text-white/90 text-lg">
                            Empowering Sustainable Agriculture in Nizamabad
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Event Info Card */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start space-x-3">
                                    <Calendar className="w-5 h-5 mt-1" style={{ color: event.color }} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Date</p>
                                        <p className="text-gray-900 font-semibold">{event.date}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <Clock className="w-5 h-5 mt-1" style={{ color: event.color }} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Time</p>
                                        <p className="text-gray-900 font-semibold">{event.time}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <MapPin className="w-5 h-5 mt-1" style={{ color: event.color }} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Location</p>
                                        <p className="text-gray-900 font-semibold">{event.location}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <Users className="w-5 h-5 mt-1" style={{ color: event.color }} />
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Capacity</p>
                                        <p className="text-gray-900 font-semibold">
                                            {event.registeredCount} / {event.capacity} registered
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* About Section */}
                        <div className="bg-white rounded-2xl shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                About This Event
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {event.fullDescription}
                            </p>
                        </div>
                        
                        {/* Why Attend Section */}
                        <div className="bg-white rounded-2xl shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Why Attend?
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {event.whyAttend.intro}
                            </p>
                            <ul className="space-y-3">
                                {event.whyAttend.points.map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle 
                                            className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" 
                                            style={{ color: event.color }} 
                                        />
                                        <span className="text-gray-700">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Event Highlights */}
                        <div className="bg-white rounded-2xl shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Event Highlights
                            </h2>
                            <div className="space-y-6">
                                {event.highlights.map((highlight, index) => (
                                    <div key={index}>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            • {highlight.title}
                                        </h3>
                                        <p className="text-gray-700 ml-4">
                                            {highlight.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column - Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        {/* CTA Card */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                                     style={{ backgroundColor: `${event.color}20` }}>
                                    <Calendar className="w-10 h-10" style={{ color: event.color }} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {event.monthAbbr} {event.day}
                                </h3>
                                <p className="text-gray-600">{event.date}</p>
                            </div>
                            
                            <div className="space-y-3">
                                <button
                                    onClick={handleNotifyClick}
                                    disabled={isNotified}
                                    className={`w-full py-3 px-6 rounded-xl font-semibold 
                                    transition-all duration-200 flex items-center justify-center space-x-2
                                    ${isNotified 
                                        ? 'bg-green-500 text-white cursor-not-allowed'
                                        : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                                    }`}
                                >
                                    {isNotified ? (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Notification Set</span>
                                        </>
                                    ) : (
                                        <>
                                            <Bell className="w-5 h-5" />
                                            <span>Notify Me</span>
                                        </>
                                    )}
                                </button>
                                
                                <button
                                    className="w-full py-3 px-6 rounded-xl font-semibold 
                                    border-2 border-gray-300 hover:border-gray-400 
                                    text-gray-700 transition-all duration-200 hover:bg-gray-50"
                                >
                                    Register Now
                                </button>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600">Seats Available</span>
                                    <span className="font-semibold text-gray-900">
                                        {event.capacity - event.registeredCount} left
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="h-2 rounded-full transition-all duration-300"
                                        style={{ 
                                            width: `${(event.registeredCount / event.capacity) * 100}%`,
                                            backgroundColor: event.color
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Instructor Card */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Event Instructor
                            </h3>
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                                     style={{ backgroundColor: event.color }}>
                                    {event.instructor.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{event.instructor}</p>
                                    <p className="text-sm text-gray-600">Agriculture Expert</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Topics Covered
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {event.tags.map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm font-medium"
                                        style={{ 
                                            backgroundColor: `${event.color}20`,
                                            color: event.color
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Notification Modal */}
            {showNotifyModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                                 style={{ backgroundColor: `${event.color}20` }}>
                                <Bell className="w-8 h-8" style={{ color: event.color }} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Set Event Reminder
                            </h2>
                            <p className="text-gray-600">
                                We'll notify you before the event starts
                            </p>
                        </div>
                        
                        {/* Event Summary */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{event.time}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* User Email */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Notification Email
                            </label>
                            <input
                                type="email"
                                value={user?.email || "user@example.com"}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                bg-gray-50 text-gray-600"
                            />
                        </div>
                        
                        {/* Reminder Timing */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                When to remind you
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center p-3 border border-gray-300 
                                rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={reminderPreferences.oneDayBefore}
                                        onChange={() => handlePreferenceChange('oneDayBefore')}
                                        className="w-4 h-4 rounded"
                                        style={{ accentColor: event.color }}
                                    />
                                    <span className="ml-3 text-gray-700">1 day before (Recommended)</span>
                                </label>
                                
                                <label className="flex items-center p-3 border border-gray-300 
                                rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={reminderPreferences.oneWeekBefore}
                                        onChange={() => handlePreferenceChange('oneWeekBefore')}
                                        className="w-4 h-4 rounded"
                                        style={{ accentColor: event.color }}
                                    />
                                    <span className="ml-3 text-gray-700">1 week before</span>
                                </label>
                                
                                <label className="flex items-center p-3 border border-gray-300 
                                rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={reminderPreferences.morningOf}
                                        onChange={() => handlePreferenceChange('morningOf')}
                                        className="w-4 h-4 rounded"
                                        style={{ accentColor: event.color }}
                                    />
                                    <span className="ml-3 text-gray-700">Morning of event</span>
                                </label>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowNotifyModal(false)}
                                className="flex-1 py-3 px-6 rounded-xl font-semibold 
                                border-2 border-gray-300 hover:border-gray-400 
                                text-gray-700 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSetNotification}
                                className="flex-1 py-3 px-6 rounded-xl font-semibold 
                                text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                                style={{ backgroundColor: event.color }}
                            >
                                Set Reminder
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}