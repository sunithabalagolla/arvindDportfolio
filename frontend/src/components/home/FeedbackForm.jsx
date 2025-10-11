import { useState, useEffect, useRef } from 'react';
import { MessageSquare, AlertCircle } from 'lucide-react';
import { submitConcern, submitFeedback } from '../../utils/feedbackApi';
import image1 from '../../assets/images/feedback/feedbackImg1.png';
import image2 from '../../assets/images/feedback/feedbackImg2.png';
import image3 from '../../assets/images/feedback/feedbackImg3.png';
import image4 from '../../assets/images/feedback/feedbackImg4.png';
import image5 from '../../assets/images/feedback/feedbackImg5.png';

export default function FeedbackForm() {
    const [concerns, setConcerns] = useState('');
    const [feedback, setFeedback] = useState('');
    const [animateImages, setAnimateImages] = useState(false);
    const [loading, setLoading] = useState({ concern: false, feedback: false });
    const [errors, setErrors] = useState({ concern: '', feedback: '' });
    const imagesRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimateImages(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.3,
            }
        );

        if (imagesRef.current) {
            observer.observe(imagesRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const validateMessage = (message, type) => {
        if (!message.trim()) {
            return `${type === 'concern' ? 'Concern' : 'Feedback'} message is required`;
        }
        if (message.trim().length < 10) {
            return 'Message must be at least 10 characters long';
        }
        if (message.trim().length > 1000) {
            return 'Message must not exceed 1000 characters';
        }
        return '';
    };

    const handleSubmit = async (type) => {
        const message = type === 'concerns' ? concerns : feedback;
        const error = validateMessage(message, type);

        if (error) {
            setErrors(prev => ({ ...prev, [type]: error }));
            return;
        }

        setErrors(prev => ({ ...prev, [type]: '' }));
        setLoading(prev => ({ ...prev, [type]: true }));

        try {
            let response;
            if (type === 'concerns') {
                response = await submitConcern(message.trim());
            } else {
                response = await submitFeedback(message.trim());
            }

            if (response.success) {
                alert(response.message);
                if (type === 'concerns') {
                    setConcerns('');
                } else {
                    setFeedback('');
                }
            }
        } catch (error) {
            const errorMessage = error.message || 
                `Failed to submit ${type === 'concerns' ? 'concern' : 'feedback'}. Please try again.`;
            setErrors(prev => ({ ...prev, [type]: errorMessage }));
            alert(errorMessage);
        } finally {
            setLoading(prev => ({ ...prev, [type]: false }));
        }
    };

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
                                    <div>
                                        <textarea
                                            value={concerns}
                                            onChange={(e) => {
                                                setConcerns(e.target.value);
                                                setErrors(prev => ({ ...prev, concerns: '' }));
                                            }}
                                            placeholder="Report any Issues, Bugs or Concerns you have encountered..."
                                            className={`w-full h-28 sm:h-32 md:h-36 p-3 sm:p-4 border rounded-xl 
                                                focus:outline-none resize-none bg-white text-sm sm:text-base
                                                transition-all duration-300 hover:shadow-md
                                                ${errors.concerns ? 'border-red-500' : 'border-gray-200'}`}
                                            disabled={loading.concerns}
                                        />
                                        {errors.concerns && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.concerns}</p>
                                        )}
                                        <p className="text-gray-500 text-xs mt-1">
                                            {concerns.length}/1000 characters
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <button
                                            onClick={() => handleSubmit('concerns')}
                                            disabled={loading.concerns}
                                            className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white
                                                font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-colors duration-200 
                                                text-xs sm:text-sm min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading.concerns ? 'Submitting...' : 'Submit Concern'}
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
                                    <div>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => {
                                                setFeedback(e.target.value);
                                                setErrors(prev => ({ ...prev, feedback: '' }));
                                            }}
                                            placeholder="Share your Thoughts, Suggestions and Experience with us..."
                                            className={`w-full h-28 sm:h-32 md:h-36 p-3 sm:p-4 border rounded-xl 
                                                focus:outline-none resize-none bg-white text-sm sm:text-base
                                                transition-all duration-300 hover:shadow-md
                                                ${errors.feedback ? 'border-red-500' : 'border-gray-200'}`}
                                            disabled={loading.feedback}
                                        />
                                        {errors.feedback && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.feedback}</p>
                                        )}
                                        <p className="text-gray-500 text-xs mt-1">
                                            {feedback.length}/1000 characters
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <button
                                            onClick={() => handleSubmit('feedback')}
                                            disabled={loading.feedback}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 sm:px-4 py-1.5 
                                                sm:py-2 rounded-xl transition-colors duration-200 
                                                text-xs sm:text-sm min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading.feedback ? 'Submitting...' : 'Submit Feedback'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Photo Grid */}
                        <div ref={imagesRef} className="space-y-2 sm:space-y-3">
                            {/* Top Row */}
                            <div className="flex gap-2 sm:gap-3">
                                <div className={`flex-[0.6] rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/2] relative ${animationClass} ${animateImages ? 'animate-fadeInScale' : ''}`}>
                                    <img src={image1} alt="Professional headshot" className="w-full h-full object-cover" />
                                </div>
                                <div className={`flex-[0.4] rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative ${animationClass} ${animateImages ? 'animate-fadeInScale' : ''}`}>
                                    <img src={image2} alt="Team member" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Middle Row */}
                            <div className={`w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-[7/2] relative ${animationClass} ${animateImages ? 'animate-fadeInScale' : ''}`}>
                                <img src={image3} alt="Team collaboration" className="w-full h-full object-cover object-center" />
                            </div>

                            {/* Bottom Row */}
                            <div className="flex gap-2 sm:gap-3">
                                <div className={`flex-[0.4] rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative ${animationClass} ${animateImages ? 'animate-fadeInScale' : ''}`}>
                                    <img src={image4} alt="Team members" className="w-full h-full object-cover" />
                                </div>
                                <div className={`flex-[0.6] rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/2] relative ${animationClass} ${animateImages ? 'animate-fadeInScale' : ''}`}>
                                    <img src={image5} alt="Business professional" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}