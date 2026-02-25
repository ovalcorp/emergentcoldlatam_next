declare module 'react-big-calendar' {
  import { ComponentType } from 'react';

  export interface Event {
    title?: string;
    start?: Date;
    end?: Date;
    allDay?: boolean;
    resource?: unknown;
  }

  export interface CalendarProps<T = Event> {
    localizer: object;
    events?: T[];
    startAccessor?: keyof T | ((event: T) => Date);
    endAccessor?: keyof T | ((event: T) => Date);
    defaultView?: 'month' | 'week' | 'day' | 'agenda';
    style?: React.CSSProperties;
    messages?: {
      next?: string;
      previous?: string;
      today?: string;
      month?: string;
      week?: string;
      day?: string;
      agenda?: string;
      date?: string;
      time?: string;
      event?: string;
      noEventsInRange?: string;
    };
  }

  export const Calendar: ComponentType<CalendarProps>;
  export function dateFnsLocalizer(config: {
    format: (date: Date, format: string, culture?: string) => string;
    parse: (value: string, format: string, culture?: string) => Date;
    startOfWeek: (date: Date, culture?: string) => Date;
    getDay: (date: Date) => number;
    locales?: Record<string, object>;
  }): object;
}
