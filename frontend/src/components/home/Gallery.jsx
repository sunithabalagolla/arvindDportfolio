import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import image from '../../assets/images/Gallery/image.jpg';
import video from '../../assets/images/Gallery/video.jpg';

export default function Gallery() {
    const navigate = useNavigate(); // Initialize navigation hook

    // This is like having information cards for each gallery item
    const galleryItems = [
        {
            id: 'images',
            title: 'Images',
            backgroundImage: image,
            route: '/gallery/images' // Updated with proper route path
        },
        {
            id: 'videos',
            title: 'Videos',
            backgroundImage: video,
            route: '/gallery/videos' // Updated with proper route path
        }
    ];

    // This keeps track of which item we're hovering over
    const [hoveredItem, setHoveredItem] = useState(null);

    // Function to handle clicks - proper navigation implementation
    const handleClick = (item) => {
        try {
            navigate(item.route); // Use React Router navigation
        } catch (error) {
            // Fallback for environments without React Router
            console.log(`Would navigate to: ${item.route}`);
            window.location.href = item.route;
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(270deg, #FBD2B2 0.56%, #FFFFFF 49.86%, #FBD2B2 100%)',
            padding: '40px 20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Gallery Title */}
<div className="text-center mb-15">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
          Gallery
        </h2>
        <div className="w-16 sm:w-24 h-1 bg-orange-500 mx-auto"></div>
      </div>

            {/* Gallery Container */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '40px',
                maxWidth: '1400px', // Increased container width
                margin: '0 auto',
                flexWrap: 'wrap'
            }}>
                {galleryItems.map((item) => (
                    <div
                        key={item.id}
                        onMouseEnter={() => setHoveredItem(item.id)}  // When mouse comes in
                        onMouseLeave={() => setHoveredItem(null)}     // When mouse goes out
                        onClick={() => handleClick(item)}       // When clicked, pass the whole item
                        style={{
                            position: 'relative',
                            width: '600px',  // Increased from 500px to 600px
                            height: '400px', // Increased from 350px to 400px
                            borderRadius: '15px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease', // Smooth animation
                            transform: hoveredItem === item.id ? 'scale(1.05)' : 'scale(1)', // Zoom effect

                            // Increased border width - from 8px to 12px on hover
                            border: hoveredItem === item.id ? '12px solid #e9a95bff' : '12px solid transparent',

                            // Shadow effect on hover
                            boxShadow: hoveredItem === item.id
                                ? '0 20px 40px rgba(0,0,0,0.3)'
                                : '0 10px 20px rgba(0,0,0,0.1)'
                        }}
                    >
                        {/* Background Image */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${item.backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'transform 0.3s ease',
                            // Image zooms in when hovered
                            transform: hoveredItem === item.id ? 'scale(1.1)' : 'scale(1)'
                        }} />

                        {/* Light overlay that appears on hover */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: hoveredItem === item.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                            transition: 'all 0.4s ease',
                            zIndex: 5
                        }} />

                        {/* Dark overlay for better text visibility */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            transition: 'opacity 0.3s ease',
                            opacity: hoveredItem === item.id ? 0.6 : 0.4
                        }} />

                        {/* Text Label */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            fontSize: hoveredItem === item.id ? '42px' : '36px', // Text gets bigger on hover
                            fontWeight: 'bold',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                            zIndex: 10
                        }}>
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}