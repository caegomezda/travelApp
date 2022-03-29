import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntermunicipalPage } from './intermunicipal.page';

const routes: Routes = [
  {
    path: '',
    component: IntermunicipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntermunicipalPageRoutingModule {}
