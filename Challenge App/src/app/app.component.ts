import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef, ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import { UIService } from './shared/ui.service';

@Component({
  selector: 'ns-app',
  moduleId: module.id,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
  activeChallenge = '';
  private drawerSub: Subscription;
  private drawer: RadSideDrawer;

  constructor(
    private uiService: UIService,
    private changeDetectionRef: ChangeDetectorRef,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.drawerSub = this.uiService.drawerState.subscribe(() => {
      if (this.drawer) {
        this.drawer.toggleDrawerState();
      }
    });
    this.uiService.setRootVCRef(this.vcRef);
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;

    this.changeDetectionRef.detectChanges();
  }

  onChallengeInput(challengeDescription: string) {
    this.activeChallenge = challengeDescription;
    console.log('onChallengeInput: ', challengeDescription);
  }

  onLogout() {
    this.uiService.toggleDrawer();
  }

  ngOnDestroy() {
    if (this.drawerSub) {
      this.drawerSub.unsubscribe();
    }
  }
}
