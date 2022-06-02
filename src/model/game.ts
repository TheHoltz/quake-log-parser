import { WORLD_ID } from "../helpers/constants";
import Player from "./player";

class Game {
    private _name: string;
    private _players: Array<Player> = new Array<Player>();
    private _disconnectedPlayers: Array<Player> = new Array<Player>();

    constructor(name: string) {
        this._name = name;

        const WORLD_ENTITY = new Player(WORLD_ID, "<world>");

        this.addPlayer(WORLD_ENTITY);
    }

    public name(): string {
        return this._name;
    }

    public playerKill(killer: number, killed: number, weapon: number): void {
        const whoKilled = this.getPlayer(killer);
        const whoDied = this.getPlayer(killed);

        if (!whoKilled || !whoDied) {
            throw new Error(`Could not find player with id ${killer} or ${killed}`);
        }

        whoKilled.addKill(whoDied.id(), weapon);

        whoDied.addDeath(whoKilled.id(), weapon);
    }

    public players(): Array<Player> {
        return this._players.filter((player) => player.id() !== WORLD_ID);
    }

    public addPlayer(player: Player) {
        this._players.push(player);
    }

    public getPlayer(id: number): Player | undefined {
        return this._players.find((player) => player.id() === id);
    }

    public disconnectPlayer(id: number): void {
        const player = this.getPlayer(id);

        if (!player) {
            return;
        }

        this._disconnectedPlayers.push(player);
        this._players = this._players.filter((player) => player.id() !== id);
    }

    public totalKills(): number {
        return this._players.reduce((acc, player) => {
            return acc + player.kills();
        }, 0);
    }

    public killsByEachPlayer(): {
        [key: string]: number;
    } {
        const output: {
            [key: string]: number;
        } = {};

        this._players.forEach((player) => {
            if (player.id() === WORLD_ID) {
                return;
            }

            // using score, because it removes -1 for each world kill
            output[player.name()] = player.score();
        });

        return output;
    }

    public killsByMeans() {
        const output: {
            [key: string]: number;
        } = {};

        this._players.forEach((player) => {
            if (player.id() === WORLD_ID) {
                return;
            }

            const playerKills = player.killsByWeapon();

            Object.keys(playerKills).forEach((weapon) => {
                if (output[weapon]) {
                    output[weapon] += playerKills[weapon];
                } else {
                    output[weapon] = playerKills[weapon];
                }
            });
        });

        return output;
    }
}

export default Game;
