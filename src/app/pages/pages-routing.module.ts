import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ProductComponent } from './dashboard/product/product/product.component';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'product/product',
        component: ProductComponent
      },
      {
        path: 'product/product/:id',
        component: ProductComponent
      }
    ],
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
