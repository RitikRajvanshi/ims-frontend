import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { CheckService } from 'src/app/services/check.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  searchItem = '';

  //for add group
  grpData = {
    grp_name: '',
    modified_by: sessionStorage.getItem('login_id')
  }


  //for update group
  grpData2 = {
    grp_name: '',
    modified_by: sessionStorage.getItem('login_id'),
    grp_id: 0
  }

  //for deletion purpose
  grpId = {
    grp_id: 0
  }

  addgroupForm: any;
  grpdata: any;
  display1 = false;      // for add button
  display2 = true;     // for update button
  toggleAddbtn = true;
  toggleListBtn = false;
  addGroupbtn = true;
  updateGroupbtn = false;
  message: any;        //response from backend in addgroup
  message2: any;       //response from backend in updategroup

  constructor(private adminService: AdminService, private checkService: CheckService, private router: Router) {

  }

  ngOnInit(): void {
    this.validation();
    this.getGroupData();


  }


  getGroupData() {
    this.checkService.getGroupdatabystatus().subscribe(
      {
        next: (results: any) => {
          this.grpdata = JSON.parse(JSON.stringify(results));
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
            // alert('Token has been expired. Please Login');
            
          }
          else {
            // console.log('Other error:', error);
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


  addGroupFunction() {
    // this.grpData.grp_name = data.grp_name

    if (this.addgroupForm.invalid) {
      this.addgroupForm.controls['grp_name'].markAsTouched();

    }
    else {

      //this.display1 is for for add button which will change to update button on click on edit from the list....


      this.adminService.addGroupService(this.grpData).subscribe(
        {
          next: (results: any) => {
            this.message = JSON.parse(JSON.stringify(results)).message;

            if (this.message !== 'true') {
              Swal.fire({
                title: 'Success!',
                text: 'Group added Successfully...',
                icon: 'success',
              });
              this.addgroupForm.get('grp_name')?.reset();
              this.ngOnInit();
            }

            else {
              Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'This group is already present...',
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

  updateGroupFunction() {
    if (this.addgroupForm.invalid) {
      this.addgroupForm.controls['grp_name'].markAsTouched();

    }
    else {
      // this.grpdata2.grp_name = data.grp_name
      this.grpData2.grp_id = this.grpId.grp_id;
      this.grpData2.grp_name = this.grpData.grp_name;
      // console.log(this.grpData2)

      this.adminService.updategroupData(this.grpData2).subscribe(
        {
          next: (results: any) => {
            this.message2 = JSON.parse(JSON.stringify(results)).message;

            if (this.message2 !== 'true') {
              Swal.fire({
                title: 'Success!',
                text: 'Group Updated successfully ...',
                icon: 'success',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.addgroupForm.get('grp_name')?.reset();
                  location.reload();              
                }
              });
            }

            else {
              Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'This group is already present...',
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

  updategrp(data: any) {

    // console.log(data);
    this.addGroupbtn = false;
    this.updateGroupbtn = true;
    this.display2 = false;
    this.display1 = true;
    this.toggleListBtn = true;
    this.toggleAddbtn = false;

    this.grpData.grp_name = data.grp_name;
    this.grpId.grp_id = data.grp_id;

  }

  removegrp(id: any) {
    this.grpId.grp_id = id;
    // console.log(this.grpId);
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
    if (result.isConfirmed)  {

      this.checkService.deactivateGroupStatuscheck(this.grpId).subscribe(
        {
          next: (results: any) => {

            if (results[0].deactivate_group_detail_check == 0) {
              //this group is already present in other table(users), so can't be removed..

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
                'Group deleted successfully...',
                'success'
              )
              this.ngOnInit();

            }
          },
          error: (error) => {
            // console.log('error')
              //  const expirationTime = error.error.expirationTime;
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
        'Group is not deleted :)',
        'error'
      )
      this.ngOnInit();
    
  }
})
  }


  validation() {

    this.addgroupForm = new FormGroup({
      grp_name: new FormControl('', [Validators.required]),
    })
  }


}
