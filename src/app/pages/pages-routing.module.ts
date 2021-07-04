import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ProductComponent } from './dashboard/product/product/product.component';
import { BrandsComponent } from './dashboard/data-manager/brands/brands.component';
import { CategoriesComponent } from './dashboard/data-manager/categories/categories.component';
import { ClassificationsComponent } from './dashboard/data-manager/classifications/classifications.component';
import { GradesComponent } from './dashboard/data-manager/grades/grades.component';
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
      },
      {
        path: 'brands',
        component: BrandsComponent
      }
      ,
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'classifcations',
        component: ClassificationsComponent
      }
      ,
      {
        path: 'grades',
        component: GradesComponent
      }
    ],
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
