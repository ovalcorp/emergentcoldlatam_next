"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { es };
const localizer = dateFnsLocalizer({
  format: (date: Date, formatStr: string) => format(date, formatStr, { locale: es }),
  parse: (value: string, formatStr: string) => parse(value, formatStr, new Date(), { locale: es }),
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1, locale: es }),
  getDay,
  locales: { es },
});

export function CalendarTransport() {
  const events = [
    {
      title: "15 Recepciones",
      start: new Date(2026, 1, 24),
      end: new Date(2026, 1, 24),
      allDay: true,
    },
    {
      title: "12 Despachos",
      start: new Date(2026, 1, 24),
      end: new Date(2026, 1, 24),
      allDay: true,
    },
    {
      title: "3 En espera",
      start: new Date(2026, 1, 24),
      end: new Date(2026, 1, 24),
      allDay: true,
    },
    {
      title: "0 Recepciones",
      start: new Date(2026, 1, 25),
      end: new Date(2026, 1, 25),
      allDay: true,
    },
    {
      title: "5 Despachos",
      start: new Date(2026, 1, 25),
      end: new Date(2026, 1, 25),
      allDay: true,
    },
    {
      title: "1 En espera",
      start: new Date(2026, 1, 25),
      end: new Date(2026, 1, 25),
      allDay: true,
    },
  ];

  return (
    <div style={{ height: "80vh", background: "white", padding: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        style={{ height: "100%" }}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
      />
    </div>
  );
}