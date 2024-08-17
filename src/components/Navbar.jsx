import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { FaHome, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate('/');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Website Name */}
        <Link to="/" className="text-2xl font-bold">
          Product Store
        </Link>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-blue-400 p-2" : "p-2"
            }
          >
            <FaHome className="inline-block mr-1" />
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-blue-400 p-2" : "p-2"
            }
          >
            <FaShoppingCart className="inline-block mr-1" />
            My Cart
          </NavLink>
        </div>

        {/* User Profile & Logout */}
        <div className="relative">
          {user ? (
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>{user.displayName}</span>
              {isHovered && (
                <button
                  className="absolute right-0 mt-10 bg-gray-700 text-white px-4 py-2 rounded shadow"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
