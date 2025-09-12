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
│   ├─ Login.jsx
│   └─ Signup.jsx
│
├─ routes/                     # Optional routing configuration
│   └─ AppRoutes.jsx
│
├─ styles/                     # Tailwind / global CSS
│   └─ index.css
│
├─ App.jsx                      # Main App with Router
└─ main.jsx                     # Vite entry point
