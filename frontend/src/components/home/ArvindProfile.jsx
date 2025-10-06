import React from 'react';
import { useNavigate } from 'react-router-dom';
import profileimage from '../../assets/images/home/Group.png';

export default function ArvindProfile() {
    const navigate = useNavigate();

    const handleKnowMoreClick = () => {
        navigate('/about/timeline');
    };

    return (
        <div className="relative min-h-[80vh] bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8 sm:py-12 lg:py-16 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FB8B35] opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FB8B35] opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#FB8B35]/5 to-transparent rounded-full blur-2xl"></div>

            {/* Main Content */}
            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100 hover:border-[#FB8B35]/30 hover:shadow-[0_20px_70px_rgba(251,139,53,0.2)] transition-all duration-500">
                    <div className="relative flex flex-col lg:flex-row">
                        {/* Image Section - Enhanced with overlay effects */}
                        <div className="relative w-full lg:w-2/5 lg:flex-shrink-0 overflow-hidden group">
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FB8B35]/20 via-[#FB8B35]/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Image */}
                            <img
                                src={profileimage}
                                alt="Arvind Dharmapuri"
                                className="w-full h-64 sm:h-80 lg:h-full lg:absolute lg:top-0 lg:w-[175%] lg:-left-2 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Decorative Corner Elements */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FB8B35]/20 to-transparent rounded-bl-full"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#FB8B35]/15 to-transparent rounded-tr-full"></div>
                        </div>

                        {/* Content Section - Enhanced spacing and design */}
                        <div className="w-full lg:w-3/5 lg:flex lg:flex-col lg:justify-center p-6 sm:p-8 lg:p-12 xl:p-14 bg-gradient-to-br from-white to-orange-50/30">
                            <div className="text-center lg:text-left">
                                {/* MP Badge with animation */}
                                <div className="inline-block mb-5">
                                    <span className="relative px-5 py-2 bg-gradient-to-r from-[#FB8B35]/10 to-[#FB8B35]/5 text-[#FB8B35] rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#FB8B35]/20 shadow-sm">
                                        Member of Parliament
                                        <span className="absolute inset-0 rounded-lg bg-[#FB8B35]/10 blur-sm -z-10"></span>
                                    </span>
                                </div>

                                {/* Name & Title - Enhanced typography */}
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 leading-tight">
                                    Arvind Dharmapuri
                                </h1>
                                <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                                    <div className="w-12 h-0.5 bg-[#FB8B35]"></div>
                                    <p className="text-base sm:text-lg lg:text-xl text-[#FB8B35] font-bold">
                                        MP from Nizamabad
                                    </p>
                                    <div className="w-12 h-0.5 bg-[#FB8B35]"></div>
                                </div>

                                {/* Bio Text - Enhanced readability */}
                                <div className="text-gray-700 mb-8 lg:mb-10 space-y-4 lg:space-y-5">
                                    <p className="text-sm sm:text-base lg:text-base leading-relaxed text-gray-600">
                                        Arvind Dharmapuri is an Indian politician who is the current Member of Parliament in the Lok
                                        Sabha from Nizamabad, Telangana. He was born on 25th August 1976. He is the youngest of
                                        two sons of D. Srinivas who served as a three-time Congress MLA from Nizamabad.
                                    </p>
                                    <p className="text-sm sm:text-base lg:text-base leading-relaxed text-gray-600">
                                        Arvind's father D. Srinivas served as a Member of Parliament (Rajya Sabha) and a minister for the state
                                        of Andhra Pradesh. His father also served as the president of the Andhra Pradesh Congress
                                        Committee. His grandfather Dharmapuri Venkatram was a member of Jan Sangh. Arvind's
                                        family belongs to the Munnuru Kapu community, which is categorised as an Other Backward
                                        Class by the Indian government.
                                    </p>
                                </div>

                                {/* Enhanced CTA Button - Box style with slight curve */}
                                <div className="flex justify-center sm:justify-center lg:justify-start w-full">
                                    <button
                                        onClick={handleKnowMoreClick}
                                        className="group relative w-[140px] sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3.5 
               bg-[#FB8B35] text-white text-xs sm:text-sm md:text-base font-semibold 
               rounded-lg border-2 border-[#FB8B35]
               hover:bg-white hover:text-[#FB8B35]
               shadow-md sm:shadow-lg hover:shadow-2xl hover:shadow-[#FB8B35]/30
               transform hover:-translate-y-1 active:translate-y-0
               transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 
               overflow-hidden"
                                    >
                                        {/* Animated Background Slide */}
                                        <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>

                                        {/* Button Text */}
                                        <span className="relative z-10 font-bold">Know More</span>

                                        {/* SVG Arrow */}
                                        <svg
                                            className="w-3 h-3 sm:w-4 sm:h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
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
