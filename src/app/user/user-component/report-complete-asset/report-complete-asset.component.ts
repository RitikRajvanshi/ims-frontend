import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-complete-asset',
  templateUrl: './report-complete-asset.component.html',
  styleUrls: ['./report-complete-asset.component.scss']
})
export class ReportCompleteAssetComponent {
  dateForm: any;
  dates = {
    start_date: '',
    end_date: ''
  }

  displayList = false;
  fullAssetList: any = [];
  searchItem = '';

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20, 50, 100];
  lastfinnancialyrDate: any;
  nextfinnancialyrDate: any;
  totalItems: any;
  totalPrice: any;

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.validation();
    this.getFinancialYear()
    this.getTotalPriceandItems();
  }

  getFinancialYear() {
    var today = new Date();
    var curMonth = today.getMonth() + 1
    var curDate = today.getDate()
    var curYear = today.getFullYear();

    if (curMonth > 3) {
      this.lastfinnancialyrDate = curYear.toString() + '-' + '04' + '-' + '01';
      this.nextfinnancialyrDate = (curYear + 1).toString() + '-' + '03' + '-' + '31';

    } else {
      this.lastfinnancialyrDate = (curYear - 1).toString() + '-' + '-' + '04' + '-' + '01';
      this.nextfinnancialyrDate = (curYear + 1).toString() + '-' + '03' + '-' + '31';
    }

    this.dates.start_date = this.lastfinnancialyrDate;
    this.dates.end_date = this.nextfinnancialyrDate;

  }

  submitDate() {
    // console.log(this.dates)
    this.displayList = true;

    this.sharedService.getfullassetbyDate(this.dates).subscribe(
      {
        next: (results: any) => {
          this.fullAssetList = results;
          // console.log(this.fullAssetList)
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

  getTotalPriceandItems() {
    this.sharedService.gettotalPriceandItemsfrompi().subscribe(
      {
        next: (results: any) => {
          this.totalItems = results[0].count;
          this.totalPrice = results[0].sum;
          // console.log(this.totalItems, this.totalPrice)
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

  // EmptySearchItem(){
  //   this.searchItem = '';

  // }

  ontableDatachange(event: any) {
    this.page = event;
    this.submitDate();
  }

  ontableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.submitDate();
  }

  validation() {
    this.dateForm = new FormGroup({
      start_date: new FormControl(''),
      end_date: new FormControl(''),
    })
  }
}
