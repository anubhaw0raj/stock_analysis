import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'closeprice',
        loadChildren: () =>
          import('./views/closeprice/closeprice.module').then((m) => m.ClosepriceModule)
      },
      {
        path: 'date',
        loadChildren: () =>
          import('./views/dateprice/dateprice.module').then((m) => m.DatepriceModule)
      },
      {
        path: 'highlow',
        loadChildren: () =>
          import('./views/hl/hl.module').then((m) => m.HlModule)
      }
    ]
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      useHash: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
