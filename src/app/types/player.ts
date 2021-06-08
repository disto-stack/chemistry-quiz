export type Player = {
    name: string;
    answers: PlayerAnswer[];
    score?: number;
    time?: number;
}

type PlayerAnswer = {
    answerId: string;
    isCorrect: boolean;
}
