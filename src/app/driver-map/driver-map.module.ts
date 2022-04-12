import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverMapPageRoutingModule } from './driver-map-routing.module';

import { DriverMapPage } from './driver-map.page';
import { ButtonModule } from '../components/button/button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ButtonModule,
    DriverMapPageRoutingModule
  ],
  declarations: [DriverMapPage]
})
export class DriverMapPageModule {}
