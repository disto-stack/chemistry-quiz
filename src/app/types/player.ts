import { Answer } from './answer'

export type Player = {
    name: string,
    answers?: Answer[],
    score?: number,
    time?: number,
    isCompleted: boolean
}