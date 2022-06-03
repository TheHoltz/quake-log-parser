import {
    MATCH_KILL_REGEX,
    MATCH_NEW_PLAYER_NAME,
    MATCH_PLAYER_ID_REGEX,
} from "../helpers/constants";
import { Report } from "../types/types";
import Game from "./game";
import Player from "./player";

class Parser {
    private currentGame: any;
    private allGames = new Array<Game>();

    private parseInitGame(line: string): void {
        // some games have no shutdown
        if (this.currentGame) {
            this.allGames.push(this.currentGame);
        }

        this.currentGame = new Game(`game_${this.allGames.length + 1}`);
    }

    private parseClientConnect(line: string): void {
        const clientId = MATCH_PLAYER_ID_REGEX.exec(line);

        if (!clientId) {
            throw new Error("Cannot match client id");
        }

        if (!clientId[2]) {
            throw new Error("Cannot parse client id");
        }

        const connectedUser = new Player(parseInt(clientId[2]));

        this.currentGame.addPlayer(connectedUser);
    }

    private parseClientUserinfoChanged(line: string): void {
        const playerId = MATCH_PLAYER_ID_REGEX.exec(line);

        if (!playerId) {
            throw new Error(`Could not parse ClientUserinfoChanged line: ${line}`);
        }

        const currentPlayer = this.currentGame.getPlayer(parseInt(playerId[2]));

        if (!currentPlayer) {
            throw new Error(`Could not find player with id ${playerId[2]}`);
        }

        const newName = MATCH_NEW_PLAYER_NAME.exec(line);

        if (!newName) {
            throw new Error(`Could not parse ClientUserinfoChanged line: ${line}`);
        }

        currentPlayer.updateName(newName[1]);
    }

    private parseClientDisconnect(line: string): void {
        const disconectedPlayerId = MATCH_PLAYER_ID_REGEX.exec(line);

        if (!disconectedPlayerId) {
            throw new Error(`Could not parse ClientDisconnect line: ${line}`);
        }

        this.currentGame.disconnectPlayer(parseInt(disconectedPlayerId[2]));
    }

    private parseCommand(line: string): string | undefined {
        const COMMAND_REGEX = /(\d+:\d+) ([a-zA-Z0-9]+):/;

        const match = COMMAND_REGEX.exec(line);

        if (!match || !match[2]) {
            return;
        }

        const command = match[2];

        return command;
    }

    private parseKill(line: string): void {
        const killRegex = MATCH_KILL_REGEX.exec(line);

        if (!killRegex) {
            throw new Error(`Could not parse kill line: ${line}`);
        }

        const killerId = parseInt(killRegex[1]);
        const killedId = parseInt(killRegex[2]);
        const weapon = parseInt(killRegex[3]);

        this.currentGame.playerKill(killerId, killedId, weapon);
    }

    public parseLine(line: string): void {
        const command = this.parseCommand(line);

        switch (command) {
            case "InitGame":
                this.parseInitGame(line);
                break;
            case "ClientConnect":
                this.parseClientConnect(line);
                break;
            case "ClientUserinfoChanged":
                this.parseClientUserinfoChanged(line);
                break;
            case "ClientDisconnect":
                this.parseClientDisconnect(line);
                break;
            case "Kill":
                this.parseKill(line);
                break;
        }
    }

    // get all games
    public games(): Array<Game> {
        return this.allGames;
    }

    public generateReport(): Report {
        const output = <Report>{};

        this.allGames.forEach((game) => {
            const players = game.players().map((player) => player.name());
            const totalKills = game.totalKills();
            const kills = game.killsByEachPlayer();
            const kills_by_means = game.killsByMeans();

            output[game.name()] = {
                players,
                totalKills,
                kills,
                kills_by_means,
            };
        });

        return output;
    }
}

export default Parser;
