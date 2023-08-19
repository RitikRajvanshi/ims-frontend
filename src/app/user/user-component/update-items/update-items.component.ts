import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.scss']
})
export class UpdateItemsComponent {
  itemsData: any;

  itemDescription = {
    item_id: 0,
    description: ''
  }

  searchItem = '';

  constructor(private sharedService: SharedService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {

    this.itemsDataList();

  }


  itemsDataList() {
    this.sharedService.getitemsData().subscribe(
      {
        next: (results: any) => {
          this.itemsData = results;
          // console.log(this.itemsData);
        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Session expired. Please login..',
              footer: '<a href="../login">Login..</a>'
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


  updateItem(id: any, value: any) {

    this.itemDescription.item_id = id;
    this.itemDescription.description = value;
    // console.log(this.itemDescription);

    this.adminService.updateItem(this.itemDescription).subscribe(
      {
        next: (result: any) => {
          // console.log(result);
          Swal.fire({
            title: 'Success!',
            text: 'Item updated Successfully',
            icon: 'success',
          })
            this.ngOnInit();
          
        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Session expired. Please login..',
              footer: '<a href="../login">Login..</a>'
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
