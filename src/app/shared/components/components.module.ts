import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeadersComponent } from './headers/headers.component';



@NgModule({
  declarations: [HeadersComponent],
  exports: [HeadersComponent],
  entryComponents: [HeadersComponent],
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class ComponentsModule { }
