import { shortAnswerQuestionSchema, shortAnswerQuestionsSchema } from "@/lib/schemas";
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
        content: "You are a teacher. Your job is to take a document and create 4 short/long answer questions based on the content of the document. Include a hint for each question. Make half the questions require brief responses and half require more detailed explanations. Ask relevant questions only that are probable of being aksed in the exames",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create 4 short/long answer questions based on this document.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: shortAnswerQuestionSchema,
    output: "array",
    onFinish: ({ object }) => {
      const res = shortAnswerQuestionsSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}