import { Answer } from './answer'

export type Player = {
    name: string,
    answers?: Answer[],
    score?: number,
    level?: string,
    time?: number,
    isCompleted: boolean
}