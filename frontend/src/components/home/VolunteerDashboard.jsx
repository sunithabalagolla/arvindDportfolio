import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import image1 from '../../assets/images/VolunteerDashboard/VolunteerDashboard-img1.png';
import image2 from '../../assets/images/VolunteerDashboard/VolunteerDashboard-img2.png';

export default function VolunteerDashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample volunteer opportunities data
  const volunteerOpportunities = [
    {
      id: 1,
      title: "Swatcha Bharath Camp",
      role: "Volunteer",
      date: "Dec 10 2025",
      time: "10:00 AM - 01:00 PM",
      location: "Parade Grounds - Hyderabad",
      volunteersJoined: 24,
      totalVolunteers: 50,
      image: image1,
      description: "Join the cleanliness drive"
    },
    {
      id: 2,
      title: "Youth Mentorship Program",
      role: "Advisor",
      date: "Aug 31st 2025",
      time: "10:00 AM - 04:00 PM",
      location: "Nizamabad",
      volunteersJoined: 32,
      totalVolunteers: 50,
      image: image2,
      description: "Mentor young minds"
    },
    {
      id: 3,
      title: "Education Support Initiative",
      role: "Teacher",
      date: "Sep 15 2025",
      time: "09:00 AM - 03:00 PM",
      location: "Community Center - Secunderabad",
      volunteersJoined: 18,
      totalVolunteers: 30,
      image: image1,
      description: "Support education for underprivileged children"
    }
  ];

  // Responsive items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile: 1 card
      if (window.innerWidth < 1024) return 1; // Tablet: 1 card
      return 2; // Desktop/Laptop: 2 cards
    }
    return 2;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  // Update items per page on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentIndex(0); // Reset to first page on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(volunteerOpportunities.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages);
  };

  // Get current page opportunities
  const getCurrentOpportunities = () => {
    const startIndex = currentIndex * itemsPerPage;
    return volunteerOpportunities.slice(startIndex, startIndex + itemsPerPage);
  };

  // Navigation handlers
  const handleCardClick = (opportunity) => {
    console.log(`Navigate to opportunity: ${opportunity.id}`);
  };

  const handleViewAllClick = () => {
    console.log('Navigate to all opportunities');
  };

  const handleJoinEvent = (e, opportunity) => {
    e.stopPropagation();
    console.log(`Join event: ${opportunity.id}`);
  };

  // Circular Progress Component - Responsive
  const CircularProgress = ({ joined, total }) => {
    const percentage = (joined / total) * 100;

    // Calculate coordinates for the pie slice
    const center = 50;
    const radius = 45;
    const angleInRadians = (percentage / 100) * 2 * Math.PI - Math.PI / 2;

    // Calculate end point of the arc
    const x = center + radius * Math.cos(angleInRadians);
    const y = center + radius * Math.sin(angleInRadians);

    // Create the pie slice path
    const createPieSlice = () => {
      if (percentage === 0) return '';
      if (percentage >= 100) {
        return `M ${center} ${center} m -${radius} 0 A ${radius} ${radius} 0 1 1 ${radius * 2 - 0.01} 0 A ${radius} ${radius} 0 1 1 -${radius * 2} 0`;
      }

      const largeArcFlag = percentage > 50 ? 1 : 0;
      return `M ${center} ${center} L ${center} ${center - radius} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y} Z`;
    };

    return (
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
        <div className="w-full h-full rounded-full bg-white shadow-md border border-gray-200 relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#f1f5f9" stroke="none" />
            <path d={createPieSlice()} fill="#f97316" stroke="none" />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xs sm:text-sm font-bold text-orange-500 leading-tight">{total}</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">{joined}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 md:mb-12">
        <div className="flex flex-col space-y-4 sm:space-y-6 md:flex-row md:justify-between md:items-start md:space-y-0">
          <div className="flex-1">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
               Volunteer Dashboard
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-orange-500 mx-auto"></div>
            </div>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-4xl leading-relaxed">
              Explore the range of volunteer opportunities currently open for individuals eager to contribute their time, skills, and passion to meaningful causes.
            </p>
          </div>
          <button
            onClick={handleViewAllClick}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap self-start md:self-auto"
          >
            View All
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div className="max-w-7xl mx-auto relative">
        {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
        {totalPages > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="hidden md:block absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 lg:p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
            </button>

            <button
              onClick={nextSlide}
              className="hidden md:block absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 lg:p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Cards Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {getCurrentOpportunities().map((opportunity) => (
            <div
              key={opportunity.id}
              onClick={() => handleCardClick(opportunity)}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Card Image */}
              <div className="h-40 sm:h-48 md:h-56 relative overflow-hidden">
                <img
                  src={opportunity.image}
                  alt={opportunity.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {opportunity.title}
                </h3>

                {/* Role and Progress Circle Row */}
                <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                  <p className="text-gray-900 font-medium text-sm sm:text-base  md:text-xl flex-shrink-0">
                    Role: {opportunity.role}
                  </p>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <CircularProgress
                      joined={opportunity.volunteersJoined}
                      total={opportunity.totalVolunteers}
                    />
                    <div className="text-xs text-gray-500 mt-1 sm:mt-2 font-medium text-center">
                      Volunteers Joined
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-500 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">{opportunity.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-500 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">{opportunity.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-500 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base line-clamp-2">
                      {opportunity.location}
                    </span>
                  </div>
                </div>

                {/* Join Button */}
                <button
                  onClick={(e) => handleJoinEvent(e, opportunity)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] text-sm sm:text-base"
                >
                  Join the Event
                </button>
              </div>
            </div>
          ))}

          {/* Fill empty space if only 1 card on last page for desktop */}
          {getCurrentOpportunities().length === 1 && itemsPerPage === 2 && (
            <div className="hidden lg:flex bg-gray-100 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-300 items-center justify-center min-h-[400px] sm:min-h-[500px]">
              <div className="text-center text-gray-500">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">+</div>
                <p className="font-medium text-sm sm:text-base">More opportunities coming soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Arrows - Below cards on mobile */}
        {totalPages > 1 && (
          <div className="flex md:hidden justify-center mt-6 space-x-4">
            <button
              onClick={prevSlide}
              className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}
      </div>

      {/* Page Indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 md:mt-12 space-x-2 sm:space-x-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-200 ${index === currentIndex
                  ? 'bg-orange-500 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}