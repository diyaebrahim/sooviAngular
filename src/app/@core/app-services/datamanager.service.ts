import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Brand } from '../models/brand';
import { Category } from '../models/category';
import { Classification } from '../models/classification';
import { Feature } from '../models/feature';
import { Grade } from '../models/grade';


@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  

  private getBrandsPath = environment.commonUrl + 'Product/GetBrands';
  private getGradesPath = environment.commonUrl + 'Product/GetGrades';
  private getCategoriesPath = environment.commonUrl + 'Product/GetCategories';
  private getFeaturesPath = environment.commonUrl + 'Product/GetFeatures';
  private getClassificationsPath = environment.commonUrl + 'Product/GetClassifications';
  private addOrUpdateGradePath = environment.apiUrl + 'DataManager/addOrUpdateGrade';
  private addOrUpdateBrandPath = environment.apiUrl + 'DataManager/addOrUpdateBrand';
  private addOrUpdateCategoryPath = environment.apiUrl + 'DataManager/addOrUpdateCategory';
  private addOrUpdateClassificationPath = environment.apiUrl + 'DataManager/AddOrUpdateClassification';

  constructor(private http: HttpClient) { }

  
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.getBrandsPath);
  }
  getClassifications() :Observable<Classification[]> {
    return this.http.get<Classification[]>(this.getClassificationsPath);
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
  addOrUpdateGrade(model:Grade): Observable<any> {
    const formData = new FormData();
    formData.append('id', model.id.toString());
    formData.append('image', model.image);
    formData.append('title', model.title);
    return this.http.post<any>(this.addOrUpdateGradePath,model);
  }
  addOrUpdateBrand(model:Brand): Observable<any> {
    const formData = new FormData();
    formData.append('id', model.id.toString());
    formData.append('image', model.image);
    formData.append('arabicTitle', model.arabicTitle);
    formData.append('englishTitle', model.englishTitle);
    formData.append('hide', model.hide.toString());
    return this.http.post<any>(this.addOrUpdateBrandPath,model);
  }
  addOrUpdateCategory(model:Category): Observable<any> {
    const formData = new FormData();
    formData.append('id', model.id.toString());
    formData.append('image', model.image);
    formData.append('arabicTitle', model.arabicTitle);
    formData.append('englishTitle', model.englishTitle);
    formData.append('hide', model.hide.toString());
    return this.http.post<any>(this.addOrUpdateCategoryPath,model);
  }
  addOrUpdateClassification(model:Classification): Observable<any> {
    const formData = new FormData();
    formData.append('id', model.id.toString());
    formData.append('image', model.image);
    formData.append('title', model.title);
    formData.append('hide', model.hide.toString());
    return this.http.post<any>(this.addOrUpdateClassificationPath,model);
  }
}
