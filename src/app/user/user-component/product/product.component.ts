import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { CheckService } from 'src/app/services/check.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  searchItem = '';

  //for add product
  productData = {
    category_id: 0,
    product_name: '',
    modified_by: sessionStorage.getItem('login_id'),
    is_asset:null as unknown as number,
  }

  //for update product
  productData2 = {
    category_id: 0,
    product_name: '',
    modified_by: sessionStorage.getItem('login_id'),
    product_id: 0,
    is_asset:null as unknown as number,
  }

  //for deletion
  productId = {
    product_id: 0
  }

  productForm: any;
  categoryData: any;
  productdata: any;

  display1 = false;          // for add button
  display2 = true;         // for update button
  toggleAddbtn = true;
  toggleListBtn = false;
  addProductbtn = true;
  updateProductbtn = false;
  productServiceResponse: any;

  constructor(private adminService: AdminService, private checkService: CheckService, private sharedService: SharedService, private router: Router) {

  }

  ngOnInit(): void {

    this.validation();
    this.getCategorydata();
    this.getProductjoinData();
  }


  getProductjoinData() {
    this.sharedService.getproductdatajoinbystatus().subscribe({
      next: (response: any) => {
        this.productdata = response;
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

  categoryId(data: any) {
    // console.log(data);
    this.productData.category_id = +data;
    this.productData2.category_id = +data;
  }

  isAsset(value:any){
    if (value === 'null') { // Check if the user selected the "Select" option
      this.productData.is_asset = null as unknown as number; // Set is_asset to null
      this.productData2.is_asset = null as unknown as number; // Set is_asset to null
    } else {
      this.productData.is_asset = +value; // Convert the selected value to a number and assign it to is_asset
      this.productData2.is_asset= +value;
      console.log(this.productData2.is_asset, 'productData2.is_asset');
    }

  }

  getCategorydata(){
    this.sharedService.getCategorydata().subscribe((results)=>{
      this.categoryData = results;
    })
  } 


  addProductfunc() {
    this.adminService.addProductService(this.productData).subscribe(
      {
        next: (results: any) => {
          this.productServiceResponse = JSON.parse(JSON.stringify(results)).message;

          if (this.productServiceResponse !== 'true') {
            Swal.fire({
              title: 'Success!',
              text: 'Product added Successfully...',
              icon: 'success',
            });
            this.productForm.get('category_name')?.reset();
            this.ngOnInit();
          }

          else {
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'This category is already present...',
            });
            this.ngOnInit();
          }
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

  UpdateProductFunction() {
    this.productData2.product_name = this.productData.product_name;
    // this.productData2.is_asset = this.productData.is_asset;
    console.log(this.productData2, 'productData2');

    this.adminService.updateProductservice(this.productData2).subscribe(
      {
        next: (results: any) => {
          // alert(results[0].update_product);
          console.log(results[0].update_product);
          Swal.fire({
            title: 'Success!',
            text: 'Category Updated successfully ...',
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();              
            }
          });
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
            // console.log('Other error:', error);
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

  updateproduct(data: any) {
    this.addProductbtn = false;
    this.updateProductbtn = true;
    this.display2 = false;
    this.display1 = true;
    this.toggleListBtn = true;
    this.toggleAddbtn = false;


    this.productId.product_id = data.product_id;
    this.productData2.product_name = data.product_name;
    this.productData2.category_id = data.category_id;
    this.productData2.product_id = data.product_id;

    // due to ngModel for binding
    this.productData.product_name = this.productData2.product_name;
    this.productData.category_id = data.category_id;
    this.productData.is_asset = data.is_asset;
    this.productData2.is_asset = data.is_asset;
    // console.log(this.productData2, 'updatedata');
  }

  productRemove(id: any) {
    let data = {
      product_id: id
    }

 
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
      //below only deactivate the product only by making status 0
      this.checkService.deactivateProductStatuscheck(data).subscribe(
        {
          next: (results: any) => {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Category deleted successfully...',
              'success'
            )
            this.ngOnInit();
          },
          error: (error) => {
            // console.log('error')
            if (error.status == 403) {
              // alert('Token has been expired. Please Login');
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
            'Category is not deleted :)',
            'error'
          )
          this.ngOnInit();
      }
    })
    
  }

  toggleActionAdd() {

    this.toggleListBtn = true;
    this.toggleAddbtn = false;
    this.display2 = false;
    this.display1 = true;
  }

  toggleActionUpdate() {

    this.toggleListBtn = false;
    this.toggleAddbtn = true;
    this.display1 = false;
    this.display2 = true;
  }

  validation() {
    this.productForm = new FormGroup({
      product_name: new FormControl('', [Validators.required]),
      category_id: new FormControl(0, [Validators.required]),
      is_asset:new FormControl(null)
    })
  }
}
