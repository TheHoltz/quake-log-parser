import { SingleGame } from "../types/Game.type";

type GameBoxProps = {
  game: SingleGame;
};

const useGameBox = ({ game }: GameBoxProps) => {
  const sortedKills = Object.entries(game.kills).sort((a, b) => {
    return b[1] - a[1];
  });

  const sortedMeans = Object.entries(game.kills_by_means).sort((a, b) => {
    return b[1] - a[1];
  });

  return {
    sortedKills,
    sortedMeans,
  };
};

const GameBox = (props: GameBoxProps) => {
  const { sortedKills, sortedMeans } = useGameBox(props);

  return (
    <div className="w-full rounded-lg mt-4 flex flex-col overflow-hidden mb-10">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex justify-between backdrop-blur-md bg-white/20 rounded-md md:rounded-none overflow-hidden">
          <div className="flex-1 flex flex-col gap-4 pt-2">
            <p className="px-4 py-2 font-bold">Player</p>
            <div>
              {sortedKills.map((kill, index) => (
                <p
                  key={index}
                  className="odd:bg-black/40 px-4 py-2 leading-7 whitespace-nowrap"
                >
                  {kill[0]}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col text-center gap-4 pt-2">
            <p className="px-4 py-2 font-bold">Kills</p>
            <div>
              {sortedKills.map((kill, index) => (
                <p
                  key={index}
                  className="px-4 py-2 leading-7 odd:bg-black/40"
                >
                  {kill[1]}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-between bg-white/20 mt-10 rounded-md md:rounded-none mb-10 md:mt-0 md:mb-0 overflow-hidden">
          <div className="flex-1 flex flex-col gap-4 pt-2">
            <h2 className="px-4 py-2 font-bold">Kills by means</h2>
            <div>
              {sortedMeans.map((mean, index) => (
                <p key={index} className="odd:bg-black/40 px-4 py-2 leading-7">
                  {mean[0]}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col text-center gap-4 pt-2">
            <h2 className="px-4 py-2 font-bold">Kills</h2>
            <div>
              {sortedMeans.map((mean, index) => (
                <p key={index} className="px-4 py-2 leading-7 odd:bg-black/40">
                  {mean[1]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-4 px-8 bg-black/50 rounded-md md:rounded-none">
        <h2 className="font-bold">Total kills</h2>
        <p className="font-bold">{props.game.totalKills}</p>
      </div>
    </div>
  );
};

export default GameBox;
