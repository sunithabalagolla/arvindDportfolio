import React, { useState, useEffect } from 'react';
import { User, Eye, EyeOff, Download, ChevronLeft, ChevronRight, Edit, LogOut, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI, volunteerAPI } from '../../utils/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user: authUser, logout, updateUser } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [leaveEventLoading, setLeaveEventLoading] = useState({});

    const [joinedEvents, setJoinedEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);

    const [profileData, setProfileData] = useState({
        firstName: '',
        email: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (authUser) {
            setProfileData({
                firstName: authUser.firstName || '',
                email: authUser.email || ''
            });
        }
    }, [authUser]);

    useEffect(() => {
        if (location.state?.message) {
            setSuccess(location.state.message);
            setTimeout(() => setSuccess(''), 5000);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    useEffect(() => {
        const fetchJoinedEvents = async () => {
            if (!authUser) return;

            try {
                setEventsLoading(true);
                const response = await volunteerAPI.getMyEvents();

                if (response.success) {
                    const events = response.data.map(event => ({
                        id: event.eventId,
                        title: event.eventTitle,
                        date: event.eventDate,
                        time: event.eventTime,
                        location: event.eventLocation,
                        image: event.eventImage || '/api/placeholder/200/120'
                    }));
                    setJoinedEvents(events);
                }
            } catch (error) {
                console.error('Failed to fetch joined events:', error);
            } finally {
                setEventsLoading(false);
            }
        };

        fetchJoinedEvents();
    }, [authUser]);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfileImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await authAPI.updateProfile({
                firstName: profileData.firstName
            });

            if (response.success) {
                setSuccess('Profile updated successfully!');
                updateUser(response.data.user);
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (err) {
            setError(err || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (!passwordData.currentPassword) {
            setError('Please enter your current password');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await authAPI.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword
            });

            if (response.success) {
                setSuccess('Password updated successfully!');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (err) {
            setError(err || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const handleLeaveEvent = async (eventId) => {
        if (!window.confirm('Are you sure you want to leave this event?')) return;

        setLeaveEventLoading(prev => ({ ...prev, [eventId]: true }));
        setError('');
        
        try {
            const response = await volunteerAPI.leaveEvent(eventId);
            if (response.success) {
                setJoinedEvents(prev => prev.filter(event => event.id !== eventId));
                setSuccess('Successfully left the event');
                setTimeout(() => setSuccess(''), 3000);
                
                if (visibleEvents.length === 1 && currentEventIndex > 0) {
                    setCurrentEventIndex(prev => Math.max(0, prev - 3));
                }
            }
        } catch (error) {
            setError(error || 'Failed to leave event');
            setTimeout(() => setError(''), 3000);
        } finally {
            setLeaveEventLoading(prev => ({ ...prev, [eventId]: false }));
        }
    };

    const contributions = [
        { date: '15-09-2024', fundName: 'PM Cares Fund', amount: '₹20000.00', transactionId: 'TXN123456' },
        { date: '12-08-2024', fundName: 'Relief Fund', amount: '₹15000.00', transactionId: 'TXN789012' },
        { date: '05-07-2024', fundName: 'Education Fund', amount: '₹10000.00', transactionId: 'TXN345678' }
    ];

    const handleDownload = (contribution) => {
        const receiptContent = `DONATION RECEIPT\n================\nTransaction ID: ${contribution.transactionId}\nDate: ${contribution.date}\nAmount: ${contribution.amount}\nFund: ${contribution.fundName}\nDonor: ${authUser?.firstName || 'User'}\nEmail: ${authUser?.email || ''}\n================\nThank you for your contribution!`;
        const element = document.createElement('a');
        const file = new Blob([receiptContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `receipt-${contribution.transactionId}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const visibleEvents = joinedEvents.slice(currentEventIndex, currentEventIndex + 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Updated Header with Back to Home Button */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all text-sm font-medium shadow-md hover:shadow-lg hover:scale-105"
                        >
                            <Home className="w-4 h-4" />
                            <span className="hidden sm:inline">Home</span>
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Dashboard</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-sm font-medium shadow-md hover:shadow-lg hover:scale-105"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md animate-fadeIn">
                        <span className="text-red-600 font-medium">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-md animate-fadeIn">
                        <span className="text-green-600 font-medium">{success}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h2>

                            <div className="flex flex-col items-center mb-6">
                                <div className="relative">
                                    <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center overflow-hidden">
                                        {profileImage ? (
                                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-16 h-16 text-white" />
                                        )}
                                    </div>
                                    <input type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" id="profile-upload" />
                                    <label htmlFor="profile-upload" className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors cursor-pointer shadow-lg">
                                        <Edit className="w-5 h-5" />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={profileData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        readOnly
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                </div>

                                <button
                                    onClick={handleUpdateProfile}
                                    disabled={loading}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordChange}
                                                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>

                                    {(passwordData.currentPassword || passwordData.newPassword || passwordData.confirmPassword) && (
                                        <button
                                            onClick={handleChangePassword}
                                            disabled={loading}
                                            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                                        >
                                            {loading ? 'Changing...' : 'Change Password'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-xl p-6 border border-orange-200 shadow-md">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome, {authUser?.firstName}!</h3>
                            <p className="text-gray-700">{authUser?.email}</p>
                            <div className="flex flex-wrap items-center gap-4 mt-4">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Member since:</span> {new Date(authUser?.createdAt).toLocaleDateString()}
                                </p>
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${authUser?.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {authUser?.isVerified ? 'Verified' : 'Pending'}
                                </span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Joined Events</h3>
                                {joinedEvents.length > 3 && (
                                    <div className="flex gap-2">
                                        <button onClick={() => setCurrentEventIndex(Math.max(0, currentEventIndex - 3))} disabled={currentEventIndex === 0} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => setCurrentEventIndex(currentEventIndex + 3)} disabled={currentEventIndex + 3 >= joinedEvents.length} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {eventsLoading ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                                    <p className="text-gray-500 mt-4">Loading events...</p>
                                </div>
                            ) : joinedEvents.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500 mb-4">You haven't joined any events yet.</p>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="text-orange-500 hover:text-orange-600 font-medium underline"
                                    >
                                        Explore Events
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {visibleEvents.map((event) => (
                                        <div 
                                            key={event.id} 
                                            onClick={() => navigate(`/volunteer/opportunity/${event.id}`, { 
                                                state: { opportunity: event } 
                                            })}
                                            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                        >
                                            <div className="w-full h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                                {event.image && event.image !== '/api/placeholder/200/120' ? (
                                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-white font-medium">Event Image</span>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h4>
                                                <div className="text-sm text-gray-600 space-y-1 mb-3">
                                                    <div>📅 {event.date}</div>
                                                    {event.time && <div>🕐 {event.time}</div>}
                                                    <div>📍 {event.location}</div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <div className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium text-center">
                                                        Joined ✓
                                                    </div>
                                                    
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleLeaveEvent(event.id);
                                                        }}
                                                        disabled={leaveEventLoading[event.id]}
                                                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {leaveEventLoading[event.id] ? (
                                                            <span className="flex items-center justify-center">
                                                                <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Leaving...
                                                            </span>
                                                        ) : (
                                                            'Leave Event'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Your Contributions</h3>
                            <div className="space-y-3">
                                {contributions.map((contribution, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Date</div>
                                                <div className="font-medium text-gray-900">{contribution.date}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Fund Name</div>
                                                <div className="font-medium text-gray-900">{contribution.fundName}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Amount</div>
                                                <div className="font-medium text-gray-900">{contribution.amount}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Transaction ID</div>
                                                <div className="font-medium text-gray-900">{contribution.transactionId}</div>
                                            </div>
                                            <div className="flex justify-end">
                                                <button onClick={() => handleDownload(contribution)} className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Download Receipt">
                                                    <Download className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;