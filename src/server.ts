import { Client, GatewayIntentBits, Guild } from "discord.js";
import { TOKEN } from "./consts";
import { registerCommands } from "./registerCommands";
import {
    calendarCommand,
    getTodayCalendarEventName,
} from "./commands/calendar";

export const startServer = async () => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    let udwGuild: Guild | undefined;
    const udwServerId = "691068525414055937";
    const dniChannelId = "794184779385143298";

    client.on("ready", () => {
        console.log(`Logged in as ${client.user?.tag}!`);
        udwGuild = client.guilds.cache.find((guild) => guild.id == udwServerId);
    });

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "ping") {
            await interaction.reply("Pong!");
        }

        if (interaction.commandName === "kalendarz") {
            await udwGuild?.channels.cache
                .find((channel) => channel.id == dniChannelId)
                ?.setName(getTodayCalendarEventName());

            await interaction.reply(calendarCommand());
        }
    });

    client.login(TOKEN);
    await registerCommands();
};
