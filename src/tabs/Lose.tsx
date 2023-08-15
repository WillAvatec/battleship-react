import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/data";

function LosePage() {
  const goTo = useNavigate();
  const handleClick = () => {
    goTo("/");
  };

  const gameData = useContext(DataContext);
  const { winner } = gameData;

  return (
    <div className="fixed z-10 left-0 top-0 w-full h-full bg-no-repeat bg-cover min-w-full min-h-full flex flex-col justify-center content-center">
      <img
        className="w-72 object-contain self-center translate-y-20"
        src="https://media.makeameme.org/created/dont-give-up-5b2cb3.jpg"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,400px))] justify-center gap-7 min-h-[150px] p-5 w-11/12 mx-auto my-auto justify-items-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white max-w-screen-sm">
        <div className="flex flex-col align-center">
          <h1
            id="congratulations"
            className="text-2xl text-center align-middle leading-8 h-9"
          >
            Oops, the winner this time was
          </h1>
        </div>
        <p className="text-2xl text-center">
          {winner === "" ? "The Computer" : winner}
        </p>
        <p className="text-center">
          Thanks for playing the first version of this game!
        </p>
        <button
          id="newGame"
          onClick={handleClick}
          className="text-white bg-purple-800 px-6 py-3 rounded-xl hover:scale-105 hover:bg-purple-900 hover:shadow-xl transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default LosePage;
