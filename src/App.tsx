import React, { useState } from "react";
import "./App.css";

import Composer from "./components/Composer/Composer";
import Viewer from "./components/Viewer/Viewer";
import Exporter from "./components/Exporter/Exporter";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="flex flex-row w-screen h-screen">
        <div className="w-1/2 bg-red-300">
          <Composer></Composer>
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="h-1/2 bg-blue-300">
            <Viewer></Viewer>
          </div>
          <div className="h-1/2 bg-green-300">
            <Exporter></Exporter>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
