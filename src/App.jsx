import React from "react";
import { useAuthContext } from "./context/AuthContext";
import TravelGuru from "./pages/TravelGuru";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={authUser ? <TravelGuru />: <Home /> } />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
};

export default App;
