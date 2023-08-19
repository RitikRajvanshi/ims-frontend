import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { CheckService } from 'src/app/services/check.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  searchItem = '';
  //for add category
  categoryData = {
    category_name: '',
    modified_by: sessionStorage.getItem('login_id')
  }

  //for update desingation
  categorydata2 = {
    category_name: '',
    modified_by: sessionStorage.getItem('login_id'),
    category_id: 0
  }

  //for deletion purpose
  categoryId = {
    category_id: 0
  }


  addcategoryForm: any;
  categorydata: any;

  display1 = false;          // for add button
  display2 = true;         // for update button
  toggleAddbtn = true;
  toggleListBtn = false;
  addCategorybtn = true;
  updateCategorybtn = false;

  addcategoryserviceResponse: any;
  updatecategoryserviceResponse: any;
  constructor(private adminService: AdminService, private checkService: CheckService, private router: Router) {

  }


  ngOnInit(): void {

    this.validation();
    this.getCategoryData();

  }
  ngAfterViewInit(): void {


  }

  getCategoryData() {
    this.checkService.getCategorydatabystatus().subscribe(
      {
        next: (results: any) => {
          this.categorydata = JSON.parse(JSON.stringify(results));

        },
        error: (error) => {
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

  updatecategory(data: any) {
    Swal.fire({
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          Swal.close(); // Close the dialog after 2000ms (2 seconds)
        }, 500);
      }
    });

    this.addCategorybtn = false;
    this.updateCategorybtn = true;
    this.display2 = false;
    this.display1 = true;
    this.toggleListBtn = true;
    this.toggleAddbtn = false;

    this.categoryId.category_id = data.category_id;
    this.categoryData.category_name = data.category_name;

    this.categorydata2.category_name = data.category_name;
    this.categorydata2.category_id = data.category_id;

  }


  removecategory(id: any) {

    this.categoryId.category_id = id;
    // console.log(this.categoryId);

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
        this.checkService.deactivateCategoryStatuscheck(this.categoryId).subscribe(
          {
            next: (results: any) => {
              // console.log(results.deactivate_category_detail_check);
              if (results.deactivate_category_detail_check == 0) {

                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Sorry deletion can\'t be possible...',
                })
                this.ngOnInit();
              }
              else {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Category deleted successfully...',
                  'success'
                )
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
      } else if (
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


  addCategoryfunc() {
    if (this.addcategoryForm.invalid) {
      this.addcategoryForm.controls['category_name'].markAsTouched();

    }

    else {
      // Swal.fire({
      //   title: 'Loading...',
      //   didOpen: () => {
      //     Swal.showLoading();
      //   }   
      // })
      this.adminService.addCategoryservice(this.categoryData).subscribe(
        {
          next: (results: any) => {


            this.addcategoryserviceResponse = JSON.parse(JSON.stringify(results)).message;

            if (this.addcategoryserviceResponse !== 'true') {
              // alert(this.addcategoryserviceResponse);
              Swal.fire({
                title: 'Success!',
                text: 'Category added Successfully...',
                icon: 'success',
              });
              this.addcategoryForm.get('category_name')?.reset();
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
              // alert('Some error occured. Please login');
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
  }

  UpdateCategoryFunction() {
    if (this.addcategoryForm.invalid) {
      this.addcategoryForm.controls['category_name'].markAsTouched();

    }
    this.categorydata2.category_name = this.categoryData.category_name;

    this.adminService.updatecategoryservice(this.categorydata2).subscribe(
      {
        next: (results: any) => {
          this.updatecategoryserviceResponse = JSON.parse(JSON.stringify(results)).message;

          if (this.updatecategoryserviceResponse !== 'true') {
            Swal.fire({
              title: 'Success!',
              text: 'Category Updated successfully ...',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                this.addcategoryForm.get('grp_name')?.reset();
                location.reload();              
              }
            });
                     
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

    this.addcategoryForm = new FormGroup({
      category_name: new FormControl('', [Validators.required])
    })
  }

}
