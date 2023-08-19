import { Component } from '@angular/core';
import { CheckService } from 'src/app/services/check.service';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReceivedRequestModalComponent } from '../received-request-modal/received-request-modal.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-received-request',
  templateUrl: './received-request.component.html',
  styleUrls: ['./received-request.component.scss']
})
export class ReceivedRequestComponent {
  request: any;
  created_by: any;
  constructor(private checkService: CheckService, private sharedService: SharedService, private matdialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getPendingRequest();

  }

  getPendingRequest() {
    this.sharedService.getpendingRequest().subscribe(
      {
        next: (results: any) => {
          this.request = results;
          // console.log(this.request);
          this.created_by = sessionStorage.getItem('name');
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


  onaccept(id: any) {

    //setting height width of the model and sending data to the modal component...
    this.matdialog.open(ReceivedRequestModalComponent, {
      width: '10%', height: '20%',
      data: {
        request_id: id
      }
    });

  }

  onreject(id: any) {
    let data = {
      request_id: id
    }

    Swal.fire({
      title: 'Are you sure you want to reject it?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.checkService.onrejectrequest(data).subscribe(
          {
            next: (results: any) => {
              Swal.fire(
                'Success!',
                'Request Rejected...',
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

  //   if (confirm("You want to Reject it...!") == true) {
  //     this.checkService.onrejectrequest(data).subscribe(
  //       {
  //         next: (results: any) => {

  //           this.ngOnInit();
  //         }, error: (error) => {
  //           // console.log('error')
  //           if (error.status == 403) {
  //             Swal.fire({
  //               icon: 'error',
  //               title: 'Oops...',
  //               text: 'Token has been expired..',
  //               footer: '<a href="../login">Please Login again..</a>'
  //             }).then(() => {
  //               this.router.navigate(['../login']);
  //             })
  //           }
  //           else {
  //             Swal.fire({
  //               icon: 'error',
  //               title: 'Oops...',
  //               text: 'Some error occured...',
  //               footer: '<a href="../login">Please Login again..</a>'
  //             }).then(() => {
  //               this.router.navigate(['../login']);
  //             })
  //           }
  //         }
  //       })
  //   }
  //   else {
  //     location.reload();
  //   }
  }
}
