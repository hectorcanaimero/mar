import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IonInput, NavController } from '@ionic/angular';

import { timer } from 'rxjs';

import { PhotoService } from './../../shared/services/photo.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign.page.scss'],
})
export class SignUpComponent implements OnInit, AfterViewInit {

  @ViewChild('input', { static: false}) input: IonInput;
  formAuth: FormGroup;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    public photoService: PhotoService,
  ) { }

  ngOnInit() {
    this.formAuth = this.fb.group({
      nit: ['', [Validators.required]],
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      neighboord: ['', [Validators.required]],
      description: ['', [Validators.required]]
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

  onPhoto = () => this.photoService.captureImage();
  onPhotoRemove = () => this.photoService.photos = [];

  onSignIn = () => this.navCtrl.navigateForward('/access/sign-in')
}
