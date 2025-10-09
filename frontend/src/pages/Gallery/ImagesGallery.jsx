import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCard from '../../components/Gallery/ImageCard';
import Lightbox from '../../components/Gallery/Lightbox';

// Import your images
import image1 from '../../assets/images/Gallery/image.jpg';

const ImagesGallery = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [lightboxImage, setLightboxImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Hero section images - these will rotate
    const heroImages = [
        { id: 1, url: image1 },
        { id: 2, url: image1 },
        { id: 3, url: image1 },
        { id: 4, url: image1 }
    ];

    // Auto-rotate hero images - UPDATED TIMING
    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
                setIsAnimating(false);
            }, 1500); // Changed from 300 to 1500ms
        }, 4000); // Changed from 3000 to 4000ms for longer pause

        return () => clearInterval(interval);
    }, []);

    // Sample gallery images
    const images = [
        {
            id: 1,
            url: image1,
            title: 'Arvind Dharmapuri joined the BJP State Executive',
            description: 'Arvind Dharmapuri joined the BJP State Executive, carrying forward his grandfather\'s ideology.',
            category: 'Cabinet Affairs'
        },
        {
            id: 2,
            url: image1,
            title: 'Meeting with Local Leaders',
            description: 'Discussion with community leaders about upcoming initiatives',
            category: 'Visits'
        },
        {
            id: 3,
            url: image1,
            title: 'Parliamentary Session',
            description: 'Active participation in parliamentary discussions',
            category: 'Parliament'
        },
        {
            id: 4,
            url: image1,
            title: 'Conference Address',
            description: 'Addressing party members at annual conference',
            category: 'Conferences'
        },
        {
            id: 5,
            url: image1,
            title: 'Government Event',
            description: 'Participating in official government ceremony',
            category: 'Government Events'
        },
        {
            id: 6,
            url: image1,
            title: 'Community Outreach',
            description: 'Engaging with local communities',
            category: 'Visits'
        },
        {
            id: 7,
            url: image1,
            title: 'Policy Discussion',
            description: 'Important policy meeting',
            category: 'Cabinet Affairs'
        },
        {
            id: 8,
            url: image1,
            title: 'Public Address',
            description: 'Speaking at public gathering',
            category: 'Government Events'
        },
    ];

    const categories = ['All', 'Cabinet Affairs', 'Parliament', 'Visits', 'Conferences', 'Government Events'];

    const filteredImages = selectedCategory === 'All'
        ? images
        : images.filter(img => img.category === selectedCategory);

    const handleImageClick = (image) => {
        const index = filteredImages.findIndex(img => img.id === image.id);
        setCurrentImageIndex(index);
        setLightboxImage(image);
    };

    const handleNext = () => {
        const nextIndex = (currentImageIndex + 1) % filteredImages.length;
        setCurrentImageIndex(nextIndex);
        setLightboxImage(filteredImages[nextIndex]);
    };

    const handlePrev = () => {
        const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        setCurrentImageIndex(prevIndex);
        setLightboxImage(filteredImages[prevIndex]);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Top Banner */}
            <div className="relative bg-gradient-to-r from-orange-50 via-white to-orange-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Text and Small Circle Images */}
                        <div className="z-10 relative">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                                Here are the Images of<br />
                                Arvind Dharmapuri
                            </h1>
                            <p className="text-gray-600 text-lg mb-8">
                                We can view images of Arvind Dharmapuri, his family, his leaders etc
                            </p>

                            {/* Small Circular Images with Orange Border */}
                            <div className="flex items-center gap-4 mb-6">
                                {heroImages.map((img, index) => (
                                    <div
                                        key={img.id}
                                        className={`relative transition-all duration-500 ${index === currentHeroIndex ? 'scale-110' : 'scale-100'
                                            }`}
                                    >
                                        <img
                                            src={img.url}
                                            alt={`Arvind ${index + 1}`}
                                            className={`rounded-full object-cover transition-all duration-500 ${index === currentHeroIndex
                                                    ? 'w-24 h-24 opacity-100'
                                                    : 'w-20 h-20 opacity-60'
                                                }`}
                                            style={{
                                                border: index === currentHeroIndex
                                                    ? '5px solid #FB8B35'
                                                    : '4px solid #FBD2B2'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Progress Indicator */}
                            <div className="flex gap-2">
                                {heroImages.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${index === currentHeroIndex
                                                ? 'w-16 bg-[#FB8B35]'
                                                : 'w-8 bg-[#FBD2B2]'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Large Rotating Circular Image */}
                        <div className="flex justify-center lg:justify-end relative z-10">
                            <div className={`relative ${isAnimating ? 'hero-image-exit' : 'hero-image-enter'}`}>
                                {/* Animated Rotating Background Circle - Light BJP Color */}
                                <div
                                    className="absolute inset-0 rounded-full transition-all duration-700"
                                    style={{
                                        background: `
                                            radial-gradient(circle at 30% 30%, rgba(251, 139, 53, 0.15) 0%, transparent 70%),
                                            radial-gradient(circle at 70% 70%, rgba(251, 210, 178, 0.2) 0%, transparent 70%)
                                        `,
                                        animation: 'rotateBackground 8s linear infinite',
                                        transform: 'scale(1.3)',
                                        filter: 'blur(40px)'
                                    }}
                                />

                                {/* Pulsing Glow Effect */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(251, 139, 53, 0.1) 0%, transparent 70%)',
                                        animation: 'pulse 3s ease-in-out infinite',
                                        transform: 'scale(1.2)'
                                    }}
                                />

                                {/* Main Circular Image Container */}
                                <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-full overflow-hidden shadow-2xl">
                                    {/* Orange Border Ring */}
                                    <div
                                        className="absolute inset-0 rounded-full z-10"
                                        style={{
                                            border: '10px solid #FB8B35',
                                            animation: 'borderPulse 3s ease-in-out infinite'
                                        }}
                                    />

                                    {/* The Actual Image */}
                                    <img
                                        key={currentHeroIndex}
                                        src={heroImages[currentHeroIndex].url}
                                        alt="Arvind Dharmapuri"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Images Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
                        All Images
                    </h2>

                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-white text-black border-2 border-black shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border-2 border-transparent'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Images Grid */}
                    {filteredImages.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No images found in this category</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredImages.map(image => (
                                <ImageCard
                                    key={image.id}
                                    image={image}
                                    onImageClick={handleImageClick}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <Lightbox
                    image={lightboxImage}
                    onClose={() => setLightboxImage(null)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}

            {/* Beautiful Animations with Complete Diagonal Slide - SLOWER */}
            <style jsx>{`
                @keyframes rotateBackground {
                    0% {
                        transform: scale(1.3) rotate(0deg);
                    }
                    100% {
                        transform: scale(1.3) rotate(360deg);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.4;
                        transform: scale(1.2);
                    }
                    50% {
                        opacity: 0.6;
                        transform: scale(1.3);
                    }
                }
                
                @keyframes borderPulse {
                    0%, 100% {
                        opacity: 1;
                        box-shadow: 0 0 20px rgba(251, 139, 53, 0.3);
                    }
                    50% {
                        opacity: 0.8;
                        box-shadow: 0 0 40px rgba(251, 139, 53, 0.5);
                    }
                }
                
                /* ENTIRE image container slides from top-right corner - SLOWER */
                .hero-image-enter {
                    animation: slideInFromCorner 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                
                .hero-image-exit {
                    animation: slideOutToCorner 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                
                @keyframes slideInFromCorner {
                    0% {
                        opacity: 0;
                        transform: translate(100vw, -100vh) scale(0.3) rotate(45deg);
                    }
                    100% {
                        opacity: 1;
                        transform: translate(0, 0) scale(1) rotate(0deg);
                    }
                }
                
                @keyframes slideOutToCorner {
                    0% {
                        opacity: 1;
                        transform: translate(0, 0) scale(1) rotate(0deg);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-100vw, 100vh) scale(0.3) rotate(-45deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default ImagesGallery;
// Main gallery page with category filter buttons at top, grid of image cards below, and handles opening/closing the lightbox when images are clicked. Also manages navigation between images using Previous/Next arrows.