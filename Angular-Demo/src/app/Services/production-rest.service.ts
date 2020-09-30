import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseUrl} from "./baseUrl";

@Injectable({
  providedIn: 'root'
})
export class ProductionRestService {

  constructor(private http: HttpClient) {
  }

  public GetProductionOrders(): Promise<any> {
    return this.GET_productionOrders().toPromise();
  }

  public GetProductionSteps(productionOrder: string): Promise<any>{
    return this.GET_productionSteps(productionOrder).toPromise();
  }

  public SetProductionStepState(productionOrder: string, productionStepIdentifier: string, state: number) {
    return this.PUT_productionStepState(productionOrder, productionStepIdentifier, state).toPromise();
  }

  private GET_productionOrders() {
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };
    return this.http.get(`${BaseUrl}/ProductionOrders`, httpOptions);
  }

  private GET_productionSteps(productionOrder: string) {
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };
    return this.http.get(`${BaseUrl}/ProductionOrders/${productionOrder}/ProductionSteps`, httpOptions);
  }

  private PUT_productionStepState(productionOrder: string, productionStepIdentifier: string, state: number) {
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };

    return this.http.put(`${BaseUrl}/ProductionOrders/${productionOrder}/ProductionSteps/${productionStepIdentifier}/ProductionStepState`,  state, httpOptions);
  }
}
