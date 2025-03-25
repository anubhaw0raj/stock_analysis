import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClosepriceComponent } from './closeprice.component';

const routes: Routes = [
  {
    path: '',
    component: ClosepriceComponent,
    data: {
      title: $localize`Closeprice`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosepriceRoutingModule {
}
