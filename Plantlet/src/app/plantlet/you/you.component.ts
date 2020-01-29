import {Component} from "@angular/core";

@Component({
    selector: 'ns-you',
    templateUrl: './you.component.html',
    styleUrls: ['./you.component.scss'],
    moduleId: module.id
})

export class YouComponent {
    isEditMode: boolean = false;
    colSpan: number = 3;
    lblColor: string = "black";

    constructor() {}

    onEdit() {
        this.isEditMode = !this.isEditMode;
        if(this.isEditMode == true) {
            this.colSpan = 2;
            this.lblColor = "white";
        } else {
            this.colSpan = 3;
            this.lblColor = "black";
        }
    }

    onCancel() {
        this.isEditMode = false;
        this.colSpan = 3;
        this.lblColor = "black";
    }



}
