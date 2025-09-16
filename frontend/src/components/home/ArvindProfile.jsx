import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import profileimage from '../../assets/images/home/Group.png'

export default function ArvindProfile() {
    const navigate = useNavigate(); // Initialize navigate hook

    // Function to handle Know More button click
    const handleKnowMoreClick = () => {
        navigate('/arvind-details'); // Replace '/about' with your desired route
        // Or you can use: window.location.href = '/about'; for external links
    };

    return (
        <div className="min-h-[80vh] bg-gradient-to-br from-green-50 via-orange-50 to-green-100 ">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
                <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden">
                    {/* Mobile: Stacked layout, Desktop: Side-by-side */}
                    <div className="relative flex flex-col lg:flex-row lg:min-h-[520px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                        {/* Profile Image - Mobile: Top, Desktop: Left Side */}
                        <div className="w-full lg:w-2/5 lg:flex-shrink-0 lg:relative lg:overflow-hidden">
                            <img 
                                src={profileimage} 
                                alt="Arvind Dharmapuri" 
                                className="w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:w-[175%] lg:h-[120%] lg:-left-2 object-cover object-center rounded-t-2xl lg:rounded-none" 
                            />
                        </div>

                        {/* Content - Mobile: Bottom, Desktop: Right Side */}
                        <div className="w-full lg:w-3/5 lg:flex lg:flex-col lg:justify-center p-4 sm:p-6 lg:p-8">
                            <div className="text-center lg:text-left">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-black/80 mb-2">
                                    Arvind Dharmapuri  -   MP from Nizamabad
                                </h1>
                              
                                 
                                <div className="text-black/80 mb-4 lg:mb-6 max-w-none">
                                    <p className="text-xs sm:text-sm lg:text-base leading-relaxed mb-2 lg:mb-3">
                                        Arvind Dharmapuri is an Indian politician who is the current Member of Parliament in the Lok
                                        Sabha from Nizamabad, Telangana. He was born on 25th August 1976. He is the youngest of
                                        two sons of D. Srinivas who served as a three-time Congress MLA from Nizamabad.
                                         Arvind's father D. Srinivas served as a Member of Parliament (Rajya Sabha) and a minister for the state
                                        of Andhra Pradesh. His father also served as the president of the Andhra Pradesh Congress
                                        Committee. His grandfather Dharmapuri Venkatram was a member of Jan Sangh. Arvind's
                                        family belongs to the Munnuru Kapu community, which is categorised as an Other Backward
                                        Class by the Indian government.
                                    </p>

                                    {/* <p className="text-xs sm:text-sm lg:text-base leading-relaxed">
                                        Arvind's father D. Srinivas served as a Member of Parliament (Rajya Sabha) and a minister for the state
                                        of Andhra Pradesh. His father also served as the president of the Andhra Pradesh Congress
                                        Committee. His grandfather Dharmapuri Venkatram was a member of Jan Sangh. Arvind's
                                        family belongs to the Munnuru Kapu community, which is categorised as an Other Backward
                                        Class by the Indian government.
                                    </p> */}
                                </div>

                                {/* Call to Action Button with Navigation */}
                                <div className="flex justify-center lg:justify-start">
                                    <button 
                                        onClick={handleKnowMoreClick}
                                        
                                        className="group  bg-[#FB8B35] text-white px-3 py-1.5 text-xs sm:px-6 sm:py-2 lg:px-6 lg:py-2.5 sm:text-sm lg:text-base rounded-lg  hover:bg-white 
    hover:text-[#FB8B35] hover:shadowntransition flex items-center shadow-none hover:shadow-lg transition-shadow duration-300 hover:border-black/50"
                                    >
                                        <span className="mr-2">Know More</span>
                                        <svg
                                            className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300"
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