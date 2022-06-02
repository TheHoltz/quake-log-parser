const WORLD_ID = 1022;

const MATCH_PLAYER_ID_REGEX =
    /Client(Connect|UserinfoChanged|Disconnect): ([0-9]*)/;

const MATCH_NEW_PLAYER_NAME =
    /ClientUserinfoChanged: [0-9]* n\\(.*)\\t\\[0-9]+\\model/;

const MATCH_KILL_REGEX = /Kill: (\d+) (\d+) (\d+)/;

const WEAPONS = [
    "MOD_UNKNOWN",
    "MOD_SHOTGUN",
    "MOD_GAUNTLET",
    "MOD_MACHINEGUN",
    "MOD_GRENADE",
    "MOD_GRENADE_SPLASH",
    "MOD_ROCKET",
    "MOD_ROCKET_SPLASH",
    "MOD_PLASMA",
    "MOD_PLASMA_SPLASH",
    "MOD_RAILGUN",
    "MOD_LIGHTNING",
    "MOD_BFG",
    "MOD_BFG_SPLASH",
    "MOD_WATER",
    "MOD_SLIME",
    "MOD_LAVA",
    "MOD_CRUSH",
    "MOD_TELEFRAG",
    "MOD_FALLING",
    "MOD_SUICIDE",
    "MOD_TARGET_LASER",
    "MOD_TRIGGER_HURT",
];

export {
    WORLD_ID,
    MATCH_PLAYER_ID_REGEX,
    MATCH_NEW_PLAYER_NAME,
    MATCH_KILL_REGEX,
    WEAPONS
};
