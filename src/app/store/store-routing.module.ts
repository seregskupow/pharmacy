import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { StoreLayoutComponent } from './layouts/store-layout/store-layout.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'category/:categoryslug',
        component: CategoryComponent,
      },
      {
        path: 'product/:productslug',
        component: ProductComponent,
      },
      {
        path: 'search/:searchslug',
        component: SearchComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'favourites',
        component: FavouritesComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
