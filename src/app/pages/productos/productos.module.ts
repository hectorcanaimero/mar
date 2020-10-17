import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPage } from './productos.page';
import { ProductosPageRoutingModule } from './productos-routing.module';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { ComponentsModule } from './../../shared/components/components.module';
import { AddCategoriaComponent } from './add-categoria/add-categoria.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    ProductosPageRoutingModule
  ],
  declarations: [ProductosPage, AddProductoComponent, AddCategoriaComponent],
  entryComponents: [AddProductoComponent, AddCategoriaComponent]
})
export class ProductosPageModule {}
