import { z } from "zod";

export const questionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths.",
    ),
  answer: z.enum(["A", "B", "C", "D"])
    .describe(
      "The correct answer, where A is the first option, B is the second, and so on.",
    ),
});

export type Question = z.infer<typeof questionSchema>;
export const questionsSchema = z.array(questionSchema).length(4);

export const flashCardSchema = z.object({
  front: z.string().describe("The question or concept on the front of the flashcard"),
  back: z.string().describe("The answer or explanation on the back of the flashcard"),
});

export type Flashcard = z.infer<typeof flashCardSchema>;
export const flashcardsSchema = z.array(flashCardSchema).length(8);


export const shortAnswerQuestionSchema = z.object({
  question: z.string(),
  answer: z.string().describe("The model's suggested answer to the question"),
  isLongAnswer: z.boolean().describe("Whether this question requires a long-form answer"),
});

export type ShortAnswerQuestion = z.infer<typeof shortAnswerQuestionSchema>;
export const shortAnswerQuestionsSchema = z.array(shortAnswerQuestionSchema).length(4);