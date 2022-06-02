import { WEAPONS } from "../helpers/constants";

class Weapon {
    private _id: number;

    constructor(id: number) {
        if (!WEAPONS[id]) {
            throw new Error(`Weapon with id ${id} does not exist`);
        }

        this._id = id;
    }

    public id(): number {
        return this._id;
    }

    public name(): string {
        return WEAPONS[this._id];
    }
}

export default Weapon;
