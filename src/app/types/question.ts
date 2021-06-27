export type Question = {
    id?: string,
    question: string,
    level: string,
    options: Option[],
    correctOption: string,
    explanation: string,
}

export type Option = {
    [key: string]: { answer: string }
}