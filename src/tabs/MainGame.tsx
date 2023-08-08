import Board from "../components/Board";
import GameBoard from "../constructors/board";
import { memBoardType } from "../types/type";

function MainGame() {
  const player_fake = new GameBoard(10);
  const ai_fake = new GameBoard(10);

  return (
    <div
      id="main"
      className="wrapper mx-auto flex justify-center items-center flex-1 min-h-full"
    >
      <section className="boards flex flex-col gap-5 lg:gap-20 md:flex-row">
        <PlayerBoard memBoard={player_fake.memBoard} name="Emanuel" />
        <PlayerBoard memBoard={ai_fake.memBoard} name="Wilson!" />
      </section>
    </div>
  );
}

function PlayerBoard({
  memBoard,
  name,
}: {
  memBoard: memBoardType;
  name: string;
}) {
  return (
    <div className="player-side p-5 relative">
      <div className="bg-pink-600 -z-10 absolute inset-0 blur" />
      <div className="player-name overflow-hidden whitespace-nowrap text-violet-50 max-w-sm text-ellipsis drop-shadow-2xl inline-block text-xl absolute -top-4 sm:-top-8">
        {name}
      </div>

      <Board memBoard={memBoard} />
    </div>
  );
}

export default MainGame;
