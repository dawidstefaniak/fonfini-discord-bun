import Cron from "croner";
import { refreshAllChannelNames } from "./handlers";

export const startCrons = () => {
    const dailyCron: Cron = Cron("1 0 * * *", () => {
        refreshAllChannelNames();
    });
};
