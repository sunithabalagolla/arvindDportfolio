import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/common/Header";
import Footer from "./components/common/footer";
import "./App.css";

function AppContent() {
  const location = useLocation();

  // Pages with NO header/footer
  const noHeaderFooterPages = ["/login", "/signup"];

  // Pages with transparent header (home page)
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
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
