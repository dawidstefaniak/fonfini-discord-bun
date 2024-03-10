import {
    Client,
    GatewayIntentBits,
    Guild,
    PermissionFlagsBits
} from "discord.js";
import { TOKEN, UDW_SERVER_ID } from "./consts";
import { registerCommands } from "./registerCommands";
import { calendarCommand } from "./handlers/calendar";
import { refreshAllChannelNames } from "./handlers";
import { startCrons } from "./crons";

export let udwGuild: Guild | undefined;

export const startServer = async () => {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.on("ready", () => {
        console.log(`Logged in as ${client.user?.tag}!`);
        udwGuild = client.guilds.cache.find(
            (guild) => guild.id === UDW_SERVER_ID
        );
        Promise.all([refreshAllChannelNames(), startCrons()]);
    });

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "refresh") {
            if (
                //@ts-ignore
                interaction.member?.permissions.has(
                    PermissionFlagsBits.Administrator
                )
            ) {
                await refreshAllChannelNames();
                interaction.reply("Channels refreshed");
                return;
            }
            interaction.reply("Insufficient permissions");
        }

        if (interaction.commandName === "kalendarz") {
            await interaction.reply(calendarCommand());


            return;
        }
    });

    client.login(TOKEN);
    await registerCommands();
};
