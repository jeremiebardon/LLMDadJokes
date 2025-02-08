import { runLLM } from "./llm";
import { addMessages, getMessages, saveToolResponse } from "./memory"
import { runTool } from "./toolRunner";
import { logMessage, showLoader } from "./ui";

export const runAgent = async ({ message, tools = [] }: { message: string, tools?: any[] }) => {
  await addMessages([{ role: 'user', content: message }]);

  const loader = showLoader("Thinking...");

  while (true) {
    const history = await getMessages();
    const response = await runLLM({ messages: history, tools });

    await addMessages([response]);

    if (response.content) {
      loader.stop();
  
      logMessage(response);
      return getMessages();
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];

      logMessage(response);
      loader.update(`Executing: ${toolCall.function.name}`);
    
      const toolResponse = await runTool(toolCall, message); 
  
      if (toolResponse) {
        await saveToolResponse(toolResponse, toolCall.id);
        loader.update(`Done with ${toolCall.function.name}`);
      }
    }
  }
}