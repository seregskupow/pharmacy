import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreLayoutComponent } from './layouts/store-layout/store-layout.component';

const routes: Routes = [
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
