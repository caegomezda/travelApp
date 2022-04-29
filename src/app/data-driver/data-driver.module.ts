import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataDriverPageRoutingModule } from './data-driver-routing.module';

import { DataDriverPage } from './data-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataDriverPageRoutingModule
  ],
  declarations: [DataDriverPage]
})
export class DataDriverPageModule {}
