import {CanLoad, Route, UrlSegment} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "~/app/auth/auth.service";
import {Observable, of} from "rxjs";
import {switchMap, take, tap} from "rxjs/internal/operators";
import {RouterExtensions} from "nativescript-angular/router";

@Injectable()
export class AuthGuard implements CanLoad{
    constructor(private authService: AuthService,
                private router: RouterExtensions) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.user.pipe(take(1),
            switchMap(currentUser => {
                if(!currentUser || !currentUser.accessToken) {
                    return this.authService.autoLogin();
                }
                return of(true);
            }),
            tap(isAuth => {
                if(!isAuth) {
                    this.router.navigate(['/auth']);
                }
            })
        );
    }
}
