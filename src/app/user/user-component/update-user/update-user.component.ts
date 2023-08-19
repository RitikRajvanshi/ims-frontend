import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CheckService } from 'src/app/services/check.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  isLoading: boolean = false;
  updateUserForm: any;

  userData = {
    "user_id": 0,
    "user_name": '',
    "user_password": '',
    "user_email": '',
    "grp_id": 0,
    "privilege_id": 0,
    "designation_id": 0,
    "modified_by": sessionStorage.getItem('login_id'),
  };

  userId = {
    user_id: 0
  }


  privilegeData: any;
  groupData: any;
  designationData: any;
  useridfromparams: any;


  constructor(private adminService: AdminService, private route: ActivatedRoute, private checkService: CheckService, private sharedService: SharedService, private router: Router) {

  }

  ngOnInit() {
    this.loadData();
    this.validation();

    //id from url
    this.route.params.subscribe((params: any) => {
      this.useridfromparams = +params['id'];

      this.userId.user_id = this.useridfromparams;

      this.userData.user_id = this.useridfromparams;
      // console.log(this.userId);

      this.getUserdatabyId(this.userId);

    })

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
              text: 'Session expired. Please login..',
              footer: '<a href="../login">Login..</a>'
            }).then(() => {
              this.router.navigate(['../login']);
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Some error occured:${error}.`,
              footer: '<a href="../login">Please Login again..</a>'
            }).then(() => {
              this.router.navigate(['../login']);
            })
          }
        }
      })

    this.checkService.getGroupdatabystatus().subscribe({
      next: (results: any) => {
        this.groupData = JSON.parse(JSON.stringify(results))
      },
      error: (error) => {
        if (error.status == 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Session expired. Please login..',
            footer: '<a href="../login">Login..</a>'
          }).then(() => {
            this.router.navigate(['../login']);
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Some error occured:${error}.`,
            footer: '<a href="../login">Please Login again..</a>'
          }).then(() => {
            this.router.navigate(['../login']);
          })
        }
      }
    })

    this.checkService.getDesingationdatabystatus().subscribe(
      {
        next: (results: any) => {
          this.designationData = JSON.parse(JSON.stringify(results))
        },
        error: (error) => {
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Session expired. Please login..',
              footer: '<a href="../login">Login..</a>'
            }).then(() => {
              this.router.navigate(['../login']);
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Some error occured:${error}.`,
              footer: '<a href="../login">Please Login again..</a>'
            }).then(() => {
              this.router.navigate(['../login']);
            })
          }
        }
      })

  }

  getUserdatabyId(userId: any) {
    // console.log(userId, 'within func')

    this.sharedService.getUsersdatabyid(userId).subscribe((results: any) => {


      console.log(results, 'results')
      this.userData.user_name = results[0].user_name;
      this.userData.user_email = results[0].user_email;
      this.userData.user_password = results[0].user_password;
      this.userData.privilege_id = results[0].privilege_id;
      this.userData.grp_id = results[0].grp_id;
      this.userData.designation_id = results[0].designation_id;

    })
  }

  updateuser() {

    // console.log(this.userData);

    if (this.updateUserForm.invalid) {
      this.updateUserForm.controls['user_name'].markAsTouched();
      this.updateUserForm.controls['user_email'].markAsTouched();
      this.updateUserForm.controls['user_password'].markAsTouched();
      this.updateUserForm.controls['privilege_id'].markAsTouched();
      this.updateUserForm.controls['grp_id'].markAsTouched();
      this.updateUserForm.controls['designation_id'].markAsTouched();
      Swal.fire({
        title: 'Warning!',
        text: 'Please Fill required fields...',
        icon: 'warning',
        confirmButtonText: 'OK'
      });

    }
    else {
      // console.log(this.userData);
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.adminService.updateUser(this.userData).subscribe((res: any) => {

            Swal.fire({
              title: 'Success!',
              text: 'User updated Successfully...',
              icon: 'success',
            }).then((result: any) => {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success text-light ml-2',
                  cancelButton: 'btn btn-danger text-light'
                },
                buttonsStyling: false
              })

              // setTimeout(() => {
              swalWithBootstrapButtons.fire({
                title: 'You want to edit more?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  this.router.navigateByUrl('user/user-list');
                }
              })
            })
          })
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }

      })

    }



  }

  privilegeId(id: any) {
    // console.log(id)

    this.userData.privilege_id = + id;

  }

  grpId(id: any) {
    // console.log(id)

    this.userData.grp_id = + id;

  }

  designId(id: any) {
    this.userData.designation_id = + id;
  }

  loadData() {
    this.isLoading = true;

    // Simulating an asynchronous operation
    setTimeout(() => {
      // Your data loading logic

      this.isLoading = false;
    }, 1000);
  }

  validation() {

    const emailPattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,64}';

    this.updateUserForm = new FormGroup({
      user_name: new FormControl('', [Validators.required]),
      user_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(emailPattern)]),
      user_password: new FormControl('', [Validators.required]),
      privilege_id: new FormControl(0, [Validators.required]),
      grp_id: new FormControl(0, [Validators.required]),
      designation_id: new FormControl(0, [Validators.required])

    })
  }

}
