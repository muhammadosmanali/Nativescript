import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular";
import {PlantletTabsComponent} from "~/app/plantlet/plantlet-tabs/plantlet-tabs.component";
import {PostComponent} from "~/app/plantlet/community/post/post.component";


const routes: Routes = [
    {path: 'tabs', component: PlantletTabsComponent, children: [
            {path: 'home', loadChildren: '~/app/plantlet/home/home.module#HomeModule', outlet: 'home'},
            {path: 'community', loadChildren: '~/app/plantlet/community/community.module#CommunityModule', outlet: 'community'},
            {path: 'you', loadChildren: '~/app/plantlet/you/you.module#YouModule', outlet: 'you'}
        ]},
    {path: 'post', component: PostComponent},
    {path: '', redirectTo: '/plantlet/tabs', pathMatch: 'full'}
]

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PlantletRoutingModule {

}
