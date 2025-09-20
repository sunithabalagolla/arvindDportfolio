import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ArvindProfileDetails from "../pages/ArvindProfileDetails";
import AllOpportunities from "../pages/VolunteerDashboard/AllOpportunities";
import OpportunityDetails from "../pages/VolunteerDashboard/OpportunityDetails";
import JoinEvent from "../pages/VolunteerDashboard/JoinEvent";
import EventDetails from "../pages/eventNavigate/EventDetails";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/auth/Dashboard";
import Time from "../pages/About/Time";



// import About from "../pages/About/About";
// import Timeline from "../pages/About/Timeline";
// import Foundation from "../pages/About/Foundation";
// import MyView from "../pages/MyView/MyView";
// import Quotes from "../pages/MyView/Quotes";
// import Articles from "../pages/MyView/Articles";
// import Blogs from "../pages/MyView/Blogs";
// import Press from "../pages/Press/Press";
// import GetInTouch from "../pages/GetInTouch/GetInTouch";
// import Newsletter from "../pages/Newsletter/Newsletter";
// import News from "../pages/News/News";
// import NewsList from "../pages/News/NewsList";
// import GalleryPage from "../pages/GalleryPage";
// import VolunteerDashboard from "../pages/VolunteerDashboard";
// import Events from "../pages/Events";
// import Contact from "../pages/Contact";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";

function AppRoutes() {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<Home/>} />
<Route path="/arvind-details" element={<ArvindProfileDetails></ArvindProfileDetails>}/>
<Route path="/volunteer/opportunities"  element={<AllOpportunities></AllOpportunities>}/>
<Route  path="/volunteer/opportunity/:id" element={<OpportunityDetails></OpportunityDetails>}/>
<Route path="/volunteer/join/:id" element={<JoinEvent></JoinEvent>} />

<Route  path="/event/:id" element={<EventDetails/>} />

{/* ---------about */}
  <Route path="/about/timeline" element={<Time />} />
  
      {/* <Route path="/about" element={<About />} />
    
      <Route path="/about/foundation" element={<Foundation />} />

      <Route path="/myview" element={<MyView />} />
      <Route path="/myview/quotes" element={<Quotes />} />
      <Route path="/myview/articles" element={<Articles />} />
      <Route path="/myview/blogs" element={<Blogs />} />

      <Route path="/press" element={<Press />} />
      <Route path="/getintouch" element={<GetInTouch />} />

      <Route path="/newsletter" element={<Newsletter />} />

      <Route path="/news" element={<News />} />
      <Route path="/news/all" element={<NewsList />} />

      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/volunteer" element={<VolunteerDashboard />} />
      <Route path="/events" element={<Events />} />
      <Route path="/contact" element={<Contact />} /> */}

      {/* Auth */}
       <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} /> 
         <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;
