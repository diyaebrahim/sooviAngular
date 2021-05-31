import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { ProductService } from "../../../../../@core/app-services/product.service";
import { AddProductModel } from "../../../../../@core/models/addProductModel";
import { Brand } from "../../../../../@core/models/brand";
import { Category } from "../../../../../@core/models/category";
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
  loaded: boolean = false;
  grades: Grade[] = new Array();
  brands: Brand[] = new Array();
  categories: Category[] = new Array();
  loading: boolean = false;
  createdAt: string;
  updatedAt: string;
  selectedProductType: string;
  addOrUpdateModel: AddProductModel = new AddProductModel();
  constructor(
    private productService: ProductService,
    private datepipe: DatePipe,
    private toastrService: NbToastrService
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
}
