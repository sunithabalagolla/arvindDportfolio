import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/common/Header";
import Footer from "./components/common/footer";
import "./App.css";

function AppContent() {
  const location = useLocation();

  // Pages with NO header/footer (add auth pages)
  const noHeaderFooterPages = [
    "/login", 
    "/signup", 
    "/auth/login", 
    "/auth/signup", 
    "/auth/otp-verification",
    "/auth/forgot-password",    // Add this
    "/auth/reset-password",     // Add this
    "/auth/dashboard"
  ];

  // Pages(home page) with transparent header 
  const transparentHeaderPages = ["/"];

  const showHeaderFooter = !noHeaderFooterPages.includes(location.pathname);
  const forceOrangeHeader = !transparentHeaderPages.includes(location.pathname);

  return (
    <div className="App">
      {/* Header */}
      {showHeaderFooter && (
        <Header forceOrangeBackground={forceOrangeHeader} />
      )}

      {/* Page Content */}
      <div
        className={`page-wrapper ${
          transparentHeaderPages.includes(location.pathname) ? "pt-0" : ""
        }`}
      >
        <AppRoutes />
      </div>

      {/* Footer */}
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