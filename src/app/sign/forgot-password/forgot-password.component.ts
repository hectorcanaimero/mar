import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IonInput, NavController } from '@ionic/angular';
import { timer } from 'rxjs';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../sign.page.scss'],
})

export class ForgotPasswordComponent implements OnInit, AfterViewInit {

  @ViewChild('input', { static: false}) input: IonInput;
  formAuth: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.formAuth = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngAfterViewInit() {
    timer(200).subscribe(() => this.input.setFocus());
  }
  onSubmit = () => {
    if (this.formAuth.invalid) return;
    console.log(this.formAuth.value);
  }

  onSignIn = () => this.navCtrl.navigateForward('/access/sign-in')

}
