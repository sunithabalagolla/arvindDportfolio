src/
├─ assets/                    # All static assets
│   ├─ images/                # Page/component-specific images
│   │   ├─ home/
│   │   │   ├─ carousel/      # Hero section slides
│   │   │   ├─ news/          # Images for NewsCarousel
│   │   │   ├─ gallery/       # Home gallery preview
│   │   │   ├─ volunteer/     # Volunteer carousel
│   │   │   └─ events/        # Event carousel images
│   │   │
│   │   ├─ about/
│   │   │   ├─ timeline/
│   │   │   └─ foundation/
│   │   │
│   │   ├─ myView/            # Quotes, Articles, Blogs images
│   │   ├─ press/             # Press images
│   │   ├─ getInTouch/        # Contact / form images
│   │   └─ newsletter/        # Newsletter section images
│   │
│   └─ logo/                  # Logo, favicon, language icons
│
├─ icons/                     # Reusable UI icons (SVG, PNG)
│   ├─ social/                # Social media icons
│   └─ ui/                    # Search, hamburger, arrows, buttons
│
├─ videos/                     # Video assets
│
├─ components/                # Reusable components
│   ├─ common/                # Generic / reusable components
│   │   ├─ Header.jsx          # Navbar with logo, search, language, hamburger
│   │   ├─ Footer.jsx          # Footer
│   │   └─ Card.jsx            # Generic card for News, Events, Volunteers, etc.
│   │
│   ├─ home/                   # Home page-specific components
│   │   ├─ Carousel.jsx        # Hero section carousel
│   │   ├─ ArvindProfile.jsx
│   │   ├─ NewsCarousel.jsx
│   │   ├─ Promisesscrolling.jsx
│   │   ├─ Gallery.jsx
│   │   ├─ VolunteerCarousel.jsx
│   │   ├─ Foundation.jsx
│   │   ├─ EventCarousel.jsx
│   │   ├─ Donations.jsx
│   │   ├─ ArvindArmy.jsx
│   │   ├─ FeedbackForm.jsx
│   │   └─ StayConnected.jsx
│
├─ pages/                     # Full pages for routing
│   ├─ Home.jsx
│   ├─ Search/
│   │   └─ Search.jsx          # Page for search results
│   ├─ News/
│   │   └─ News.jsx            # Full page for “View All” news
│   ├─ About/
│   │   ├─ About.jsx
│   │   ├─ Timeline.jsx
│   │   └─ Foundation.jsx
│   ├─ MyView/
│   │   ├─ MyView.jsx
│   │   ├─ Quotes.jsx
│   │   ├─ Articles.jsx
│   │   └─ Blogs.jsx
│   ├─ Press/
│   │   ├─ Press.jsx
│   │   ├─ Sub1.jsx
│   │   ├─ Sub2.jsx
│   │   └─ Sub3.jsx
│   ├─ GetInTouch/
│   │   ├─ GetInTouch.jsx
│   │   ├─ Sub1.jsx
│   │   ├─ Sub2.jsx
│   │   └─ Sub3.jsx
│   ├─ Newsletter/
│   │   ├─ Newsletter.jsx
│   │   ├─ Sub1.jsx
│   │   ├─ Sub2.jsx
│   │   ├─ Sub3.jsx
│   │   └─ Sub4.jsx
│   ├─ GalleryPage.jsx         # Full gallery page when “View All” clicked
│   ├─ VolunteerDashboard.jsx  # Full Volunteer Dashboard page
│   ├─ Events.jsx              # Full Event Calendar page
│   ├─ Contact.jsx             # Contact / feedback page
│   ├─ auth/
        |-dashboard,login.jsx,signup.jsx,OTPVerification.jsx (NEW)
│   └─ 
│
├─ routes/                     # Optional routing configuration
│   └─ AppRoutes.jsx
│
├─ styles/                     # Tailwind / global CSS
│   └─ index.css
│
├─ App.jsx                      # Main App with Router
└─ main.jsx                     # Vite entry point
src/
   ├── context/
   │   └── AuthContext.jsx (NEW)
   └── utils/
       └── api.js (NEW - for backend calls)




//backend


backend/
├── config/
│   ├── database.js      # Sets up the MongoDB connection to store users and OTPs.
│   └── email.js         # Configures email service (SMTP, API keys, sender email) for sending OTPs.
├── controllers/
│   ├── authController.js # Handles signup, login, logout, and overall user authentication logic.
│   └── otpController.js  # Handles generating OTPs, sending OTP emails, and verifying OTPs.
├── middleware/
│   ├── auth.js          # Middleware to check if a user is authenticated (JWT/session verification).
│   └── validation.js    # Middleware to validate user input (email format, password strength, etc.).
├── models/
│   ├── User.js          # Defines the User schema in MongoDB (name, email, password, verified status, etc.).
│   └── OTP.js           # Defines the OTP schema (code, associated user, expiry time, etc.).
├── routes/
│   ├── auth.js          # Defines API routes for signup, login, logout, etc.
│   └── otp.js           # Defines API routes for sending OTP and verifying OTP.
├── utils/
│   ├── sendEmail.js     # Helper function to send OTP emails to users.
│   └── generateOTP.js   # Helper function to generate random OTP codes.
├── .env                 # Stores environment variables (DB URL, email credentials, JWT secret).
├── .gitignore           # Ensures sensitive files (like .env) are not pushed to Git.
├── package.json         # Lists project dependencies, scripts, and metadata.
└── server.js            # Main entry point: starts the server, connects to DB, and sets up routes.
