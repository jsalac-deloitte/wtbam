export type QuestionType = {
  question: string;
  category: string;
  difficulty: String;
  incorrectAnswers: string[];
  correctAnswer: string;
};

export type SetOfQuestionsType = QuestionType[];
