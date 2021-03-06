import { NgModule } from '@angular/core';
import { NbActionsModule, NbAutocompleteModule, NbBadgeModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbMenuModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ProductBasicInfoComponent } from './dashboard/product/product-controls/product-basic-info/product-basic-info.component';
import { ProductCellComponent } from './dashboard/product/product-helper-components/product-cell/product-cell.component';
import { ProductComponent } from './dashboard/product/product/product.component';
import { FormsModule } from '@angular/forms';
import { BrandsComponent } from './dashboard/data-manager/brands/brands.component';
import { GradesComponent } from './dashboard/data-manager/grades/grades.component';
import { CategoriesComponent } from './dashboard/data-manager/categories/categories.component';
import { ClassificationsComponent } from './dashboard/data-manager/classifications/classifications.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbInputModule,
    NbListModule,
    NbUserModule,
    NbSelectModule,
    NbCardModule,
    ThemeModule,
    NbUserModule,
    NbListModule,
    NbSpinnerModule,
    NbButtonModule,
    NbIconModule,
    NbActionsModule,
    NbInputModule,
    NbBadgeModule,
    NbFormFieldModule,
    NbAutocompleteModule,
    NbDatepickerModule,
    FormsModule,
    NbCheckboxModule,
    NbRadioModule,
  ],
  declarations: [
    PagesComponent,
    ProductComponent, ProductBasicInfoComponent, ProductCellComponent, BrandsComponent, GradesComponent, CategoriesComponent, ClassificationsComponent
  ],
})
export class PagesModule {
}
