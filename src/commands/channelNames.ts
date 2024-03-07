import { udwGuild } from "@/server";
import {
    getFormattedDate,
    getTodayCalendarEventName
} from "../handlers/calendar";
import { CALENDAR_CHANNEL_ID, DAY_CALENDAR_ID } from "@/consts";

export const setCalendarEventChannelName = () =>
    udwGuild?.channels.cache
        .find((channel) => channel.id === CALENDAR_CHANNEL_ID)
        ?.setName(getTodayCalendarEventName());

export const setTodayDateChannelName = () =>
    udwGuild?.channels.cache
        .find((channel) => channel.id === DAY_CALENDAR_ID)
        ?.setName("📆╎" + getFormattedDate());
