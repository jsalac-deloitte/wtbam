import { LifeLineType } from "./types";

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

export const PRIZES: string[] = [
  "500.00",
  "1,000.00",
  "2,000.00",
  "3,000.00",
  "5,000.00",
  "7,500.00",
  "10,000.00",
  "15,000.00",
  "25,000.00",
  "50,000.00",
  "75,000.00",
  "150,000.00",
  "250,000.00",
  "500,000.00",
  "1,000,000.00",
];

export const QUESTION_DIFFICULTY: string[] = ["easy", "medium", "hard"];
export const QUESTION_ENDPOINT: string =
  "categories=geography,arts_and_literature,film_and_tv,food_and_drink,general_knowledge,history,music,science,society_and_culture,sport_and_leisure&limit=10&difficulty=";
