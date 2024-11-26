import "./header.css";
import { Link } from "react-router-dom";
import Profile from "../profile/profile.js";
import auth from "../../utils/auth.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Make sure to include this for Bootstrap JS

declare global {
  interface Window {
    bootstrap: typeof import("bootstrap");
  }
}

export default function Header() {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  // Function to open the offcanvas manually
  const handleToggleMenu = () => {
    const myOffcanvas = document.getElementById("offcanvasRight");
    if (myOffcanvas) {
      const bsOffcanvas = new window.bootstrap.Offcanvas(myOffcanvas);
      bsOffcanvas.toggle();

      // Close the offcanvas when clicking outside of it
      myOffcanvas.addEventListener("hidden.bs.offcanvas", function () {
        bsOffcanvas.hide();
      });
    }
  };

  return (
    <div>
      <header>
        <h1 className="brand">TripZen</h1>
        {!loginCheck ? (
          <Link to="/login" className="login">
            <h3 className="login">Log In</h3>
          </Link>
        ) : (
          <div className="profile" onClick={handleToggleMenu}>
            <Profile />

            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h2 id="offcanvasRightLabel">Hello, Traveler!</h2>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <Link to="/">
                  <h3 className="options">Home</h3>
                </Link>
                <Link to="/profile">
                  <h3 className="options">My Profile</h3>
                </Link>
                <Link to="/settings">
                  <h3 className="options">Settings</h3>
                </Link>
                <Link to="/saved">
                  <h3 className="options">Saved Destinations</h3>
                </Link>
                <h3
                  className="logout"
                  onClick={() => {
                    auth.logout();
                    navigate("/login");
                  }}
                >
                  Log Out
                </h3>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}


