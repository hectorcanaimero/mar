import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, NavController } from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../sign.page.scss'],
})
export class SignInComponent implements OnInit, AfterViewInit {

  @ViewChild('input', { static: false}) input: IonInput;
  formAuth: FormGroup;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.formAuth = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    })
  }
  
  ngAfterViewInit() {
    timer(200).subscribe(() => this.input.setFocus());
  }

  onSubmit = () => {
    this.isLoading = true;
    timer(1500).subscribe(() => {
      // if (this.formAuth.invalid) return;
      console.log(this.formAuth.value);
      this.isLoading = false;
    });
  }

  onForgot = () => this.navCtrl.navigateForward('/access/forgot-password');
  onSignUp = () => this.navCtrl.navigateForward('/access/sign-up')
}
