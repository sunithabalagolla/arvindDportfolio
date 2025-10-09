import React, { useState } from 'react';
import { Play } from 'lucide-react';

const VideoCard = ({ video, onVideoClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative aspect-video overflow-hidden rounded-xl cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onVideoClick(video)}
        >
            {/* Video Thumbnail */}
            <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Play Button Overlay - Always visible */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/50">
                <div className={`bg-[#FB8B35] rounded-full p-4 md:p-5 transition-all duration-300 ${
                    isHovered ? 'scale-110' : 'scale-100'
                }`}>
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" />
                </div>
            </div>

            {/* Hover Overlay with Details */}
            {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-all duration-300">
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div className="flex justify-start">
                            <span className="bg-[#FB8B35] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                {video.category}
                            </span>
                        </div>

                        <div className="text-white">
                            <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                            <p className="text-sm text-gray-200 line-clamp-2 mb-4">{video.description}</p>
                            
                            {/* Duration Badge */}
                            {video.duration && (
                                <div className="flex justify-start">
                                    <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                                        {video.duration}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoCard;