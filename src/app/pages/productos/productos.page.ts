import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { timer } from 'rxjs';
import { AddCategoriaComponent } from './add-categoria/add-categoria.component';

import { AddProductoComponent } from './add-producto/add-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  segment: string = 'product';

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    const date = new Date().getTime()
    console.log(date);
  }


  onSearch = (e: any) => console.log(e.detail.value);

  
  onAddProducto = async() => {
    const modal = await this.modalCtrl.create({
      component: AddProductoComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
  onAddCategoria = async() => {
    const modal = await this.modalCtrl.create({
      component: AddCategoriaComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
  
  
  edit = (item: any) => console.log(item);
  offers = (item: any) => console.log(item);
  delete = (item: any) => console.log(item);
  
  doRefresh(event: any) {
    console.log('Begin async operation');
    timer(1500).subscribe(() => {
      console.log('Async operation has ended');
      event.target.complete();
    })
  }

  segmentChanged = (ev: any) => this.segment = ev.detail.value;
}
