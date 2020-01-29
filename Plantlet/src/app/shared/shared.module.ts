import {NgModule} from "@angular/core";
import {ActionBarComponent} from "~/app/shared/ui/action-bar/action-bar.component";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {NativeScriptRouterModule} from "nativescript-angular";


@NgModule({
    imports: [
      NativeScriptCommonModule,
      NativeScriptRouterModule
    ],
    declarations: [ActionBarComponent],
    exports: [ActionBarComponent]
})
export class SharedModule {

}
