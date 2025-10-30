export const navigationItems = [
  {
    name: "Home",
    href: "/",
    subItems: null
  },
  {
    name: "About Us",
    href: null,
    subItems: [
      { name: "Timeline", href: "/about/timeline" },
      { name: "Foundation", href: "/about/foundation" }
    ]
  },
  {
    name: "My View",
    href: null,
    subItems: [
      { name: "Quotes", href: "/view/Quotes" },
      { name: "Articles", href: "/view/Articles" },
      { name: "Blogs", href: "/view/Blogs" }
    ]
  },
  {
    name: "  Press",
    href: "/press",
    subItems: [
      { name: "All News", href: "/news/AllNews" },
      { name: "Press Release", href: "/news/PressRelease" },
      { name: "News Coverage", href: "/news/NewsCoverage" },
      { name: "Interviews", href: "/news/Interviews" },
      { name: "Announcements", href: "/news/Announcements" }
    ]
  },
  {
    name: "Get in Touch",
    href: "/getintouch",
    subItems: [
      { name: "Contact", href: "/getintouch/contact" },
      { name: "Write to AR", href: "/getintouch/writetoar" }
    ]
  },
  {
    name: "Donation",
    href: "https://pmcares.gov.in/en/web/contribution/donate_india",
    subItems: null
  },
  {
    name: "Newsletter",
    href: "/newsletter",
    subItems: [
      { name: 'Recent Issues', href: "/newsletter/Recent" },
      { name: 'Archives', href: "/newsletter/Archives" },
      { name: 'Subscriptions', href: "/newsletter/Subscriptions" },
      { name: 'Create', href: "/newsletter/Create" }
    ]
  }
];