import { z } from "zod";
import { ToolName } from "./tool.models";
import type { ToolFn } from "../../types";

import fetch from "node-fetch"

export const dadJokesToolDefinition = {
  name: ToolName.DAD_JOKES,
  description: "Get a random dad joke",
  parameters: z.object({}),
}

type DadJokeArgs = z.infer<typeof dadJokesToolDefinition.parameters>;

export const getDadJoke: ToolFn<DadJokeArgs, string> = async ({ toolArgs }) => {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dad joke");
  }

  const data: { joke: string } = await response.json();

  return data.joke;
}