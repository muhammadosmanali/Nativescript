import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextField} from "tns-core-modules/ui/text-field";

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id
})
export class AuthComponent implements OnInit {
  @ViewChild("usernameEl") usernameEl: ElementRef<TextField>;
  @ViewChild("passwordEl") passwordEl: ElementRef<TextField>;
  @ViewChild("emailEl") emailEl: ElementRef<TextField>;

  form: FormGroup;
  usernameControlIsValid = true;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  isLogin = true;


  constructor(private router: RouterExtensions) {}

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

  onSignin() {
    this.router.navigate(['/challenges/tabs'], { clearHistory: true });
  }

  onSubmit() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();

    // if(!this.form.valid) {
    //     //   return;
    //     // }
    const username = this.form.get('username').value;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.form.reset();
    this.usernameControlIsValid = true;
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;
    if(this.isLogin) {
      console.log('Logging in...')
      this.onSignin();
    } else {
      console.log('Signing up...')
    }
    console.log(username, email, password);
  }

  onDone() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
}
