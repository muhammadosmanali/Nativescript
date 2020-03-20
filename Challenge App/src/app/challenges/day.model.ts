export enum DayStatus {
    Open,
    Completed,
    Failed
}

export interface Day {
    dayInMonth: number;
    dayInWeek: number;
    date: Date;
    status: DayStatus;
}
