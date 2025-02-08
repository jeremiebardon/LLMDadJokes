import { z } from "zod";
import { ToolName } from "./tool.models";

export const RedditToolDefinition = {
  name: ToolName.REDDIT,
  description: "Get the latest post from reddit",
  parameters: z.object({}),
}

type RedditToolArgs = z.infer<typeof RedditToolDefinition.parameters>;

export const getRedditPost = async ({ toolArgs }: { toolArgs: RedditToolArgs }) => {
  const { data } = await fetch("https://www.reddit.com/r/nba/.json").then(
    (res) => res.json() as Promise<{ data: { children: any[] } }>
  );

  const infos = data.children.map((child: any) => ({
    title: child.data.title,
    url: child.data.url,
  }));

  return JSON.stringify(infos, null, 2);
}