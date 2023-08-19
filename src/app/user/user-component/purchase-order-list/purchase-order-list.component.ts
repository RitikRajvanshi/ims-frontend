import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent {

  userRole = sessionStorage.getItem('privilege_id');
  purchaseData: any = [];
  purchaseDataacceptorReject: any = [];
  purchaseId = {
    purchase_id: ''
  }
  sentResponse: any;

  searchItem = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20, 50, 100];
  lastfinnancialyrDate: any;
  nextfinnancialyrDate: any;
  isLoading: boolean = false;

  constructor(private sharedService: SharedService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
    this.getpurchaseData();
    this.getPurchasefulldata();

  }

  getpurchaseData() {
    this.sharedService.getpurchasedatathatareacceptorreject().subscribe(
      {
        next: (results: any) => {
          this.purchaseDataacceptorReject = results;
          // console.log(this.purchaseData, 'accept and reject')

        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Session expired. Please login..',
              footer: '<a href="../login">Login..</a>'
            }).then(()=>{
              this.router.navigate(['../login']);
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Some error occured...',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(()=>{
              this.router.navigate(['../login']);
            })
          }
        }
      })
  }

  getPurchasefulldata() {
    this.sharedService.getpurchaseorderdata().subscribe(
      {
        next: (results: any) => {
          this.purchaseData = results;
          console.log(results[0].po_approval_date)
          console.log(this.purchaseData)
        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            //  const expirationTime = error.error.expirationTime;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Session expired. Please login..',
              footer: '<a href="../login">Login..</a>'
            }).then(()=>{
              this.router.navigate(['../login']);
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Some error occured...',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(()=>{
              this.router.navigate(['../login']);
            })
          }
        }
      })
  }


  sendOrder(data: any) {
    // console.log(data, 'purchaseId')
    this.purchaseId.purchase_id = data;

    this.adminService.updateSentinpurchaseOrder(this.purchaseId).subscribe(
      {
        next: (results: any) => {

          this.sentResponse = results;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'PO send for approval',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.ngOnInit();
          })
        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Session expired. Please login..',
              footer: '<a href="../login">Login..</a>'
            }).then(()=>{
              this.router.navigate(['../login']);
            })

          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Some error occured...',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(()=>{
              this.router.navigate(['../login']);
            })
          }
        }
      })
  }

  ontableDatachange(event: any) {
    this.page = event;
    this.getpurchaseData();
  }

  ontableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getpurchaseData();
  }

  loadData() {
    this.isLoading = true;
    setTimeout(() => {

      this.isLoading = false;
    }, 1000);
  }


}
