import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import * as imagePicker from "nativescript-imagepicker";
import {TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse} from "nativescript-http-formdata";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "~/app/auth/auth.service";
import {UrlService} from "~/app/shared/url.service";
import {Subscription} from "rxjs";
import {TextView} from "ui/text-view";
import {alert} from "tns-core-modules/ui/dialogs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

declare var android: any;

@Component({
    selector: "ns-post",
    templateUrl: "./post.component.html",
    styleUrls: ["./post.component.scss"],
    moduleId: module.id
})

export class PostComponent implements OnInit, OnDestroy{
    imageAddress: string;
    isLoading = false;

    private accessToken: string;
    private user_id;
    private imageName: string;

    private imageItem: any;
    private authSub: Subscription;

    private firstCond: boolean = true;
    private secondCond: boolean = false;
    private thirdCond: boolean = false;

    @ViewChild("desc") description: ElementRef<TextView>;
    form: FormGroup;

    constructor(private http: HttpClient,
                private authService: AuthService,
                private urlService: UrlService) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            description: new FormControl(null, {validators: [Validators.required]}),
        });

        this.authSub = this.authService.user.subscribe(
            resData => {
                this.accessToken = resData["_accessToken"];
                this.user_id = resData["id"];

            }
        );
    }

    onSelectPicture() {
        let that = this;
        let context = imagePicker.create({
            mode: "single"
        });
        context.authorize().then(
            () => {
                return context.present();
            }
        ).then(
            (selection) => {
                //that.myImage = selection[0]["_android"];
                this.imageAddress = selection[0]["_android"];
                let file: string = selection[0]["_android"];
                this.imageName = file.substr(file.lastIndexOf("/") + 1);
                this.imageItem = selection[0];
            }).catch(e => {
            console.log(e);
        });
    }

    onAddPost() {
        const desc = this.form.get('description').value.toString();
        const date = new Date().toString();
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${this.accessToken}`);
        const image = this.imageName.split('.').pop();
        console.log(this.imageName);

        if(this.firstCond == true) {
            this.http.post(
                this.urlService.url + "/post",
                {
                    "description": desc,
                    "likes": 0,
                    "dis_likes": 0,
                    "post_image": image,
                    "post_date": date
                },
                {
                    headers: headers
                }
            ).subscribe(
                resData => {
                    console.log(resData["message"]);
                }, error => {
                    console.log(error['message']);
                }
            );
            this.secondCond = true;
        }

        if(this.imageItem && this.secondCond == true) {
            this.imageItem.getImageAsync(async (image, error) => {
                let fd = new TNSHttpFormData();
                let params = [];
                let imageData: any;
                if(image) {
                    // @ts-ignore
                    let bitMapImage: android.graphics.Bitmap = image;
                    // @ts-ignore
                    let stream = new java.io.ByteArrayOutputStream();
                    bitMapImage.compress(android.graphics.Bitmap.CompressFormat.PNG, 100, stream);
                    let byteArray = stream.toByteArray();
                    bitMapImage.recycle();

                    imageData = byteArray;
                }
                let param: TNSHttpFormDataParam = {
                    data: imageData,
                    contentType: 'image/png',
                    fileName: this.imageName,
                    parameterName: 'image'
                };
                params.push(param);
                try {
                    const response: TNSHttpFormDataResponse = await fd.post(
                        this.urlService.url + "/upload/post",
                        params,
                        {
                            headers: {
                                "Authorization": `Bearer ${this.accessToken}`
                            }
                        }
                    );
                }
                catch (e) {
                    console.log(e);
                }

            });
            this.thirdCond = true;
        }

    }

    ngOnDestroy(): void {
        this.authSub.unsubscribe();
    }
}
