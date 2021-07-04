import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { DataManagerService } from "../../../../../@core/app-services/datamanager.service";
import { ProductService } from "../../../../../@core/app-services/product.service";
import { AddProductModel } from "../../../../../@core/models/addProductModel";
import { Brand } from "../../../../../@core/models/brand";
import { Category } from "../../../../../@core/models/category";
import { Classification } from "../../../../../@core/models/classification";
import { Feature } from "../../../../../@core/models/feature";
import { Grade } from "../../../../../@core/models/grade";
import { Product } from "../../../../../@core/models/product";

@Component({
  selector: "product-basic-info",
  templateUrl: "./product-basic-info.component.html",
  styleUrls: ["./product-basic-info.component.scss"],
})
export class ProductBasicInfoComponent implements OnInit {
  private _product: Product;
  public gettingData: boolean = true;
  @Input() set product(value: Product) {
    this._product = value;
    if (value != null) {
      this.loaded = true;
    }
  }
  get product(): Product {
    return this._product;
  }
  newFeature: Feature=new Feature();
  loaded: boolean = false;
  grades: Grade[];
  brands: Brand[];
  categories: Category[];
  loading: boolean = true;
  createdAt: string;
  updatedAt: string;
  selectedProductType: string;
  features: Feature[];
  filteredFeatures: Feature[];
  classifications:Classification[];
  addOrUpdateModel: AddProductModel = new AddProductModel();
  constructor(
    private productService: ProductService,
    private dataService: DataManagerService,
    private toastrService: NbToastrService,
    private dialogService :NbDialogService
  ) {
    this.productService.getBrands().subscribe((data) => {
      this.brands = data;
    });
    this.productService.getGrades().subscribe((data) => {
      this.grades = data;
    });
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.dataService.getClassifications().subscribe(data=>{
      this.classifications = data;
    });
    this.productService.getFeatures().subscribe((data) => {
      this.features = data;
      this.features.forEach(element => {
        if(!this.product.features.find(f=>f.id==element.id)){
            this.filteredFeatures.push(element);
        }
      });
      this.loading = false;
    });
  }

  ngOnInit() {}

  saveChanges() {
    this.addOrUpdateModel.brandId = this.product.brand.id;
    this.addOrUpdateModel.categoryId = this.product.category.id;
    this.addOrUpdateModel.description = this.product.description;
    this.addOrUpdateModel.features = this.product.features.map(({ id }) => id);
    this.addOrUpdateModel.gradeId = this.product.grade.id;
    this.addOrUpdateModel.price = this.product.price;
    this.addOrUpdateModel.classificationId = this.product.classification.id;
    this.addOrUpdateModel.id = this.product.id;
    this.addOrUpdateModel.title = this.product.productName;
    console.log(this.addOrUpdateModel);
    this.productService
      .addOrUpdateProduct(this.addOrUpdateModel)
      .subscribe((data) => {
        if (data.isSucceed == true) {
          this.toastrService.show(
            "Product Info Updated Successfully",
            "Updated",
            { status: "success", duration: 5000 }
          );
        }
      });
  }
  uploadFile(files){
    if(files.length != 0){
      this.addOrUpdateModel.image = files[0];
    }
  }
  addFeature(ref) {
    ref.close();
    this.product.features.push(this.newFeature);
    this.filteredFeatures = new Array();
    this.features.forEach(element => {
      if(!this.product.features.find(f=>f.id==element.id)){
          this.filteredFeatures.push(element);
      }
    });
  }
  deleteFeature(feature:Feature){
    const index = this.product.features.indexOf(feature, 0);
    if (index > -1) {
      this.product.features.splice(index, 1);
      this.filteredFeatures.push(feature);
    }
  }
  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
}
