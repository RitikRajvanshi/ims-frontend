import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-report-upload-document',
  templateUrl: './report-upload-document.component.html',
  styleUrls: ['./report-upload-document.component.scss']
})
export class ReportUploadDocumentComponent {

  searchItem = '';
  getcategoryData: any;
  getDocData: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20, 50, 100];



  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {

    this.getDocumentData();
  }




  getDocumentData() {
    this.sharedService.getDocumentdata().subscribe(
      {
        next: (results: any) => {
          this.getDocData = results;
          // console.log(results);

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
    this.getDocumentData();

  }

  ontableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getDocumentData();

  }

  //donwload and save file in local system (we use package name file-saver)
  downloadPDF(name: any) {

    const fileUrl = `http://192.168.0.132:3009/files/${name}`;
    const fileName = name;

    FileSaver.saveAs(fileUrl, fileName);
  }
}
