import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MapsContextProvider } from "./context/MapsContext.jsx";
import { BrowserRouter, Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <React.StrictMode>
        <MapsContextProvider>
          <App />
        </MapsContextProvider>
      </React.StrictMode>
    </AuthContextProvider>
  </BrowserRouter>
);
