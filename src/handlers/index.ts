import {
    setCalendarEventChannelName,
    setTodayDateChannelName
} from "@/commands/channelNames";

export const refreshAllChannelNames = () =>
    Promise.all([setCalendarEventChannelName(), setTodayDateChannelName()]);
