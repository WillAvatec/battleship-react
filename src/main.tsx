import React from "react";
import ReactDOM from "react-dom/client";
import { GameDataProvider } from "./context/data.tsx";
import "./index.css";
import App from "./App.tsx";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameDataProvider>
      <App />
    </GameDataProvider>
  </React.StrictMode>
);
