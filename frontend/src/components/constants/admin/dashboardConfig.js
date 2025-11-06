// src/constants/admin/dashboardConfig.js

export const statCardsConfig = [
  {
    id: 'hero-slides',
    title: 'Hero Slides',
    key: 'totalSlides',
    subtitleKey: 'activeSlides',
    subtitleFormat: (value) => `${value} Active`,
    change: '+2 new',
    trend: 'up',
    icon: '🎠',
    gradient: 'from-orange-500 via-orange-600 to-red-600',
    bgGradient: 'from-orange-50 to-orange-100',
    iconBg: 'bg-orange-500',
    path: '/admin/home/hero-carousel'
  },
  {
    id: 'news',
    title: 'Total News',
    key: 'totalNews',
    change: '+12%',
    trend: 'up',
    icon: '📰',
    gradient: 'from-blue-500 via-blue-600 to-blue-700',
    bgGradient: 'from-blue-50 to-blue-100',
    iconBg: 'bg-blue-500',
    path: '/admin/news'
  },
  {
    id: 'events',
    title: 'Total Events',
    key: 'totalEvents',
    change: '+8%',
    trend: 'up',
    icon: '📅',
    gradient: 'from-green-500 via-green-600 to-green-700',
    bgGradient: 'from-green-50 to-green-100',
    iconBg: 'bg-green-500',
    path: '/admin/events'
  },
  {
    id: 'articles',
    title: 'Total Articles',
    key: 'totalArticles',
    change: '+15%',
    trend: 'up',
    icon: '📝',
    gradient: 'from-purple-500 via-purple-600 to-purple-700',
    bgGradient: 'from-purple-50 to-purple-100',
    iconBg: 'bg-purple-500',
    path: '/admin/myview/articles'
  },
  {
    id: 'users',
    title: 'Total Users',
    key: 'totalUsers',
    change: '+23%',
    trend: 'up',
    icon: '👥',
    gradient: 'from-[#FB8B35] via-orange-600 to-[#E67A24]',
    bgGradient: 'from-orange-50 to-orange-100',
    iconBg: 'bg-[#FB8B35]',
    path: '/admin/users'
  },
  {
    id: 'gallery',
    title: 'Gallery Images',
    key: 'totalGalleryImages',
    change: '+45%',
    trend: 'up',
    icon: '🖼️',
    gradient: 'from-pink-500 via-pink-600 to-pink-700',
    bgGradient: 'from-pink-50 to-pink-100',
    iconBg: 'bg-pink-500',
    path: '/admin/gallery/images'
  },
  {
    id: 'products',
    title: 'Shop Products',
    key: 'totalProducts',
    change: '+5%',
    trend: 'up',
    icon: '🛍️',
    gradient: 'from-indigo-500 via-indigo-600 to-indigo-700',
    bgGradient: 'from-indigo-50 to-indigo-100',
    iconBg: 'bg-indigo-500',
    path: '/admin/shop/products'
  }
];

export const quickActionsConfig = [
  {
    id: 'add-slide',
    title: 'Add Slide',
    description: 'Hero carousel',
    icon: '🎠',
    path: '/admin/home/hero-carousel',
    gradient: 'from-orange-500 to-red-600',
    hoverGradient: 'hover:from-red-600 hover:to-orange-700'
  },
  {
    id: 'add-news',
    title: 'Add News',
    description: 'Create article',
    icon: '📰',
    path: '/admin/news',
    gradient: 'from-blue-500 to-blue-600',
    hoverGradient: 'hover:from-blue-600 hover:to-blue-700'
  },
  {
    id: 'create-event',
    title: 'Create Event',
    description: 'Schedule event',
    icon: '📅',
    path: '/admin/events/create',
    gradient: 'from-green-500 to-green-600',
    hoverGradient: 'hover:from-green-600 hover:to-green-700'
  },
  {
    id: 'add-article',
    title: 'Add Article',
    description: 'Write article',
    icon: '📝',
    path: '/admin/myview/articles',
    gradient: 'from-purple-500 to-purple-600',
    hoverGradient: 'hover:from-purple-600 hover:to-purple-700'
  },
  {
    id: 'upload-images',
    title: 'Upload Images',
    description: 'Add to gallery',
    icon: '🖼️',
    path: '/admin/gallery/images',
    gradient: 'from-pink-500 to-pink-600',
    hoverGradient: 'hover:from-pink-600 hover:to-pink-700'
  },
  {
    id: 'add-product',
    title: 'Add Product',
    description: 'New shop item',
    icon: '🛍️',
    path: '/admin/shop/products',
    gradient: 'from-indigo-500 to-indigo-600',
    hoverGradient: 'hover:from-indigo-600 hover:to-indigo-700'
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'Send newsletter',
    icon: '📧',
    path: '/admin/newsletter/create',
    gradient: 'from-[#FB8B35] to-[#E67A24]',
    hoverGradient: 'hover:from-[#E67A24] hover:to-[#D66A14]'
  }
];

// Mock data - Replace with API calls
export const mockRecentActivities = [
  { 
    id: 1,
    action: 'Hero slide "Welcome" added', 
    time: '30 minutes ago', 
    icon: '🎠', 
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    user: 'Admin User',
    isNew: true
  },
  { 
    id: 2,
    action: 'New news article added', 
    time: '2 hours ago', 
    icon: '📰', 
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    user: 'Admin User',
    isNew: true
  },
  { 
    id: 3,
    action: 'Event "Delhi Rally" updated', 
    time: '5 hours ago', 
    icon: '📅', 
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    user: 'John Doe',
    isNew: false
  },
  { 
    id: 4,
    action: 'Article "Education Reform" published', 
    time: '1 day ago', 
    icon: '📝', 
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    user: 'Sarah Smith',
    isNew: false
  },
  { 
    id: 5,
    action: 'New user registered', 
    time: '2 days ago', 
    icon: '👤', 
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    user: 'System',
    isNew: false
  },
  { 
    id: 6,
    action: '12 images uploaded to gallery', 
    time: '3 days ago', 
    icon: '🖼️', 
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    user: 'Mike Johnson',
    isNew: false
  }
];

export const mockWeeklyStats = [
  {
    id: 'news-published',
    title: 'News Published',
    count: 5,
    percentage: 85,
    icon: '📰',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'events-created',
    title: 'Events Created',
    count: 3,
    percentage: 60,
    icon: '📅',
    color: 'green',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 'new-users',
    title: 'New Users',
    count: 12,
    percentage: 95,
    icon: '👥',
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 'articles-published',
    title: 'Articles Published',
    count: 8,
    percentage: 70,
    icon: '📝',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600'
  }
];

export const systemStatusConfig = [
  { 
    id: 'server',
    title: 'Server Status', 
    value: 'Online', 
    icon: '🖥️', 
    color: 'green',
    isHealthy: true
  },
  { 
    id: 'database',
    title: 'Database', 
    value: 'Connected', 
    icon: '💾', 
    color: 'green',
    isHealthy: true
  },
  { 
    id: 'api',
    title: 'API Response', 
    value: '45ms', 
    icon: '⚡', 
    color: 'green',
    isHealthy: true
  },
  { 
    id: 'backup',
    title: 'Last Backup', 
    value: '2h ago', 
    icon: '💿', 
    color: 'green',
    isHealthy: true
  }
];