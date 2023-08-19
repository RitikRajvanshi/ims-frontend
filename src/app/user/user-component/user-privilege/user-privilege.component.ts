import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { CheckService } from 'src/app/services/check.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-privilege',
  templateUrl: './user-privilege.component.html',
  styleUrls: ['./user-privilege.component.scss']
})
export class UserPrivilegeComponent {
  //for addition purpose
  searchItem = '';
  privilegedata = {
    privilege_name: '',
    modified_by: sessionStorage.getItem('login_id')
  }

  //for updation purpose
  privilegedata2 = {
    privilege_name: '',
    modified_by: sessionStorage.getItem('login_id'),
    privilege_id: 0
  }

  //for deletion purpose
  privilegeId = {
    privilege_id: 0
  }

  addPrivilegeForm: any;
  privilegeData: any;
  privilegeName: any;
  display1 = false;          // for add button
  display2 = true;         // for update button
  toggleAddbtn = true;
  toggleListBtn = false;
  addPrivilegebtn = true;
  updatePrivilegebtn = false;       // for update button
  addprivilegeResponse: any;
  updateprivilegeResponse: any;


  constructor(private sharedService: SharedService, private adminService: AdminService, private checkService: CheckService, private router: Router) {

  }

  ngOnInit(): void {

    this.validation();
    this.getPrivilegeData();

  }

  getPrivilegeData() {
    this.checkService.getPrivilegedatabystatus().subscribe(
      {
        next: (results: any) => {
          this.privilegeData = JSON.parse(JSON.stringify(results));

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
              text: 'Token has been expired..',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(()=>{
              this.router.navigate(['../login']);
            })
          }
        }
      })
  }

  addPrivilegefunc() {
    if (this.addPrivilegeForm.invalid) {
      this.addPrivilegeForm.controls['privilege_name'].markAsTouched();

    }
    else {


      this.adminService.addPrvilegeService(this.privilegedata).subscribe(
        {
          next: (results: any) => {
            this.addprivilegeResponse = JSON.parse(JSON.stringify(results)).message;

            if (this.addprivilegeResponse !== 'true') {
              Swal.fire({
                title: 'Success!',
                text: 'Group added Successfully...',
                icon: 'success',
              });
              this.addPrivilegeForm.get('privilege_name')?.reset();
              this.ngOnInit();

            }

            else {
              Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'This privilege is already present...',
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
  }

  updatePrivilegefunc() {
    this.privilegedata2.privilege_id = this.privilegeId.privilege_id;
    this.privilegedata2.privilege_name = this.privilegedata.privilege_name;

    this.adminService.updateprivilegeData(this.privilegedata2).subscribe(
      {
        next: (results: any) => {
          this.updateprivilegeResponse = JSON.parse(JSON.stringify(results)).message;
          // console.log(this.updateprivilegeResponse);

          if (this.updateprivilegeResponse !== 'true') {

            Swal.fire({
              title: 'Success!',
              text: 'Group Updated successfully ...',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                this.addPrivilegeForm.get('privilege_name')?.reset();
                location.reload();              
              }
            });

          }

          else {
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'This group is already present...',
            }).then((result) => {
              if (result.isConfirmed) {
                this.addPrivilegeForm.get('privilege_name')?.reset();
                location.reload(); 
              }             
              });        
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

  updateprivilege(data: any) {
    Swal.fire({
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          Swal.close(); // Close the dialog after 2000ms (2 seconds)
        }, 500);
      }
    });
    this.addPrivilegebtn = false;
    this.updatePrivilegebtn = true;
    this.display2 = false;
    this.display1 = true;
    this.toggleListBtn = true;
    this.toggleAddbtn = false;

    this.privilegedata.privilege_name = data.privilege_name
    this.privilegeId.privilege_id = data.privilege_id
  }

  privilegeRemove(id: any) {
    this.privilegeId.privilege_id = id;

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
      this.checkService.deactivatePrivilegeStatuscheck(this.privilegeId).subscribe(

        {
          next: (results: any) => {

            if (results[0].deactivate_privilege_detail_check == 0) {

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
                'Privilege deleted successfully...',
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
        'Privilege is not deleted :)',
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

    this.addPrivilegeForm = new FormGroup({
      privilege_name: new FormControl('', [Validators.required])
    })
  }
}
