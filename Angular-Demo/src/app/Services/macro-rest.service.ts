import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class MacroRestService {

  constructor(private http: HttpClient) {
  }

  public RunMacro(macroName: string, paramName: string, paramValue: string): Promise<any>{
    const data = {
      MacroName: macroName,
      Parameters: [
        {
          Name: paramName,
          Value: '\"' + paramValue + '\"'
        }
      ]
    };

    return this.POST_macro(data).toPromise();
  }

  private POST_macro(data){
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };
    return this.http.post(`${BaseUrl}/Macros`, data, httpOptions);
  }
}
