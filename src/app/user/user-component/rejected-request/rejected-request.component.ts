import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rejected-request',
  templateUrl: './rejected-request.component.html',
  styleUrls: ['./rejected-request.component.scss']
})
export class RejectedRequestComponent {
  rejectedRequest: any;
  created_by: any;
  searchItem = '';
  userRole = sessionStorage.getItem('privilege_id');
  itemsDataList: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20, 50, 100];

  constructor(private sharedService: SharedService, private router: Router) {

  }
  ngOnInit(): void {
    this.getRejectedrequest();
  }

  getRejectedrequest(){
    this.sharedService.getrejectedRequest().subscribe(
      {
        next: (results: any) => {
          this.rejectedRequest = results;
          this.created_by = sessionStorage.getItem('name');
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

  ontableDatachange(event: any) {
    this.page = event;
    this.getRejectedrequest();

  }

  ontableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getRejectedrequest();

  }

}
