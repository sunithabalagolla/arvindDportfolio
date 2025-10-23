// backend/utils/seedEvents.js

const mongoose = require('mongoose');
const Event = require('../models/Event');
require('dotenv').config();

/**
 * Seed Script: Populate database with events
 * 
 * This script:
 * 1. Clears existing events (optional)
 * 2. Adds organized sample events with status fields
 * 3. Separates upcoming, past, and draft events
 * 
 * Run: node utils/seedEvents.js
 */

// ===== UPCOMING EVENTS (Future dates, published) =====
const upcomingEvents = [
    {
        title: "Photography Exhibition",
        type: "Exhibition",
        description: "Showcase of stunning photography from local and international artists.",
        fullDescription: "Join us for an immersive photography exhibition featuring works from both emerging and established photographers. This exhibition explores themes of nature, culture, and human emotion through the lens of talented artists from around the world.",
        date: new Date("2025-06-25"),
        time: "10:00 AM - 6:00 PM",
        location: "Art Gallery, Hyderabad",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
        color: "#E91E63",
        capacity: 150,
        registeredCount: 45,
        instructor: "Rajesh Kumar",
        tags: ["Photography", "Art", "Exhibition"],
        whyAttend: {
            intro: "This exhibition offers a unique opportunity to:",
            points: [
                "View stunning photographs from award-winning photographers",
                "Learn about different photography techniques and styles",
                "Network with photography enthusiasts and professionals",
                "Get inspired for your own creative projects"
            ]
        },
        highlights: [
            {
                title: "Opening Ceremony",
                description: "Meet the featured photographers and hear about their creative process"
            },
            {
                title: "Interactive Sessions",
                description: "Participate in Q&A sessions with the artists"
            }
        ],
        status: "published",
        isArchived: false
    },
    {
        title: "AI for Beginners Workshop",
        type: "Workshop",
        description: "Learn the basics of Artificial Intelligence and Machine Learning.",
        fullDescription: "A comprehensive introduction to AI and ML concepts, designed for beginners. This hands-on workshop will cover fundamental concepts, practical applications, and future trends in artificial intelligence.",
        date: new Date("2025-07-10"),
        time: "9:00 AM - 5:00 PM",
        location: "Tech Hub, Hyderabad",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        color: "#2196F3",
        capacity: 80,
        registeredCount: 52,
        instructor: "Dr. Priya Sharma",
        tags: ["AI", "Technology", "Workshop", "Machine Learning"],
        whyAttend: {
            intro: "Perfect for those who want to:",
            points: [
                "Understand AI fundamentals and applications",
                "Get hands-on experience with ML tools",
                "Learn from industry experts",
                "Explore career opportunities in AI"
            ]
        },
        highlights: [
            {
                title: "Practical Demos",
                description: "Live demonstrations of AI applications"
            },
            {
                title: "Certificate",
                description: "Receive a completion certificate"
            }
        ],
        status: "published",
        isArchived: false
    },
    {
        title: "Yoga and Wellness Retreat",
        type: "Wellness",
        description: "A rejuvenating day of yoga, meditation, and holistic wellness practices.",
        fullDescription: "Escape the hustle and bustle of daily life with our comprehensive wellness retreat. Experience the benefits of yoga, meditation, and mindfulness in a peaceful setting.",
        date: new Date("2025-08-15"),
        time: "6:00 AM - 12:00 PM",
        location: "Serenity Gardens, Hyderabad",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        color: "#4CAF50",
        capacity: 50,
        registeredCount: 28,
        instructor: "Swami Anand",
        tags: ["Yoga", "Wellness", "Meditation", "Health"],
        whyAttend: {
            intro: "Join us to:",
            points: [
                "Learn authentic yoga techniques",
                "Practice guided meditation",
                "Discover stress-relief methods",
                "Connect with like-minded individuals"
            ]
        },
        highlights: [
            {
                title: "Morning Yoga",
                description: "Start your day with energizing yoga sessions"
            },
            {
                title: "Healthy Breakfast",
                description: "Enjoy organic, nutritious refreshments"
            }
        ],
        status: "published",
        isArchived: false
    },
    {
        title: "Tech Career Fair 2025",
        type: "Career Fair",
        description: "Meet top tech companies and explore exciting career opportunities.",
        fullDescription: "Connect with leading technology companies, startups, and recruiters. Perfect for students, fresh graduates, and professionals looking for new opportunities in the tech industry.",
        date: new Date("2025-09-20"),
        time: "10:00 AM - 4:00 PM",
        location: "Convention Center, Hyderabad",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        color: "#FF9800",
        capacity: 500,
        registeredCount: 234,
        tags: ["Career", "Technology", "Jobs", "Networking"],
        whyAttend: {
            intro: "Great opportunity to:",
            points: [
                "Meet recruiters from 50+ companies",
                "Attend career guidance sessions",
                "Network with industry professionals",
                "Submit resumes on the spot"
            ]
        },
        highlights: [
            {
                title: "Company Booths",
                description: "Visit booths of leading tech companies"
            },
            {
                title: "Resume Review",
                description: "Get your resume reviewed by experts"
            }
        ],
        status: "published",
        isArchived: false
    }
];

// ===== PAST EVENTS (Recently completed, not archived) =====
const pastEvents = [
    {
        title: "Startup Pitch Day",
        type: "Competition",
        description: "Entrepreneurs pitch their innovative startup ideas to investors.",
        fullDescription: "An exciting platform for entrepreneurs to present their business ideas to a panel of experienced investors and industry experts. Winners receive funding and mentorship opportunities.",
        date: new Date("2025-08-05"),
        time: "2:00 PM - 6:00 PM",
        location: "Startup Incubator, Hyderabad",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
        color: "#9C27B0",
        capacity: 100,
        registeredCount: 78,
        instructor: "Vikram Reddy",
        tags: ["Startup", "Business", "Entrepreneurship", "Investment"],
        whyAttend: {
            intro: "Perfect for:",
            points: [
                "Entrepreneurs seeking funding",
                "Investors looking for opportunities",
                "Business enthusiasts",
                "Networking with startup community"
            ]
        },
        highlights: [
            {
                title: "Investor Panel",
                description: "Meet leading venture capitalists"
            },
            {
                title: "Prize Money",
                description: "Winners receive seed funding"
            }
        ],
        status: "completed",
        isArchived: false
    },
    {
        title: "Clean India Marathon",
        type: "Sports & Social",
        description: "Run for a cause - promoting cleanliness and environmental awareness.",
        fullDescription: "Join thousands of runners in this annual marathon dedicated to promoting cleanliness and environmental consciousness. All proceeds go to clean-up initiatives across the city.",
        date: new Date("2025-09-02"),
        time: "6:00 AM - 9:00 AM",
        location: "Necklace Road, Hyderabad",
        image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800",
        color: "#4CAF50",
        capacity: 1000,
        registeredCount: 856,
        tags: ["Marathon", "Environment", "Health", "Social Cause"],
        whyAttend: {
            intro: "Join us to:",
            points: [
                "Support environmental causes",
                "Stay fit and healthy",
                "Be part of a community movement",
                "Win exciting prizes"
            ]
        },
        highlights: [
            {
                title: "5K and 10K Runs",
                description: "Choose your distance"
            },
            {
                title: "Clean-up Drive",
                description: "Participate in post-marathon clean-up"
            }
        ],
        status: "completed",
        isArchived: false
    },
    {
        title: "Digital Marketing Masterclass",
        type: "Workshop",
        description: "Learn advanced digital marketing strategies from industry experts.",
        fullDescription: "Comprehensive training on SEO, social media marketing, content strategy, and analytics. Perfect for marketers, entrepreneurs, and business owners.",
        date: new Date("2025-09-15"),
        time: "10:00 AM - 5:00 PM",
        location: "Business Center, Hyderabad",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        color: "#FF5722",
        capacity: 60,
        registeredCount: 55,
        instructor: "Amit Verma",
        tags: ["Marketing", "Digital", "Workshop", "Business"],
        whyAttend: {
            intro: "Learn to:",
            points: [
                "Master SEO techniques",
                "Create effective social media campaigns",
                "Analyze marketing metrics",
                "Build a digital marketing strategy"
            ]
        },
        highlights: [
            {
                title: "Hands-on Training",
                description: "Work on real marketing campaigns"
            },
            {
                title: "Tools & Templates",
                description: "Get marketing tools and resources"
            }
        ],
        status: "completed",
        isArchived: false
    }
];

// ===== ARCHIVED EVENTS (Old events, 6+ months ago) =====
const archivedEvents = [
    {
        title: "New Year Cultural Festival 2025",
        type: "Cultural Event",
        description: "Grand celebration featuring music, dance, and cultural performances.",
        fullDescription: "A spectacular evening of cultural performances celebrating the diversity and richness of Indian culture. Featured traditional and contemporary art forms.",
        date: new Date("2025-01-01"),
        time: "6:00 PM - 11:00 PM",
        location: "Cultural Center, Hyderabad",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        color: "#FFC107",
        capacity: 500,
        registeredCount: 480,
        tags: ["Culture", "Festival", "Music", "Dance"],
        status: "completed",
        isArchived: true,
        archivedAt: new Date()
    },
    {
        title: "Winter Coding Bootcamp",
        type: "Bootcamp",
        description: "Intensive 2-week coding bootcamp for aspiring developers.",
        fullDescription: "Comprehensive coding bootcamp covering web development, algorithms, and software engineering best practices.",
        date: new Date("2025-01-15"),
        time: "9:00 AM - 6:00 PM (14 days)",
        location: "Tech Academy, Hyderabad",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
        color: "#3F51B5",
        capacity: 30,
        registeredCount: 30,
        instructor: "Team CodeMasters",
        tags: ["Coding", "Bootcamp", "Programming", "Web Development"],
        status: "completed",
        isArchived: true,
        archivedAt: new Date()
    }
];

// ===== DRAFT EVENTS (Not yet published) =====
const draftEvents = [
    {
        title: "Blockchain Summit 2026",
        type: "Conference",
        description: "Exploring the future of blockchain and cryptocurrency.",
        fullDescription: "A premier conference bringing together blockchain experts, developers, and enthusiasts to discuss the latest trends and innovations in blockchain technology.",
        date: new Date("2026-03-15"),
        time: "9:00 AM - 6:00 PM",
        location: "International Convention Center, Hyderabad",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        color: "#00BCD4",
        capacity: 300,
        registeredCount: 0,
        tags: ["Blockchain", "Cryptocurrency", "Technology", "Conference"],
        status: "draft",
        isArchived: false
    }
];

// ===== SEED FUNCTION =====
const seedEvents = async () => {
    try {
        console.log('🌱 Starting Event Seed...\n');
        
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');
        
        // OPTION 1: Clear all existing events (CAREFUL!)
        // Uncomment the next 2 lines if you want to start fresh
        // await Event.deleteMany({});
        // console.log('🗑️  Cleared existing events\n');
        
        // OPTION 2: Clear only and re-seed (Recommended for testing)
        const existingCount = await Event.countDocuments();
        console.log(`📊 Current events in database: ${existingCount}`);
        
        const shouldClear = process.argv.includes('--clear');
        if (shouldClear) {
            await Event.deleteMany({});
            console.log('🗑️  Cleared all existing events\n');
        }
        
        // Combine all events
        const allEvents = [
            ...upcomingEvents,
            ...pastEvents,
            ...archivedEvents,
            ...draftEvents
        ];
        
        console.log('📥 Inserting events...\n');
        
        // Insert events
        await Event.insertMany(allEvents);
        
        // Print summary
        console.log('='.repeat(50));
        console.log('✅ SEED COMPLETED SUCCESSFULLY!');
        console.log('='.repeat(50));
        console.log(`📅 Upcoming Events:     ${upcomingEvents.length}`);
        console.log(`✅ Past Events:         ${pastEvents.length}`);
        console.log(`📦 Archived Events:     ${archivedEvents.length}`);
        console.log(`📝 Draft Events:        ${draftEvents.length}`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`📊 Total Events Added:  ${allEvents.length}`);
        console.log('='.repeat(50));
        console.log('\n💡 Tips:');
        console.log('   - Run with --clear flag to replace all events');
        console.log('   - Edit dates to test different scenarios');
        console.log('   - Upcoming events will show on home page');
        console.log('   - Past events show in "Past Events" section');
        console.log('   - Archived events are hidden from public');
        console.log('   - Draft events are hidden until published\n');
        
        // Close connection
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
        
        process.exit(0);
        
    } catch (error) {
        console.error('\n❌ Seed failed:');
        console.error(error);
        
        await mongoose.connection.close();
        process.exit(1);
    }
};

// Run the seed
seedEvents();


