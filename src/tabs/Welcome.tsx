import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/data";

function Welcome() {
  // Context to update data
  const game = useContext(DataContext);

  // Reference to control input value
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Hook that returns a function to change routes
  const goTo = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      game.initGameData(inputRef.current.value || undefined);
      goTo("/placement");
    }
  };

  return (
    <div className="fixed z-10 left-0 top-0 w-full h-full bg-no-repeat bg-cover min-w-full min-h-full flex justify-center content-center">
      <form className="grid grid-cols-[repeat(auto-fit,minmax(200px,400px))] grid-rows-3 justify-center gap-7 min-h-[200px] p-5 w-11/12 mx-auto my-auto justify-items-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white max-w-screen-sm">
        <div className="flex align-center">
          <p
            id="welcome"
            className="text-xl align-middle leading-8 h-9 uppercase"
          >
            Welcome Aboard!
          </p>
        </div>
        <input
          className="nameInput p-2 rounded-sm text-purple-500"
          type="text"
          placeholder="Please enter your name"
          ref={inputRef}
          required
          autoFocus
        />
        <button
          id="playBtn"
          onClick={handleClick}
          className="text-white bg-purple-800 p-3 py-1.5 rounded-xl hover:scale-105 hover:bg-purple-900 hover:shadow-xl transition-all"
        >
          Start Game
        </button>
      </form>
    </div>
  );
}

export default Welcome;
