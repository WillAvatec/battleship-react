import React from "react";
import ReactDOM from "react-dom/client";
import Placement from "./tabs/Placement.tsx";
import MainGame from "./tabs/MainGame.tsx";
import Welcome from "./tabs/Welcome.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GameDataProvider } from "./context/data.tsx";
import "./index.css";
import VictoryPage from "./tabs/Victory.tsx";
import LosePage from "./tabs/Lose.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  { path: "/placement", element: <Placement /> },
  { path: "/game", element: <MainGame /> },
  { path: "/winner", element: <VictoryPage /> },
  { path: "/lose", element: <LosePage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameDataProvider>
      <RouterProvider router={router} />
    </GameDataProvider>
  </React.StrictMode>
);
