import {AfterViewInit, Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "~/app/shared/url.service";
import {AuthService} from "~/app/auth/auth.service";

export const ICON_LIKE = String.fromCharCode(0xf164);
export const ICON_DISLIKE = String.fromCharCode(0xf165);

class Post {
    constructor(public authorImg: string,
                public authorName: string,
                public color: string,
                public date: string,
                public title: string,
                public postImg: string,
                public likes: string,
                public comments: string,
                public repost: string) { }
}

@Component({
    selector: 'ns-community',
    templateUrl: './community.component.html',
    styleUrls: ['./community.component.scss'],
    moduleId: module.id
})

export class CommunityComponent implements OnInit{
    public posts: any;
    public iconLike = ICON_LIKE;
    public iconDisLike = ICON_DISLIKE;

    private user_id;
    private token;

    constructor(private router: RouterExtensions,
                private http: HttpClient,
                private urlService: UrlService,
                private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.user.subscribe(
            resData => {
                this.user_id = resData["id"];
                this.token = resData["_accessToken"];
            }
        );

        this.http.get(
            this.urlService.url + `/post/list/${this.user_id}`,
            {
                headers: {"Authorization": `Bearer ${this.token}`}
            }
        ).subscribe(resData => {
            this.posts = resData["posts"];
            console.log(this.posts[0]["post_image"]);
        });
    }

    onAddPost() {
        this.router.navigate(['plantlet/post']);
    }
}
