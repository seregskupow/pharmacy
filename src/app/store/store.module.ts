import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreLayoutComponent } from './layouts/store-layout/store-layout.component';
import { StoreRoutingModule } from './store-routing.module';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [StoreLayoutComponent],
  imports: [CommonModule, StoreRoutingModule, ClarityModule],
})
export class StoreModule {}
