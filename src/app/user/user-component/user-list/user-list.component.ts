import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  isLoading: boolean = false;
  getuserData: any = [];
  usercreatedData: any;

  userId = {
    user_id: 0
  }
  searchItem = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20, 50, 100];

  constructor(private sharedSerive: SharedService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
    this.getUserDataByStatus();
  }

  getUserDataByStatus() {
    this.sharedSerive.getUsersdatabystatus().subscribe(
      {
        next: (results: any) => {
          this.getuserData = results;
          this.usercreatedData = (this.getuserData[0].user_created_date).slice(0, 10)
          // console.log(this.usercreatedData);         
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
       
      }
      )

  }

  deleteUser(id: any) {

    this.userId.user_id = id;
    // // console.log(this.userId);

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

      this.adminService.deactivateUserStatusbyid(this.userId).subscribe(
        {
          next: (results: any) => {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'User deleted successfully...',
              'success'
            )
            this.getUserDataByStatus();
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
        'User is not deleted :)',
        'error'
      )
    }
  })

  }

  ontableDatachange(event: any) {
    this.page = event;
    this.getUserDataByStatus();
  }

  ontableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUserDataByStatus();

  }

  loadData() {
    this.isLoading = true;
    setTimeout(() => {

      this.isLoading = false;
    }, 1000);
  }


}
