import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllSlides } from '../../utils/api/admin/heroSlideApi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalNews: 0,
    totalEvents: 0,
    totalArticles: 0,
    totalUsers: 0,
    totalGalleryImages: 0,
    totalProducts: 0,
    totalSlides: 0,
    activeSlides: 0
  });
  const [heroSlides, setHeroSlides] = useState([]);
  const [slidesLoading, setSlidesLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchStats();
    fetchHeroSlides();
    setGreetingMessage();
  }, []);

  const setGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  };

  const fetchHeroSlides = async () => {
    try {
      setSlidesLoading(true);
      const response = await getAllSlides();
      
      let slidesData = [];
      if (response.data?.slides && Array.isArray(response.data.slides)) {
        slidesData = response.data.slides;
      } else if (Array.isArray(response.data)) {
        slidesData = response.data;
      } else if (Array.isArray(response.slides)) {
        slidesData = response.slides;
      } else if (Array.isArray(response)) {
        slidesData = response;
      }
      
      setHeroSlides(slidesData);
      
      // Update stats with slide data
      setStats(prev => ({
        ...prev,
        totalSlides: slidesData.length,
        activeSlides: slidesData.filter(s => s.isActive).length
      }));
    } catch (error) {
      console.error('Error fetching hero slides:', error);
    } finally {
      setSlidesLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setTimeout(() => {
        setStats(prev => ({
          ...prev,
          totalNews: 12,
          totalEvents: 8,
          totalArticles: 15,
          totalUsers: 45,
          totalGalleryImages: 120,
          totalProducts: 24
        }));
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Hero Slides',
      value: stats.totalSlides,
      subtitle: `${stats.activeSlides} Active`,
      change: '+2 new',
      trend: 'up',
      icon: '🎠',
      gradient: 'from-orange-500 via-orange-600 to-red-600',
      bgGradient: 'from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
      path: '/admin/home/hero-carousel'
    },
    {
      title: 'Total News',
      value: stats.totalNews,
      change: '+12%',
      trend: 'up',
      icon: '📰',
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
      path: '/admin/news'
    },
    {
      title: 'Total Events',
      value: stats.totalEvents,
      change: '+8%',
      trend: 'up',
      icon: '📅',
      gradient: 'from-green-500 via-green-600 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
      iconBg: 'bg-green-500',
      path: '/admin/events'
    },
    {
      title: 'Total Articles',
      value: stats.totalArticles,
      change: '+15%',
      trend: 'up',
      icon: '📝',
      gradient: 'from-purple-500 via-purple-600 to-purple-700',
      bgGradient: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
      path: '/admin/myview/articles'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: '+23%',
      trend: 'up',
      icon: '👥',
      gradient: 'from-[#FB8B35] via-orange-600 to-[#E67A24]',
      bgGradient: 'from-orange-50 to-orange-100',
      iconBg: 'bg-[#FB8B35]',
      path: '/admin/users'
    },
    {
      title: 'Gallery Images',
      value: stats.totalGalleryImages,
      change: '+45%',
      trend: 'up',
      icon: '🖼️',
      gradient: 'from-pink-500 via-pink-600 to-pink-700',
      bgGradient: 'from-pink-50 to-pink-100',
      iconBg: 'bg-pink-500',
      path: '/admin/gallery/images'
    },
    {
      title: 'Shop Products',
      value: stats.totalProducts,
      change: '+5%',
      trend: 'up',
      icon: '🛍️',
      gradient: 'from-indigo-500 via-indigo-600 to-indigo-700',
      bgGradient: 'from-indigo-50 to-indigo-100',
      iconBg: 'bg-indigo-500',
      path: '/admin/shop/products'
    }
  ];

  const quickActions = [
    {
      title: 'Add Slide',
      description: 'Hero carousel',
      icon: '🎠',
      path: '/admin/home/hero-carousel',
      gradient: 'from-orange-500 to-red-600',
      hoverGradient: 'hover:from-red-600 hover:to-orange-700'
    },
    {
      title: 'Add News',
      description: 'Create article',
      icon: '📰',
      path: '/admin/news',
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      title: 'Create Event',
      description: 'Schedule event',
      icon: '📅',
      path: '/admin/events/create',
      gradient: 'from-green-500 to-green-600',
      hoverGradient: 'hover:from-green-600 hover:to-green-700'
    },
    {
      title: 'Add Article',
      description: 'Write article',
      icon: '📝',
      path: '/admin/myview/articles',
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      title: 'Upload Images',
      description: 'Add to gallery',
      icon: '🖼️',
      path: '/admin/gallery/images',
      gradient: 'from-pink-500 to-pink-600',
      hoverGradient: 'hover:from-pink-600 hover:to-pink-700'
    },
    {
      title: 'Add Product',
      description: 'New shop item',
      icon: '🛍️',
      path: '/admin/shop/products',
      gradient: 'from-indigo-500 to-indigo-600',
      hoverGradient: 'hover:from-indigo-600 hover:to-indigo-700'
    },
    {
      title: 'Newsletter',
      description: 'Send newsletter',
      icon: '📧',
      path: '/admin/newsletter/create',
      gradient: 'from-[#FB8B35] to-[#E67A24]',
      hoverGradient: 'hover:from-[#E67A24] hover:to-[#D66A14]'
    }
  ];

  const recentActivities = [
    { 
      action: 'Hero slide "Welcome" added', 
      time: '30 minutes ago', 
      icon: '🎠', 
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      user: 'Admin User'
    },
    { 
      action: 'New news article added', 
      time: '2 hours ago', 
      icon: '📰', 
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      user: 'Admin User'
    },
    { 
      action: 'Event "Delhi Rally" updated', 
      time: '5 hours ago', 
      icon: '📅', 
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      user: 'John Doe'
    },
    { 
      action: 'Article "Education Reform" published', 
      time: '1 day ago', 
      icon: '📝', 
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      user: 'Sarah Smith'
    },
    { 
      action: 'New user registered', 
      time: '2 days ago', 
      icon: '👤', 
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      user: 'System'
    },
    { 
      action: '12 images uploaded to gallery', 
      time: '3 days ago', 
      icon: '🖼️', 
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      user: 'Mike Johnson'
    }
  ];

  const weeklyStats = [
    {
      title: 'News Published',
      count: 5,
      percentage: 85,
      icon: '📰',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Events Created',
      count: 3,
      percentage: 60,
      icon: '📅',
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'New Users',
      count: 12,
      percentage: 95,
      icon: '👥',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Articles Published',
      count: 8,
      percentage: 70,
      icon: '📝',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* 🎨 Enhanced Welcome Header with Stats */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#FB8B35] via-orange-500 to-[#E67A24] rounded-3xl shadow-2xl">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>
          
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-5xl animate-wave">👋</span>
                  <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    {greeting}!
                  </h1>
                </div>
                <p className="text-orange-100 text-lg mb-4">
                  Here's what's happening with your website today.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <span className="text-white font-semibold text-sm">
                      📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Stats Preview */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-white/80 text-xs mb-1">Total Views</p>
                        <p className="text-white text-2xl font-bold">12.5K</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white/80 text-xs mb-1">This Month</p>
                        <p className="text-white text-2xl font-bold">+23%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📊 Enhanced Stats Grid - 7 Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                    <div className="h-10 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.path)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm font-semibold mb-2 group-hover:text-white transition-colors">
                        {card.title}
                      </p>
                      <p className="text-4xl font-bold text-gray-800 group-hover:text-white transition-colors">
                        {card.value}
                      </p>
                      {card.subtitle && (
                        <p className="text-sm text-gray-500 group-hover:text-white/80 mt-1">
                          {card.subtitle}
                        </p>
                      )}
                    </div>
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${card.bgGradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <span className="text-3xl">{card.icon}</span>
                      {/* Pulse effect */}
                      <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping"></span>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden group-hover:bg-white/30 transition-colors">
                    <div 
                      className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000 group-hover:bg-white`}
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                  
                  {/* Change indicator */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-1">
                      <svg className={`w-4 h-4 ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'} group-hover:text-white`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      <span className={`text-sm font-semibold ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'} group-hover:text-white`}>
                        {card.change}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-white/80">vs last month</span>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        )}

        {/* 🎠 HERO CAROUSEL WIDGET */}
        <div className="bg-gradient-to-br from-white via-orange-50/30 to-white rounded-3xl shadow-2xl p-8 border-2 border-orange-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎠</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Hero Carousel Slides
                </h2>
              </div>
              <p className="text-gray-600 ml-15">Manage your homepage hero section</p>
            </div>
            <button
              onClick={() => navigate('/admin/home/hero-carousel')}
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold"
            >
              <span>Manage Slides</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Slides Preview */}
          {slidesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-4 animate-pulse border-2 border-gray-100">
                  <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : heroSlides.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-orange-200">
              <div className="text-6xl mb-4">🎠</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Slides Yet</h3>
              <p className="text-gray-500 mb-6">Create your first hero carousel slide</p>
              <button
                onClick={() => navigate('/admin/home/hero-carousel')}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold"
              >
                Create First Slide
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {heroSlides.slice(0, 3).map((slide) => (
                  <div
                    key={slide._id}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-orange-300 cursor-pointer transform hover:-translate-y-2"
                    onClick={() => navigate('/admin/home/hero-carousel')}
                  >
                    {/* Slide Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={slide.imageUrl}
                        alt={slide.heading}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                          slide.isActive 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-500 text-white'
                        }`}>
                          {slide.isActive ? '✓ Active' : '○ Inactive'}
                        </span>
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Slide Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1 truncate group-hover:text-orange-600 transition-colors">
                        {slide.heading}
                      </h3>
                      <p className="text-sm text-gray-500 truncate mb-2">
                        {slide.paragraph}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {new Date(slide.createdAt).toLocaleDateString()}
                        </span>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              {heroSlides.length > 3 && (
                <div className="text-center">
                  <button
                    onClick={() => navigate('/admin/home/hero-carousel')}
                    className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-orange-100 hover:to-orange-200 hover:text-orange-700 transition-all font-semibold border-2 border-gray-200 hover:border-orange-300"
                  >
                    View All {heroSlides.length} Slides →
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* 🚀 Enhanced Quick Actions with 7 Items */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Quick Actions
              </h2>
              <p className="text-gray-500 mt-1">Frequently used features at your fingertips</p>
            </div>
            <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-700">All systems operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`group relative bg-gradient-to-br ${action.gradient} ${action.hoverGradient} text-white rounded-2xl p-6 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:rotate-3`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <div className="relative flex flex-col items-center justify-center space-y-3">
                  <div className="text-5xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {action.icon}
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm mb-1">{action.title}</p>
                    <p className="text-xs opacity-90">{action.description}</p>
                  </div>
                  
                  {/* Plus icon */}
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-white/10 blur-xl transition-opacity"></div>
              </button>
            ))}
          </div>
        </div>

        {/* 📊 TWO COLUMN LAYOUT: Recent Activity + Weekly Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Recent Activity (2/3 width) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
                <p className="text-gray-500 text-sm mt-1">Latest updates and changes</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-[#FB8B35] to-[#E67A24] text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold text-sm">
                View All →
              </button>
            </div>
            
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 border-2 border-gray-100 hover:border-orange-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`relative w-12 h-12 ${activity.bgColor} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <span className="text-2xl">{activity.icon}</span>
                      {/* Notification dot */}
                      {index < 2 && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold group-hover:text-[#FB8B35] transition-colors">
                        {activity.action}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">by {activity.user}</span>
                      </div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#FB8B35] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Weekly Performance (1/3 width) */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">This Week</h2>
                <p className="text-gray-500 text-sm mt-1">Performance metrics</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-4">
              {weeklyStats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                        <span className="text-lg">{stat.icon}</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{stat.title}</p>
                        <p className="text-xs text-gray-500">+{stat.count} this week</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Animated progress bar */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className={`text-xs font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary card */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#FB8B35] to-[#E67A24] rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Activities</p>
                  <p className="text-3xl font-bold">28</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-3xl">🎯</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 💻 Enhanced System Status */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">System Status</h2>
              <p className="text-gray-500 text-sm mt-1">All systems are running smoothly</p>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-xl border-2 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">Healthy</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Server Status', value: 'Online', icon: '🖥️', color: 'green' },
              { title: 'Database', value: 'Connected', icon: '💾', color: 'green' },
              { title: 'API Response', value: '45ms', icon: '⚡', color: 'green' },
              { title: 'Last Backup', value: '2h ago', icon: '💿', color: 'green' }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white border-2 border-green-200 rounded-xl p-5 hover:shadow-xl transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{item.title}</p>
                  <p className="text-xl font-bold text-green-600">{item.value}</p>
                </div>

                {/* Progress indicator */}
                <div className="relative mt-3 h-1 bg-green-200 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-15deg); }
        }
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </AdminLayout>
  );
};

export default AdminDashboard;