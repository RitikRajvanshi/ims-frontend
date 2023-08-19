import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
declare var require: any
const FileSaver = require('file-saver');
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-active-supplier',
  templateUrl: './report-active-supplier.component.html',
  styleUrls: ['./report-active-supplier.component.scss']
})
export class ReportActiveSupplierComponent {

  dateForm: any;
  dates = {
    start_date: '',
    end_date: ''
  }
  displayList = false;
  VendorList: any = [];

  searchItem = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20, 50, 100];
  lastfinnancialyrDate: any;
  nextfinnancialyrDate: any;


  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.validation();
    this.getFinancialYear()
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
    this.sharedService.getsupplierdatabyDatefilter(this.dates).subscribe(
      {
        next: (results: any) => {
          this.VendorList = results;
          // console.log(this.VendorList);
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
    this.submitDate();
  }

  ontableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.submitDate();
  }

  exportToExcel(): void {
    const randomDate = new Date().valueOf();
    const worksheet = XLSX.utils.json_to_sheet(this.VendorList);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, `activeVendorsData_${randomDate}.xlsx`);
  }

  validation() {
    this.dateForm = new FormGroup({
      start_date: new FormControl(''),
      end_date: new FormControl(''),
    })
  }

}
