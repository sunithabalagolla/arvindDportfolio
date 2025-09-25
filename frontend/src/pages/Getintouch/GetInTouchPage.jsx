import React, { useState } from 'react';
import { MapPin, Mail, Phone, MessageSquare, AlertCircle } from 'lucide-react';

const GetInTouchPage = () => {
    const [concernsFeedback, setConcernsFeedback] = useState('');
    const [generalFeedback, setGeneralFeedback] = useState('');

    const handleConcernsSubmit = (e) => {
        e.preventDefault();
        console.log('Concerns submitted:', concernsFeedback);
        setConcernsFeedback('');
    };

    const handleGeneralSubmit = (e) => {
        e.preventDefault();
        console.log('General feedback submitted:', generalFeedback);
        setGeneralFeedback('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            {/* Contact Section */}
            <div className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 xl:gap-24 items-center max-w-7xl mx-auto">

                        {/* Left Side - Image */}
                        <div className="relative">
                            <div className="w-full">
                                <img
                                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop"
                                    alt="Contact"
                                    className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl sm:rounded-2xl shadow-lg"
                                />
                            </div>
                        </div>

                        {/* Right Side - Contact Info */}
                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 sm:mb-8 lg:mb-12">
                                Contact
                            </h1>

                            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                                {/* Address */}
                                <div className="flex items-start justify-center sm:justify-start space-x-3 sm:space-x-4 lg:space-x-6">
                                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                            #6-18285/2, New NGOs Colony,<br />
                                            Near geetanjali Schoo,<br />
                                            NIZAMABAD-503002.
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start justify-center sm:justify-start space-x-3 sm:space-x-4 lg:space-x-6">
                                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-gray-700 text-sm sm:text-base">
                                            officeofarvindd@gmail.com,<br />
                                            arvind.dharmapuri@sansad.nic.in
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start justify-center sm:justify-start space-x-3 sm:space-x-4 lg:space-x-6">
                                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-gray-700 text-sm sm:text-base">1800 1036166</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Section */}
            <div className="py-8 sm:py-12 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 text-center mb-8 sm:mb-12 lg:mb-16">
                        Share Your Feedback Here
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">

                        {/* Raise Concerns */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 h-full">
                            <div className="flex items-center mb-4 sm:mb-6">
                                <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mr-2 sm:mr-3 lg:mr-4" />
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Raise Concerns</h3>
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <textarea
                                        value={concernsFeedback}
                                        onChange={(e) => setConcernsFeedback(e.target.value)}
                                        placeholder="Report any Issues, Bugs or Concerns you have encountered ____"
                                        className="w-full h-28 sm:h-32 lg:h-40 p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                                    />
                                </div>

                                <button
                                    onClick={handleConcernsSubmit}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-5 sm:py-3 sm:px-6 lg:py-4 lg:px-8 rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                >
                                    Submit Feedback
                                </button>
                            </div>
                        </div>

                        {/* General Feedback */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 h-full">
                            <div className="flex items-center mb-4 sm:mb-6">
                                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mr-2 sm:mr-3 lg:mr-4" />
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">General Feedback</h3>
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <textarea
                                        value={generalFeedback}
                                        onChange={(e) => setGeneralFeedback(e.target.value)}
                                        placeholder="Share your Thoughts, Suggestions and Experience with us ____"
                                        className="w-full h-28 sm:h-32 lg:h-40 p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                                    />
                                </div>

                                <button
                                    onClick={handleGeneralSubmit}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-5 sm:py-3 sm:px-6 lg:py-4 lg:px-8 rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                >
                                    Submit Feedback
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInTouchPage;