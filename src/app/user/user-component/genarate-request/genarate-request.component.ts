import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { UserService } from 'src/app/services2/user.service';
import { AdminService } from 'src/app/services/admin.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genarate-request',
  templateUrl: './genarate-request.component.html',
  styleUrls: ['./genarate-request.component.scss']
})
export class GenarateRequestComponent {
  generateRequestForm: any;
  validationMessage = false;

  generaterequestData = {
    request_item: '',
    quantity: 0,
    remark: '',
    created_by: sessionStorage.getItem('login_id')
  }

  searchText = '';
  productdata: any;
  productdataArray: any = [];
  request: any;

  display = false;    //for displating the searchText (i.e productdata)


  constructor(private sharedServices: SharedService, private adminService: AdminService, private router: Router) {

  }

  ngOnInit(): void {

    this.validation();
    this.getProductData();
  }

  getProductData() {
    this.sharedServices.getProductdata().subscribe(
      {
        next: (results: any) => {
          console.log(results);

          this.productdata = JSON.parse(JSON.stringify(results));

          for (let item of this.productdata) {
            //save the data in array
            this.productdataArray.push(item.product_name);
            // console.log(this.productdataArray);
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

  addrequest() {

    if (this.generateRequestForm.invalid) {
      this.generateRequestForm.controls['request_item'].markAsTouched();
      this.generateRequestForm.controls['quantity'].markAsTouched();
      this.generateRequestForm.controls['remark'].markAsTouched();
    }

    else {
      this.validationMessage = false;
      // console.log(this.generaterequestData);
      this.adminService.generateReq(this.generaterequestData).subscribe(
        {
          next: (results: any) => {
            Swal.fire({
              title: 'Success!',
              text: 'Request Generated...',
              icon: 'success',
            });
            this.ngOnInit();
            this.generateRequestForm.reset();
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

  }

  showData() {
    this.display = true;
  }

  hidedata() {
    this.display = false;
  }

  selectRequest(data: any) {
    this.request = data;
    this.generaterequestData.request_item = data;
    this.display = false;
    console.log(data);
    console.log(this.generaterequestData);
  }

  validation() {
    this.generateRequestForm = new FormGroup({
      request_item: new FormControl('', [Validators.required]),
      remark: new FormControl('', [Validators.required]),
      quantity: new FormControl(0, [Validators.required]),
    })
  }
}
