import React, { useState, useRef, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode correctly

import LogoutIcon from "@mui/icons-material/Logout";
import Face2Icon from "@mui/icons-material/Face2";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BookIcon from "@mui/icons-material/Book";
import HailIcon from "@mui/icons-material/Hail";
import PublishIcon from "@mui/icons-material/Publish";
import DrawIcon from "@mui/icons-material/Draw";
// import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null); // Ref for the user menu
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [Admin, setAdmin] = useState(false); // Use useState for Admin

  const location = useLocation();

  // Auto logout if token is expired.
  useEffect(() => {
    window.scrollTo(0, 0);
    const storedUser = JSON.parse(localStorage.getItem("Profile"));
    if (storedUser) {
      const token = storedUser.token;

      if (token) {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);

        if (decodedToken.exp * 5000 < new Date().getTime()) {
          handleLogout();
        }
      }
    }
  }, []);

  useEffect(() => {
    // Scroll to top when the component mounts
    const storedUser = JSON.parse(localStorage.getItem("Profile"));
    const token = storedUser?.token;
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.email === import.meta.env.VITE_ADMIN_EMAIL) {
        setAdmin(true); // Update the Admin state
      }

      console.log("Admin status:", Admin);

      setUser(decodedToken);
    }
  }, [location, Admin]); // Add Admin as a dependency

  // Array of menu items
  const menuItems = [
    {
      name: "Stories",
      path: "/allStories",
      icon: <AutoStoriesIcon fontSize="small" />,
    },
    // {
    //   name: "Latest Stories",
    //   path: "/latest-stories",
    //   icon: <ScheduleIcon fontSize="small" />,
    // },
    // {
    //   name: "Our Top-picks",
    //   path: "/top-picks",
    //   icon: <HailIcon fontSize="small" />,
    // },
    // {
    //   name: "Trending",
    //   path: "/trending",
    //   icon: <WhatshotIcon fontSize="small" />,
    // },
    { name: "Blogs", path: "/allBlogs", icon: <BookIcon fontSize="small" /> },
    // { name: "Poetry", path: "/poetry" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowUserMenu(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all items from localStorage
    setUser(null); // Update the user state to null after logout
    setAdmin(false); // Reset Admin state on logout
    setShowUserMenu(false); // Close the user menu
    navigate("/"); // Redirect to the home page
  };

  useEffect(() => {
    if (menuOpen || showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, showUserMenu]);

  return (
    <div className="sticky top-0 z-50 bg-white ">
      <div className="width-[100%] flex justify-center items-center px-7 py-3 border-gray-200 border-b-[0.5px] shadow-md mb-4">
        {/* Empty block in larger screens for left spacing */}
        <div className="w-1/4">
          <div className="sm:hidden">
            {menuOpen ? (
              <CloseIcon onClick={toggleMenu} className="cursor-pointer" />
            ) : (
              <MenuIcon onClick={toggleMenu} className="cursor-pointer" />
            )}
          </div>
        </div>

        {/* Logo */}
        <div className="navBar w-full sm:w-2/4 text-center">
          <p
            onClick={() => navigate("/")}
            className="inline-block cursor-pointer"
          >
            THE <br />
            <span className="text-xl">MYTHICAL REALM</span>
          </p>
        </div>

        {/* Useful block in larger screens for right spacing */}
        <div className="text-sm font-semibold w-1/4 text-center text-gray-600 ">
          <div className="hidden sm:flex relative gap-5 justify-end items-center">
            <p
              onClick={() => navigate("/gemini")}
              className="cursor-pointer hover:underline"
            >
              Get Inspired
            </p>
            <p
              onClick={() => navigate("/publish")}
              className="cursor-pointer hover:underline"
            >
              Publish
            </p>
            {!user ? (
              <p
                onClick={() => navigate("/auth")}
                className="cursor-pointer hover:underline"
              >
                Sign in
              </p>
            ) : (
              <>
                <p
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="cursor-pointer hover:underline"
                >
                  Account
                </p>
                {showUserMenu && (
                  <div
                    ref={userMenuRef}
                    className="absolute top-6 -right-3 p-1 shadow-md rounded-sm z-10 bg-white"
                  >
                    <p
                      className="hover:bg-gray-300 text-left cursor-pointer py-3 px-6 flex justify-between items-center gap-3"
                      onClick={handleLogout}
                    >
                      Logout
                      <LogoutIcon fontSize="small" />
                    </p>
                    <p
                      onClick={() => navigate("/profile")}
                      className="hover:bg-gray-300 text-left cursor-pointer py-3 px-6 flex justify-between items-center gap-3"
                    >
                      Profile
                      <Face2Icon fontSize="small" />
                    </p>
                    {Admin && (
                      <p
                        onClick={() => navigate("/upload")}
                        className="hover:bg-gray-300 text-left cursor-pointer py-3 px-6"
                      >
                        "Upload"
                      </p>
                    )}

                    {Admin &&
                      ((
                        <p
                          onClick={() => navigate("/saved")}
                          className="hover:bg-gray-300 text-left cursor-pointer py-3 px-6"
                        >
                          Saved
                        </p>
                      ),
                      (
                        <p
                          className="hover:bg-gray-300 text-left cursor-pointer py-3 px-6"
                          onClick={() => navigate("/admin")}
                        >
                          Admin Panel
                        </p>
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Menu items for mobile view */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="text-sm font-semibold text-gray-800 sm:hidden flex flex-col items-center gap-2 p-3 border-gray-300 border-b-[1px] mb-3"
        >
          {!user ? (
            <p
              onClick={() => (navigate("/auth"), setMenuOpen(false))}
              className="bg-green-600 text-white p-2 rounded-sm hover:underline cursor-pointer min-w-[150px] flex items-center gap-3"
            >
              <Face2Icon fontSize="small" /> Sign in
            </p>
          ) : (
            <>
              <p
                onClick={() => (navigate("/profile"), setMenuOpen(false))}
                className="bg-green-600 text-white p-2 rounded-sm hover:underline cursor-pointer min-w-[150px] flex items-center gap-3"
              >
                <Face2Icon fontSize="small" /> Profile
              </p>
              <p
                onClick={() => (handleLogout(), setMenuOpen(false))}
                className="bg-red-600 text-white p-2 rounded-sm hover:underline cursor-pointer min-w-[150px] flex items-center gap-3"
              >
                <LogoutIcon fontSize="small" /> Logout
              </p>
            </>
          )}
          <p
            onClick={() => (navigate("/publish"), setMenuOpen(false))}
            className=" bg-gray-300 p-2 rounded-sm hover:underline cursor-pointer min-w-[150px] flex items-center gap-3"
          >
            <DrawIcon fontSize="small" /> Publish
          </p>
          {menuItems.map((item, index) => (
            <p
              key={index}
              className="hover:underline cursor-pointer p-2 min-w-[150px] flex items-center gap-3"
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false); // Close menu on item click
              }}
            >
              {item.icon}
              {item.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
