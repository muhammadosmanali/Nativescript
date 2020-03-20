import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {CurrentChallengeComponent} from "~/app/challenges/current-challenge/current-challenge.component";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {NativeScriptRouterModule} from "nativescript-angular";
import {SharedModule} from "~/app/shared/shared.module";


@NgModule({
    declarations: [CurrentChallengeComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {path: '', component: CurrentChallengeComponent}
        ]),
        SharedModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CurrentChallengeModule {

}
