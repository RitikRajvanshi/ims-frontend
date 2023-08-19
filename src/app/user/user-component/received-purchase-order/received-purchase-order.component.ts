import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-received-purchase-order',
  templateUrl: './received-purchase-order.component.html',
  styleUrls: ['./received-purchase-order.component.scss']
})
export class ReceivedPurchaseOrderComponent {


  purchaseData: any;
  purchaseId = {
    purchase_id: ''
  }
  getResponse: any;

  constructor(private sharedService: SharedService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getSendPurchaseOrder();

  }

  getSendPurchaseOrder() {
    this.sharedService.getsendpurchaseorderdata().subscribe(
      {
        next: (results: any) => {
          this.purchaseData = results;
        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Token has been expired..',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(() => {
              this.router.navigate(['../login']);
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Some error occured...',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(() => {
              this.router.navigate(['../login']);
            })
          }
        }
      })
  }

  onaccept(data: any) {
    this.purchaseId.purchase_id = data;

    this.adminService.updatesentaApprovedinpurchaseOrder(this.purchaseId).subscribe(
      {
        next: (results: any) => {
          this.getResponse = results;
          // console.log(this.getResponse)
          // alert(this.getResponse[0].update_sent_approvedpurchaseorder);
          Swal.fire({
            position:'center',
            icon: 'success',
            title: this.getResponse[0].update_sent_approvedpurchaseorder,
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
              text: 'Token has been expired..',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(() => {
              this.router.navigate(['../login']);
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Some error occured...',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(() => {
              this.router.navigate(['../login']);
            })
          }
        }
      })
  }

  onreject(data: any) {
    this.purchaseId.purchase_id = data;

    Swal.fire({
      title: 'Are you sure to reject it?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Reject it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.adminService.updatesentaRejectinpurchaseOrder(this.purchaseId).subscribe(
          {
            next: (results: any) => {
              this.getResponse = results;
              // console.log(this.getResponse)
              Swal.fire(
                'Rejected!',
                'You successfully Rejected PO.',
                'success'
              )
              this.ngOnInit();


            }, error: (error) => {
              // console.log('error')
              if (error.status == 403) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Token has been expired..',
                  footer: '<a href="../login">Please Login again..</a>'
                }).then(() => {
                  this.router.navigate(['../login']);
                })
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Some error occured...',
                  footer: '<a href="../login">Please Login again..</a>'
                }).then(() => {
                  this.router.navigate(['../login']);
                })
              }
            }
          })

      }
    })

  }


}
