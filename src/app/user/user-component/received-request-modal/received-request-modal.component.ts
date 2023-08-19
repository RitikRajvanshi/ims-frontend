import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-received-request-modal',
  templateUrl: './received-request-modal.component.html',
  styleUrls: ['./received-request-modal.component.scss']
})
export class ReceivedRequestModalComponent {

  RequestData = {
    request_id :0,
    quantity : 0
  }

  updateRequestForm:any;
  pendingRequests:any;
  requestId:any;

  // this is for modalpoup used in request module from user
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private Ref:MatDialogRef<ReceivedRequestModalComponent>, private adminService:AdminService,
  private sharedService:SharedService, private router:Router){

  }

  //there is a data which is request_id from request component.....

  ngOnInit(): void {

    this.validation();

    // console.log(this.data);

    this.sharedService.getpendingRequestByid(this.data).subscribe(
      {
        next:(results:any)=>{
      this.pendingRequests = (results[0].quantity);
      this.RequestData.quantity = (results[0].quantity);
      // console.log(this.pendingRequests);
    },error:(error) => {
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



  updatereq(){

    this.RequestData.request_id = this.data.request_id;

   this.adminService.updateRequestGrantedQuntity(this.RequestData).subscribe(
    {
      next:(results:any)=>{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Request Accepted`,
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{      
      //for closing model   
        this.Ref.close(); 
        location.reload();
        })
    // alert(`Request Accepted with ${this.RequestData.quantity} quantity ..`);

  
   },error:(error) => {
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

  validation(){
    this.updateRequestForm = new FormGroup({
    quantity: new FormControl('',[Validators.required])
    })
  }
}
