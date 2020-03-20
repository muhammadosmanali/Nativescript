import {NgModule} from "@angular/core";
import {NativeScriptRouterModule} from "nativescript-angular";
import {Routes} from "@angular/router";
import {ChallengeTabsComponent} from "~/app/challenges/challenge-tabs/challenge-tabs.component";

const routes: Routes = [
    {path: 'tabs', component: ChallengeTabsComponent, children: [
            { path: 'today', loadChildren: '~/app/challenges/today/today.module#TodayModule', outlet: 'today' },
            {path: 'current-challenge', loadChildren: '~/app/challenges/current-challenge/current-challenge.module#CurrentChallengeModule', outlet: 'currentChallenge'}
        ]},
    { path: ':mode', loadChildren: '~/app/challenges/challenge-edit/challenge-edit.module#ChallengeEditModule'},
    { path: '', redirectTo: '/challenges/tabs', pathMatch: 'full' }
]

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ChallengesRoutingModule {

}
