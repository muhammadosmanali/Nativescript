import {Component, OnInit} from "@angular/core";
import {ModalDialogParams} from "nativescript-angular/modal-dialog";
import {DayStatus} from "~/app/challenges/day.model";


@Component({
    selector: 'ns-day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.css'],
    moduleId: module.id,
})

export class DayModalComponent implements OnInit{
    loadedDate: Date;
    loadedStatus: 'complete' | 'fail' = null;

    constructor(private modalParams: ModalDialogParams) {}

    ngOnInit(): void {
        const parsedParams = (this.modalParams.context as {date: Date, status: DayStatus});
        this.loadedDate = parsedParams.date;
        if(parsedParams.status === DayStatus.Completed) {
            this.loadedStatus = 'complete';
        } else if (parsedParams.status === DayStatus.Failed) {
            this.loadedStatus = 'fail';
        } else {
            this.loadedStatus = null;
        }
    }

    onHandleInput(action: DayStatus) {
        this.modalParams.closeCallback(action);
    }
}
