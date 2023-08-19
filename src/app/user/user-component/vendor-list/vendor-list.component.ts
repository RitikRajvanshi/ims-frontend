import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VendorEvaluationModalComponent } from '../vendor-evaluation-modal/vendor-evaluation-modal.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent {
  isLoading: boolean = false;
  supplierdata: any = [];
  supplierid: any = {
    supplier_id: 0
  }

  searchItem = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20, 50, 100];

  constructor(private sharedService: SharedService, private adminService: AdminService, private matdialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loadData();   //for loading the page
    this.supplierdatalist();

  }

  supplierdatalist() {
   
    this.sharedService.getsupplierdata().subscribe(
      {     
        next: (results: any) => {   
         
          this.supplierdata = JSON.parse(JSON.stringify(results));
          console.log(this.supplierdata);
        },
        error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Token has been expired..',
              footer: '<a href="../login">Please Login again..</a>'
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



  deleteSupplier(id: any) {

    this.supplierid.supplier_id = id;

    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-2 text-light',
        cancelButton: 'btn btn-danger text-light'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

      this.adminService.deletesupplierdata(this.supplierid).subscribe(
        {
          next: (results: any) => {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Vendor deleted successfully...',
              'success'
            )
            
             this.supplierdatalist();
            
          },
          error: (error) => {
            // console.log('error')
              if (error.status == 403) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Token has been expired..',
                  footer: '<a href="../login">Please Login again..</a>'
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
    else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Vendor is not deleted :)',
        'error'
      )
      // this.ngOnInit();
    }
  })

  }

  supplierEvaluationData(id: any) {

    //setting height width of the model and sending data to the VendorEvaluationModalComponent...
    this.matdialog.open(VendorEvaluationModalComponent, {
      width: '100%', height: 'auto',
      data: {
        supplier_id: id
      }
    });

  }

  ontableDatachange(event: any) {
    this.page = event;
    this.supplierdatalist();
  }

  ontableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.supplierdatalist();

  }

  loadData() {
    this.isLoading = true;
    setTimeout(() => {

      this.isLoading = false;
    }, 1000);
  }
}


