import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { ProductService } from "../../../../../@core/app-services/product.service";
import { AddProductModel } from "../../../../../@core/models/addProductModel";
import { Brand } from "../../../../../@core/models/brand";
import { Category } from "../../../../../@core/models/category";
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
      console.log(this.product);
    }
  }
  get product(): Product {
    return this._product;
  }
  newFeature: Feature=new Feature();
  loaded: boolean = false;
  grades: Grade[] = new Array();
  brands: Brand[] = new Array();
  categories: Category[] = new Array();
  loading: boolean = false;
  createdAt: string;
  updatedAt: string;
  selectedProductType: string;
  features: Feature[] = new Array();
  filteredFeatures: Feature[] = new Array();
  addOrUpdateModel: AddProductModel = new AddProductModel();
  constructor(
    private productService: ProductService,
    private datepipe: DatePipe,
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
    this.productService.getFeatures().subscribe((data) => {
      this.features = data;
      this.features.forEach(element => {
        if(!this.product.features.find(f=>f.id==element.id)){
            this.filteredFeatures.push(element);
        }
      });
    });
  }

  ngOnInit() {}

  saveChanges() {
    this.addOrUpdateModel.brandId = this.product.brand.brandId;
    this.addOrUpdateModel.categoryId = this.product.category.id;
    this.addOrUpdateModel.description = this.product.description;
    this.addOrUpdateModel.features = this.product.features.map(({ id }) => id);
    this.addOrUpdateModel.gradeId = this.product.grade.id;
    this.addOrUpdateModel.image = this.product.image;
    this.addOrUpdateModel.price = this.product.price;
    this.addOrUpdateModel.title = this.product.productName;
    this.addOrUpdateModel.id = this.product.id;

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
