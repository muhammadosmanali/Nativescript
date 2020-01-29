import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {YouComponent} from "~/app/plantlet/you/you.component";
import {NativeScriptRouterModule} from "nativescript-angular";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {SharedModule} from "~/app/shared/shared.module";

@NgModule({
    declarations: [YouComponent],
    imports: [
        NativeScriptRouterModule,
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild([
            {path: '', component: YouComponent}
        ]),
        SharedModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class YouModule {

}
