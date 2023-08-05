import { Dispatch, SetStateAction, useRef } from "react";

function Welcome({ setName }: { setName: Dispatch<SetStateAction<string>> }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      setName(inputRef.current.value);
    }
  };

  return (
    <>
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
    </>
  );
}

export default Welcome;
