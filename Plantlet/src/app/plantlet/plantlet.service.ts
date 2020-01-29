import {Injectable, OnInit} from "@angular/core";
import {AuthService} from "~/app/auth/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UrlService} from "~/app/shared/url.service";
import {switchMap, take, tap} from "rxjs/internal/operators";
import {of} from "rxjs";

declare var android: any;

@Injectable({
    providedIn: 'root'
})
export class PlantletService {
    constructor(private authService: AuthService,
                private http: HttpClient,
                private urlService: UrlService) {}



    fetchCurrentUser() {
        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                let headers = new HttpHeaders();
                headers = headers.set('Authorization', `Bearer ${currentUser.accessToken}`);
                if(!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get(
                    this.urlService.url + `/user/${currentUser.id}`,
                    {
                        headers: headers
                    }
                )
            }),
            tap(resData => {
                //console.log("loadUserData: ", resData);
            })
        )
    }

    onSelectImage() {

    }
}
