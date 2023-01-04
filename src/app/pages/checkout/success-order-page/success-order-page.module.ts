import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessOrderPageRoutingModule } from './success-order-page-routing.module';
import { SuccessOrderPageComponent } from './success-order-page.component';


@NgModule({
  declarations: [
    SuccessOrderPageComponent
  ],
  imports: [
    CommonModule,
    SuccessOrderPageRoutingModule
  ]
})
export class SuccessOrderPageModule { }
