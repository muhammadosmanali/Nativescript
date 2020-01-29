import {Component, Input} from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import {Page} from "tns-core-modules/ui/page";
import {UiService} from "~/app/shared/ui/ui.service";
import {isAndroid} from "platform";

declare var android: any;

@Component({
    selector: 'ns-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.css'],
    moduleId: module.id
})

export class ActionBarComponent {
    @Input() title: string;
    @Input() showBackButton = true;
    @Input() hasMenu = true;

    constructor(private router: RouterExtensions,
                private page: Page,
                private uiService: UiService) {}

    get android() {
        return isAndroid;
    }

    get canGoBack() {
        return this.router.canGoBack() && this.showBackButton;
    }

    onGoBack() {
        this.router.backToPreviousPage();
    }

    onLoadedActionBar() {
        if (isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const backButton = androidToolbar.getNavigationIcon();
            let color = "#171717";
            if(this.hasMenu) {
                color = "#ffffff";
            }
            if (backButton) {
                backButton.setColorFilter(
                    android.graphics.Color.parseColor(color),
                    (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
                );
            }
        }
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }
}
