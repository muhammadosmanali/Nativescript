import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {AuthComponent} from "~/app/auth/auth.component";
import {NativeScriptFormsModule, NativeScriptRouterModule} from "nativescript-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {SharedModule} from "~/app/shared/shared.module";


@NgModule({
    declarations: [AuthComponent],
    imports: [
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptCommonModule,
        SharedModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {path: '', component: AuthComponent}
        ])

    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {

}
