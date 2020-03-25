import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {log} from 'util';
import {BaseUrl} from './baseUrl';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  public Login(benutzername: string, passwort: string, loginKind: string, appKey: string): Promise<string> {
    return this.POST_login(benutzername, passwort, loginKind, appKey)
      .toPromise();
  }

  public GetArticles(): Promise<any[]> {
    return this.GET_articles()
      .toPromise();
  }

  public GetCustomers(): Promise<any[]> {
    return this.GET_customers()
      .toPromise();
  }

  public GetDocumentPositions(documentKind: string, documentNumber: string): Promise<any[]>{
    return this.GET_documentPositions(documentKind, documentNumber).toPromise();
  }

  public AddDocument(documentTyp: string, customer: string): Promise<any>{
    const data = {
      KindFlag: documentTyp,
      Address: { Number: customer }
    }
    return this.POST_document(data).toPromise();
  }

  public AddDocumentPosition(documentTyp: string, documentNmber: string, articleNumber: string): Promise<any>{
    const data = {
      PositionKind: 'A',
      ArticleNumber: articleNumber,
      CalculatedQuantityValue: 1,
      StoreInformation: [
        {
          Warehouse: 100,
          Quantity: 1,
        }
      ]
    }
    return this.POST_documentPosition(documentTyp, documentNmber, data).toPromise();
  }

  public PrintDocument(documentKind: string, documentNumber: string): Promise<any>{
    const data = {
      // NumberOfCopies: 1,
      MasterName: "!Blatt1"
    }
    console.log('data');
    console.log(data);
    return this.POST_documentPrint(documentKind, documentNumber, data).toPromise();
  }


  private POST_login(benutzername: string, passwort: string, loginKind: string, appKey: string): Observable<any> {

    return this.http
      .post(`${BaseUrl}/Login`, {
        UserName: benutzername,
        Password: passwort,
        LoginKind: loginKind,
        AppKey: appKey
      });
  }

  private GET_articles(): Observable<any[]> {
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };

    return this.http.get<any[]>(`${BaseUrl}/Articles`, httpOptions);
  };

  private GET_customers(): Observable<any[]> {
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };
    return this.http.get<any[]>(`${BaseUrl}/Customers`, httpOptions);
  }

  private POST_document(data): Observable<any[]>{
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };
    return this.http.post<any[]>(`${BaseUrl}/Documents`, data, httpOptions);
  }

  private POST_documentPosition(documentType: string, documentNumber: string, data): Observable<any>{
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };
    return this.http.post<any>(`${BaseUrl}/Documents/${documentType}${documentNumber}/Positions`, data, httpOptions);
  }

  private GET_documentPositions(documentKind: string, documentNumber: string) {
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };
    console.log(documentKind);
    console.log(documentNumber);
    return this.http.get<any[]>(`${BaseUrl}/Documents/${documentKind}${documentNumber}/Positions`, httpOptions);
  }

  private POST_documentPrint(documentKind: string, documentNumber: string, data){
      const loginId = localStorage.getItem('loginId');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `LoginId ${loginId}`
        })
      };
      return this.http.post<any>(`${BaseUrl}/Documents/${documentKind}${documentNumber}/Print`, data, httpOptions);
  }
}
