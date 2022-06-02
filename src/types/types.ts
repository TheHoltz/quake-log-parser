type Report = {
    [key: string]: {
        totalKills: number,
        players: string[],
        kills: { [key: string]: number },
        kills_by_means: {
            [key: string]: number,
        }
    }
}

export type {
    Report,
}