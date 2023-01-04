import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessOrderPageComponent } from './success-order-page.component';

const routes: Routes = [{ path: '', component: SuccessOrderPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccessOrderPageRoutingModule { }
