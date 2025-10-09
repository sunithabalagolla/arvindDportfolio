import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

const ImageCard = ({ image, onImageClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onImageClick(image)}
        >
            <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-all duration-300">
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div className="flex justify-start">
                            <span className="bg-[#FB8B35] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                {image.category}
                            </span>
                        </div>

                        <div className="text-white">
                            <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                            <p className="text-sm text-gray-200 line-clamp-2 mb-4">{image.description}</p>
                            
                            <div className="flex justify-center">
                                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all">
                                    <ZoomIn className="w-6 h-6 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCard;

// Purpose: Displays a single image in a square card. When you hover, it shows a dark overlay with the image title, description, category badge, and a zoom icon. When you click the card, it opens the full-size image in a lightbox modal.