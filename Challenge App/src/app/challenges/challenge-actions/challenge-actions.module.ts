import {NgModule} from "@angular/core";
import {ChallengeActionsComponent} from "~/app/challenges/challenge-actions/challenge-actions.component";
import {NativeScriptCommonModule} from "nativescript-angular/common";

@NgModule({
    declarations: [
        ChallengeActionsComponent
    ],
    imports: [
        NativeScriptCommonModule
    ],
    exports: [
        ChallengeActionsComponent
    ]
})
export class ChallengeActionsModule {

}
