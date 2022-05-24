import { LifeLineType, QuestionType } from "./types";

export const LIFE_LINE: LifeLineType[] = [
  {
    key: "50/50",
    description: "Remove 2 incorrect answer from the options",
  },
  {
    key: "Call a friend",
    description: "Ask a friend for help",
  },
  {
    key: "Skip Question",
    description: "The question will be skipped for the next question",
  },
];

export const PRIZES: QuestionType[] = [
  {
    question: "1st Question",
    prize: 1000,
    current: false,
  },
  {
    question: "2nd Question",
    prize: 2500,
    current: false,
  },
  {
    question: "3rd Question",
    prize: 5000,
    current: false,
  },
  {
    question: "4th Question",
    prize: 7000.0,
    current: false,
  },
  {
    question: "5th Question",
    prize: 9000,
    current: false,
  },
  {
    question: "6th Question",
    prize: 12000,
    current: false,
  },
  {
    question: "7th Question",
    prize: 15000,
    current: false,
  },
  {
    question: "8th Question",
    prize: 20000,
    current: false,
  },
  {
    question: "9th Question",
    prize: 25000,
    current: false,
  },
  {
    question: "10th Question",
    prize: 30000,
    current: false,
  },
  {
    question: "11th Question",
    prize: 40000.0,
    current: false,
  },
  {
    question: "12th Question",
    prize: 50000.0,
    current: false,
  },
  {
    question: "13th Question",
    prize: 60000.0,
    current: false,
  },
  {
    question: "14th Question",
    prize: 70000.0,
    current: false,
  },
  {
    question: "15th Question",
    prize: 90000.0,
    current: false,
  },
  {
    question: "Final Question",
    prize: 100000.0,
    current: false,
  },
];

export const QUESTION_DIFFICULTY: string[] = ["easy", "medium", "hard"];
export const QUESTION_ENDPOINT: string =
  "categories=geography,arts_and_literature,film_and_tv,food_and_drink,general_knowledge,history,music,science,society_and_culture,sport_and_leisure&limit=5&difficulty=";
