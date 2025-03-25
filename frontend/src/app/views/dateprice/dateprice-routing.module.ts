import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatepriceComponent } from './dateprice.component';

const routes: Routes = [
  {
    path: '',
    component: DatepriceComponent,
    data: {
      title: $localize`DatePrice`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatepriceRoutingModule {
}
