import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DataManagerService } from '../../../../@core/app-services/datamanager.service';
import { ToasterHelper } from '../../../../@core/app-services/toasterHelper';
import { Category } from '../../../../@core/models/category';

@Component({
  selector: 'ngx-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: Category[] = new Array();
  selectedCategory: Category = new Category();
  gettingCategories: boolean = true;
  savingCategory: boolean = false;
  constructor(
    private dataManger: DataManagerService,
    private toasterHelper: ToasterHelper,
    private dialogService: NbDialogService
  ) {
    this.getcategories();
  }
  getcategories() {
    this.dataManger.getCategories().subscribe((data) => {
      this.categories = data;
      this.gettingCategories = false;
    });
  }
  addOrUpdateCategory(ref) {
    this.savingCategory = true;
    this.dataManger.addOrUpdateCategory(this.selectedCategory).subscribe((data) => {
      if (data.isSucceed) {
        this.toasterHelper.showSaved(data.message);
        this.selectedCategory = data.responseObject;
        this.getcategories();
        ref.close();
      } else {
        this.toasterHelper.showError(data.message);
      }
      this.savingCategory = false;
    });
  }
  addCategory(dialog: TemplateRef<any>) {
    this.selectedCategory = new Category();
    this.selectedCategory.id = 0;
    this.dialogService.open(dialog);
  }
  editCategory(dialog: TemplateRef<any>, Category: Category) {
    this.selectedCategory = Category;
    this.dialogService.open(dialog);
  }
  uploadFile(files){
    if(files.length != 0){
      this.selectedCategory.image = files[0];
    }
  }
}
