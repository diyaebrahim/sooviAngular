import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private getSystemAccessPath = environment.commonUrl + 'Identity/GetSystemAccess?systemId=';

  constructor(private http: HttpClient) { }

  // getSystemAccess(systemId: number) : Observable<SystemAccess[]> {
  //   return this.http.get<SystemAccess[]>(this.getSystemAccessPath + systemId);
  // }
}
