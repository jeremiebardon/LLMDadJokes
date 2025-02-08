import { z } from "zod";
import { ToolName } from "./tool.models";
import type { ToolFn } from "../../types";
import { openai } from "../ai";

export const generateImageToolDefinition = {
  name: ToolName.IMAGE_GEN,
  description: "Generate an image with the given prompt",
  parameters: z.object({
    prompt: z.string().describe("The prompt to generate the image. consider user\'s original messages"),
  }),
}

type GenerateImageArgs = z.infer<typeof generateImageToolDefinition.parameters>;

export const generateImage: ToolFn<GenerateImageArgs, string> = async ({ toolArgs, userMessage }) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: toolArgs.prompt,
    n: 1,
    size: "1024x1024",
  })

  const imageUrl = response.data[0].url!;

  return imageUrl;
}