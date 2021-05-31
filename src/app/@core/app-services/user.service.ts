import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceData {

  private getUserNamePath = environment.commonUrl + 'identity/GetUserName';

  constructor(private http: HttpClient) { }

  getUserName(): Observable<any> {
    return this.http.get<any>(this.getUserNamePath);
  }
}
