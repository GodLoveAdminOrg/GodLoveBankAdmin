import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiSearch, BiBell } from "react-icons/bi";
import profilePic from "../assets/Profile.png";
import Back from "../assets/back.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    const path = location.pathname;

    if (path === "/inprogress" || path === "/completed") {
      navigate("/booking", { replace: true });
      return;
    }
    const onPopState = () => {
      if (window.location.pathname === "/login") {
        navigate("/dashboard", { replace: true });
      }
      window.removeEventListener("popstate", onPopState);
    };

    window.addEventListener("popstate", onPopState);
    window.history.back();
  };
  

  return (
    <header className="header  mb-3 d-flex justify-content-between">
      {/* LEFT: Search + Filter */}
      <div className="d-flex align-items-center">
        <img
          src={Back}
          alt="Back"
          width={50}
          height={50}
          className="backButton"
          style={{
            cursor: location.pathname !== "/booking" ? "pointer" : "default",
          }}
          onClick={handleBackClick}
        />
      </div>
      <div className="d-flex justify-content-end gap-5">
        <div className="d-flex align-items-center gap-3">
          <div className="searchContainer">
            <BiSearch className="searchIcon" />
            <input type="text" placeholder="Search anything..." className="searchInput" />
          </div>
          
        </div>

        {/* RIGHT: Bell + Profile */}
        <div className="d-flex align-items-center gap-3">
          <div className="bellContainer">
            <BiBell className="bellIcon" />
          </div>
          <img
            src={profilePic}
            alt="Profile"
            width={50}
            height={50}
            className="profilePic"
          />
        </div>
      </div>
    </header>
  );
}
