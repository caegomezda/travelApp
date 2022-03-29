import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntermunicipalPageRoutingModule } from './intermunicipal-routing.module';

import { IntermunicipalPage } from './intermunicipal.page';
import { ButtonModule } from '../components/button/button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ButtonModule,
    IntermunicipalPageRoutingModule
  ],
  declarations: [IntermunicipalPage]
})
export class IntermunicipalPageModule {}
