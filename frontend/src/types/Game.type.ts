import gamesResume from '../../../output/out.json'

export type Games = keyof typeof gamesResume

export type SingleGame = typeof gamesResume[Games]
