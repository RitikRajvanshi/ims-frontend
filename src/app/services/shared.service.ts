import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../environments/environment.dev';
import { environment } from '../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) { }


  getsupplierdata() {
    let url = environment.BASE_URL + environment.SHARED.GET_SUPPLIER_DATA;

    return this.httpClient.get(url);
  }

  getsupplierdatabyid(id: any) {
    let url = environment.BASE_URL + environment.SHARED.GET_SUPPLIER_DATA_BYID;

    return this.httpClient.post(url, id);

  }



  getUsersdatabystatus() {
    let url = environment.BASE_URL + environment.SHARED.GETUSERSDATABYSTATUS;

    return this.httpClient.get(url);
  }

  getUsersdatabyid(id: any) {
    let url = environment.BASE_URL + environment.SHARED.GETUSERSDATABYID;

    return this.httpClient.post(url, id);
  }

  getProductdata() {
    let url = environment.BASE_URL + environment.SHARED.GETPRODUCTDATA

    return this.httpClient.get(url);
  }

  //request

  getpendingRequest() {
    let url = environment.BASE_URL + environment.SHARED.GETPENDINGREQUEST;

    return this.httpClient.get(url);
  }

  getpendingRequestByid(id: any) {
    let url = environment.BASE_URL + environment.SHARED.GETPENDINGIREQUESTBYID;

    return this.httpClient.post(url, id);
  }

  getrejectedRequest() {
    let url = environment.BASE_URL + environment.SHARED.GETREJECTEDREQUEST;

    return this.httpClient.get(url);
  }

  getacceptedRequest() {
    let url = environment.BASE_URL + environment.SHARED.GETACCEPTEDREQUEST;

    return this.httpClient.get(url);
  }

  getPurchaseJoinData() {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEJOINDATA

    return this.httpClient.get(url);

  }

  getPurchaseJoinDatabyIdorpurchaseid(data: any) {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEJOINDATABYIDORPURCHASEID

    return this.httpClient.post(url, data);
  }

  getpurchasedatafromPurchaseOrder() {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEDATAFROMPURCHASEORDER

    return this.httpClient.get(url);

  }

  //admin ---> shared
  getsupplierdatabyname(name: any) {
    let url = environment.BASE_URL + environment.SHARED.GET_SUPPLIERDATABY_NAME;

    return this.httpClient.post(url, name);

  }

  getlastPurchaseid() {
    let url = environment.BASE_URL + environment.SHARED.GETLASTPURCHASEID

    return this.httpClient.get(url);

  }

  getpurchaseOrderdatabyPid(p_id: any) {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEORDERDATABYPID;

    return this.httpClient.post(url, p_id);
  }

  getpurchasedatafrompoacctoinvoice() {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEDATAFROMPOACCTOINVOICE

    return this.httpClient.get(url);
  }

  getpurchasedataforInvoice() {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEDATAFORINVOICE

    return this.httpClient.get(url);
  }


  getpurchasedatabyid(id: any) {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEJOINDATABYID

    return this.httpClient.post(url, id);
  }

  ////received date, inspection date, other column from invoice table(depreceated/dropped) table into purchase order
  getPurchaseJoinDatabyPid(id: any) {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEJOINDATABYPID

    return this.httpClient.post(url, id);
  }

  getPurchaseJoinDataby_id(id: any) {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEJOINDATABYID

    return this.httpClient.post(url, id);
  }

  getlastItemcode(data: any) {
    let url = environment.BASE_URL + environment.SHARED.GETLASTITEMCODEFROMITEM

    return this.httpClient.post(url, data);
  }

  //supplier_evaluation
  getsupplierjoindatafrompo(pid: any) {
    let url = environment.BASE_URL + environment.SHARED.GETSUPPLIERJOINDATAFROMPO

    return this.httpClient.post(url, pid);
  }

  getsupplierEvaluationdatabypid(pid: any) {
    let url = environment.BASE_URL + environment.SHARED.GETSUPPLIEREVALUATIONDATABYPID

    return this.httpClient.post(url, pid);
  }

  getsupplierEvaluationdatabysupplierId(supplierid: any) {
    let url = environment.BASE_URL + environment.SHARED.GETSUPPLIEREVALUATIONBYSUPPLIERID

    return this.httpClient.post(url, supplierid);
  }

  getvendorEvaluationjoindata() {
    let url = environment.BASE_URL + environment.SHARED.GETVENDOREVALUATIONJOINDATA

    return this.httpClient.get(url);
  }


  getitemsData() {
    let url = environment.BASE_URL + environment.SHARED.GETITEMSDATA

    return this.httpClient.get(url);
  }

  getCategorydata() {
    let url = environment.BASE_URL + environment.SHARED.GETCATEGORYDATA

    return this.httpClient.get(url);
  }

  getDocumentdata() {
    let url = environment.BASE_URL + environment.SHARED.GETDOCUMENTDATA

    return this.httpClient.get(url);
  }

  getDocumentdatabydocId(id: any) {
    let url = environment.BASE_URL + environment.SHARED.GETDOCUMENTDATABYDOCUMENTID

    return this.httpClient.post(url, id);
  }

  //quotation 

  getQuotationdata() {
    let url = environment.BASE_URL + environment.SHARED.GETQUOTATIONDATA

    return this.httpClient.get(url);
  }

  getQuotationdatabyId(id: any) {
    let url = environment.BASE_URL + environment.SHARED.GETQUOTATIONDATABYID

    return this.httpClient.post(url, id);
  }

  getpurchaseorderdata() {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEORDERDATA

    return this.httpClient.get(url);
  }

  //SEARCH AND FILTERS

  getsupplierdatabyDatefilter(data: any) {
    let url = environment.BASE_URL + environment.SHARED.GET_SUPPLIERDATA_BYDATEFILTER;

    return this.httpClient.post(url, data);

  }

  getpurchasejoinDatabydate(data: any) {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEJOINDATABYDATE;

    return this.httpClient.post(url, data);

  }

  getpurchaseorderDatabydate(data: any) {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEORDERDATABYDATE;

    return this.httpClient.post(url, data);

  }


  getsendpurchaseorderdata() {
    let url = environment.BASE_URL + environment.SHARED.GETSENDPURCHASEORDERDATA

    return this.httpClient.get(url);
  }

  getCountofreceiveorder() {
    let url = environment.BASE_URL + environment.SHARED.GETCOUNTOFRECEIVEDORDER

    return this.httpClient.get(url);
  }

  getCountofreceiverequest() {
    let url = environment.BASE_URL + environment.SHARED.GETCOUNTOFRECEIVEDREQUEST

    return this.httpClient.get(url);
  }

  getCountofPruchaseOrder(dates:object) {
    let url = environment.BASE_URL + environment.SHARED.GETCOUNTOFPURCHASEORDERS

    return this.httpClient.post(url, dates);
  }

  getpurchasedatathatareacceptorreject() {
    let url = environment.BASE_URL + environment.SHARED.GETPURCHASEDATACCEPTORREJECT

    return this.httpClient.get(url);
  }

  getSumofpurchaseOrderbyDate(data: any) {
    let url = environment.BASE_URL + environment.SHARED.GETSUMOFPURCHASEORDERSBYDATE

    return this.httpClient.post(url, data);
  }

  getCountofItemsbyDate(data: any) {
    let url = environment.BASE_URL + environment.SHARED.GETCOUNTOFITEMSBYDATE

    return this.httpClient.post(url, data);
  }


  getreportItemwithPrice() {
    let url = environment.BASE_URL + environment.SHARED.GETREPORTITEMWITHPRICE

    return this.httpClient.get(url);
  }

  getreportpendingStock() {
    let url = environment.BASE_URL + environment.SHARED.GETREPORTPENDINGSTOCK

    return this.httpClient.get(url);
  }


  getreportStockinhand() {
    let url = environment.BASE_URL + environment.SHARED.GETREPORTSTOCKINHAND

    return this.httpClient.get(url);
  }

  getfullassetbyDate(data: any) {
    let url = environment.BASE_URL + environment.SHARED.GETFULLASSETBYDATE

    return this.httpClient.post(url, data);
  }

  gettotalPriceandItemsfrompi() {
    let url = environment.BASE_URL + environment.SHARED.GETTOTALPRICEANDITEMSFROMPI

    return this.httpClient.get(url);
  }


  getCompanydata() {
    let url = environment.BASE_URL + environment.SHARED.GETCOMPANYDATA

    return this.httpClient.get(url);
  }


  getCompanydatabycompanyName(name: any) {
    let url = environment.BASE_URL + environment.SHARED.GETCOMPANYDATABYCOMPANYNAME

    return this.httpClient.post(url, name);
  }

  getproductdatajoinbystatus() {
    let url = environment.BASE_URL + environment.SHARED.GETPRODUCTDATAJOINBYSTATUS;

    return this.httpClient.get(url);
  }

  getSystemsDatafromitems() {
    let url = environment.BASE_URL + environment.SHARED.GETSYSTEMDATAFROMITEMS;

    return this.httpClient.get(url);
  }

  getitemsoptherthanCPU() {
    let url = environment.BASE_URL + environment.SHARED.GETITEMSOTHERTHANCPU;

    return this.httpClient.get(url);
  }

  getsystemDatabyitemId(id:any) {
    let url = environment.BASE_URL + environment.SHARED.GETSYSTEMDATABYITEMID;

    return this.httpClient.post(url, id);
  }

  getsystemDataotherThanCPU(transferto:any) {
    let url = environment.BASE_URL + environment.SHARED.GETSYSTEMDATAOTHERTHANCPU;

    return this.httpClient.post(url, transferto);
  }

  getSystemConfiguration(transferto:any) {
    let url = environment.BASE_URL + environment.SHARED.GETSYSTEMCONFIG;

    return this.httpClient.post(url, transferto);
  }

  getSystemDatafromtransferstock() {
    let url = environment.BASE_URL + environment.SHARED.GETSYSTEMDATAFROMTRANSFERSTOCK;

    return this.httpClient.get(url);
  }

}
