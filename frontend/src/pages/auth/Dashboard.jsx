import React, { useState } from 'react';
import { User, Eye, EyeOff, Download, ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import Header from '../../components/common/Header';

const Dashboard = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [profileImage, setProfileImage] = useState(null);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const joinedEvents = [
        {
            id: 1,
            title: 'Swatcha Bharath Camp',
            date: 'Oct 7, 2024',
            location: 'Kumta Grounds - Hyderabad',
            image: '/api/placeholder/200/120'
        },
        {
            id: 2,
            title: 'Swatcha Bharath Camp',
            date: 'Oct 7, 2024',
            location: 'Kumta Grounds - Hyderabad',
            image: '/api/placeholder/200/120'
        },
        {
            id: 3,
            title: 'Swatcha Bharath Camp',
            date: 'Oct 7, 2024',
            location: 'Kumta Grounds - Hyderabad',
            image: '/api/placeholder/200/120'
        },
        {
            id: 4,
            title: 'Clean India Drive',
            date: 'Oct 15, 2024',
            location: 'Gandhi Park - Hyderabad',
            image: '/api/placeholder/200/120'
        },
        {
            id: 5,
            title: 'Tree Plantation Drive',
            date: 'Oct 22, 2024',
            location: 'Botanical Garden - Hyderabad',
            image: '/api/placeholder/200/120'
        },
        {
            id: 6,
            title: 'Community Service',
            date: 'Nov 5, 2024',
            location: 'Central Park - Hyderabad',
            image: '/api/placeholder/200/120'
        }
    ];

    const contributions = [
        {
            date: '15-09-2024',
            fundName: 'PM Cares Fund',
            amount: '₹20000.00',
            transactionId: 'TXN123456'
        },
        {
            date: '15-09-2024',
            fundName: 'PM Cares Fund',
            amount: '₹20000.00',
            transactionId: 'TXN123456'
        },
        {
            date: '12-08-2024',
            fundName: 'Relief Fund',
            amount: '₹15000.00',
            transactionId: 'TXN789012'
        }
    ];

    const nextEvents = () => {
        if (currentEventIndex + 3 < joinedEvents.length) {
            setCurrentEventIndex(currentEventIndex + 3);
        }
    };

    const prevEvents = () => {
        if (currentEventIndex > 0) {
            setCurrentEventIndex(Math.max(0, currentEventIndex - 3));
        }
    };

    const handleDownload = (transactionId) => {
        const receiptContent = `
DONATION RECEIPT
================
Transaction ID: ${transactionId}
Date: ${new Date().toLocaleDateString()}
Amount: ₹20000.00
Fund: PM Cares Fund
Donor: John Doe
================
Thank you for your contribution!
        `;
        
        const element = document.createElement('a');
        const file = new Blob([receiptContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `receipt-${transactionId}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Get visible events - always show exactly 3
    const visibleEvents = joinedEvents.slice(currentEventIndex, currentEventIndex + 3);

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
            {/* <Header forceOrangeBackground={true}></Header> */}
          
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
                {/* Left Side - Edit Profile */}
                <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 lg:mb-8">Edit Profile</h2>
                        
                        {/* Profile Picture */}
                        <div className="flex justify-center mb-6 lg:mb-8">
                            
                            <div className="relative">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden">
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfileImageChange}
                                    className="hidden"
                                    id="profile-upload"
                                />
                                <label 
                                    htmlFor="profile-upload"
                                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors cursor-pointer"
                                >
                                    <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                                </label>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4 sm:space-y-6">
                            {/* First Name and Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm text-gray-600 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none bg-transparent text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm text-gray-600 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none bg-transparent text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs sm:text-sm text-gray-600 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="johndoe123@gmail.com"
                                    className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none bg-transparent text-sm sm:text-base"
                                />
                            </div>

                            {/* Contact Number */}
                            <div>
                                <label className="block text-xs sm:text-sm text-gray-600 mb-2">Contact Number</label>
                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none bg-transparent text-sm sm:text-base"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-xs sm:text-sm text-gray-600 mb-2">City</label>
                                <input
                                    type="text"
                                    placeholder="Hyderabad"
                                    className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none bg-transparent text-sm sm:text-base"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs sm:text-sm text-gray-600 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder={showPassword ? "defaultpassword" : "••••••••••••"}
                                        className="w-full px-0 py-2 pr-8 border-0 border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none bg-transparent text-sm sm:text-base"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Update Button */}
                        <button className="w-full mt-6 sm:mt-8 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
                            Update Profile
                        </button>
                    </div>
                </div>

                {/* Vertical Divider Line - Hidden on mobile */}
                <div className="hidden lg:block w-px bg-gray-300 mx-4"></div>

                {/* Horizontal Divider Line - Visible on mobile/tablet */}
                <div className="lg:hidden w-full h-px bg-gray-300 my-6"></div>

                {/* Right Side - Dashboard */}
                <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 lg:mb-8">Dashboard</h2>
                    
                    {/* Joined Events */}
                    <div className="mb-8 sm:mb-10">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Joined Events</h3>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={prevEvents}
                                    disabled={currentEventIndex === 0}
                                    className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                                <button 
                                    onClick={nextEvents}
                                    disabled={currentEventIndex + 3 >= joinedEvents.length}
                                    className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Fixed 3-column Grid for Desktop, responsive for smaller screens */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {visibleEvents.map((event) => (
                                <div key={event.id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                                    <div className="w-full h-24 sm:h-28 lg:h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                        <span className="text-white text-xs sm:text-sm font-medium">Event Image</span>
                                    </div>
                                    <div className="p-2.5 sm:p-3">
                                        <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1.5 sm:mb-2">{event.title}</h4>
                                        <div className="text-xs text-gray-600 space-y-0.5 sm:space-y-1 mb-2 sm:mb-3">
                                            <div className="flex items-center space-x-1">
                                                <span>📅</span>
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <span>📍</span>
                                                <span className="truncate">{event.location}</span>
                                            </div>
                                        </div>
                                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs transition-colors">
                                            Already Joined
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Your Contributions */}
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Your Contributions</h3>
                        <div className="space-y-3 sm:space-y-4">
                            {contributions.map((contribution, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 p-3 sm:p-4">
                                    {/* Mobile Layout - Stacked */}
                                    <div className="block sm:hidden space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-gray-600 text-xs mb-1">Date</div>
                                                <div className="font-medium text-gray-800 text-sm">{contribution.date}</div>
                                            </div>
                                            <button 
                                                onClick={() => handleDownload(contribution.transactionId)}
                                                className="text-orange-500 hover:text-orange-600 transition-colors p-1 hover:bg-orange-50 rounded"
                                                title="Download Receipt"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <div className="text-gray-600 text-xs mb-1">Fund Name</div>
                                            <div className="font-medium text-gray-800 text-sm">{contribution.fundName}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-gray-600 text-xs mb-1">Amount</div>
                                                <div className="font-medium text-gray-800 text-sm">{contribution.amount}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-600 text-xs mb-1">Transaction ID</div>
                                                <div className="font-medium text-gray-800 text-sm">{contribution.transactionId}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tablet/Desktop Layout - Grid */}
                                    <div className="hidden sm:grid sm:grid-cols-4 gap-4 items-center text-sm">
                                        <div>
                                            <div className="text-gray-600 text-xs mb-1">Date</div>
                                            <div className="font-medium text-gray-800">{contribution.date}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-600 text-xs mb-1">Fund Name</div>
                                            <div className="font-medium text-gray-800">{contribution.fundName}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-600 text-xs mb-1">Amount</div>
                                            <div className="font-medium text-gray-800">{contribution.amount}</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-gray-600 text-xs mb-1">Transaction ID</div>
                                                <div className="font-medium text-gray-800">{contribution.transactionId}</div>
                                            </div>
                                            <button 
                                                onClick={() => handleDownload(contribution.transactionId)}
                                                className="text-orange-500 hover:text-orange-600 transition-colors p-1 hover:bg-orange-50 rounded"
                                                title="Download Receipt"
                                            >
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
    );
};

export default Dashboard;