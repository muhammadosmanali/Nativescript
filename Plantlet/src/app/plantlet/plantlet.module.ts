import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptFormsModule, NativeScriptRouterModule} from "nativescript-angular";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {SharedModule} from "~/app/shared/shared.module";
import {PlantletTabsComponent} from "~/app/plantlet/plantlet-tabs/plantlet-tabs.component";
import {PlantletRoutingModule} from "~/app/plantlet/plantlet-routing.module";
import {YouComponent} from "~/app/plantlet/you/you.component";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import {PostComponent} from "~/app/plantlet/community/post/post.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        PlantletTabsComponent,
        PostComponent
    ],
    imports: [
        NativeScriptCommonModule,
        SharedModule,
        PlantletRoutingModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PlantletModule {

}
