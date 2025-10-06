import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, CheckCircle, ArrowLeft, Award, Heart, Target, Sparkles, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { volunteerAPI } from '../../utils/api';

const JoinEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    
    const opportunity = location.state?.opportunity;
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!opportunity) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">❌</span>
                    </div>
                    <p className="text-gray-600 mb-4 text-lg">Event not found</p>
                    <button 
                        onClick={() => navigate('/')} 
                        className="bg-[#FB8B35] hover:bg-[#e67e2e] text-white px-6 py-2 rounded-lg font-medium transition-all"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    const handleJoinEvent = async () => {
        setLoading(true);
        
        try {
            const response = await volunteerAPI.joinEvent(id, {
                eventTitle: opportunity.title,
                eventDate: opportunity.date,
                eventTime: opportunity.time,
                eventLocation: opportunity.location,
                eventImage: opportunity.image
            });
            
            if (response.success) {
                setSuccess(true);
                
                setTimeout(() => {
                    navigate('/auth/dashboard', { 
                        state: { 
                            message: 'Successfully joined the event!',
                            eventId: id 
                        }
                    });
                }, 2500);
            }
            
        } catch (error) {
            console.error('Failed to join event:', error);
            alert(error || 'Failed to join event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-md transform scale-100 animate-fadeIn border-4 border-green-200">
                    <div className="relative mb-6">
                        <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-lg">
                            <CheckCircle className="w-16 h-16 text-white" strokeWidth={3} />
                        </div>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <Star className="w-8 h-8 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Successfully Joined!</h2>
                    <p className="text-gray-600 text-xl mb-3">You're now registered for</p>
                    <p className="text-[#FB8B35] font-bold text-2xl mb-6 px-4">{opportunity.title}</p>
                    <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-xl p-5 mb-6 border-2 border-orange-200">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="text-2xl">📧</span> Confirmation email sent to <br/>
                            <span className="font-bold text-gray-900">{user?.email}</span>
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#FB8B35] border-t-transparent"></div>
                        <p className="text-sm">Redirecting to dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    const percentage = (opportunity.volunteersJoined / opportunity.totalVolunteers) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
            {/* Enhanced Hero Section */}
            <div className="relative bg-gradient-to-r from-[#FB8B35] to-[#e67e2e] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-5"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                }}></div>
                <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-16">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 text-white hover:text-orange-100 font-semibold flex items-center gap-2 transition-all hover:gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Opportunities
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-12 bg-white rounded-full"></div>
                        <h1 className="text-4xl md:text-6xl font-bold">{opportunity.title}</h1>
                    </div>
                    <p className="text-orange-100 text-xl md:text-2xl max-w-3xl leading-relaxed">
                        Join us in making a difference. Your contribution matters!
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Event Image with Enhanced Styling */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                            <div className="relative h-80 md:h-96">
                                <img
                                    src={opportunity.image}
                                    alt={opportunity.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                <div className="absolute top-6 right-6 bg-white rounded-full px-5 py-3 shadow-xl border-2 border-[#FB8B35]">
                                    <span className="text-[#FB8B35] font-bold text-lg">{opportunity.role}</span>
                                </div>
                            </div>
                        </div>

                        {/* About This Event - Enhanced */}
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-t-4 border-[#FB8B35]">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#FB8B35] rounded-full flex items-center justify-center">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                About This Event
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                {opportunity.description || "Join us for this amazing volunteer opportunity where you can contribute your time and skills to make a meaningful impact in our community. This event brings together passionate individuals who are committed to creating positive change."}
                            </p>

                            {/* What You'll Do - Enhanced */}
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 mb-8 border-2 border-[#FB8B35]/20">
                                <h3 className="font-bold text-gray-900 mb-5 text-xl flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-[#FB8B35]" />
                                    What You'll Do:
                                </h3>
                                <ul className="space-y-4 text-gray-700">
                                    {[
                                        'Participate in hands-on volunteer activities',
                                        'Collaborate with fellow volunteers',
                                        'Make a direct impact in the community',
                                        'Earn volunteer certificate upon completion'
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 group">
                                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-base leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Why Join - Enhanced */}
                            <h3 className="font-bold text-gray-900 mb-5 text-xl">Why Join This Event?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { icon: Award, color: 'blue', title: 'Recognition', desc: 'Certificate provided', gradient: 'from-blue-50 to-blue-100' },
                                    { icon: Heart, color: 'green', title: 'Impact', desc: 'Direct community help', gradient: 'from-green-50 to-green-100' },
                                    { icon: Users, color: 'purple', title: 'Network', desc: 'Meet like-minded people', gradient: 'from-purple-50 to-purple-100' }
                                ].map((item, index) => (
                                    <div key={index} className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-${item.color}-200`}>
                                        <div className={`w-16 h-16 bg-${item.color}-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                            <item.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <p className="font-bold text-gray-900 text-lg mb-2">{item.title}</p>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Enhanced */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Event Details Card - Enhanced */}
                            <div className="bg-white rounded-3xl shadow-2xl p-8 border-t-4 border-[#FB8B35]">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: Calendar, label: 'Date', value: opportunity.date, color: 'orange' },
                                        { icon: Clock, label: 'Time', value: opportunity.time, color: 'blue' },
                                        { icon: MapPin, label: 'Location', value: opportunity.location, color: 'green' }
                                    ].map((detail, index) => (
                                        <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-[#FB8B35] transition-all">
                                            <div className={`w-12 h-12 bg-${detail.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                                                <detail.icon className={`w-6 h-6 text-${detail.color}-600`} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">{detail.label}</p>
                                                <p className="font-semibold text-gray-900 text-base leading-snug">{detail.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Progress Bar - Enhanced */}
                                <div className="mt-8 pt-6 border-t-2 border-gray-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Users className="w-5 h-5 text-[#FB8B35]" />
                                            Volunteers
                                        </span>
                                        <span className="text-lg font-bold text-[#FB8B35]">
                                            {opportunity.volunteersJoined}/{opportunity.totalVolunteers}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                                        <div 
                                            className="bg-gradient-to-r from-[#FB8B35] to-[#e67e2e] h-full transition-all duration-500 rounded-full relative overflow-hidden"
                                            style={{ width: `${percentage}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-3 font-medium">
                                        🎯 {opportunity.totalVolunteers - opportunity.volunteersJoined} spots remaining
                                    </p>
                                </div>
                            </div>

                            {/* User Info Card - Enhanced */}
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl shadow-2xl p-8 border-4 border-[#FB8B35]/30">
                                <h3 className="font-bold text-gray-900 mb-5 text-lg">Joining as:</h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#FB8B35] to-[#e67e2e] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white">
                                        {user?.firstName?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">{user?.firstName}</p>
                                        <p className="text-sm text-gray-600">{user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Join Button - Enhanced */}
                            <button
                                onClick={handleJoinEvent}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#FB8B35] to-[#e67e2e] hover:from-[#e67e2e] hover:to-[#FB8B35] text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 text-lg border-2 border-white"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Joining Event...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Star className="w-6 h-6" />
                                        Confirm & Join Event
                                    </span>
                                )}
                            </button>

                            <p className="text-xs text-center text-gray-500 leading-relaxed px-4">
                                🤝 By joining, you agree to attend the event on the scheduled date
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinEvent;