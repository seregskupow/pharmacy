import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreLayoutComponent } from './layouts/store-layout/store-layout.component';
import { StoreRoutingModule } from './store-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SharedModule } from 'primeng/api';
import { UserBtnComponent } from './components/user-btn/user-btn.component';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { MegaMenuModule } from 'primeng/megamenu';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [StoreLayoutComponent, UserBtnComponent],
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
  ],
})
export class StoreModule {}
