import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContacPageRoutingModule } from './contac-routing.module';

import { ContacPage } from './contac.page';
import { InputModule } from '../components/input/input.module';
import { ButtonModule } from '../components/button/button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputModule,
    ButtonModule,
    ContacPageRoutingModule
  ],
  declarations: [ContacPage]
})
export class ContacPageModule {}
