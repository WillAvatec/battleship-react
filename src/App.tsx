import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/ui/Footer"
import Placement from "./tabs/Placement.tsx";
import MainGame from "./tabs/MainGame.tsx";
import Welcome from "./tabs/Welcome.tsx";
import VictoryPage from "./tabs/Victory.tsx";
import LosePage from "./tabs/Lose.tsx";
import Header from "./components/ui/Header.tsx";

const router = createBrowserRouter([
    { path: "/", element: <Welcome /> },
    { path: "/placement", element: <Placement /> },
    { path: "/game", element: <MainGame /> },
    { path: "/winner", element: <VictoryPage /> },
    { path: "/lose", element: <LosePage /> },
  ]);

function App(){
    return (
        <>
            <Header />
            <RouterProvider router={router} />
            <Footer/>
        </>
    )
}

export default App