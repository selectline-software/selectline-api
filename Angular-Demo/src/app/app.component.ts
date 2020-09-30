import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RestService} from './Services/rest.service';
import {JournalRestService} from './Services/journal-rest.service';
import {MacroRestService} from './Services/macro-rest.service';
import {ProductionRestService} from "./Services/production-rest.service";
import {ancestorWhere} from "tslint";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularExample';
  token: any;

  articleList: any[];
  customerList: any[];
  productionOrderList: any[];
  productionStepList: any[];

  articles: any[];
  customers: any[];
  selectedCustomer: any;
  selectedDocument: any;
  selectedArticle: any;
  selectedDocumentPosition: any;
  selectedJournal: any;
  selectedProdctionOrder: any;

  documentPositions: any[];

  fileToUpload: File = null;
  public loginFromGroup = new FormGroup({
    user: new FormControl('APIDemo'),
    password: new FormControl('Ap1Dem0'),
    appKey: new FormControl('App-Demo20191122')
  });
  currentDocumentKind: string;
  currentDocumentNumber: string;
  currentJournalIdendifier: string;
  selectedProductionStep: any;


  get UserName() { return this.loginFromGroup.get('user').value; }
  get Password() { return this.loginFromGroup.get('password').value; }
  get AppKey() { return this.loginFromGroup.get('appKey').value; }

  @ViewChild('selectState') selectState: ElementRef;

  constructor(private restService: RestService,
              private journalRestService: JournalRestService,
              private macroService: MacroRestService,
              private prodcutionService: ProductionRestService) {
  }


  async ngOnInit() {
    await this.RefreshArticlesAndCustomerList();
    console.log('this.customerList');
    console.log(this.customerList);
    await this.ReadProductionOrderList();
  }

  private async RefreshArticlesAndCustomerList() {
    this.articleList = await this.restService.GetArticles();
    this.customerList = await this.restService.GetCustomers();
  }

  async anmelden() {
    console.log('anmelden');
    this.token = await this.restService.Login(this.UserName, this.Password, 'MobileApi', this.AppKey);
    localStorage.setItem('loginId', this.token.AccessToken);
    await this.RefreshArticlesAndCustomerList();
    console.log('this.token');
    console.log(this.token);
  }

  async getArticles(){
    this.articles = await this.restService.GetArticles();
    console.log('this.articles');
    console.log(this.articles);
  }


  selectCustomer($event: MouseEvent, i: number) {
    this.selectedCustomer = this.customers[i];
    console.log('customer:');
    console.log(this.customers[i]);
  }

  async createDocument() {
    this.selectedDocument = await this.restService.AddDocument('R', this.selectedCustomer.Number);
    console.log('document');
    console.log(this.selectedDocument);
  }

  async addDocumentPosition() {
    this.selectedDocumentPosition = await this.restService.AddDocumentPosition(this.selectedDocument.documentKind, this.selectedDocument.documentNumber, this.selectedArticle.Number);
    this.documentPositions = await this.restService.GetDocumentPositions(this.selectedDocument.documentKind, this.selectedDocument.documentNumber);
    console.log('this.documentPositions');
    console.log(this.documentPositions);
  }

  async getCustomers() {
    this.customers = await this.restService.GetCustomers();
    console.log(this.customers);
  }

  async addJournal() {
    this.selectedJournal = await this.journalRestService.AddJournal(this.currentDocumentKind, this.currentDocumentNumber, 'asdf', 'test');
    this.currentJournalIdendifier = this.selectedJournal.JournalIdentifier;
  }

  async addAttachementToJournal() {
    this.selectedJournal = await this.journalRestService.AddAttachment(this.currentJournalIdendifier, this.fileToUpload, this.fileToUpload.name);
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0]
  }

  async printDocument() {
    await this.restService.PrintDocument(this.selectedDocument.documentKind, this.selectedDocument.documentNumber);
  }

  async runPrintMacro() {
    await this.macroService.RunMacro('SQL 3001', 'artikel', this.selectedArticle.Number);
  }

  async readProductionOrder() {
    this.productionStepList = await this.prodcutionService.GetProductionSteps(this.selectedProdctionOrder.ProductionOrderIdentifier);
  }

  private async ReadProductionOrderList() {
    this.productionOrderList = await this.prodcutionService.GetProductionOrders();
  }

  async changeStatus() {
    console.log('selectState');
    console.log(this.selectState.nativeElement.value);
    this.prodcutionService.SetProductionStepState(
      this.selectedProdctionOrder.ProductionOrderIdentifier,
      this.selectedProductionStep.ProductionStepIdentifier,
      this.selectState.nativeElement.value);
  }
}
