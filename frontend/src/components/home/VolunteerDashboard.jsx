import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import image1 from '../../assets/images/VolunteerDashboard/VolunteerDashboard-img1.png';
import image2 from '../../assets/images/VolunteerDashboard/VolunteerDashboard-img2.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { volunteerAPI } from '../../utils/api';

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userJoinedEvents, setUserJoinedEvents] = useState([]);
  const [joinLoading, setJoinLoading] = useState({});
  const [loadingUserEvents, setLoadingUserEvents] = useState(false);

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
    },
    {
      id: 4,
      title: "negro Camp",
      role: "Volunteer",
      date: "Oct 16 2025",
      time: "10:00 AM - 01:00 PM",
      location: "Parade Grounds - Hyderabad",
      volunteersJoined: 24,
      totalVolunteers: 50,
      image: image1,
      description: "Join the cleanliness drive"
    },
  ];

  // Fetch user's joined events
  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!isAuthenticated) {
        setUserJoinedEvents([]);
        return;
      }
      
      try {
        setLoadingUserEvents(true);
        const response = await volunteerAPI.getMyEvents();
        if (response.success) {
          // Extract event IDs from user's joined events
          const eventIds = response.data.map(event => event.eventId);
          setUserJoinedEvents(eventIds);
        }
      } catch (error) {
        console.error('Failed to fetch user events:', error);
        setUserJoinedEvents([]);
      } finally {
        setLoadingUserEvents(false);
      }
    };
    
    fetchUserEvents();
  }, [isAuthenticated]);

  // Responsive items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 1;
      return 2;
    }
    return 2;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentIndex(0);
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

  const getCurrentOpportunities = () => {
    const startIndex = currentIndex * itemsPerPage;
    return volunteerOpportunities.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleCardClick = (opportunity) => {
    // Navigate to opportunity details
    navigate(`/volunteer/opportunity/${opportunity.id}`, {
      state: { opportunity }
    });
  };

  const handleViewAllClick = () => {
    navigate('/volunteer/opportunities');
  };

  const handleJoinEvent = async (e, opportunity) => {
    e.stopPropagation();
    
    // Check if user is logged in
    if (!isAuthenticated) {
      navigate('/auth/login', { 
        state: { 
          from: `/volunteer/join/${opportunity.id}`,
          message: 'Please login to join this event' 
        } 
      });
      return;
    }

    // Check if already joined
    if (userJoinedEvents.includes(opportunity.id)) {
      // Navigate to dashboard to see joined events
      navigate('/auth/dashboard');
      return;
    }
    
    // Navigate to join event page
    navigate(`/volunteer/join/${opportunity.id}`, {
      state: { opportunity }
    });
  };

  // Circular Progress Component
  const CircularProgress = ({ joined, total }) => {
    const percentage = (joined / total) * 100;
    const center = 50;
    const radius = 45;
    const angleInRadians = (percentage / 100) * 2 * Math.PI - Math.PI / 2;
    const x = center + radius * Math.cos(angleInRadians);
    const y = center + radius * Math.sin(angleInRadians);

    const createPieSlice = () => {
      if (percentage === 0) return '';
      if (percentage >= 100) {
        return `M ${center} ${center} m -${radius} 0 A ${radius} ${radius} 0 1 1 ${radius * 2 - 0.01} 0 A ${radius} ${radius} 0 1 1 -${radius * 2} 0`;
      }

      const largeArcFlag = percentage > 50 ? 1 : 0;
      return `M ${center} ${center} L ${center} ${center - radius} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y} Z`;
    };

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 sm:w-20 sm:h-20">
          <div className="w-full h-full rounded-full bg-gray-100 shadow-sm relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="#e5e7eb" stroke="none" />
              <path d={createPieSlice()} fill="#f97316" stroke="none" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xs font-semibold text-orange-500 leading-none">{total}</div>
              <div className="text-lg font-bold text-gray-900 leading-none">{joined}</div>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-2 font-medium text-center">
          Volunteers Joined
        </div>
      </div>
    );
  };

  return (
    <div className="lg:min-h-[900px] bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 md:mb-12">
        <div className="text-center mb-2">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 lg:mb-2 lg:mt-12">
            Volunteer Dashboard
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg flex-1">
            Explore the range of volunteer opportunities currently open for individuals eager to contribute their time, skills, and passion to meaningful causes.
          </p>
          <button
            onClick={handleViewAllClick}
            className="text-orange-500 underline hover:text-orange-600 font-semibold text-sm sm:text-lg hover:underline transition-all duration-200 self-end md:self-end whitespace-nowrap"
          >
            View All
          </button>
        </div>
      </div>

      {/* Cards Container with Navigation */}
      <div className="max-w-7xl mx-auto relative">
        {/* Navigation Arrows */}
        {totalPages > 1 && (
          <>
            <div
              onClick={prevSlide}
              className={`absolute -left-4 md:-left-8 lg:-left-16 xl:-left-6 top-1/2 transform -translate-y-1/2 z-50
                         text-orange-500 cursor-pointer transition-all duration-300 hover:text-[#FF9933] hover:scale-125 select-none
                         ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''} hidden md:block`}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
            </div>

            <div
              onClick={nextSlide}
              className={`absolute -right-4 md:-right-8 lg:-right-16 xl:-right-6 top-1/2 transform -translate-y-1/2 z-50
                         text-orange-500 cursor-pointer transition-all duration-300 hover:text-[#FF9933] hover:scale-125 select-none
                         ${currentIndex === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : ''} hidden md:block`}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
            </div>
          </>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {getCurrentOpportunities().map((opportunity) => {
            const isJoined = userJoinedEvents.includes(opportunity.id);
            const isLoading = joinLoading[opportunity.id];

            return (
              <div
                key={opportunity.id}
                onClick={() => handleCardClick(opportunity)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl
                 transition-all duration-300 hover:scale-[1.02] max-w-xl mx-auto lg:mx-0"
              >
                {/* Card Image */}
                <div className="h-48 sm:h-75 relative overflow-hidden">
                  <img
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="w-full h-full object-cover"
                  />
                  {isJoined && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Joined ✓
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {opportunity.title}
                  </h3>

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 mr-3">
                      <p className="text-gray-900 font-semibold text-sm mb-3">
                        Role: {opportunity.role}
                      </p>

                      <div className="space-y-1.5">
                        <div className="flex items-center text-gray-700">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                          <span className="font-medium text-xs">{opportunity.date}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Clock className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                          <span className="font-medium text-xs">{opportunity.time}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                          <span className="font-medium text-xs line-clamp-2">
                            {opportunity.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <CircularProgress
                        joined={opportunity.volunteersJoined}
                        total={opportunity.totalVolunteers}
                      />
                    </div>
                  </div>

                  {/* Join Button with Dynamic State */}
               {/* Join Button with Dynamic State */}
<button
  onClick={(e) => handleJoinEvent(e, opportunity)}
  disabled={isLoading || loadingUserEvents}
  className={`w-full font-semibold py-2.5 sm:py-3 px-4 rounded-full transition-all duration-200 shadow-md text-sm
    ${isJoined 
      ? 'bg-green-500 hover:bg-green-600 text-white' 
      : 'bg-[#FB8B35] hover:bg-[#e67e2e] text-white hover:shadow-lg hover:scale-[1.02]'
    }
    ${(isLoading || loadingUserEvents) ? 'opacity-50 cursor-not-allowed' : ''}
  `}
>
  {isLoading ? (
    <span className="flex items-center justify-center">
      <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading...
    </span>
  ) : isJoined ? (
    'View in Dashboard'
  ) : (
    'Join the Event'
  )}
</button>
                </div>
              </div>
            );
          })}

          {/* Fill empty space */}
          {getCurrentOpportunities().length === 1 && itemsPerPage === 2 && (
            <div className="hidden lg:flex bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 items-center justify-center min-h-[320px] max-w-lg mx-auto lg:mx-10">
              <div className="text-center text-gray-500">
                <div className="text-3xl mb-3">+</div>
                <p className="font-medium text-sm">More opportunities coming soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Arrows */}
        {totalPages > 1 && (
          <div className="flex md:hidden justify-center mt-6 space-x-4">
            <div
              onClick={prevSlide}
              className={`text-orange-500 cursor-pointer transition-all duration-300 hover:text-[#FF9933] hover:scale-125 select-none
                         ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-8 h-8" />
            </div>
            <div
              onClick={nextSlide}
              className={`text-orange-500 cursor-pointer transition-all duration-300 hover:text-[#FF9933] hover:scale-125 select-none
                         ${currentIndex === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-8 h-8" />
            </div>
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
              className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-200 ${
                index === currentIndex
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