import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter} from "@angular/core";
import {AnimationCurve} from "tns-core-modules/ui/enums";
import { screen } from "platform";
import {RouterExtensions} from "nativescript-angular/router";
import {ActivatedRoute} from "@angular/router";
import {Page} from "tns-core-modules/ui/page";
import {PlantletService} from "~/app/plantlet/plantlet.service";
import {AuthService} from "~/app/auth/auth.service";


@Component({
    selector: 'ns-plantlet-bars',
    templateUrl: './plantlet-tabs.component.html',
    styleUrls: ['./plantlet-tabs.component.scss'],
    moduleId: module.id,
})

export class PlantletTabsComponent implements OnInit{
    isLoading = false;
    @ViewChild('tabHighlight') tabHighlight: ElementRef;
    selectedTab: number = 0;
    routLetName: string = "home";

    @ViewChild('image1') image1: ElementRef;
    @ViewChild('image2') image2: ElementRef;
    @ViewChild('image3') image3: ElementRef;

    @Output() tabSelected = new EventEmitter<number>();

    constructor(private router: RouterExtensions,
                private plantletService: PlantletService,
                private active: ActivatedRoute,
                private page: Page,
                private authService: AuthService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.plantletService.fetchCurrentUser().subscribe(
            res => {
                console.log(res);
                this.isLoading = false;
                this.loadTabRoutes();
            },
            err => {
                console.log(err);
                if(err.error["msg"] == "Token has expired") {
                    this.authService.logout();
                    console.log("log out");
                } else {
                    this.loadTabRoutes();
                }
                this.loadTabRoutes();
                this.isLoading = false;

            }
        );

        this.page.actionBarHidden = true;
    }

    private loadTabRoutes() {
        setTimeout(() => {
            this.router.navigate([
                {
                    outlets: {
                        home: ['home'],
                        community: ['community'],
                        you: ['you']
                    }
                }
            ],{
                relativeTo: this.active
            });
        }, 10);
    }

    selectTab(index: number) {
        if(index == 0) {
            this.routLetName = "home";
            this.router.navigate([
                {
                    outlets: {home: ['home']}

                }
            ]);
        } else if(index == 1) {
            this.routLetName = "community";
            this.router.navigate([
                {
                    outlets: {home: ['community']}

                }
            ]);
        } else {
            this.routLetName = "you";
            this.router.navigate([
                {
                    outlets: {home: ['you']}

                }
            ]);
        }
        let previousTab = this.selectedTab;
        if (index != this.selectedTab) {
            this.selectedTab = index;
            this.tabHighlight.nativeElement.animate({
                translate: { x: index * screen.mainScreen.widthDIPs / 3, y: 0 },
                curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
                duration: 300
            })
            this.animateCurrentImage(this.getImage(index));
            this.animatePreviousImage(this.getImage(previousTab));
            this.tabSelected.emit(this.selectedTab);
        }
    }

    getImage(index) {
        let currentImage;
        switch (index) {
            case 0:
                currentImage = this.image1;
                break;
            case 1:
                currentImage = this.image2;
                break;
            case 2:
                currentImage = this.image3;
                break;
            default:
                break;
        }
        return currentImage;
    }

    animateCurrentImage(arg: any) {
        arg.nativeElement.animate({
            scale: { x: 1.2, y: 1.2 },
            curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
            duration: 300
        });
    }

    animatePreviousImage(arg: any) {
        arg.nativeElement.animate({
            scale: { x: 1, y: 1 },
            curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
            duration: 300
        })
    }

}
