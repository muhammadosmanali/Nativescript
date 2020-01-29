import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {CommunityComponent} from "~/app/plantlet/community/community.component";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {NativeScriptRouterModule} from "nativescript-angular";
import {SharedModule} from "~/app/shared/shared.module";
import {PostComponent} from "~/app/plantlet/community/post/post.component";

@NgModule({
    declarations: [CommunityComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {path: '', component: CommunityComponent}
        ]),
        SharedModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CommunityModule {

}
