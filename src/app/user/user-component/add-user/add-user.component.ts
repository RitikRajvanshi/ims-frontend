import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AdminService } from 'src/app/services/admin.service';
import { SharedService } from 'src/app/services/shared.service';
import { CheckService } from 'src/app/services/check.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  respond: any;
  authdata: any;
  adduserForm: any;

  userData = {
    "user_name": '',
    "user_email": '',
    "grp_id": 0,
    "privilege_id": 0,
    "designation_id": 0,
    "modified_by": sessionStorage.getItem('login_id')
  };

  privilegedata: any;
  groupdata: any;
  designationdata: any;


  constructor(private sharedService: SharedService, private adminSerivice: AdminService, private checkService: CheckService, private router: Router) { }


  ngOnInit(): void {

    this.validation();
    this.getPrivilegeData();
    this.getGroupData();
    this.getDesingationData();
  }


  getPrivilegeData() {
    this.checkService.getPrivilegedatabystatus().subscribe(
      {
        next: (results: any) => {
          this.privilegedata = JSON.parse(JSON.stringify(results));
          // console.log(this.privilegedata, 'privilege')

        }
        , error: (error) => {
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

  getGroupData() {
    this.checkService.getGroupdatabystatus().subscribe(
      {
        next: (respond: any) => {
          this.groupdata = JSON.parse(JSON.stringify(respond))
          // console.log(this.groupdata, 'groupdata')

        },
        error: (error) => {
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

  getDesingationData() {
    this.checkService.getDesingationdatabystatus().subscribe({
      next: (res: any) => {
        this.designationdata = JSON.parse(JSON.stringify(res));
        // console.log(this.designationdata, 'designationdata')

      },
      error: (error) => {
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



  addUserfunction() {

    if (this.adduserForm.invalid) {
      this.adduserForm.controls['user_name'].markAsTouched();
      this.adduserForm.controls['user_email'].markAsTouched();
      // this.adduserForm.controls['privilege_id'].markAsTouched();
      this.adduserForm.controls['grp_id'].markAsTouched();
      this.adduserForm.controls['designation_id'].markAsTouched();
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill required fields...',
        icon: 'warning',
        confirmButtonText: 'OK',
        color: '#00235E'
      })
    }
    else {
      // console.log(this.userData);
      this.adminSerivice.addUser(this.userData).subscribe(
        {
          next: (results: any) => {

            // console.log(results);
            this.respond = JSON.parse(JSON.stringify(results[0])).adduser;
            if (this.respond !== 'Invalid token Access') {

              if (this.respond == 0) {
                Swal.fire({
                  title: 'Success!',
                  text: 'User added Successfully...',
                  icon: 'success',
                });
                this.ngOnInit();
              }

              else {
                Swal.fire({
                  icon: 'warning',
                  title: 'Warning',
                  text: 'Email is already registered...',
                });
                this.ngOnInit();

              }
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Session expired. Please login..',
                footer: '<a href="../login">Login..</a>'
              }).then(() => {
                this.router.navigate(['../login']);
              })


            }
          },
          error: (error) => {
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
  }


  privilageId(id: any) {
    this.userData.privilege_id = + id;

  }

  grpId(id: any) {
    this.userData.grp_id = + id;

  }

  designId(id: any) {
    this.userData.designation_id = + id;

  }

  validation() {
    const emailPattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,64}';

    this.adduserForm = new FormGroup({
      user_name: new FormControl(null, [Validators.required]),
      user_email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(emailPattern)]),
      privilege_id: new FormControl(0, [Validators.required]),
      grp_id: new FormControl(0, [Validators.required]),
      designation_id: new FormControl(0, [Validators.required])

    })
  }
}
