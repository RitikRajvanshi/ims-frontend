import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-component/user-dashboard/user-dashboard.component';
import { UserComponent } from './user.component';
import { CategoryComponent } from './user-component/category/category.component';
import { ProductComponent } from './user-component/product/product.component';
import { GroupComponent } from './user-component/group/group.component';
import { DesignationComponent } from './user-component/designation/designation.component';
import { UserPrivilegeComponent } from './user-component/user-privilege/user-privilege.component';
import { LocationComponent } from './user-component/location/location.component';
import { AddUserComponent } from './user-component/add-user/add-user.component';
import { UserListComponent } from './user-component/user-list/user-list.component';
import { AddVendorComponent } from './user-component/add-vendor/add-vendor.component';
import { VendorListComponent } from './user-component/vendor-list/vendor-list.component';
import { MakePurchaseOrderComponent } from './user-component/make-purchase-order/make-purchase-order.component';
import { PurchaseOrderListComponent } from './user-component/purchase-order-list/purchase-order-list.component';
import { GenarateRequestComponent } from './user-component/genarate-request/genarate-request.component';
import { AcceptedRequestComponent } from './user-component/accepted-request/accepted-request.component';
import { PendingRequestComponent } from './user-component/pending-request/pending-request.component';
import { RejectedRequestComponent } from './user-component/rejected-request/rejected-request.component';
import { UploadInvoiceComponent } from './user-component/upload-invoice/upload-invoice.component';
import { UploadInspectionFormComponent } from './user-component/upload-inspection-form/upload-inspection-form.component';
import { UpdateItemsComponent } from './user-component/update-items/update-items.component';
import { UploadScanDocumentComponent } from './user-component/upload-scan-document/upload-scan-document.component';
import { UploadScanQuotationComponent } from './user-component/upload-scan-quotation/upload-scan-quotation.component';
import { IncomingItemDetailsComponent } from './user-component/incoming-item-details/incoming-item-details.component';

import { CompanyRegistrationComponent } from './user-component/company-registration/company-registration.component';
import { MovetoItsmComponent } from './user-component/moveto-itsm/moveto-itsm.component';
import { NewsystemInformationComponent } from './user-component/newsystem-information/newsystem-information.component';
import { SystemInformationListComponent } from './user-component/system-information-list/system-information-list.component';
import { AssetsComponent } from './user-component/assets/assets.component';
import { TransferStockComponent } from './user-component/transfer-stock/transfer-stock.component';
import { UpdateVendorComponent } from './user-component/update-vendor/update-vendor.component';
import { ReportActiveSupplierComponent } from './user-component/report-active-supplier/report-active-supplier.component';
import { UpdateUserComponent } from './user-component/update-user/update-user.component';
import { PurchaseOrderViewComponent } from './user-component/purchase-order-view/purchase-order-view.component';
import { SupplierEvaluationComponent } from './user-component/supplier-evaluation/supplier-evaluation.component';
import { ReportPurchaseOrderComponent } from './user-component/report-purchase-order/report-purchase-order.component';
import { ReportVendorEvaluationComponent } from './user-component/report-vendor-evaluation/report-vendor-evaluation.component';
import { ReportUploadDocumentComponent } from './user-component/report-upload-document/report-upload-document.component';
import { ReportItemsListComponent } from './user-component/report-items-list/report-items-list.component';
// import { ReceivedRequestComponent } from './user-component/received-request/received-request.component';
import { ReceivedRequestComponent } from './user-component/received-request/received-request.component';
// import { ReceivedPurchaseOrderComponent } from './user-component/received-purchase-order/received-purchase-order.component';
import { ReceivedPurchaseOrderComponent } from './user-component/received-purchase-order/received-purchase-order.component';
import { AuthGuard } from '../guards/auth.guard';
import { ReportItemsWithPriceComponent } from './user-component/report-items-with-price/report-items-with-price.component';
import { ReportPendingStockComponent } from './user-component/report-pending-stock/report-pending-stock.component';
import { ReportStockInHandComponent } from './user-component/report-stock-in-hand/report-stock-in-hand.component';
import { ReportCompleteAssetComponent } from './user-component/report-complete-asset/report-complete-asset.component';
import { EditProfileComponent } from './user-component/edit-profile/edit-profile.component';
import { SystemDetailComponent } from './user-component/system-detail/system-detail.component';
import { UserRoleGuard } from '../guards/user-role.guard';
import { SuperAdminGuard } from '../guards/super-admin.guard';



export const routes: Routes = [

{
  path:'' , component:UserComponent, canActivate:[AuthGuard],

  children:[
   {path:'', component:UserDashboardComponent},
   {path:'user-dashboard', component:UserDashboardComponent},
   {path:'assets', component:AssetsComponent},
   {path:'category', component:CategoryComponent},
   {path:'product', component:ProductComponent},
   {path:'group', component:GroupComponent},
   {path:'designation', component:DesignationComponent},
   {path:'user-privilege', component:UserPrivilegeComponent},
   {path:'location', component:LocationComponent},
   {path:'add-user', component:AddUserComponent},
   {path:'user-list', component:UserListComponent},
   {path:'update-user/:id', component:UpdateUserComponent},
   {path:'add-vendor', component:AddVendorComponent},
   {path:'vendor-list', component:VendorListComponent},
   {path:'make-purchase-order', component:MakePurchaseOrderComponent},
   {path:'purchase-order-list', component:PurchaseOrderListComponent},
   {path:'genarate-request', component:GenarateRequestComponent},
   {path:'accepted-request', component:AcceptedRequestComponent},
   {path:'pending-request', component:PendingRequestComponent},
   {path:'rejected-request', component:RejectedRequestComponent},
   {path:'upload-invoice', component:UploadInvoiceComponent},
   {path:'upload-inspection-form', component:UploadInspectionFormComponent},
   {path:'update-items', component:UpdateItemsComponent},
   {path:'upload-scan-document', component:UploadScanDocumentComponent},
   {path:'upload-scan-quotation', component:UploadScanQuotationComponent},
   {path:'incoming-item-details', component:IncomingItemDetailsComponent},
   {path:'company-registration', component:CompanyRegistrationComponent},
   {path:'moveto-itsm', component:MovetoItsmComponent},
   {path:'newsystem-information', component:NewsystemInformationComponent},
   {path:'system-information-list', component:SystemInformationListComponent},
   {path:'transfer-stock', component:TransferStockComponent, canActivate:[UserRoleGuard]},
   {path:'update-vendor/:id', component:UpdateVendorComponent},
   {path:'report-active-supplier', component:ReportActiveSupplierComponent},
   {path:'purchase-order-view/:id/:pid', component:PurchaseOrderViewComponent},
   {path:'vendor-evaluation/:pid', component:SupplierEvaluationComponent},
   {path:'report-purchase-order', component:ReportPurchaseOrderComponent},
   {path:'report-vendor-evaluation', component:ReportVendorEvaluationComponent},
   {path:'report-upload-documents', component:ReportUploadDocumentComponent},
   {path:'report-items-list', component:ReportItemsListComponent},
   {path:'received-request', component:ReceivedRequestComponent, canActivate:[SuperAdminGuard]},
   {path:'received-purhchase-order', component:ReceivedPurchaseOrderComponent , canActivate:[SuperAdminGuard]},
   {path:'report-item-with-price', component:ReportItemsWithPriceComponent},
   {path:'report-pending-stock', component:ReportPendingStockComponent},
   {path:'report-stock-in-hand', component:ReportStockInHandComponent},
   {path:'report-complete-asset', component:ReportCompleteAssetComponent},
   {path:'edit-profile', component:EditProfileComponent},
   {path:'system-detail/:transferto', component:SystemDetailComponent},

  ]
  
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
