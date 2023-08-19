import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-pending-stock',
  templateUrl: './report-pending-stock.component.html',
  styleUrls: ['./report-pending-stock.component.scss']
})
export class ReportPendingStockComponent {
  pendingStockList: any = [];
  searchItem = '';

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20, 50, 100];



  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {

    this.getPendingSotck();

  }

  getPendingSotck() {
    this.sharedService.getreportpendingStock().subscribe(
      {
        next: (results: any) => {
          this.pendingStockList = results;
          // console.log(this.pendingStockList);
        }, error: (error) => {
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
    this.getPendingSotck();

  }

  ontableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPendingSotck();

  }

}
