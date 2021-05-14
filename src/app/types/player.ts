type playerAnswer = {
    answerId: string;
    isCorrect: boolean;
}

export type Player = {
    name: string;
    answers: playerAnswer[];
    score?: number;
    time?: number;
}