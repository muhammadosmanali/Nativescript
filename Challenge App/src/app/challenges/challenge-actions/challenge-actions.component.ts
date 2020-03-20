import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {DayStatus} from "~/app/challenges/day.model";


@Component({
    selector: 'ns-challenge-actions',
    templateUrl: './challenge-actions.component.html',
    styleUrls: ['./challenge-actions.component.scss'],
    moduleId: module.id
})

export class ChallengeActionsComponent implements OnChanges{
    @Output() actionSelect = new EventEmitter<DayStatus>();
    @Input() cancelText = 'Cancel';
    @Input() chosen: 'complete' | 'fail' = null;
    action: 'complete' | 'fail' = null;
    done = false;

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.chosen) {
            this.action = changes.chosen.currentValue;
            if(changes.chosen.currentValue === null) {
                this.done = false;
            }
        }
    }

    onAction(action: 'complete' | 'fail' | 'cancel' ) {
        this.done = true;
        let status = DayStatus.Open;
        if(action === 'complete') {
            status = DayStatus.Completed;
            this.action = 'complete';
        } else if (action == 'fail') {
            status = DayStatus.Failed;
            this.action = 'fail';
        } else if (action == 'cancel') {
            this.action = null;
            this.done = false;
        }
        this.actionSelect.emit(status);
    }
}
