import React from "react";
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LaunchDetails from "./pages/LaunchDetails.jsx";
import Navbar from "./component/Navbar.js";
export default function App() {
  return (
  <>
      <BrowserRouter>
        <Routes>

          {/* Home list */}
          <Route path="/" element={<Home />} />

          {/* Details page: /launch/123 */}
          <Route path="/launch/:id" element={<LaunchDetails />} />

          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

