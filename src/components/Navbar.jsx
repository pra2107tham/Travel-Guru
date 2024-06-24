import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useAuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";


const Navbar = () => {
  const { authUser } = useAuthContext(); // Assuming you have a logout function in the AuthContext
  const {logout} = useLogout(); // Correctly use the useLogout hook
  return (
    <nav className="bg-black h-16 flex items-center justify-between px-6 shadow-md">
      <div className="text-white text-lg font-semibold">
        <Link to="/">Travel-Guru</Link>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link to="/home" className="text-white hover:text-gray-400 transition duration-300">
            Home
          </Link>
        </li>
        {authUser ? (
          <>
            {/* Other authenticated links can go here */}
            <li>
              <button
                onClick={logout}
                className="text-white hover:text-gray-400 transition duration-300"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-white hover:text-gray-400 transition duration-300">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-white hover:text-gray-400 transition duration-300">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
