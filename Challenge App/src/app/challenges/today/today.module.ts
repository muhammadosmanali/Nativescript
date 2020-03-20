import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {TodayComponent} from "~/app/challenges/today/today.component";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {NativeScriptRouterModule} from "nativescript-angular";
import {SharedModule} from "~/app/shared/shared.module";
import {ChallengesModule} from "~/app/challenges/challenges.module";
import {ChallengeActionsComponent} from "~/app/challenges/challenge-actions/challenge-actions.component";
import {ChallengeActionsModule} from "~/app/challenges/challenge-actions/challenge-actions.module";


@NgModule({
    declarations: [
        TodayComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {path: '', component: TodayComponent}
        ]),
        SharedModule,
        ChallengeActionsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TodayModule {

}
