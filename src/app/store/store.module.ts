import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreLayoutComponent } from './layouts/store-layout/store-layout.component';
import { StoreRoutingModule } from './store-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { UserBtnComponent } from './components/user-btn/user-btn.component';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { MegaMenuModule } from 'primeng/megamenu';
import { CarouselModule } from 'primeng/carousel';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './pages/cart/cart.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SearchComponent } from './pages/search/search.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    StoreLayoutComponent,
    UserBtnComponent,
    HomeComponent,
    ProductComponent,
    CategoryComponent,
    FooterComponent,
    CartComponent,
    FavouritesComponent,
    OrdersComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    SharedModule,
    MenuModule,
    RippleModule,
    DividerModule,
    BadgeModule,
    MegaMenuModule,
    CarouselModule,
    CardModule,
    PaginatorModule,
    ConfirmPopupModule,
    DropdownModule,
    SliderModule,
    CheckboxModule,
    DataViewModule,
    RatingModule,
    PanelModule,
    DialogModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class StoreModule {}
