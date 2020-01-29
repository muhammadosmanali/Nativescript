import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {TextField} from "tns-core-modules/ui/text-field";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RouterExtensions} from "nativescript-angular/router";
import {alert} from "tns-core-modules/ui/dialogs";
import {AuthService} from "~/app/auth/auth.service";


@Component({
    selector: 'ns-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    moduleId: module.id,
})

export class AuthComponent implements OnInit{
    @ViewChild("usernameEl") usernameEl: ElementRef<TextField>;
    @ViewChild("passwordEl") passwordEl: ElementRef<TextField>;
    @ViewChild("emailEl") emailEl: ElementRef<TextField>;

    form: FormGroup;
    usernameControlIsValid = true;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLogin = true;
    isLoading = false;


    constructor(private router: RouterExtensions,
                private authService: AuthService) {}

    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl(null, {updateOn: 'blur', validators: [Validators.required]}),
            email: new FormControl(null, {updateOn: 'blur', validators: [Validators.required, Validators.email]}),
            password: new FormControl(null, {updateOn: 'blur', validators: [Validators.required, Validators.minLength(6)]})
        });

        this.form.get('username').statusChanges.subscribe(status => {
            this.usernameControlIsValid = status === 'VALID';
        });

        this.form.get('email').statusChanges.subscribe(status => {
            this.emailControlIsValid = status === 'VALID';
        });
        this.form.get('password').statusChanges.subscribe(status => {
            this.passwordControlIsValid = status === 'VALID';
        });

    }

    onSubmit() {
        this.usernameEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();

        if(!this.form.get('email').valid && !this.form.get('password').valid) {
            return;
        }
        const username = this.form.get('username').value;
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        this.form.reset();
        this.usernameControlIsValid = true;
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
        this.isLoading = true;
        if(this.isLogin) {
            console.log('Logging in...')
            this.authService.login(username, password).subscribe(resData => {
                this.isLoading = false;
                this.router.navigate(['/plantlet/tabs']);
            }, error => {
                console.log(error);
                this.isLoading = false;
            });
        } else {
            console.log('Signing up...')
            this.authService.signUp(username, email, password).subscribe(resData => {
                console.log(resData);
                alert(resData["message"]);
                this.isLoading = false;
            }, error => {
                console.log(error);
                this.isLoading = false;
            });
        }
        console.log(username, email, password);
        // Usman muausman111@gmail.com usman456
    }

    onDone() {
        this.usernameEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
    }

    onSwitch() {
        this.isLogin = !this.isLogin;
        this.form.reset();
        this.usernameControlIsValid = true;
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
    }

}
