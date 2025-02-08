import { z } from "zod";
import { ToolName } from "./tool.models";

export const weatherToolDefinition = {
  name: ToolName.WEATHER,
  description: "Get the weather. Take the coordinate (Latitude and longitude of this city). If you find multiple city with the same town name ask the country to the user",
  parameters: z.object({
    latitude: z.string().describe("latitude of the city"),
    longitude: z.string().describe("longitude of the city"),
  }),
}

type WeatherArgs = z.infer<typeof weatherToolDefinition.parameters>;

export const getWeather = async (args: { toolArgs: WeatherArgs }) => {
  const { latitude, longitude } = args.toolArgs;

  if (latitude && longitude) {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${args.toolArgs.latitude}&longitude=${args.toolArgs.longitude}&hourly=temperature_2m&forecast_days=1`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status}`);
    }

    const data = await response.json(); 
    return JSON.stringify(data);
  } else {
    return "UNable to get the city location, which country is it ? "
  }
};