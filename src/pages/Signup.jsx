import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-white mb-8">
          SignUp
          <span className="text-cyan-300 font-thin"> Travel Guru</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <label className="block">
              <span className="text-white">Username</span>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-cyan-300"
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                />
              </div>
            </label>
            <label className="block">
              <span className="text-white">Password</span>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-cyan-300"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </div>
            </label>
          </div>
          <Link
            to="/login"
            className="block mt-4 text-sm text-center text-cyan-300 hover:underline"
          >
            Already have an account?
          </Link>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 text-lg font-semibold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
