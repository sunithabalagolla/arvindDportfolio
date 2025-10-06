import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/images/Gallery/image.jpg';
import video from '../../assets/images/Gallery/video.jpg';

const Gallery = () => {
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);

    const galleryItems = [
        {
            id: 'images',
            title: 'Images',
            backgroundImage: image,
            route: '/gallery/images'
        },
        {
            id: 'videos',
            title: 'Videos',
            backgroundImage: video,
            route: '/gallery/videos'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#FBD2B2] via-white to-[#FBD2B2] py-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Gallery</h2>
                <div className="w-24 h-1 bg-[#FB8B35] mx-auto"></div>
            </div>

            <div className="flex justify-center gap-10 max-w-7xl mx-auto flex-wrap">
                {galleryItems.map((item) => (
                    <div
                        key={item.id}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => navigate(item.route)}
                        className={`relative w-full md:w-[600px] h-[400px] overflow-hidden cursor-pointer transition-all duration-300 rounded-2xl ${
                            hoveredItem === item.id ? 'scale-105 border-[20px] border-[#fbc9a3]' : 'border-[12px] border-transparent'
                        }`}
                        style={{
                            boxShadow: hoveredItem === item.id ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
                            style={{
                                backgroundImage: `url(${item.backgroundImage})`,
                                transform: hoveredItem === item.id ? 'scale(1.1)' : 'scale(1)'
                            }}
                        />
                        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" 
                             style={{ opacity: hoveredItem === item.id ? 0.6 : 0.4 }} 
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 
                                className="text-white font-bold transition-all duration-300"
                                style={{ 
                                    fontSize: hoveredItem === item.id ? '42px' : '36px',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                                }}
                            >
                                {item.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;