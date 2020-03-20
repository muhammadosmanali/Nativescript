import {Day, DayStatus} from "~/app/challenges/day.model";

export class ChallengeModel {
    constructor(
        public title: string,
        public description: string,
        public year: number,
        public month: number,
        private _days: Day[] = []
    ) {
        if(_days.length > 0) {
            return;
        }
        // this.currentYear = new Date().getFullYear();
        // this.currentMonth = new Date().getMonth();
        // 0 is last day of previous month.
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for(let i = 1; i < daysInMonth + 1; i++) {
            const date = new Date(year, month, i);
            const dayInWeek = date.getDay();
            this._days.push({dayInMonth: i, dayInWeek: dayInWeek, date: date, status: DayStatus.Open})
        }
    }

    get currentDay() {
        return this._days.find(d => d.dayInMonth === new Date().getDate());
    }

    get days() {
        //return copy of days.
        return [...this._days];
    }
}
