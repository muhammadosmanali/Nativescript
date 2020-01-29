import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {RadSideDrawerComponent} from "nativescript-ui-sidedrawer/angular";
import {Subscription} from "rxjs";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import {UiService} from "~/app/shared/ui/ui.service";
import {AuthService} from "~/app/auth/auth.service";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;

    constructor(private uiService: UiService,
                private changeDetectionRef: ChangeDetectorRef,
                private vcRef: ViewContainerRef,
                private authService: AuthService) {}

    ngOnInit(): void {
        this.drawerSub = this.uiService.drawerState.subscribe(
            () => {
                if(this.drawer) {
                    this.drawer.toggleDrawerState();
                }
            }
        );
        this.uiService.setRootVCRef(this.vcRef);
    }

    ngAfterViewInit(): void {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy(): void {
        this.drawerSub.unsubscribe();
    }

    onLogout() {
        this.uiService.toggleDrawer();
        this.authService.logout();
    }
}
