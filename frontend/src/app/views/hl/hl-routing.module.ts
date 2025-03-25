import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HlComponent } from './hl.component';

const routes: Routes = [
  {
    path: '',
    component: HlComponent,
    data: {
      title: $localize`HighLowPrice`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HlRoutingModule {
}

