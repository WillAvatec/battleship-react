import React from "react";
import ReactDOM from "react-dom/client";
import PlacementMenu from "./tabs/PlacementMenu.tsx";
import MainGame from "./tabs/MainGame.tsx";
import Welcome from "./tabs/Welcome.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GameDataProvider } from "./context/data.tsx";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  { path: "/placement", element: <PlacementMenu /> },
  { path: "/game", element: <MainGame /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameDataProvider>
      <RouterProvider router={router} />
    </GameDataProvider>
  </React.StrictMode>
);
