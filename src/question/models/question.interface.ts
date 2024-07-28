const QuestionType = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  SHORT_ANSWERS: 'SHORT_ANSWERS',
} as const;

export interface Question {
  questionText: string;
  questionType: typeof QuestionType;
}
