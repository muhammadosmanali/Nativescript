import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ChallengeModel} from "~/app/challenges/challenge.model";
import {DayStatus} from "~/app/challenges/day.model";
import {take} from "rxjs/internal/operators";


@Injectable({providedIn: 'root'})
export class ChallengesService {
    private _currentChallenge = new BehaviorSubject<ChallengeModel>(null);

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new ChallengeModel(
            title,
            description,
            new Date().getFullYear(),
            new Date().getMonth()
        );

        this._currentChallenge.next(newChallenge);
    }

    updateChallenge(title: string, description: string) {
        this._currentChallenge.pipe(take(1)).subscribe(
            challenge => {
                const updatedChallenge = new ChallengeModel(
                    title,
                    description,
                    challenge.year,
                    challenge.month,
                    challenge.days
                );
                this._currentChallenge.next(updatedChallenge);
            }
        );
    }

    updateDayStatus(dayInMonth: number, status: DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe(
            challenge => {
                if(!challenge || challenge.days.length < dayInMonth) {
                    return;
                }
                const dayIndex = challenge.days.findIndex(d => d.dayInMonth === dayInMonth);
                challenge.days[dayIndex].status = status;
                this._currentChallenge.next(challenge);
                console.log(challenge.days[dayIndex]);
            }
        );
    }
}
