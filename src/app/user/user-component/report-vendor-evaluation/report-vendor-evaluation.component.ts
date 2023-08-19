import { Component, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
declare var require: any
const FileSaver = require('file-saver');
import Swal from 'sweetalert2';


@Component({
  selector: 'app-report-vendor-evaluation',
  templateUrl: './report-vendor-evaluation.component.html',
  styleUrls: ['./report-vendor-evaluation.component.scss']
})
export class ReportVendorEvaluationComponent {

  displayList = false;
  evaluationDataList: any = [];
  searchItem = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20, 50, 100];
  purchaseId: any;

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {

    this.getsupplierEvaluationData();

  }

  getsupplierEvaluationData() {

    this.sharedService.getvendorEvaluationjoindata().subscribe(
      {
        next: (results: any) => {
          this.evaluationDataList = results;
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
    this.getsupplierEvaluationData();

  }

  ontableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getsupplierEvaluationData();

  }

  // <----------------------> This is for exporting data from json to excel  <-------------------------------->
  // <--------------------> Needs 2 packages xlxs and file-saver to save file  <-------------------------------->

  exportToExcel(): void {
    const randomDate = new Date().valueOf();
    const worksheet = XLSX.utils.json_to_sheet(this.evaluationDataList);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, `evaluationData_${randomDate}.xlsx`);
  }


}
