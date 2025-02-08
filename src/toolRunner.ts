import OpenAI from "openai";
import { generateImage, generateImageToolDefinition } from "./tools/generate-image.tool";
import { dadJokesToolDefinition, getDadJoke } from "./tools/dad-jokes.tool";
import { getRedditPost, RedditToolDefinition } from "./tools/reddit.tool";
import { getWeather, weatherToolDefinition } from "./tools/weather.tool";




export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || "{}")
  }

  switch (toolCall.function.name) {
    case generateImageToolDefinition.name:
      return await generateImage(input);
    case dadJokesToolDefinition.name:
      return await getDadJoke(input);
    case RedditToolDefinition.name:
      return await getRedditPost(input);
    case weatherToolDefinition.name:
      return await getWeather(input);

    default:
      throw new Error(`I don't know how to run this tool: ${toolCall.function.name}`); 
  }
}
