import { IonInput, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { timer } from 'rxjs';

import { PhotoService } from './../../../shared/services/photo.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.scss'],
})
export class AddProductoComponent implements OnInit {

  @ViewChild('input', { static: false}) input: IonInput;
  formProduct: FormGroup
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public photoService: PhotoService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.formProduct = this.fb.group({
      foto: [''],
      fecha_oferta: [''],
      precio_oferta: [''],
      activo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      promocion: ['', Validators.minLength(4)],
      precio_regular: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  onSubmit = () => {
    this.isLoading = true;
    timer(1500).subscribe(() => {
      this.isLoading = false;
    })
  }


  onPhoto = () => this.photoService.captureImage();
  onPhotoRemove = () => this.photoService.photos = [];
  close = () => this.modalCtrl.dismiss();

}
