import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BaseUrl} from './baseUrl';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalRestService {

  constructor(private http: HttpClient) {
  }

  public GetJournal(journalId: string): Promise<any>{
    return this.GET_journal(journalId).toPromise();
  }

  public AddJournal(documentKind: string, documentNumber: string, label:string, text: string): Promise<any>{
    const data = {
      Date: new Date(),
      Label: label,
      Text: text,
      JournalLinkInformation: {
        LinkType: 'document',
        DocumentType: documentKind,
        DocumentNumber: documentNumber
      }
    };

    return this.POST_journal(data).toPromise();
  }

  // public AddAttachment(journalId: string, imageAsBase64: string, filename: string): Promise<any> {
  public AddAttachment(journalId: string, file: File, filename: string): Promise<any> {
    return this.POST_Attachment(journalId, file, filename).toPromise();
  }

  private GET_journal(journalId: string) {
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };
    return this.http.get(`${BaseUrl}/Journals/${journalId}`, httpOptions);
  }

  private POST_journal(data) {
    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `LoginId ${loginId}`
      })
    };
    return this.http.post(`${BaseUrl}/Journals`, data, httpOptions);
  }

  private POST_Attachment(journalId: string, file: File, filename: string): Observable<any> {

    const loginId = localStorage.getItem('loginId');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `LoginId ${loginId}`
      })
    };

    const formData = new FormData();
    formData.append('file', file, filename);

    return this.http.post(`${BaseUrl}/journals/${journalId}/Attachments`, formData, httpOptions );
  }

}
