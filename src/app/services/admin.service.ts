import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../environments/environment.dev';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  addCategoryservice(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.ADD_CATEGORY;

    return this.httpClient.post(url, data);

  }

  updatecategoryservice(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.UPDATE_CATEGORY;

    return this.httpClient.put(url, data);

  }

  addGroupService(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.ADD_GROUP;

    return this.httpClient.post(url, data);

  }

  updategroupData(data: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.UPDATEGRP

    return this.httpClient.post(url, data);

  }

  addDesignationService(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.ADD_DESIGNATION;

    return this.httpClient.post(url, data);

  }

  updateDesingationData(data: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.UPDATEDESIGNATION

    return this.httpClient.post(url, data);
  }

  addPrvilegeService(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.ADD_PRIVILEGE;

    return this.httpClient.post(url, data);

  }

  updateprivilegeData(data: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.UPDATEPRIVILEGE

    return this.httpClient.post(url, data);

  }

  addLocationservice(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.ADD_LOCATION;

    return this.httpClient.post(url, data);

  }


  updatelocationservice(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.UPDATE_LOCATION;

    return this.httpClient.put(url, data);

  }

  addProductService(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.ADD_PRODUCT;

    return this.httpClient.post(url, data);

  }

  updateProductservice(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.UPDATE_PRODUCT;

    return this.httpClient.put(url, data);

  }



  addSupplierservice(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.ADD_SUPPLIER;

    return this.httpClient.post(url, data);

  }

  updateSupplierservice(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.UPDATE_SUPPLIER;

    return this.httpClient.put(url, data);

  }

  deletesupplierdata(id: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.DELETE_SUPPLIER_DATA

    return this.httpClient.post(url, id);
  }

  addUser(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.ADD_USER

    return this.httpClient.post(url, data);

  }

  deactivateUserStatusbyid(id: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.DEACTIVATEUSERSTATUSBYID

    return this.httpClient.post(url, id);
  }

  updateUser(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.UPDATEUSER

    return this.httpClient.post(url, data)
  }

  generateReq(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.GENERATEREQUEST

    return this.httpClient.post(url, data);

  }

  makePurchaseOrder(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.MAKEPRUCHASEORDER;

    return this.httpClient.post(url, data);

  }


  updateSentinpurchaseOrder(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.UPDATESENTINPURCHASEORDER;

    return this.httpClient.post(url, data);

  }

  updatesentaApprovedinpurchaseOrder(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.UPDATESENTAPPROVEDPURCHASEORDER;

    return this.httpClient.post(url, data);

  }

  updatesentaRejectinpurchaseOrder(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.UPDATESENTREJECTPURCHASEORDER;

    return this.httpClient.post(url, data);

  }

  addinspectioninPI(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.ADDINSPECTIONINPI;

    return this.httpClient.post(url, data);

  }

  //add items after inspection automatically....
  addItem(jsonbdata: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.ADDITEM;

    return this.httpClient.post(url, jsonbdata);

  }

  addsupplierEvaluation(data: any) {

    let url = environment.ADMIN_URL + environment.ADMIN.ADDSUPPLIEREVALUATION;

    return this.httpClient.post(url, data);

  }

  updateItem(data: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.UPDATEITEM;

    return this.httpClient.post(url, data);

  }

  updateRequestGrantedQuntity(data: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.UPDATEREQUESTGRANTEDQUANTITY

    return this.httpClient.post(url, data);

  }

  registerCompany(data: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.COMPANYREGISTRATION

    return this.httpClient.post(url, data);

  }

  transferStock(data: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.TRANSFERSTOCK;

    return this.httpClient.post(url, data);
  }

  updateisactiveinpiforitems(data: any) {
    let url = environment.ADMIN_URL + environment.ADMIN.UPDATEISACTIVEINPIFORITEMS;

    return this.httpClient.post(url, data);
  }
}
