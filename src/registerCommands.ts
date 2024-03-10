import { REST, Routes } from "discord.js";
import { CLIENT_ID, TOKEN } from "./consts";

const commands = [
        {
                name: "kalendarz",
                description: "Wyświetla święto na dzisiaj."
        },
        {
                name: "refresh",
                description: "Manualny refresh nazw kanałów"
        }
] as const;

export type CommandNames = typeof commands[number]["name"];
const rest = new REST({ version: "10" }).setToken(TOKEN)

export const registerCommands = async () => {
        try {
                console.log("Started refreshing application (/) commands.");

                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                });

                console.log("Successfully reloaded application (/) commands.");
        } catch (error) {
                console.error(error);
        }
};
