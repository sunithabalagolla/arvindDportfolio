import { useState, useEffect, useRef } from 'react';
import { MessageSquare, AlertCircle } from 'lucide-react';
import image1 from '../../assets/images/feedback/feedbackImg1.png';
import image2 from '../../assets/images/feedback/feedbackImg2.png';
import image3 from '../../assets/images/feedback/feedbackImg3.png';
import image4 from '../../assets/images/feedback/feedbackImg4.png';
import image5 from '../../assets/images/feedback/feedbackImg5.png';

export default function FeedbackForm() {
    const [concerns, setConcerns] = useState('');
    const [feedback, setFeedback] = useState('');
    const [animateImages, setAnimateImages] = useState(false);
    const imagesRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimateImages(true);
                    observer.disconnect(); // Animate only once
                }
            },
            {
                threshold: 0.3, // Trigger when 30% visible
            }
        );

        if (imagesRef.current) {
            observer.observe(imagesRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleSubmit = (type) => {
        if (type === 'concerns' && concerns.trim()) {
            alert('Thank you for reporting your concerns. We will review them shortly.');
            setConcerns('');
        } else if (type === 'feedback' && feedback.trim()) {
            alert('Thank you for your feedback! We appreciate your input.');
            setFeedback('');
        }
    };

    // Animation classes: start hidden and scaled down, then animate in
    const animationClass = animateImages
        ? 'opacity-100 scale-100 transition-all duration-700 ease-out'
        : 'opacity-0 scale-95';

    return (
        <>
            <style>{`
                @keyframes fadeInScale {
                    0% {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fadeInScale {
                    animation: fadeInScale 0.7s ease forwards;
                }
            `}</style>

            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Main Title */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-800 text-left leading-tight">
                            Share Your Feedback Here
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-55 items-start">
                        {/* Left Column - Feedback Forms */}
                        <div className="space-y-6 sm:space-y-8">
                            {/* Raise Concerns Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="bg-orange-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                                    </div>
                                    <h2 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-800">Raise Concerns</h2>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <textarea
                                        value={concerns}
                                        onChange={(e) => setConcerns(e.target.value)}
                                        placeholder="Report any Issues, Bugs or Concerns you have encountered..."
                                        className="w-full h-28 sm:h-32 md:h-36 p-3 sm:p-4 border border-gray-200 rounded-xl 
                                         focus:outline-none
                 resize-none  bg-white text-sm sm:text-base
                 transition-all duration-300 hover:shadow-md "
                                    />
                                    <div className="text-right">
                                        <button
                                            onClick={() => handleSubmit('concerns')}
                                            className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white
                                             font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-colors duration-200 
                                              text-xs sm:text-sm min-w-[120px]"
                                        >
                                            Submit Concern
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* General Feedback Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="bg-blue-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-800">General Feedback</h2>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Share your Thoughts, Suggestions and Experience with us..."
                                        className="w-full h-28 sm:h-32 md:h-36 p-3 sm:p-4 border border-gray-200 rounded-xl 
                                         focus:outline-none
                 resize-none  bg-white text-sm sm:text-base
                 transition-all duration-300 hover:shadow-md "
                                    />
                                    <div className="text-right">
                                        <button
                                            onClick={() => handleSubmit('feedback')}
                                            className="bg-blue-600  hover:bg-blue-700 text-white font-medium px-3 sm:px-4 py-1.5 
                                            sm:py-2 rounded-xl transition-colors duration-200 
                                             text-xs sm:text-sm min-w-[120px]"
                                        >
                                            Submit Feedback
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Photo Grid */}
                        <div ref={imagesRef} className="space-y-2 sm:space-y-3">
                            {/* Top Row - 60% rectangle left, 40% square right */}
                            <div className="flex gap-2 sm:gap-3">
                                <div className={`flex-[0.6] rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/2] relative ${animationClass} ${animateImages ? 'animate-fadeInScale' : ''}`}>
                                    <img
                                        src={image1}
                                        alt="Professional headshot"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className={`flex-[0.4] rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative ${animationClass} ${animateImages ? 'animate-fadeInScale' : ''}`}>
                                    <img
                                        src={image2}
                                        alt="Team member"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Middle Row - Full width */}
                            <div className={`w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-[7/2] relative ${animationClass} ${animateImages ? 'animate-fadeInScale' : ''}`}>
                                <img
                                    src={image3}
                                    alt="Team collaboration"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>

                            {/* Bottom Row - 40% square left, 60% rectangle right */}
                            <div className="flex gap-2 sm:gap-3">
                                <div className={`flex-[0.4] rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative ${animationClass} ${animateImages ? 'animate-fadeInScale' : ''}`}>
                                    <img
                                        src={image4}
                                        alt="Team members"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className={`flex-[0.6] rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/2] relative ${animationClass} ${animateImages ? 'animate-fadeInScale' : ''}`}>
                                    <img
                                        src={image5}
                                        alt="Business professional"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}