const mongoose = require('mongoose');
const Event = require('../models/Event');
require('dotenv').config();

const events = [
    {
        title: "Nature Farming",
        type: "Workshop",
        description: "Nature Farming Workshop in Nizamabad",
        fullDescription: "Shri Arvind Dharmapuri is thrilled to announce a Nature Farming Workshop in Nizamabad, dedicated to empowering farmers, agri-entrepreneurs, and rural youth with practical knowledge and innovative techniques for sustainable agriculture.",
        date: new Date('2025-06-15T12:00:00'),
        time: "12:00 PM - 2:00 PM",
        location: "Dharmapuri Community Center",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop",
        capacity: 100,
        registeredCount: 45,
        instructor: "Shri Arvind Dharmapuri",
        whyAttend: {
            intro: "Shri Arvind Dharmapuri firmly believes that nature farming is the cornerstone of a healthier, self-reliant, and prosperous rural economy.",
            points: [
                "Equip participants with actionable, cost-effective farming solutions.",
                "Promote chemical-free cultivation for healthier produce and ecosystems.",
                "Enhance soil health and water conservation for sustainable agriculture.",
                "Inspire a vibrant, environmentally responsible farming community in Nizamabad."
            ]
        },
        highlights: [
            { title: "Expert-Led Sessions", description: "Engage with agricultural scientists and progressive farmers." },
            { title: "Hands-On Training", description: "Master techniques like composting and bio-fertilizer application." },
            { title: "Live Demonstrations", description: "Observe real-time nature farming practices." }
        ],
        tags: ["Nature Farming", "Sustainable Agriculture", "Organic"],
        color: "#81C784",
        isActive: true
    },
    {
        title: "AI for Beginners",
        type: "Seminar",
        description: "Introduction to Artificial Intelligence for students.",
        fullDescription: "This seminar introduces students to AI fundamentals, applications, and its growing impact across industries. Learn from experienced AI engineers and explore career paths in technology.",
        date: new Date('2025-07-10T10:00:00'),
        time: "10:00 AM - 1:00 PM",
        location: "T-Hub, Hyderabad",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=500&fit=crop",
        capacity: 150,
        registeredCount: 90,
        instructor: "Dr. Kavitha Reddy",
        whyAttend: {
            intro: "Explore how AI is transforming industries and how you can be part of this revolution.",
            points: [
                "Understand the basics of Machine Learning and Deep Learning.",
                "Discover real-world AI applications in India.",
                "Learn from industry professionals.",
                "Get resources for hands-on AI learning."
            ]
        },
        highlights: [
            { title: "Interactive Sessions", description: "Engage with experts in live Q&A." },
            { title: "Career Guidance", description: "Learn how to start your journey in AI." },
            { title: "Free Learning Materials", description: "Get curated resources and datasets." }
        ],
        tags: ["AI", "Technology", "Learning"],
        color: "#64B5F6",
        isActive: true
    },
    {
        title: "Startup Pitch Day",
        type: "Competition",
        description: "Pitch your startup ideas and win mentorship.",
        fullDescription: "An exclusive platform for entrepreneurs to pitch their innovative ideas to investors, mentors, and startup incubators. Winners get mentorship, funding, and startup support.",
        date: new Date('2025-08-05T14:00:00'),
        time: "2:00 PM - 6:00 PM",
        location: "T-Hub, Hyderabad",
        image: "https://images.unsplash.com/photo-1581091870627-3f94b6d10b49?w=800&h=500&fit=crop",
        capacity: 200,
        registeredCount: 120,
        instructor: "T-Hub Mentorship Panel",
        whyAttend: {
            intro: "Get your startup idea evaluated by top mentors and investors.",
            points: [
                "Receive personalized mentorship.",
                "Connect with investors and incubators.",
                "Win startup support packages.",
                "Network with other entrepreneurs."
            ]
        },
        highlights: [
            { title: "Pitch Sessions", description: "5-minute presentation + feedback round." },
            { title: "Investor Panel", description: "Interact with venture capitalists and angels." },
            { title: "Mentor Matchmaking", description: "Find the right guidance for your startup." }
        ],
        tags: ["Startup", "Entrepreneurship", "Innovation"],
        color: "#FFB74D",
        isActive: true
    },
    {
        title: "Clean India Marathon",
        type: "Awareness Drive",
        description: "Join the movement towards a cleaner and greener India.",
        fullDescription: "Participate in the Clean India Marathon and promote environmental awareness while enjoying a healthy morning run through your city.",
        date: new Date('2025-09-02T06:00:00'),
        time: "6:00 AM - 9:00 AM",
        location: "Necklace Road, Hyderabad",
        image: "https://images.unsplash.com/photo-1546456073-92b9f0a8d413?w=800&h=500&fit=crop",
        capacity: 300,
        registeredCount: 230,
        instructor: "Green India Foundation",
        whyAttend: {
            intro: "Be part of a fitness event with a purpose.",
            points: [
                "Raise awareness for environmental cleanliness.",
                "Encourage healthy habits and community involvement.",
                "Get eco-friendly participation kits.",
                "Win medals and recognition."
            ]
        },
        highlights: [
            { title: "5K and 10K Runs", description: "Choose your preferred distance." },
            { title: "Eco Kits", description: "Reusable bottles and organic T-shirts for all participants." },
            { title: "Celebrity Guests", description: "Motivational speeches and flag-off ceremony." }
        ],
        tags: ["Clean India", "Fitness", "Environment"],
        color: "#4DB6AC",
        isActive: true
    },
    {
        title: "Photography Exhibition",
        type: "Exhibition",
        description: "A showcase of India's cultural and natural beauty through lenses.",
        fullDescription: "Join us for a stunning photography exhibition that captures the diverse landscapes, traditions, and people of India.",
        date: new Date('2025-06-25T11:00:00'),
        time: "11:00 AM - 4:00 PM",
        location: "State Art Gallery, Hyderabad",
        image: "https://images.unsplash.com/photo-1483794344563-d27a8d18014e?w=800&h=500&fit=crop",
        capacity: 200,
        registeredCount: 150,
        instructor: "Indian Lens Club",
        whyAttend: {
            intro: "Discover India through the eyes of talented photographers.",
            points: [
                "Explore award-winning photographs.",
                "Meet professional photographers.",
                "Participate in live photo editing workshops.",
                "Get inspired for your next photo journey."
            ]
        },
        highlights: [
            { title: "Gallery Walk", description: "Enjoy curated sections on culture, nature, and street photography." },
            { title: "Photography Talks", description: "Insights from award-winning artists." },
            { title: "Live Editing Zone", description: "Learn real-time techniques." }
        ],
        tags: ["Photography", "Art", "Culture"],
        color: "#BA68C8",
        isActive: true
    },
    {
        title: "Coding Bootcamp",
        type: "Workshop",
        description: "A full-day coding bootcamp for beginners.",
        fullDescription: "Learn to code from scratch using HTML, CSS, and JavaScript. Ideal for students who want to start their journey in web development.",
        date: new Date('2025-10-20T09:00:00'),
        time: "9:00 AM - 5:00 PM",
        location: "Quantum Works IT Solutions, Hyderabad",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
        capacity: 80,
        registeredCount: 60,
        instructor: "Sunitha Balagolla",
        whyAttend: {
            intro: "Start your web development journey with hands-on coding experience.",
            points: [
                "Learn HTML, CSS, JavaScript basics.",
                "Build your first mini website.",
                "Understand frontend and backend integration.",
                "Get guidance from industry developers."
            ]
        },
        highlights: [
            { title: "Live Coding", description: "Practice coding in real-time with mentors." },
            { title: "Project Building", description: "Develop a mini project during the session." },
            { title: "Certificate", description: "Get certified for completing the bootcamp." }
        ],
        tags: ["Coding", "Workshop", "Web Development"],
        color: "#FF8A65",
        isActive: true
    },
    {
        title: "Women in Tech Conference",
        type: "Conference",
        description: "Empowering women in technology and innovation.",
        fullDescription: "A full-day conference celebrating women technologists, featuring inspiring talks, networking sessions, and mentorship opportunities.",
        date: new Date('2025-11-25T10:00:00'),
        time: "10:00 AM - 4:00 PM",
        location: "Hyderabad International Convention Centre",
        image: "https://images.unsplash.com/photo-1581091870627-3f94b6d10b49?w=800&h=500&fit=crop",
        capacity: 300,
        registeredCount: 270,
        instructor: "WomenTech India",
        whyAttend: {
            intro: "Connect, learn, and grow with India’s leading women in tech.",
            points: [
                "Hear from women leaders in tech.",
                "Join career mentorship sessions.",
                "Participate in networking and hiring drives.",
                "Celebrate achievements of women innovators."
            ]
        },
        highlights: [
            { title: "Keynote Speakers", description: "Talks from top women engineers and founders." },
            { title: "Panel Discussions", description: "Insights on diversity and inclusion." },
            { title: "Networking Lunch", description: "Meet recruiters and mentors." }
        ],
        tags: ["Women in Tech", "Diversity", "Innovation"],
        color: "#F06292",
        isActive: true
    },
    {
        title: "Youth Leadership Summit",
        type: "Summit",
        description: "Develop leadership skills and a growth mindset.",
        fullDescription: "An inspiring summit bringing together young minds to discuss innovation, leadership, and social change.",
        date: new Date('2025-12-10T09:30:00'),
        time: "9:30 AM - 3:30 PM",
        location: "JNTU Auditorium, Hyderabad",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop",
        capacity: 250,
        registeredCount: 190,
        instructor: "Youth Empower Foundation",
        whyAttend: {
            intro: "Empower yourself with skills for leadership and change.",
            points: [
                "Develop confidence and communication skills.",
                "Network with leaders and innovators.",
                "Participate in leadership activities.",
                "Earn a participation certificate."
            ]
        },
        highlights: [
            { title: "Leadership Workshops", description: "Interactive sessions on teamwork and innovation." },
            { title: "Panel Talks", description: "Hear from inspiring youth icons." },
            { title: "Networking", description: "Build meaningful connections." }
        ],
        tags: ["Leadership", "Motivation", "Youth"],
        color: "#7986CB",
        isActive: true
    }
];

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        
        await Event.deleteMany({});
        console.log('🗑️  Cleared existing events');
        
        const createdEvents = await Event.insertMany(events);
        console.log(`✅ Seeded ${createdEvents.length} events`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedEvents();
