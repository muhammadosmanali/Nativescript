import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/internal/operators";
import {BehaviorSubject, of, throwError} from "rxjs";
import {alert} from "tns-core-modules/ui/dialogs";
import {UserModel} from "~/app/auth/user.model";
import {RouterExtensions} from "nativescript-angular/router";
import { setString, getString, hasKey, remove } from "tns-core-modules/application-settings"
import {UrlService} from "~/app/shared/url.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _user = new BehaviorSubject<UserModel>(null);
    private tokenExpirationTimer: number;

    constructor(private http: HttpClient,
                private router: RouterExtensions,
                private urlService: UrlService) {}

    get user() {
        return this._user.asObservable();
    }

    signUp(username: string, email: string, password: string) {
        return this.http.post(
            this.urlService.url + "/register",
            {
                username: username,
                email: email,
                password: password
            }
        ).pipe(catchError(errorRes => {
            this.handleError(errorRes.error.message);
            return throwError(errorRes);
        }));
    }

    login(username: string, password: string) {
        return this.http.post(
            this.urlService.url + "/login",
            {
                username: username,
                password: password
            }
        ).pipe(catchError(errorRes => {
            this.handleError(errorRes.error.message);
            return throwError(errorRes);
        }), tap(resData => {
            if(resData && resData['access_token']) {
                this.handleLogin(
                    resData['user_id'],
                    resData['access_token'],
                    resData['refresh_token'],
                    resData['expires_in']
                );
            }
        }));
    }

    logout() {
        this._user.next(null);
        remove('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.router.navigate(['/auth'], {clearHistory: true});
    }

    autoLogin() {
        if (!hasKey('userData')) {
            return of(false);
        }
        const userData: {
            id: string,
            _accessToken: string,
            _refreshToken: string,
            _tokenExpirationDate: string} = JSON.parse(getString('userData'));

        const loadedUser = new UserModel(
            userData.id,
            userData._accessToken,
            userData._refreshToken,
            new Date(userData._tokenExpirationDate)
        );
        console.log(loadedUser);
        if(loadedUser.isAuth) {
            this._user.next(loadedUser);
            this.autoLogout(loadedUser.timeToExpiry);
            return of(true);
        }
        return of(false);
    }

    autoLogout(expiryDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => this.logout, expiryDuration);
    }

    private handleLogin(userId: number, accessToken: string, refreshToken: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const id = userId.toString();
        const user = new UserModel(
            id,
            accessToken,
            refreshToken,
            expirationDate
        );
        setString('userData' ,JSON.stringify(user));
        this.autoLogout(user.timeToExpiry);
        this._user.next(user);
    }

    private handleError(errorMessage: string) {
        alert(errorMessage);
    }
}
