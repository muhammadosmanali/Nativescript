import {Injectable} from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class UrlService {
    private URL: string =  "http://10.0.2.2:5000";

    get url() {
        return this.URL;
    }
}
