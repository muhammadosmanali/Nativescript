import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ModalDialogService} from "nativescript-angular/modal-dialog";
import {DayModalComponent} from "~/app/challenges/day-modal/day-modal.component";
import {UIService} from "~/app/shared/ui.service";
import {ChallengesService} from "~/app/challenges/challenges.service";
import {ChallengeModel} from "~/app/challenges/challenge.model";
import {Subscription} from "rxjs";
import {Day, DayStatus} from "~/app/challenges/day.model";

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.scss'],
  moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit, OnDestroy{
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  currentChallenge: ChallengeModel;
  private currentChallengeSub: Subscription;

  constructor(private modalDialog: ModalDialogService,
              private vcRef: ViewContainerRef,
              private uiService: UIService,
              private challengeService: ChallengesService) {}

  ngOnInit(): void {
    this.currentChallengeSub = this.challengeService.currentChallenge.subscribe(
        challenge => {
          this.currentChallenge = challenge;
        }
    );
  }

  getIsSettable(dayInMonth: number) {
    return dayInMonth <= new Date().getDate()
  }

  onChangeStatus(day:Day) {
    if(!this.getIsSettable(day.dayInMonth)) {
      return;
    }
    this.modalDialog.showModal(DayModalComponent,{
      fullscreen: true,
      viewContainerRef: this.uiService.getRootVCRef
          ? this.uiService.getRootVCRef
          : this.vcRef,
      context: {
        date: day.date,
        status: day.status
      }
    }).then(
        (status: DayStatus) => {
          if(status === DayStatus.Open) {
            return;
          }
          this.challengeService.updateDayStatus(day.dayInMonth, status);
        }
    );
  }

  getRow(index: number, day: {dayInMonth: number, dayInWeek: number}) {
    const startRow = 1;
    const weekRow = Math.floor(index / 7);
    const firstWeekDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1: 0;
    return startRow + weekRow + irregularRow;
  }

  ngOnDestroy(): void {
    if(this.currentChallengeSub) {
      this.currentChallengeSub.unsubscribe();
    }
  }
}
