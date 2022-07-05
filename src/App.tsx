import React from "react";
import "./App.css";

import Composer from "./components/Composer/Composer";
import Viewer from "./components/Viewer/Viewer";
import Exporter from "./components/Exporter/Exporter";
import { AppProvider } from "./context/AppContext";

function App() {
  // Let's get started screen
  // Choose template
  // Configure template with preview
  // Export video
  return (
    <AppProvider>
      <div className="flex flex-col w-screen h-screen bg-slate-100">
        <div className="h-1/2 p-4">
          <Viewer></Viewer>
        </div>
        <div className="h-1/2">
          <Composer></Composer>
        </div>
        {/* <div className="h-1/2 bg-green-300">
          <Exporter></Exporter>
        </div> */}
      </div>
    </AppProvider>
  );
}

export default App;
