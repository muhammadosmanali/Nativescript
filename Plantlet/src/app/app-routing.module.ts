import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import {AuthGuard} from "~/app/auth/auth.guard";


const routes: Routes = [
    {path: 'auth', loadChildren: '~/app/auth/auth.module#AuthModule'},
    {path: 'plantlet', loadChildren: '~/app/plantlet/plantlet.module#PlantletModule', canLoad: [AuthGuard]},
    {path: '', redirectTo: '/plantlet/tabs', pathMatch: 'full'}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
