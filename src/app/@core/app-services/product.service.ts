import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddProductModel } from '../models/addProductModel';
import { Brand } from '../models/brand';
import { Category } from '../models/category';
import { Feature } from '../models/feature';
import { Grade } from '../models/grade';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private getBrandsPath = environment.commonUrl + 'Product/GetBrands';
  private getGradesPath = environment.commonUrl + 'Product/GetGrades';
  private getCategoriesPath = environment.commonUrl + 'Product/GetCategories';
  private getFeaturesPath = environment.commonUrl + 'Product/GetFeatures';
  private getProductsByBrandPath = environment.commonUrl + 'Product/getProductsByBrand?brandId=';
  private getProductsByCategoryPath = environment.commonUrl + 'Product/getProductsByCategory?categoryId=';
  private searchForProductPath = environment.commonUrl + 'Product/searchForProduct?search=';
  private addProductPath = environment.commonUrl + 'Product/addOrUpdateProduct';
  

  constructor(private http: HttpClient) { }

  
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.getBrandsPath);
  }
  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.getGradesPath);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.getCategoriesPath);
  }
  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(this.getFeaturesPath);
  }
  getProductsByBrand(brandId:number): Observable<any> {
    return this.http.get<any>(this.getProductsByBrandPath+brandId);
  }
  getProductsByCategory(categoryId:number): Observable<any> {
    return this.http.get<any>(this.getProductsByCategoryPath+categoryId);
  }
  searchForProduct(search:string, page:number): Observable<any> {
    return this.http.get<any>(this.searchForProductPath+search+'&page='+page);
  }
  addOrUpdateProduct(model:AddProductModel): Observable<any> {
    return this.http.post<any>(this.addProductPath,model);
  }

}
