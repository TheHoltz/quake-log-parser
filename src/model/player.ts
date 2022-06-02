import { WORLD_ID } from "../helpers/constants";
import Weapon from "./weapon";

class Player {

    private _kills = new Array<{
        id: number,
        weapon: Weapon,
    }>();
    private _deaths = new Array<{
        id: number,
        weapon: Weapon,
    }>();
    private _name: string;
    private _id: number;

    constructor(id: number, name?: string) {
        this._id = id;
        this._name = name || `player_${id}`;
    }

    public updateName(name: string) {
        this._name = name;
    }

    public name() {
        return this._name;
    }

    public id() {
        return this._id;
    }

    public addKill(id: number, weapon: number) {

        const weaponObject = new Weapon(weapon);

        this._kills.push({
            id,
            weapon: weaponObject,
        });
    }

    public addDeath(id: number, weapon: number) {

        const weaponObject = new Weapon(weapon);


        this._deaths.push({
            id,
            weapon: weaponObject,
        });
    }

    public deaths() {
        return this._deaths.length;
    }

    public kills() {
        return this._kills.length;
    }

    public score() {
        const numberOfDeathsToTheWorld = this._deaths.filter((death) => death.id === WORLD_ID).length

        return this.kills() - numberOfDeathsToTheWorld;
    }

    public killsByWeapon(): {
        [key: string]: number,
    } {
        const killsByWeapon: {
            [key: string]: number,
        } = {};

        this._kills.forEach((kill) => {
            if (killsByWeapon[kill.weapon.name()]) {
                killsByWeapon[kill.weapon.name()] += 1;
            } else {
                killsByWeapon[kill.weapon.name()] = 1;
            }
        });

        return killsByWeapon;
    }

}

export default Player;