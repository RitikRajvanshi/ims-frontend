import { Component, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
declare var require: any
const FileSaver = require('file-saver');
import Swal from 'sweetalert2';


@Component({
  selector: 'app-report-purchase-order',
  templateUrl: './report-purchase-order.component.html',
  styleUrls: ['./report-purchase-order.component.scss']
})
export class ReportPurchaseOrderComponent {
  @ViewChild('tablepurchaseOrder') tablepurchaseOrder!: ElementRef;

  dateForm: any;
  dates = {
    start_date: '',
    end_date: ''
  }
  displayList = false;
  purchaseDataList: any = [];
  searchItem = '';

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20, 50, 100];
  lastfinnancialyrDate: any;
  nextfinnancialyrDate: any;
  purchaseId: any;


  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.validation();
    this.getFinancialYear();
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

    this.sharedService.getpurchaseorderDatabydate(this.dates).subscribe(
      {
        next: (results: any) => {
          this.purchaseDataList = results;
          // console.log(this.purchaseDataList)
          this.purchaseId = results[0].purchase_id;
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

  // <----------------------> This is for exporting data from html page to excel  <-------------------------------->
  // exportexcel(): void
  // {
  //   const randomDate = new Date().valueOf();
  //     const worksheet = XLSX.utils.table_to_sheet(this.tablepurchaseOrder.nativeElement);
  //     // console.timeLog(this.tablepurchaseOrder.nativeElement);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  //     XLSX.writeFile(workbook, `${this.purchaseId}-${randomDate}.xlsx`);
  // }

  // <----------------------> This is for exporting data from json to excel  <-------------------------------->
  // <--------------------> Needs 2 packages xlxs and file-saver to save file  <-------------------------------->

  exportToExcel(): void {
    const randomDate = new Date().valueOf();
    const worksheet = XLSX.utils.json_to_sheet(this.purchaseDataList);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, `${this.purchaseId}_${randomDate}.xlsx`);
  }

  validation() {
    this.dateForm = new FormGroup({
      start_date: new FormControl(''),
      end_date: new FormControl(''),
    })
  }
}
