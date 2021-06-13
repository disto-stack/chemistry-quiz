export type Question = {
    id?: string,
    question: string,
    level: string,
    options: Option[],
    correctOption: string,
    explanation: string,
}

type Option = {
    [key: string]: { answer: string }
}