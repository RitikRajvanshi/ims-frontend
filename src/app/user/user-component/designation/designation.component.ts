import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { CheckService } from 'src/app/services/check.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent {

  searchItem = '';
  //for add designation
  designationData = {
    designation_name: '',
    modified_by: sessionStorage.getItem('login_id')
  }


  //for update desingation
  designationdata2 = {
    designation_name: '',
    modified_by: sessionStorage.getItem('login_id'),
    designation_id: 0
  }

  //for deletion purpose
  designationId = {
    designation_id: 0
  }

  designationdata: any;
  addDesignationForm: any;

  display1 = false;          // for add button
  display2 = true;         // for update button
  toggleAddbtn = true;
  toggleListBtn = false;
  addDesignbtn = true;
  updateDesignbtn = false;

  message: any;             // message from backend in addDesignationService
  message2: any;

  constructor(private sharedService: SharedService, private adminService: AdminService, private checkService: CheckService, private router: Router) {

  }// message from backend in updateDesignationService

  ngOnInit(): void {

    this.validation();
    this.getDesignationData();

  }

  getDesignationData() {
    this.checkService.getDesingationdatabystatus().subscribe(
      {
        next: (results: any) => {
          this.designationdata = JSON.parse(JSON.stringify(results));
        },
        error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Token has been expired..',
              footer: '<a href="../login">Please Login again..</a>'
            })
            .then(()=>{
              this.router.navigate(['../login']);
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Token has been expired..',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(()=>{
              this.router.navigate(['../login']);
            })
          }
        }
      })
  }
  updatedesign(data: any) {
    Swal.fire({
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          Swal.close(); // Close the dialog after 2000ms (2 seconds)
        }, 500);
      }
    });
    this.addDesignbtn = false;
    this.updateDesignbtn = true;
    this.display2 = false;
    this.display1 = true;
    this.toggleListBtn = true;
    this.toggleAddbtn = false;

    this.designationId.designation_id = data.designation_id;
    this.designationData.designation_name = data.designation_name;

  }
  designRemove(id: any) {
    // console.log(id);

    this.designationId.designation_id = id;
    // console.log(this.designationId);

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
      this.checkService.deactivateDesiginationStatuscheck(this.designationId).subscribe(
        {
          next: (results: any) => {

            if (results[0].deactivate_designation_detail_check == 0) {

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sorry deletion can\'t be possible...',
              })
            }
            else {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Designation deleted successfully...',
                'success'
              )
              this.ngOnInit();

            }
          },
          error: (error) => {
            // console.log('error')
            if (error.status == 403) {
              //  const expirationTime = error.error.expirationTime;
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
        'Designation is not deleted :)',
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

  addDesignationfunc() {
    if (this.addDesignationForm.invalid) {
      this.addDesignationForm.controls['designation_name'].markAsTouched();

    }
    else {
      console.log(this.designationData);
      this.adminService.addDesignationService(this.designationData).subscribe(
        {
          next: (results: any) => {
            this.message = JSON.parse(JSON.stringify(results)).message;

            if (this.message !== 'true') {
              Swal.fire({
                title: 'Success!',
                text: 'Designation added Successfully...',
                icon: 'success',
              });
              this.addDesignationForm.get('designation_name')?.reset();
              this.ngOnInit();
            }

            else {
              Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'This designation is already present...',
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
  }

  updateDesignationfunc() {

    if (this.addDesignationForm.invalid) {
      this.addDesignationForm.controls['designation_name'].markAsTouched();

    }

    this.designationdata2.designation_id = this.designationId.designation_id;
    this.designationdata2.designation_name = this.designationData.designation_name;

    this.adminService.updateDesingationData(this.designationdata2).subscribe(
      {
        next: (results: any) => {
          this.message2 = JSON.parse(JSON.stringify(results)).message;


          if (this.message2 !== 'true') {
            Swal.fire({
              title: 'Success!',
              text: 'Designation Updated successfully ...',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                this.addDesignationForm.get('desgination_name')?.reset();
                location.reload();              
              }
            });
          }

          else {
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'This designation is already present...',
            });
            this.ngOnInit();

          }

        },
        error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            //  const expirationTime = error.error.expirationTime;
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


  validation() {

    this.addDesignationForm = new FormGroup({
      designation_name: new FormControl('', [Validators.required])
    })
  }

}


