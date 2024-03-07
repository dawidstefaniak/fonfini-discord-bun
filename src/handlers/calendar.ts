import dni from "@assets/dni.json";

interface CalendarDay {
    month: number;
    day: number;
    year: number;
    name: string;
}

export function calendarCommand(): string {
    const name = getTodayCalendarEventName();
    if (!name) return "Nie znaleziono święta na dziś.";
    return `Dzisiaj jest: ${name}. Wszystkiego najlepszego!`;
}

export function getTodayCalendarEventName(): string {
    const today = new Date();
    const formatter = new Intl.DateTimeFormat("pl-PL", {
        timeZone: "Europe/Warsaw",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    const [{ value: month }, , { value: day }, , { value: year }] =
        formatter.formatToParts(today);

    const result = dni.find(
        (calendarDay: CalendarDay): boolean =>
            calendarDay.month === Number(month) &&
            calendarDay.day === Number(day)
    );
    return result?.name ?? "Nie znaleziono święta na dziś.";
}

export const getFormattedDate = () =>
    new Date().toLocaleDateString("pl", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
