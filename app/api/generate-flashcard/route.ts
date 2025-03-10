import {flashCardSchema , flashcardsSchema} from "@/lib/schemas"
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { files } = await req.json();
  const firstFile = files[0].data;

  const result = streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content:
          "You are a teacher. Your job is to take a document, and create a set of flashcards (with 8 cards) based on the content of the document. Each flashcard should have a front side with a question or concept, and a back side with an answer or explanation. Focus on the most important concepts from the document.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create a set of flashcards based on this document.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: flashCardSchema,
    output: "array",
    onFinish: ({ object }) => {
      const res = flashcardsSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}