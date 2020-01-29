import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import {SharedModule} from "~/app/shared/shared.module";
import {NativeScriptFormsModule} from "nativescript-angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        NativeScriptModule,
        AppRoutingModule,
        SharedModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
