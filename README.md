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
│─ data/
│   └── EventData.js 
├─ components/                # Reusable components
│   ├─ common/                # Generic / reusable components
│   │   ├─ Header.jsx          # Navbar with logo, search, language, hamburger
        Header/
         ├── Header.jsx            ← Main orchestrator component
         ├── Logo.jsx              ← Logo component
         ├── SearchButton.jsx      ← Search button
         ├── SearchOverlay.jsx     ← Full screen search overlay
         ├── ProfileButton.jsx     ← Login/Signup button
         ├── LanguageDropdown.jsx  ← Language selector
         ├── CartButton.jsx        ← Cart button with badge
         ├── MobileMenu.jsx        ← Mobile menu overlay
         ├── navigationData.js     ← Navigation items data
         ├── hooks/
│            ├── useCart.js        ← Cart logic hook
│            └── useHeaderScroll.js ← Scroll detection hook
         └── index.js              ← Exports Header as default
│   │   ├─ Footer.jsx          # Footer
│   │   └─ Card.jsx            # Generic card for News, Events, Volunteers, etc.
│   │   └─ scrolltotop.js
│       ├─protectedRoute.jsx
    │ 
    ├─ admin/
    │    ├── AdminLayout.jsx 
    │    └── ProtectedRoute.jsx

|   ├─ gallery/ 
          ├─ imagecard.jsx 
          ├─ lightbox.jsx 
          ├─ videocard.jsx 
          ├─ videolightbox.jsx   


│   ├─ home/                   # Home page-specific components
│   │   ├─ Carousel.jsx        # Hero section carousel
│   │   ├─ ArvindProfile.jsx
│   │   ├─ NewsCarousel.jsx
│   │   ├─ Promisesscrolling.jsx
│   │   ├─ Gallery.jsx
│   │   ├─ VolunteerCarousel.jsx
│   │   ├─ ArvindFoundationcarousels.jsx
│   │   ├─ EventCalender.jsx
│   │   ├─ DonationsSection.jsx
│   │   ├─ ArvindArmyCard.jsx
│   │   ├─ FeedbackForm.jsx
│   │   └─ StayConnected.jsx
│   │   └─ fullwidthimage.jsx
│   │   └─ shopsection.jsx
    │   └─ social section.jsx


    ├── context/
    │   └── AuthContext.jsx 

    ├── data/
   │   └── EventData.jsx 
│
├─ pages/                     # Full pages for routing
│   ├─ Home.jsx
     
    |-auth/
       └─ Dashboard.jsx 
       └─ forgotpassword.jsx 
       └─ Login.jsx 
       └─ otpverifciation.jsx 
       └─ profile.jsx 
       └─ resetpassword.jsx 
       └─ signup.jsx

    |-gallery/
       └─ Gallery.jsx 
       └─ imagegallery.jsx 
       └─ videogallery.jsx 
    |-galleryNaviagte/
       └─ image.jsx 
       └─ ivideo.jsx 

│   ├─ Search/
│   │   └─ Search.jsx          # Page for search results
│   ├─ News/
│   │   └─ News.jsx            # Full page for “View All” news
      Events/               ← NEW FOLDER
        └── EventDetails.jsx 
│   ├─ About/
│   │    ├─ Time.jsx
│   │   
│   │   
│   ├─ MyViewPage/
│   │   ├─ MyViewPage.jsx
│   ├─ showNavigate/
│   │   ├─ show.jsx
        └─ CartDropdown.jsx 
│   │   
│   │   
│   │   
│   ├─ PressPage/
│   │   ├─ NewsPage.jsx
│   ├─ GetInTouch/
│   │   ├─ GetInTouch.jsx
│   │   ├─ Sub1.jsx
│   │   ├─ Sub2.jsx
│   │   └─ Sub3.jsx
│   ├─ Newsletter/
│   │   ├─ NewsletterPage.jsx  
│   ├─ VolunteerDashboard.jsx  # Full Volunteer Dashboard page
|       ├─ joinevent.jsx  
│   ├─ home.jsx   

│   ├─ Events.jsx              # Full Event Calendar page
│   ├─ Contact.jsx             # Contact / feedback page
    ├─ admin/
│   │   └─ AdminLogin.jsx 
        └── AdminDashboard.jsx
│
├─ routes/                     # Optional routing configuration
│   └─ AppRoutes.jsx
│
├─ styles/                     # Tailwind / global CSS
│   └─ index.css
│
├─ App.jsx                      # Main App with Router
└─ main.jsx                     # Vite entry point
└── utils/
       └── api.js (- for backend calls)
       └── feedbackApi.js
       └── eventApi.js
       └── donationApi.js
       └── admin/                    ← admin
           └── adminApi.js  
       └── api/
│       ├── admin/
│       │   └── heroSlideApi.js




//backend

backend/
├── config/
│   ├── database.js      # Sets up the MongoDB connection to store users and OTPs.
│   └── email.js         # Configures email service (SMTP, API keys, sender email) for sending OTPs.
    └──cloudinary.js


├── controllers/
│   ├── authController.js # Handles signup, login, logout, and overall user authentication logic.
│   └── otpController.js  # Handles generating OTPs, sending OTP emails, and verifying OTPs.
    |__eventController.js
    |__feedbackController.js
    └── productController.js
│   ├── admin/                         ← NEW FOLDER (All admin controllers)
│   │   └── heroSlideController.js     ← NEW (CRUD operations)
│   │
│   └── public/                        ← NEW FOLDER (Public controllers)
│       └── heroSlideController.js     ← NEW (Fetch active slides)


├── middleware/
│   ├── auth.js          # Middleware to check if a user is authenticated (JWT/session verification).
│   └── validation.js    # Middleware to validate user input (email format, password strength, etc.).   │
│   └── admin/                         ← NEW FOLDER (Admin-specific middleware)
│       ├── adminAuth.js               ← NEW (Check if user is admin)
│       │
│       └── upload/                    ← NEW FOLDER (Upload middleware)
│           └── imageUpload.js         ← NEW (Multer + Cloudinary)
├── models/
│   ├── User.js          # Defines the User schema in MongoDB (name, email, password, verified status, etc.).
│   └── OTP.js           # Defines the OTP schema (code, associated user, expiry time, etc.).
    └── joinedEvent.js 
    └── Event.js.
    |__ EventNotification.js
    |__ Feedback.js
    ├── Product.js
    ├── Cart.js
    └── Wishlist.js
    └── content/                    admin   ← NEW FOLDER (Content models)
│       └── HeroSlide.js               ← NEW (Hero carousel schema)
├── routes/
│   ├── auth.js          # Defines API routes for signup, login, logout, etc.
│   └── otp.js           # Defines API routes for sending OTP and verifying OTP.
    |__ events.js
    |__feedback.js
    └──volunteer.js
    └── products.js
    ├── admin/                         ← NEW FOLDER (Admin routes)
│   │   └── heroSlide.js               ← NEW (Admin CRUD routes)
│   │
│   └── public/                        ← NEW FOLDER (Public routes)
│       └── heroSlides.js              ← NEW (Public fetch routes)

├── utils/
│   ├── sendEmail.js     # Helper function to send OTP emails to users.
│   └── generateOTP.js   # Helper function to generate random OTP codes.
    |__ notificationScheduler.js
    |__seedEvents.js
    └── scheduler.js
    └── seedProducts.js
    └── helpers/                       (Helper functions)
│       ├── cloudinaryHelper.js         (Upload/delete from Cloudinary)
│       └── responseFormatter.js 
     
├── .env                 # Stores environment variables (DB URL, email credentials, JWT secret).
├── .gitignore           # Ensures sensitive files (like .env) are not pushed to Git.
├── package.json         # Lists project dependencies, scripts, and metadata.
└── server.js            # Main entry point: starts the server, connects to DB, and sets up routes.
|__ makeAdmin.js         #admin
