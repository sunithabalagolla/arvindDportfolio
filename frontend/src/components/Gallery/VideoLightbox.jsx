import React, { useRef, useState } from 'react';
import { X, Download, Share2, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VideoLightbox = ({ video, onClose, onNext, onPrev }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const handleDownload = () => {
        if (!isAuthenticated) {
            if (window.confirm('You need to login to download videos. Would you like to login now?')) {
                navigate('/auth/login');
            }
            return;
        }
        
        const link = document.createElement('a');
        link.href = video.url;
        link.download = video.title || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: video.title,
                    text: video.description,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
                <X className="w-8 h-8" />
            </button>

            <button 
                onClick={onPrev}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 hidden md:block"
            >
                <ChevronLeft className="w-12 h-12" />
            </button>

            <button 
                onClick={onNext}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 hidden md:block"
            >
                <ChevronRight className="w-12 h-12" />
            </button>

            <div className="max-w-7xl w-full flex flex-col items-center">
                {/* Video Player */}
                <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                        ref={videoRef}
                        src={video.url}
                        poster={video.thumbnail}
                        className="w-full h-full object-contain"
                        onClick={togglePlay}
                    />
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex items-center gap-4">
                            <button onClick={togglePlay} className="text-white hover:text-[#FB8B35] transition-colors">
                                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                            </button>
                            
                            <button onClick={toggleMute} className="text-white hover:text-[#FB8B35] transition-colors">
                                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                            </button>
                            
                            <div className="flex-1"></div>
                            
                            <button onClick={toggleFullscreen} className="text-white hover:text-[#FB8B35] transition-colors">
                                <Maximize className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Video Info and Actions */}
                <div className="mt-8 text-center max-w-2xl">
                    <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">{video.title}</h2>
                    <p className="text-gray-300 mb-6">{video.description}</p>
                    
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button 
                            onClick={handleDownload}
                            className="flex items-center gap-2 bg-[#FB8B35] hover:bg-[#e67e2e] text-white px-6 py-3 rounded-lg transition-all font-semibold"
                        >
                            <Download className="w-5 h-5" />
                            <span>{isAuthenticated ? 'Download' : 'Login to Download'}</span>
                        </button>
                        
                        <button 
                            onClick={handleShare}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all"
                        >
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoLightbox;