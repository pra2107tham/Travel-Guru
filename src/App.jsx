import React from "react";
import "./App.css";
import GoogleMaps from "./components/GoogleMaps";
import ChatSection from "./components/ChatSection";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="border-2 rounded-md border-black h-[44rem]">
      <Navbar />

      <div className="p-2 bg-slate-900"></div>

      <div className="flex flex-grow overflow-hidden h-full">
        {/* <!-- Main Content Area --> */}
        <div className="flex flex-grow overflow-hidden">
          {/* <!-- Chat Section --> */}
          <ChatSection />

          {/* <!-- Resizable Divider --> */}
          <div id="divider" className="divider w-2 h-100% rounded-md"></div>

          {/* <!-- Google Maps Section --> */}
          <GoogleMaps />
        </div>
      </div>
    </div>
  );
};

export default App;
