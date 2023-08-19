import { Component, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare var require: any
const FileSaver = require('file-saver');
import Swal from 'sweetalert2';


@Component({
  selector: 'app-report-items-with-price',
  templateUrl: './report-items-with-price.component.html',
  styleUrls: ['./report-items-with-price.component.scss']
})
export class ReportItemsWithPriceComponent {

  @ViewChild('pdfTable') pdfTable!: ElementRef;
  itemsDataList: any = [];
  searchItem = '';
  itemCode: any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 15, 20, 50, 100];

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {

    this.getitemsDataListwithPrice();

  }

  getitemsDataListwithPrice() {
    this.sharedService.getreportItemwithPrice().subscribe(
      {
        next: (results: any) => {
          this.itemsDataList = JSON.parse(JSON.stringify(results));
          // console.log(this.itemCode);
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
    this.getitemsDataListwithPrice();

  }

  ontableSizechange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getitemsDataListwithPrice();

  }

  // public htmlToDocDefinition(html:any) {
  //   const pdfContent = htmlToPdfmake(html);
  //   const docDefinition = {
  //     content: pdfContent,
  //     // pageSize: {
  //     //   width: 800, // 210mm
  //     //   height: 900, // 297mm
  //     // }
  //     pageSize: {
  //       width: 500,
  //       height: 600
  //     }
  //   };
  //   return docDefinition;
  // }

  //  downloadPdf() {
  //   const html =this.pdfTable.nativeElement;
  //   const randomDate = new Date().valueOf();
  //   // console.log(html);
  //   const docDefinition = this.htmlToDocDefinition(html.innerHTML);
  //   pdfMake.createPdf(docDefinition).download(`itemswithprice_-${randomDate}`);
  // }

  exportToPdf() {
    const randomDate = new Date().valueOf();
    const worksheet = XLSX.utils.json_to_sheet(this.itemsDataList);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, `ItemswithPrice_${randomDate}.xlsx`);
  }

  //   const doc = new jsPDF(
  //     // orientation: 'landscape',
  //     // unit: 'mm',
  //     // format: 'a4',
  //     // compress: true,

  //   );

  //    // Define table columns and rows
  //    const headers:any = ['Item Code', 'Product Name', 'Vendor Name', 'Unit Price', 'Tototaltal', 'Created Date'];

  //    const rows:any = [];

  //    this.itemsDataList.forEach((d:any) => {
  //     const temp = [
  //       d.item_code, 
  //       d.product_name, 
  //       d.supplier_name, 
  //       d.unit_price.toString(), 
  //       d.total.toString(), 
  //       d.created_date];
  //     rows.push(temp);
  //   });

  //     // set the starting Y coordinate for the table
  //     let startY = 30;

  //     // loop through the headers and add them to the table
  //     headers.forEach((header:any, index:any) => {
  //       doc.text(header, 10, startY);
  //       startY += 10;
  //     });

  //     // set the starting Y coordinate for the data rows
  //       startY += 5;

  //       // loop through the rows and add them to the table
  //     rows.forEach((row:any, index:any) => {
  //       row.forEach((cell:any, cellIndex:any) => {
  //         doc.text(cell, 10 + cellIndex * 40, startY + index * 10);
  //   });
  // });

  //     // save the document
  //     doc.save('VendorList.pdf');

  // assuming data is an array of objects returned from the API
  // const data = [
  //   { name: 'John Doe', age: 30, email: 'john@example.com' },
  //   { name: 'Jane Doe', age: 25, email: 'jane@example.com' },
  //   { name: 'Bob Smith', age: 40, email: 'bob@example.com' }
  // ];

  // // create an empty document
  // const doc = new jsPDF();

  // // set the document font size
  // doc.setFontSize(12);

  // // set the table column headers
  // const headers = ['Name', 'Age', 'Email'];

  // // initialize the row data array
  // const rows:any = [];

  // // loop through the data and add each row to the array
  // data.forEach(item => {
  //   const rowData = [
  //     item.name,
  //     item.age.toString(),
  //     item.email
  //   ];
  //   rows.push(rowData);
  // });

  // // set the starting Y coordinate for the table
  // let startY = 30;

  // // loop through the headers and add them to the table
  // headers.forEach((header:any, index:any) => {
  //   doc.text(header, 10, startY);
  //   startY += 10;
  // });

  // // set the starting Y coordinate for the data rows
  // startY += 5;

  // // loop through the rows and add them to the table
  // rows.forEach((row:any, index:any) => {
  //   row.forEach((cell:any, cellIndex:any) => {
  //     doc.text(cell, 10 + cellIndex * 40, startY + index * 10);
  //   });
  // });

  // // save the document
  // doc.save('data.pdf');

  // }





  exportToExcel(): void {
    const randomDate = new Date().valueOf();
    const worksheet = XLSX.utils.json_to_sheet(this.itemsDataList);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, `itemswithprice_${randomDate}.xlsx`);
  }


  generatePDF() {
    //   const doc = new jsPDF();
    //   const headers = ['Name', 'Email', 'Phone'];
    //   const rows = this.VendorList.map((vendor:any) => [vendor.Name, vendor.Email, vendor.Phone]);

    //   doc.setFontSize(12);
    //   doc.text('Vendor List', 10, 10);

    //   let y = 20;
    //   const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    //   const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();

    //   doc.setLineWidth(0.1);
    //   doc.setDrawColor(0, 0, 0);
    //   doc.setFillColor(200, 200, 200);
    //   doc.setTextColor(0, 0, 0);

    //    // Table header
    //    doc.rect(10, y, pageWidth - 20, 10, 'S');
    //    for (let i = 0; i < headers.length; i++) {
    //      const header = headers[i];
    //      const x = pageWidth / headers.length * i + 10;
    //      doc.text(header, x + 5, y + 8, { align: 'center' });
    //    }

    //    // Table rows
    //    y += 10;
    //    for (let i = 0; i < rows.length; i++) {
    //      const row = rows[i];
    //      doc.rect(10, y, pageWidth - 20, 10, 'S');
    //      for (let j = 0; j < row.length; j++) {
    //        const data = row[j];
    //        const x = pageWidth / row.length * j + 10;
    //        doc.text(data, x + 5, y + 8, { align: 'center' });
    //      }
    //      y += 10;
    //      if (y > pageHeight - 20) {
    //        doc.addPage();
    //        y = 20;
    //      }
    //    }

    //    doc.save('VendorList.pdf');

    const doc = new jsPDF();
    this.sharedService.getreportItemwithPrice().subscribe((results: any) => {
      this.itemsDataList = JSON.parse(JSON.stringify(results));
      // console.log(this.itemCode);

      const headers = ['Item Code', 'Product Name', 'Vendor Name', 'Unit Price', 'Tototaltal', 'Created Date'];

      const rows = this.itemsDataList.map((item: any) => [
        item.item_code,
        item.product_name,
        item.supplier_name,
        item.unit_price,
        item.total,
        item.created_date]);

      const startY = 20;
      const margin = { top: 10, right: 10, bottom: 10, left: 10 };
      const cellWidth = 45;
      const cellHeight = 10;
      const tableWidth = headers.length * cellWidth;
      const tableHeight = (rows.length + 1) * cellHeight;
      const tableProps = { x: margin.left, y: margin.top + startY, width: tableWidth, height: tableHeight, angle: 0 };

      // Draw table header
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      headers.forEach((header, i) => {
        doc.rect(tableProps.x + i * cellWidth, tableProps.y, cellWidth, cellHeight, 'S');
        //  doc.text(tableProps.x + i * cellWidth + cellWidth / 2, tableProps.y + cellHeight / 2, header, 'C');
      });

      // Draw table content
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      rows.forEach((row: any, i: any) => {
        row.forEach((cell: any, j: any) => {
          doc.rect(tableProps.x + j * cellWidth, tableProps.y + (i + 1) * cellHeight, cellWidth, cellHeight, 'S');
          // doc.text(tableProps.x + j * cellWidth + cellWidth / 2, tableProps.y + (i + 1) * cellHeight + cellHeight / 2, cell, 'C');
        });
      });



      // // Create table
      // doc.table(tableProps);

      // Save file
      doc.save('table.pdf');
    });
  }



}





