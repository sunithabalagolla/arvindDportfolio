import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const JoinEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    
    const opportunity = location.state?.opportunity;
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // If no opportunity data, fetch from API or redirect
    if (!opportunity) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Event not found. <button onClick={() => navigate(-1)} className="text-orange-500 underline">Go back</button></p>
            </div>
        );
    }

    const handleJoinEvent = async () => {
        setLoading(true);
        
        try {
            // Call your API to join event
            // await volunteerAPI.joinEvent(id, user.id);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSuccess(true);
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate('/auth/dashboard');
            }, 2000);
            
        } catch (error) {
            console.error('Failed to join event:', error);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Joined!</h2>
                    <p className="text-gray-600 mb-4">You've been registered for {opportunity.title}</p>
                    <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-orange-500 hover:text-orange-600 font-medium flex items-center gap-2"
                >
                    ← Back to Opportunities
                </button>

                {/* Event Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Image */}
                    <div className="h-64 relative overflow-hidden">
                        <img
                            src={opportunity.image}
                            alt={opportunity.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{opportunity.title}</h1>
                        <p className="text-gray-600 mb-6">{opportunity.description}</p>

                        {/* Details */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center text-gray-700">
                                <Calendar className="w-5 h-5 mr-3 text-orange-500" />
                                <span className="font-medium">{opportunity.date}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Clock className="w-5 h-5 mr-3 text-orange-500" />
                                <span className="font-medium">{opportunity.time}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                                <span className="font-medium">{opportunity.location}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Users className="w-5 h-5 mr-3 text-orange-500" />
                                <span className="font-medium">
                                    {opportunity.volunteersJoined} / {opportunity.totalVolunteers} Volunteers
                                </span>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-600">Joining as:</p>
                            <p className="font-semibold text-gray-900">{user?.firstName}</p>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                        </div>

                        {/* Join Button */}
                        <button
                            onClick={handleJoinEvent}
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Joining...
                                </span>
                            ) : (
                                'Confirm & Join Event'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinEvent;