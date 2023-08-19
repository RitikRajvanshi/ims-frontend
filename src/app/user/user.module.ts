import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-component/user-dashboard/user-dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AssetsComponent } from './user-component/assets/assets.component';
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
import { UpdateVendorComponent } from './user-component/update-vendor/update-vendor.component';
import { ReportActiveSupplierComponent } from './user-component/report-active-supplier/report-active-supplier.component';
import { UpdateUserComponent } from './user-component/update-user/update-user.component';
import { SearchFilterPipe } from '../pipe/search-filter.pipe';
import { PurchaseOrderViewComponent } from './user-component/purchase-order-view/purchase-order-view.component';
import { SupplierEvaluationComponent } from './user-component/supplier-evaluation/supplier-evaluation.component';
import { VendorEvaluationModalComponent } from './user-component/vendor-evaluation-modal/vendor-evaluation-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReportPurchaseOrderComponent } from './user-component/report-purchase-order/report-purchase-order.component';
import { ReportVendorEvaluationComponent } from './user-component/report-vendor-evaluation/report-vendor-evaluation.component';
import { ReportUploadDocumentComponent } from './user-component/report-upload-document/report-upload-document.component';
import { ReportItemsListComponent } from './user-component/report-items-list/report-items-list.component';
import { ReceivedRequestComponent } from './user-component/received-request/received-request.component';
import { ReceivedPurchaseOrderComponent } from './user-component/received-purchase-order/received-purchase-order.component';
import { ReceivedRequestModalComponent } from './user-component/received-request-modal/received-request-modal.component';
import { ReportItemsWithPriceComponent } from './user-component/report-items-with-price/report-items-with-price.component';
import { ReportPendingStockComponent } from './user-component/report-pending-stock/report-pending-stock.component';
import { ReportStockInHandComponent } from './user-component/report-stock-in-hand/report-stock-in-hand.component';
import { ReportCompleteAssetComponent } from './user-component/report-complete-asset/report-complete-asset.component';
import { EditProfileComponent } from './user-component/edit-profile/edit-profile.component';
import { TransferStockComponent } from './user-component/transfer-stock/transfer-stock.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SystemDetailComponent } from './user-component/system-detail/system-detail.component';
import { PreloaderComponent } from './user-component/preloader/preloader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    UserDashboardComponent,
    AssetsComponent,
    CategoryComponent,
    ProductComponent,
    GroupComponent,
    DesignationComponent,
    UserPrivilegeComponent,
    LocationComponent,
    AddUserComponent,
    UserListComponent,
    AddVendorComponent,
    VendorListComponent,
    MakePurchaseOrderComponent,
    PurchaseOrderListComponent,
    GenarateRequestComponent,
    AcceptedRequestComponent,
    PendingRequestComponent,
    RejectedRequestComponent,
    UploadInvoiceComponent,
    UploadInspectionFormComponent,
    UpdateItemsComponent,
    UploadScanDocumentComponent,
    UploadScanQuotationComponent,
    IncomingItemDetailsComponent,
    CompanyRegistrationComponent,
    MovetoItsmComponent,
    NewsystemInformationComponent,
    SystemInformationListComponent,
    UserComponent,
    UpdateVendorComponent,
    ReportActiveSupplierComponent,
    UpdateUserComponent,
    SearchFilterPipe,
    PurchaseOrderViewComponent,
    SupplierEvaluationComponent,
    VendorEvaluationModalComponent,
    ReportPurchaseOrderComponent,
    ReportVendorEvaluationComponent,
    ReportUploadDocumentComponent,
    ReportItemsListComponent,
    ReceivedRequestComponent,
    ReceivedPurchaseOrderComponent,
    ReceivedRequestModalComponent,
    ReportItemsWithPriceComponent,
    ReportPendingStockComponent,
    ReportStockInHandComponent,
    ReportCompleteAssetComponent,
    EditProfileComponent,
    TransferStockComponent,
    SystemDetailComponent,
    PreloaderComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class UserModule { }
