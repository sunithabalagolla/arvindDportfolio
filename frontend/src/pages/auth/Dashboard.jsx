import React, { useState, useEffect } from 'react';
import { User, Eye, EyeOff, Download, ChevronLeft, ChevronRight, Edit, LogOut, Home, Bell, Trash2, CheckCircle, Calendar, Clock, ChevronDown, ChevronUp, } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI, volunteerAPI } from '../../utils/api';
import { getMyNotifications, cancelNotification } from '../../utils/eventApi';
import { getMyDonations, uploadReceipt  } from '../../utils/donationApi';


//for donation 
import { Upload, X, AlertCircle, FileText, Heart } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user: authUser, logout, updateUser } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [currentUpcomingIndex, setCurrentUpcomingIndex] = useState(0);
    const [currentPastIndex, setCurrentPastIndex] = useState(0);
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [leaveEventLoading, setLeaveEventLoading] = useState({});

    const [joinedEvents, setJoinedEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);

    // Notification states
    const [notifications, setNotifications] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(true);

    //donation states
    const [donations, setDonations] = useState([]);
    const [loadingDonations, setLoadingDonations] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [receiptFile, setReceiptFile] = useState(null);
    const [receiptPreview, setReceiptPreview] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);

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
                        rawDate: new Date(event.eventDate),
                        time: event.eventTime,
                        location: event.eventLocation,
                        image: event.eventImage || '/api/placeholder/200/120'
                    }));
                    setJoinedEvents(events);
                    console.log(`✅ Loaded ${events.length} joined events`);
                }
            } catch (error) {
                console.error('Failed to fetch joined events:', error);
            } finally {
                setEventsLoading(false);
            }
        };

        fetchJoinedEvents();
    }, [authUser]);

    // Fetch notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getMyNotifications();
                if (response.success) {
                    setNotifications(response.data);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoadingNotifications(false);
            }
        };

        fetchNotifications();
    }, []);


    //donation useeffect
    // useEffect(() => {
    //     const fetchDonations = async () => {
    //         try {
    //             // TODO: Replace with your actual API endpoint
    //             const response = await fetch('/api/donations/my-donations', {
    //                 headers: {
    //                     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             });

    //             const data = await response.json();

    //             if (data.success) {
    //                 setDonations(data.donations);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching donations:', error);
    //             // For demo: Show dummy pending donation
    //             setDonations([
    //                 {
    //                     _id: '1',
    //                     amount: 5000,
    //                     fundType: 'PM Cares Fund',
    //                     status: 'pending', // 'pending', 'receipt_uploaded', 'verified'
    //                     createdAt: new Date().toISOString(),
    //                     name: authUser?.firstName || 'User'
    //                 }
    //             ]);
    //         } finally {
    //             setLoadingDonations(false);
    //         }
    //     };

    //     if (authUser) {
    //         fetchDonations();
    //     }
    // }, [authUser]);

// Fetch donations useEffect
useEffect(() => {
    const fetchDonations = async () => {
        try {
            // ✅ USING API UTILITY - Clean & Simple
            const data = await getMyDonations();

            if (data.success) {
                setDonations(data.donations);
                console.log('✅ Loaded', data.donations.length, 'donations');
            } else {
                console.error('Failed to fetch donations:', data.message);
                setDonations([]);
            }
        } catch (error) {
            console.error('Error fetching donations:', error);
            setDonations([]);
        } finally {
            setLoadingDonations(false);
        }
    };

    if (authUser) {
        fetchDonations();
    }
}, [authUser]);

    const handleCancelNotification = async (notificationId) => {
        if (window.confirm('Are you sure you want to cancel this notification?')) {
            try {
                await cancelNotification(notificationId);
                setNotifications(notifications.filter(n => n._id !== notificationId));
                setSuccess('Notification cancelled successfully!');
                setTimeout(() => setSuccess(''), 3000);
            } catch (error) {
                setError('Failed to cancel notification');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

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

    // ===== SEPARATE UPCOMING AND PAST EVENTS =====
    const now = new Date();
    const upcomingEvents = joinedEvents.filter(event => event.rawDate >= now).sort((a, b) => a.rawDate - b.rawDate);
    const pastEvents = joinedEvents.filter(event => event.rawDate < now).sort((a, b) => b.rawDate - a.rawDate);

    const visibleUpcomingEvents = upcomingEvents.slice(currentUpcomingIndex, currentUpcomingIndex + 3);
    const visiblePastEvents = pastEvents.slice(currentPastIndex, currentPastIndex + 3);

    // Event Card Component
    const EventCard = ({ event, isPast = false }) => (
        <div
            key={event.id}
            onClick={() => navigate(`/volunteer/opportunity/${event.id}`, {
                state: { opportunity: event }
            })}
            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
        >
            <div className="relative w-full h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                {event.image && event.image !== '/api/placeholder/200/120' ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-white font-medium">Event Image</span>
                )}
                {isPast && (
                    <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                        Completed
                    </div>
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
                    <div className={`w-full ${isPast ? 'bg-gray-500' : 'bg-green-500'} text-white py-2 rounded-lg text-sm font-medium text-center`}>
                        {isPast ? 'Attended ✓' : 'Joined ✓'}
                    </div>

                    {!isPast && (
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
                    )}
                </div>
            </div>
        </div>
    );




    // ADD THESE HELPER FUNCTIONS ,donation related

    // Handle receipt file selection
    const handleReceiptFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
                setError('Please upload an image or PDF file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size should not exceed 5MB');
                return;
            }

            setReceiptFile(file);

            // Create preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => setReceiptPreview(e.target.result);
                reader.readAsDataURL(file);
            } else {
                setReceiptPreview(null);
            }

            setError('');
        }
    };

    // Handle receipt upload
  const handleUploadReceipt = async () => {
    if (!receiptFile && !transactionId) {
        setError('Please upload a receipt or enter transaction ID');
        return;
    }

    setUploadLoading(true);
    setError('');
    setSuccess('');

    try {
        // ✅ USING API UTILITY - Upload receipt
        const data = await uploadReceipt(
            selectedDonation._id,
            receiptFile,
            transactionId
        );

        if (data.success) {
            setSuccess('Receipt uploaded successfully!');

            // Update donation status locally
            setDonations(prev => prev.map(d =>
                d._id === selectedDonation._id
                    ? { 
                        ...d, 
                        status: 'receipt_uploaded', 
                        transactionId: data.data.transactionId,
                        receiptImage: data.data.receiptImage
                    }
                    : d
            ));

            // Close modal after 2 seconds
            setTimeout(() => {
                setShowUploadModal(false);
                setSelectedDonation(null);
                setReceiptFile(null);
                setReceiptPreview(null);
                setTransactionId('');
                setSuccess('');
            }, 2000);
        }
    } catch (error) {
        console.error('Upload error:', error);
        setError(typeof error === 'string' ? error : 'Failed to upload receipt. Please try again.');
    } finally {
        setUploadLoading(false);
    }
};

    // Open upload modal
    const openUploadModal = (donation) => {
        setSelectedDonation(donation);
        setShowUploadModal(true);
        setError('');
        setSuccess('');
        setReceiptFile(null);
        setReceiptPreview(null);
        setTransactionId('');
    };

    // Download certificate
    const handleDownloadDonationCertificate = (donation) => {
        const certificateContent = `
DONATION CERTIFICATE
====================

Certificate No: ${donation._id}
Date: ${new Date(donation.createdAt).toLocaleDateString()}

This is to certify that:

Name: ${donation.name || authUser?.firstName}
Email: ${authUser?.email}

Has generously donated:
Amount: ₹${donation.amount.toLocaleString()}
To: ${donation.fundType}

Transaction ID: ${donation.transactionId || 'Pending'}
Status: ${donation.status === 'verified' ? 'Verified ✓' : 'Under Review'}

Thank you for your contribution to the nation!

====================
This certificate is valid for tax purposes under Section 80G.
    `.trim();

        const element = document.createElement('a');
        const file = new Blob([certificateContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `donation-certificate-${donation._id}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Calculate donation stats
    const donationStats = {
        total: donations.reduce((sum, d) => sum + d.amount, 0),
        count: donations.length,
        pending: donations.filter(d => d.status === 'pending').length,
        verified: donations.filter(d => d.status === 'verified').length
    };

    // Count pending donations for alert banner
    const pendingDonations = donations.filter(d => d.status === 'pending');


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
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

                        {/* Notifications Section */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Bell className="w-6 h-6 mr-2 text-orange-500" />
                                My Event Notifications
                            </h2>

                            {loadingNotifications ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                                    <p className="text-gray-600 mt-4">Loading notifications...</p>
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="text-center py-8">
                                    <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-600">No notifications set yet.</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Click "Notify Me" on any event to get reminders!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification._id}
                                            className="border-2 border-gray-200 rounded-xl p-4 hover:border-orange-300 transition-colors"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {notification.eventTitle}
                                                    </h3>
                                                    <div className="space-y-1 text-sm text-gray-600">
                                                        <div className="flex items-center">
                                                            <Calendar className="w-4 h-4 mr-2" />
                                                            <span>Event: {new Date(notification.eventDate).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Bell className="w-4 h-4 mr-2" />
                                                            <span>Reminder: {new Date(notification.reminderDate).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })} at 9:00 AM</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock className="w-4 h-4 mr-2" />
                                                            <span className={`font-medium ${notification.isSent ? 'text-green-600' : 'text-orange-600'}`}>
                                                                {notification.isSent ? (
                                                                    <span className="flex items-center">
                                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                                        Sent
                                                                    </span>
                                                                ) : (
                                                                    <span>Pending</span>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleCancelNotification(notification._id)}
                                                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Cancel notification"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* UPCOMING EVENTS SECTION */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                    <span className="mr-2">📅</span> Upcoming Events
                                    {upcomingEvents.length > 0 && (
                                        <span className="ml-2 text-sm font-normal text-gray-500">
                                            ({upcomingEvents.length})
                                        </span>
                                    )}
                                </h3>
                                {upcomingEvents.length > 3 && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCurrentUpcomingIndex(Math.max(0, currentUpcomingIndex - 3))}
                                            disabled={currentUpcomingIndex === 0}
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setCurrentUpcomingIndex(currentUpcomingIndex + 3)}
                                            disabled={currentUpcomingIndex + 3 >= upcomingEvents.length}
                                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                                        >
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
                            ) : upcomingEvents.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500 mb-4">No upcoming events.</p>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="text-orange-500 hover:text-orange-600 font-medium underline"
                                    >
                                        Explore Events
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {visibleUpcomingEvents.map((event) => (
                                        <EventCard key={event.id} event={event} isPast={false} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* PAST EVENTS SECTION */}
                        {pastEvents.length > 0 && (
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => setShowPastEvents(!showPastEvents)}
                                        className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                                    >
                                        <span className="mr-2">✅</span> Past Events
                                        <span className="text-sm font-normal text-gray-500">
                                            ({pastEvents.length})
                                        </span>
                                        {showPastEvents ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </button>
                                    {showPastEvents && pastEvents.length > 3 && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setCurrentPastIndex(Math.max(0, currentPastIndex - 3))}
                                                disabled={currentPastIndex === 0}
                                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setCurrentPastIndex(currentPastIndex + 3)}
                                                disabled={currentPastIndex + 3 >= pastEvents.length}
                                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {showPastEvents && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {visiblePastEvents.map((event) => (
                                            <EventCard key={event.id} event={event} isPast={true} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}




                        {/* MY DONATIONS SECTION - */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                    <Heart className="w-6 h-6 mr-2 text-orange-500" />
                                    My Donations
                                </h2>
                                {donationStats.count > 0 && (
                                    <div className="flex gap-2 text-sm">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                                            Total: ₹{donationStats.total.toLocaleString()}
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                                            {donationStats.count} donation{donationStats.count !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Pending Alert Banner */}
                            {pendingDonations.length > 0 && (
                                <div className="mb-6 bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4 animate-pulse">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-orange-900 mb-1">
                                                ⚠️ Action Required
                                            </h4>
                                            <p className="text-sm text-orange-800">
                                                You have {pendingDonations.length} pending donation{pendingDonations.length !== 1 ? 's' : ''}.
                                                Please upload your payment receipt to complete the verification.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {loadingDonations ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                                    <p className="text-gray-600 mt-4">Loading donations...</p>
                                </div>
                            ) : donations.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-lg">
                                    <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-600 mb-2">No donations yet.</p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Start contributing to support the nation's progress!
                                    </p>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
                                    >
                                        <Heart className="w-5 h-5" />
                                        Make Your First Donation
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {donations.map((donation) => (
                                        <div
                                            key={donation._id}
                                            className={`rounded-xl border-2 p-5 transition-all ${donation.status === 'pending'
                                                    ? 'border-orange-300 bg-orange-50'
                                                    : donation.status === 'receipt_uploaded'
                                                        ? 'border-blue-300 bg-blue-50'
                                                        : 'border-green-300 bg-green-50'
                                                }`}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                {/* Left Side - Donation Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${donation.status === 'pending'
                                                                ? 'bg-orange-500'
                                                                : donation.status === 'receipt_uploaded'
                                                                    ? 'bg-blue-500'
                                                                    : 'bg-green-500'
                                                            }`}>
                                                            <Heart className="w-6 h-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-bold text-gray-900">
                                                                ₹{donation.amount.toLocaleString()}
                                                            </h3>
                                                            <p className="text-sm text-gray-600">{donation.fundType}</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-gray-500" />
                                                            <span>
                                                                {new Date(donation.createdAt).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </span>
                                                        </div>
                                                        {donation.transactionId && (
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="w-4 h-4 text-gray-500" />
                                                                <span className="font-mono text-xs">
                                                                    {donation.transactionId}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div className="mt-3">
                                                        {donation.status === 'pending' && (
                                                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                                                <Clock className="w-4 h-4" />
                                                                Pending Upload
                                                            </span>
                                                        )}
                                                        {donation.status === 'receipt_uploaded' && (
                                                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                                <Clock className="w-4 h-4" />
                                                                Under Review
                                                            </span>
                                                        )}
                                                        {donation.status === 'verified' && (
                                                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                                <CheckCircle className="w-4 h-4" />
                                                                Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right Side - Actions */}
                                                <div className="flex flex-col gap-2 md:w-48">
                                                    {donation.status === 'pending' && (
                                                        <button
                                                            onClick={() => openUploadModal(donation)}
                                                            className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                                        >
                                                            <Upload className="w-5 h-5" />
                                                            Upload Receipt
                                                        </button>
                                                    )}

                                                    {donation.status === 'receipt_uploaded' && (
                                                        <button
                                                            onClick={() => openUploadModal(donation)}
                                                            className="w-full px-4 py-2 border-2 border-blue-500 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                            Update Receipt
                                                        </button>
                                                    )}

                                                    {(donation.status === 'receipt_uploaded' || donation.status === 'verified') && (
                                                        <button
                                                            onClick={() => handleDownloadDonationCertificate(donation)}
                                                            className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                            Certificate
                                                        </button>
                                                    )}
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



                        {/* Upload Receipt Modal */}
{showUploadModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Upload className="w-6 h-6" />
                        <h3 className="text-2xl font-bold">Upload Receipt</h3>
                    </div>
                    <button
                        onClick={() => {
                            setShowUploadModal(false);
                            setSelectedDonation(null);
                            setReceiptFile(null);
                            setReceiptPreview(null);
                            setTransactionId('');
                            setError('');
                        }}
                        className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Donation Details */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Donation Details</h4>
                    <div className="space-y-1 text-sm text-gray-700">
                        <p><span className="font-medium">Amount:</span> ₹{selectedDonation?.amount.toLocaleString()}</p>
                        <p><span className="font-medium">Fund:</span> {selectedDonation?.fundType}</p>
                        <p><span className="font-medium">Date:</span> {new Date(selectedDonation?.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                        <p className="text-red-600 text-sm font-medium">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                        <p className="text-green-600 text-sm font-medium">{success}</p>
                    </div>
                )}

                {/* Transaction ID Input */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Transaction ID
                    </label>
                    <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Enter transaction ID from payment"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload Receipt Image/PDF
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500 transition-colors">
                        <div className="space-y-1 text-center">
                            {receiptPreview ? (
                                <div className="relative">
                                    <img 
                                        src={receiptPreview} 
                                        alt="Receipt preview" 
                                        className="mx-auto h-48 w-auto rounded-lg shadow-md"
                                    />
                                    <button
                                        onClick={() => {
                                            setReceiptFile(null);
                                            setReceiptPreview(null);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : receiptFile ? (
                                <div className="flex items-center justify-center gap-2 text-gray-700">
                                    <FileText className="w-8 h-8" />
                                    <span>{receiptFile.name}</span>
                                    <button
                                        onClick={() => setReceiptFile(null)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500">
                                            <span>Upload a file</span>
                                            <input 
                                                id="file-upload" 
                                                name="file-upload" 
                                                type="file" 
                                                className="sr-only" 
                                                accept="image/*,.pdf"
                                                onChange={handleReceiptFileChange}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                            <p className="font-semibold mb-1">Important:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Upload a clear image of your payment receipt</li>
                                <li>Ensure transaction ID is visible in the receipt</li>
                                <li>Your donation will be verified within 24-48 hours</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => {
                            setShowUploadModal(false);
                            setSelectedDonation(null);
                            setReceiptFile(null);
                            setReceiptPreview(null);
                            setTransactionId('');
                            setError('');
                        }}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUploadReceipt}
                        disabled={uploadLoading || (!receiptFile && !transactionId)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {uploadLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5" />
                                Upload Receipt
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    </div>
)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;