import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import profileimage from '../../assets/images/home/arvindprofile.png'

export default function ArvindProfile() {
    const navigate = useNavigate(); // Initialize navigate hook

    // Function to handle Know More button click
    const handleKnowMoreClick = () => {
        navigate('/arvind-details'); // Replace '/about' with your desired route
        // Or you can use: window.location.href = '/about'; for external links
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-green-100">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden">
                    {/* Mobile: Stacked layout, Desktop: Side-by-side */}
                    <div className="relative flex flex-col lg:flex-row lg:min-h-[600px]">
                        {/* Profile Image - Mobile: Top, Desktop: Left Side */}
                        <div className="w-full lg:w-2/5 lg:flex-shrink-0 lg:relative lg:overflow-hidden">
                            <img 
                                src={profileimage} 
                                alt="Arvind Dharmapuri" 
                                className="w-full h-64 sm:h-80 lg:absolute lg:top-0 lg:w-[120%] lg:h-[115%] lg:-left-2 object-cover object-center rounded-t-2xl lg:rounded-none" 
                            />
                        </div>

                        {/* Content - Mobile: Bottom, Desktop: Right Side */}
                        <div className="w-full lg:w-3/5 lg:flex lg:flex-col lg:justify-center p-6 sm:p-8 lg:p-12">
                            <div className="text-center lg:text-left">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">
                                    Arvind Dharmapuri
                                </h1>
                                <h2 className="text-lg sm:text-xl lg:text-2xl text-orange-600 font-semibold mb-4 lg:mb-6">
                                    MP from Nizamabad
                                </h2>

                                <div className="text-gray-700 mb-6 lg:mb-8 max-w-none">
                                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-3 lg:mb-4">
                                        Arvind Dharmapuri is an Indian politician who is the current Member of Parliament in the Lok
                                        Sabha from Nizamabad, Telangana. He was born on 25th August 1976. He is the youngest of
                                        two sons of D. Srinivas who served as a three-time Congress MLA from Nizamabad.
                                    </p>

                                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                                        Arvind's father D. Srinivas served as a Member of Parliament (Rajya Sabha) and a minister for the state
                                        of Andhra Pradesh. His father also served as the president of the Andhra Pradesh Congress
                                        Committee. His grandfather Dharmapuri Venkatram was a member of Jan Sangh. Arvind's
                                        family belongs to the Munnuru Kapu community, which is categorised as an Other Backward
                                        Class by the Indian government.
                                    </p>
                                </div>

                                {/* Call to Action Button with Navigation */}
                                <div className="flex justify-center lg:justify-start">
                                    <button 
                                        onClick={handleKnowMoreClick}
                                        className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center text-sm sm:text-base"
                                    >
                                        <span className="mr-2">Know More</span>
                                        <svg
                                            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

