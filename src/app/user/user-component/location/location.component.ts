import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { CheckService } from 'src/app/services/check.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  searchItem = '';
  //for addition purpose
  locationData = {
    location_name: '',
    modified_by: sessionStorage.getItem('login_id')
  }

  //for updation purpose
  locationData2 = {
    location_name: '',
    modified_by: sessionStorage.getItem('login_id'),
    location_id: 0
  }

  //for deletion purpose
  locationId = {
    location_id: 0
  }

  locationForm: any;
  locationdata: any;

  display1 = false;          // for add button
  display2 = true;         // for update button
  toggleAddbtn = true;
  toggleListBtn = false;
  addLocationbtn = true;
  updateLocationbtn = false;

  addlocationserviceResponse: any;
  updatelocationserviceResponse: any;


  constructor(private sharedService: SharedService, private adminService: AdminService, private checkService: CheckService, private router: Router) {

  }

  ngOnInit(): void {

    this.validation();
    this.getLocationData();

  }

  getLocationData() {
    this.checkService.getLocationdatabystatus().subscribe(
      {
        next: (results: any) => {
          this.locationdata = JSON.parse(JSON.stringify(results));
          // console.log(this.locationdata);
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
              text: 'Token has been expired..',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(()=>{
              this.router.navigate(['../login']);
            })
          }
        }
      })
  }

  updatelocation(data: any) {
    this.addLocationbtn = false;
    this.updateLocationbtn = true;
    this.display2 = false;
    this.display1 = true;
    this.toggleListBtn = true;
    this.toggleAddbtn = false;

    this.locationData.location_name = data.location_name;
    this.locationId.location_id = data.location_id;
  }

  removelocation(id: any) {
    this.locationId.location_id = id;

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
      this.checkService.deactivateLocationStatusbyid(this.locationId).subscribe(
        {
          next: (results: any) => {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Location deleted successfully...',
              'success'
            )
            this.ngOnInit();
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
              })
              .then(()=>{
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

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Location is not deleted :)',
        'error'
      )
      this.ngOnInit();
    }
  })
}

  addCategoryfunc() {

    this.adminService.addLocationservice(this.locationData).subscribe(
      {
        next: (results) => {
          // console.log(results);
          this.addlocationserviceResponse = JSON.parse(JSON.stringify(results)).message;

          if (this.addlocationserviceResponse !== 'true') {
            Swal.fire({
              title: 'Success!',
              text: 'Location added Successfully...',
              icon: 'success',
            });
            this.locationForm.get('location_name')?.reset();
            this.ngOnInit();
          }

          else {
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'This location is already present...',
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

  updateCategoryfunc() {
    this.locationData2.location_name = this.locationData.location_name;
    this.locationData2.location_id = this.locationId.location_id;

    this.adminService.updatelocationservice(this.locationData2).subscribe(
      {
        next: (results: any) => {
          this.updatelocationserviceResponse = JSON.parse(JSON.stringify(results)).message;

          if (this.updatelocationserviceResponse !== 'true') {
            Swal.fire({
              title: 'Success!',
              text: 'Location Updated successfully ...',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                this.locationForm.get('location_name')?.reset();
                location.reload();              
              }
            });

          }

          else {
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'This location is already present...',
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
    this.locationForm = new FormGroup({
      location_name: new FormControl('', [Validators.required])
    })
  }
}
