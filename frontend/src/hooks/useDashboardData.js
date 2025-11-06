// src/hooks/admin/useDashboardData.js
import { useState, useEffect, useCallback } from 'react';
// import { getAllSlides } from '../../utils/api/admin/heroSlideApi';
import { getAllSlides } from '../utils/api/admin/heroSlideApi';

export const useDashboardData = () => {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalEvents: 0,
    totalArticles: 0,
    totalUsers: 0,
    totalGalleryImages: 0,
    totalProducts: 0,
    totalSlides: 0,
    activeSlides: 0,
    monthlyViews: 12500,
    monthlyGrowth: 23
  });
  
  const [heroSlides, setHeroSlides] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHeroSlides = async () => {
    try {
      const response = await getAllSlides();
      
      // Handle different response structures
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
      
      return slidesData;
    } catch (err) {
      console.error('Error fetching hero slides:', err);
      throw err;
    }
  };

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch hero slides
      const slidesData = await fetchHeroSlides();
      setHeroSlides(slidesData);
      
      // Set mock data for now (replace with real APIs later)
      setStats({
        totalNews: 12,
        totalEvents: 8,
        totalArticles: 15,
        totalUsers: 45,
        totalGalleryImages: 120,
        totalProducts: 24,
        totalSlides: slidesData.length,
        activeSlides: slidesData.filter(s => s.isActive).length,
        monthlyViews: 12500,
        monthlyGrowth: 23
      });
      
      // Mock recent activities
      setRecentActivities([
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
        }
      ]);
      
      // Mock weekly stats
      setWeeklyStats([
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
        }
      ]);
      
      // Simulate loading time
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return { 
    stats, 
    heroSlides, 
    recentActivities,
    weeklyStats,
    loading, 
    error, 
    refetch: fetchAllData 
  };
};