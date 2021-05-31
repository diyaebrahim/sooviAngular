import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../@core/app-services/product.service";
import { Product } from "../../../../@core/models/product";

@Component({
  selector: "ngx-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  product: Product;
  isProductSelected: boolean = false;
  getProductsloading: boolean = false;
  products: Array<Product>;
  productsPage: number = 0;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {}

  search(text: string) {
    if (text.length >= 3) {
      this.getProductsloading = true;
      this.productService.searchForProduct(text, this.productsPage).subscribe((data) => {
        this.products = data.pageElements;
        this.getProductsloading = false;
      });
    }
  }

  selectProduct(selected: Product) {
    this.product = selected;
    this.isProductSelected = true;
  }
  reset() {
    this.product = null;
    this.isProductSelected = false;
    this.getProductsloading = false;
    this.products = new Array();
  }
}
