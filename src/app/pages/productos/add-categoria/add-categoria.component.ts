import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonInput, ModalController } from '@ionic/angular';
import { timer } from 'rxjs';

import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.scss'],
})

export class AddCategoriaComponent implements OnInit {

  @ViewChild('input', { static: false}) input: IonInput;
  formCategory: FormGroup;
  isLoading: boolean = false;

  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;


  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    public storage: StorageService,
    ) { }
    
  ngOnInit() {
    this.formCategory = this.fb.group({ foto: [''], nombre: [''] });
  }

  ionViewWillEnter() {
    timer(400).subscribe(() => this.input.setFocus());
  }

  uploadImage = (e: any) => {
    console.log(e.target.files);
    if (e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        const extension = e.target.files[i].name.split('.').pop()
        this.nombreArchivo = `${new Date().getTime()}.${extension}`;
        this.datosFormulario.delete('foto');
        this.datosFormulario.append('foto', e.target.files[i], e.target.files[i].name)
      }
    }
  };
  
  onSubmit = () => {
    this.isLoading = true;
    console.log(this.nombreArchivo);
    let file = this.datosFormulario.get('foto');
    let ref = this.storage.referenciaCloudStorage(this.nombreArchivo);
    let task = this.storage.tareaCloudStorage(this.nombreArchivo, file);
    task.percentageChanges().subscribe((res) => {
      this.porcentaje = Math.round(res) / 100;
      console.log(this.porcentaje);
      if (this.porcentaje === 1) {
        this.finalizado = true;
        ref.getDownloadURL().subscribe((URL) => this.URLPublica = URL);
      }
    });
    this.isLoading = false;
  }


  close = () => this.modalCtrl.dismiss();

}
