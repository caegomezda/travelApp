import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataDriverPage } from './data-driver.page';

const routes: Routes = [
  {
    path: '',
    component: DataDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataDriverPageRoutingModule {}
