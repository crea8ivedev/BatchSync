import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/logomain.svg";
import { cn } from "../utils/tailwindMarge/cn";
import { useManufacturingStore } from "../stores/manufacturingStore";
import { navLinks } from "../constants/navigation.constant";

const Nav = () => {
  const { operator, logout } = useManufacturingStore((state) => state);

  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <header className="sticky w-full py-3 top-0 flex flex-col justify-between items-center bg-white shadow-[0px_1px_5px_gray]">
        <div className="nav-bar relative w-full">
          <div className="w-full flex flex-col gap-3">
            {/* Top section */}
            <div className="max-w-[1440px] mx-auto flex justify-between items-center w-full px-5">
              <div className="flex gap-3 items-center">
              <img src={logo} alt="Logo" width={35} height={35} />
              <h3 className="text-2xl">BatchSync</h3>
              </div>
              {operator ? (
                <nav className="flex justify-end gap-4 items-center relative">
                  <ul className="flex gap-2 items-center">
                    <li
                      className="relative profile cursor-pointer"
                      ref={profileRef}
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${operator}`}
                        alt={operator}
                        width={35}
                        height={35}
                        className="rounded-full border border-gray-300 hover:scale-105 transition-all duration-200"
                        onClick={() => setIsProfileOpen((prev) => !prev)}
                      />

                      {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                          <div className=" text-gray-700  text-sm font-medium border-b border-gray-100 px-4 py-2">
                            {operator}
                          </div>
                          <ul className="flex flex-col">
                            <li>
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500 cursor-pointer"
                                onClick={() => {
                                  setIsProfileOpen(false);
                                  handleLogout();
                                }}
                              >
                                Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                  </ul>
                </nav>
              ) : null}
            </div>

            {/* Navigation links */}
            {operator ? (
              <div className="border-t border-gray-300 w-full">
                <div className="max-w-[1440px] mx-auto w-full px-5 mt-2">
                  <ul className="flex gap-2 items-center justify-start">
                    {navLinks.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className={cn(
                            "px-4 py-2 rounded-[6px] transition-all duration-200 flex items-center gap-2",
                            "hover:bg-[#5d5fef] hover:text-white",
                            location.pathname.includes(link.path)
                              ? "bg-[#5d5fef] text-white shadow-sm"
                              : "text-[#5d5fef]"
                          )}
                        >
                          {link.icon && (
                            <span className="text-lg">{link.icon}</span>
                          )}
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default Nav;
