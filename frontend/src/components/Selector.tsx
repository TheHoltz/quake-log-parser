import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { Games } from "../types/Game.type";

interface SelectorProps {
  selectedGame: string;
  setSelectedGame: (game: Games) => void;
  gamesList: Games[];
}

const Selector = ({
  selectedGame,
  setSelectedGame,
  gamesList,
}: SelectorProps) => {
  return (
    <Listbox value={selectedGame} onChange={setSelectedGame}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full rounded-lg bg-gray-100 py-2 px-3 text-left">
          <span className="block truncate text-gray-900">{selectedGame}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-900"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          enter="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-gray-100/50 backdrop-blur-lg py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            {gamesList.map((game, gameIdx) => (
              <Listbox.Option
                key={gameIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-gray-800" : "text-gray-900"
                  }`
                }
                value={game}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {game}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Selector;
