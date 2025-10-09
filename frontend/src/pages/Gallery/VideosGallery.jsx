import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCard from '../../components/Gallery/VideoCard';
import VideoLightbox from '../../components/Gallery/VideoLightbox';

// Import your video thumbnails
import videoThumb from '../../assets/images/Gallery/video.jpg';

const VideosGallery = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [lightboxVideo, setLightboxVideo] = useState(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Hero section video thumbnails
    const heroVideos = [
        { id: 1, thumbnail: videoThumb },
        { id: 2, thumbnail: videoThumb },
        { id: 3, thumbnail: videoThumb },
        { id: 4, thumbnail: videoThumb }
    ];

    // Auto-rotate hero videos - UPDATED TIMING
    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentHeroIndex((prev) => (prev + 1) % heroVideos.length);
                setIsAnimating(false);
            }, 1500); // Changed from 300 to 1500ms
        }, 4000); // Changed from 3000 to 4000ms

        return () => clearInterval(interval);
    }, []);

    // Sample videos - replace with real data later
    const videos = [
        {
            id: 1,
            url: '/path/to/video1.mp4',
            thumbnail: videoThumb,
            title: 'Arvind Dharmapuri Speech at BJP State Executive',
            description: 'Arvind Dharmapuri addressing the BJP State Executive meeting.',
            category: 'Cabinet Affairs',
            duration: '5:30'
        },
        {
            id: 2,
            url: '/path/to/video2.mp4',
            thumbnail: videoThumb,
            title: 'Community Interaction',
            description: 'Engaging with local community members',
            category: 'Visits',
            duration: '3:45'
        },
        {
            id: 3,
            url: '/path/to/video3.mp4',
            thumbnail: videoThumb,
            title: 'Parliamentary Debate',
            description: 'Active participation in parliamentary session',
            category: 'Parliament',
            duration: '8:20'
        },
        {
            id: 4,
            url: '/path/to/video4.mp4',
            thumbnail: videoThumb,
            title: 'Annual Conference Speech',
            description: 'Keynote address at annual party conference',
            category: 'Conferences',
            duration: '12:15'
        },
        {
            id: 5,
            url: '/path/to/video5.mp4',
            thumbnail: videoThumb,
            title: 'Government Initiative Launch',
            description: 'Launching new government welfare program',
            category: 'Government Events',
            duration: '6:00'
        },
        {
            id: 6,
            url: '/path/to/video6.mp4',
            thumbnail: videoThumb,
            title: 'Village Visit',
            description: 'Meeting with rural constituents',
            category: 'Visits',
            duration: '4:30'
        },
    ];

    const categories = ['All', 'Cabinet Affairs', 'Parliament', 'Visits', 'Conferences', 'Government Events'];

    const filteredVideos = selectedCategory === 'All' 
        ? videos 
        : videos.filter(vid => vid.category === selectedCategory);

    const handleVideoClick = (video) => {
        const index = filteredVideos.findIndex(vid => vid.id === video.id);
        setCurrentVideoIndex(index);
        setLightboxVideo(video);
    };

    const handleNext = () => {
        const nextIndex = (currentVideoIndex + 1) % filteredVideos.length;
        setCurrentVideoIndex(nextIndex);
        setLightboxVideo(filteredVideos[nextIndex]);
    };

    const handlePrev = () => {
        const prevIndex = (currentVideoIndex - 1 + filteredVideos.length) % filteredVideos.length;
        setCurrentVideoIndex(prevIndex);
        setLightboxVideo(filteredVideos[prevIndex]);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-orange-50 via-white to-orange-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side */}
                        <div className="z-10 relative">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                                Here are the Videos of<br />
                                Arvind Dharmapuri
                            </h1>
                            <p className="text-gray-600 text-lg mb-8">
                                Watch videos of Arvind Dharmapuri's speeches, events, and initiatives
                            </p>

                            {/* Small Circular Video Thumbnails */}
                            <div className="flex items-center gap-4 mb-6">
                                {heroVideos.map((vid, index) => (
                                    <div
                                        key={vid.id}
                                        className={`relative transition-all duration-500 ${
                                            index === currentHeroIndex ? 'scale-110' : 'scale-100'
                                        }`}
                                    >
                                        <img
                                            src={vid.thumbnail}
                                            alt={`Video ${index + 1}`}
                                            className={`rounded-full object-cover transition-all duration-500 ${
                                                index === currentHeroIndex 
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
                                {heroVideos.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${
                                            index === currentHeroIndex 
                                                ? 'w-16 bg-[#FB8B35]' 
                                                : 'w-8 bg-[#FBD2B2]'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Large Video Thumbnail with Diagonal Slide Animation */}
                        <div className="flex justify-center lg:justify-end relative z-10">
                            <div className={`relative ${isAnimating ? 'hero-image-exit' : 'hero-image-enter'}`}>
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
                                
                                <div 
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(251, 139, 53, 0.1) 0%, transparent 70%)',
                                        animation: 'pulse 3s ease-in-out infinite',
                                        transform: 'scale(1.2)'
                                    }}
                                />
                                
                                <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-full overflow-hidden shadow-2xl">
                                    <div 
                                        className="absolute inset-0 rounded-full z-10"
                                        style={{
                                            border: '10px solid #FB8B35',
                                            animation: 'borderPulse 3s ease-in-out infinite'
                                        }}
                                    />
                                    
                                    <img
                                        key={currentHeroIndex}
                                        src={heroVideos[currentHeroIndex].thumbnail}
                                        alt="Video Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Videos Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
                        All Videos
                    </h2>

                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-white text-black border-2 border-black shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border-2 border-transparent'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Videos Grid */}
                    {filteredVideos.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No videos found in this category</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideos.map(video => (
                                <VideoCard 
                                    key={video.id}
                                    video={video}
                                    onVideoClick={handleVideoClick}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Video Lightbox */}
            {lightboxVideo && (
                <VideoLightbox 
                    video={lightboxVideo}
                    onClose={() => setLightboxVideo(null)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}

            {/* Animations - UPDATED WITH SLOWER DIAGONAL SLIDE */}
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
                
                /* ENTIRE video container slides from top-right corner - SLOWER */
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

export default VideosGallery;