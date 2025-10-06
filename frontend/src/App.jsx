import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/common/Header";
import Footer from "./components/common/footer";
import ScrollToTop from "./components/common/ScrollToTop"; 
import "./App.css";

function AppContent() {
  const location = useLocation();

  const isJoinEventPage = location.pathname.startsWith('/volunteer/join/');

  const noHeaderFooterPages = [
    "/login", 
    "/signup", 
    "/auth/login", 
    "/auth/signup", 
    "/auth/otp-verification",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/dashboard"
  ];

  const transparentHeaderPages = ["/"];

  const showHeaderFooter = !noHeaderFooterPages.includes(location.pathname) && !isJoinEventPage;
  const forceOrangeHeader = !transparentHeaderPages.includes(location.pathname);

  return (
    <div className="App">
      <ScrollToTop /> 
      
      {showHeaderFooter && (
        <Header forceOrangeBackground={forceOrangeHeader} />
      )}

      <div
        className={`page-wrapper ${
          transparentHeaderPages.includes(location.pathname) ? "pt-0" : ""
        }`}
      >
        <AppRoutes />
      </div>

      {showHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

// AuthProvider → Gives login/logout/user to all components.
// Router → Handles page navigation without reload.
// useLocation → Checks current URL path.
// Hide Header/Footer → On /login, /signup, /auth/* pages.
// Transparent Header → Only on homepage (/).
// Orange Header → On all other pages.
// AppRoutes → Decides which page to show.