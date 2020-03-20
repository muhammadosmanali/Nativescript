import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {ChallengesRoutingModule} from "~/app/challenges/challenges-routing.module";
import {SharedModule} from "~/app/shared/shared.module";
import {ChallengeTabsComponent} from "~/app/challenges/challenge-tabs/challenge-tabs.component";
import {ChallengeActionsModule} from "~/app/challenges/challenge-actions/challenge-actions.module";
import {ChallengesService} from "~/app/challenges/challenges.service";

@NgModule({
    declarations: [
        ChallengeTabsComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        ChallengesRoutingModule,
        SharedModule,

    ],
    exports: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengesModule {

}
