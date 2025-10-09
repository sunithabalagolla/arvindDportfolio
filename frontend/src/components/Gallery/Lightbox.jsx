import React from 'react';
import { X, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Lightbox = ({ image, onClose, onNext, onPrev }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleDownload = () => {
        if (!isAuthenticated) {
            if (window.confirm('You need to login to download images. Would you like to login now?')) {
                navigate('/auth/login');
            }
            return;
        }
        
        const link = document.createElement('a');
        link.href = image.url;
        link.download = image.title || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: image.title,
                    text: image.description,
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
                <img 
                    src={image.url} 
                    alt={image.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />

                <div className="mt-8 text-center max-w-2xl">
                    <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">{image.title}</h2>
                    <p className="text-gray-300 mb-6">{image.description}</p>
                    
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

export default Lightbox;
// Opens as a full-screen modal showing the large image with title, description, and action buttons. Has Previous/Next arrows to navigate between images, and requires login to download.