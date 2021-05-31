import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../../@core/models/product';

@Component({
  selector: 'app-product-cell',
  templateUrl: './product-cell.component.html',
  styleUrls: ['./product-cell.component.scss']
})
export class ProductCellComponent implements OnInit {

  constructor() { }
  @Input() product: Product;
  ngOnInit() {
  }

}
