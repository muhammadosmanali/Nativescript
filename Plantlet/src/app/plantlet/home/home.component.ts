import {Component, OnDestroy} from "@angular/core";
import * as imagePicker from "nativescript-imagepicker";
import {TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse} from "nativescript-http-formdata";
import {alert} from "tns-core-modules/ui/dialogs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "~/app/auth/auth.service";
import {UrlService} from "~/app/shared/url.service";
import {Subscription} from "rxjs";


declare var android: any;

@Component({
    selector: 'ns-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    moduleId: module.id
})

export class HomeComponent implements OnDestroy{
    myImage: any;
    prediction;
    isLoading = false;
    private accessToken: string;
    private authSub: Subscription;

    constructor(private http: HttpClient,
                private authService: AuthService,
                private urlService: UrlService) {}

    onSelectImage() {
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
                that.myImage = selection[0]["_android"];
                let file: string = selection[0]["_android"];
                let name = file.substr(file.lastIndexOf("/") + 1);

                let item = selection[0];
                item.getImageAsync(async (image, error) => {
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
                        fileName: name,
                        parameterName: 'image'
                    };

                    params.push(param);
                    this.authSub = this.authService.user.subscribe(
                        resData => {
                            this.accessToken = resData["_accessToken"];
                        }
                    );
                    try {
                        this.isLoading = true;
                        const response: TNSHttpFormDataResponse = await fd.post(
                            this.urlService.url + "/upload/image",
                            params,
                            {
                                headers: {
                                    "Authorization": `Bearer ${this.accessToken}`
                                }
                            }
                        );
                        this.isLoading = false;
                        let res: string = response.body["message"];
                        this.prediction = res.split(",");
                        console.log(this.prediction);
                    }
                    catch (e) {
                        console.log(e);
                    }

                });
            }).catch(e => {
                console.log(e);
        });
    }

    ngOnDestroy(): void {
        if(this.authSub) {
            this.authSub.unsubscribe();
        }
    }
}


