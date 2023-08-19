import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment.prod';
import { jsPDF } from 'jspdf';
var htmlToPdfmake = require("html-to-pdfmake");
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as XLSX from 'xlsx';
declare var html2pdf: any;
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-order-view',
  templateUrl: './purchase-order-view.component.html',
  styleUrls: ['./purchase-order-view.component.scss']
})
export class PurchaseOrderViewComponent {

  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

  Id: number = 0;
  purchaseId: string = '';
  purchaseJoinData: any;
  issuedata: any;
  // fileName:any;
  purchaseIdsplit: any;


  purchaseData = {
    purchase_id: ''
  }

  purchaseOrderDetail = {
    supplier_name: '',
    issue_date: '',
    expected_date: '',
    total: 0,
    totalindecimal: '',
    roundOffTotal: 0,
    roundOffTotalindecimal: ''
  }

  comapanyDetail: any;

  companydata = {
    companyLogo: '',
    companyName: '',
    companyAddress: '',
    gstInnumber: '',
    phoneNumber: '',
    telephoneNumber: '',
    registeredEmail: ''
  }
  companyLogo: any;

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private renderer: Renderer2, private router: Router) {

  }

  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {

      this.Id = +params['id'];
      this.purchaseId = params['pid'];
      this.purchaseIdsplit = this.purchaseId.split('/')[0]
      this.getCompanyData();

      // console.warn(this.Id, this.purchaseId);
      this.purchaseData.purchase_id = this.purchaseId;

      this.getPurchaseJoinData();

    })
  }

  getCompanyData() {
    this.sharedService.getCompanydata().subscribe(
      {
        next: (results: any) => {
          this.comapanyDetail = results;
          // console.log(this.comapanyDetail);
          // this.companyLogo = 'http://192.168.0.132:3009/files/'+ results[0].company_logo;
          this.companyLogo = `${environment.BASE_URL}files/` + results[0].company_logo;
          // console.log(this.companyLogo);

          // console.log(this.companyLogo);
          this.companydata.companyName = results[0].company_name;
          this.companydata.companyAddress = results[0].address;
          this.companydata.telephoneNumber = results[0].telephone_no;
          this.companydata.registeredEmail = results[0].registered_email;
        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
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

  getPurchaseJoinData() {
    this.sharedService.getPurchaseJoinDatabyPid(this.purchaseData).subscribe(
      {
        next: (results: any) => {

          this.purchaseJoinData = JSON.parse(JSON.stringify(results));
          console.log(results);

          this.purchaseOrderDetail.supplier_name = results[0].supplier_name;
          this.purchaseOrderDetail.issue_date = results[results.length - 1].issue_date;
          this.purchaseOrderDetail.expected_date = results[results.length - 1].expected_date;
          this.totalAndGrandtotal();

        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
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



  //This is for sum of key total of all values in the list and roundoff it to show it on the purhcase order.
  totalAndGrandtotal() {
    this.purchaseOrderDetail.total = this.purchaseJoinData.map((item: any) => item.total).reduce((acc: number, total: any) =>
      acc + total, 0
    )
    this.purchaseOrderDetail.totalindecimal = this.purchaseOrderDetail.total.toFixed(2);
    this.purchaseOrderDetail.roundOffTotal = Math.ceil(this.purchaseOrderDetail.total);
    this.purchaseOrderDetail.roundOffTotalindecimal = (this.purchaseOrderDetail.roundOffTotal).toFixed(2);

  }


  //<-------------------------> this pdf export is suitable for tables <------------------------------>
  public htmlToDocDefinition(html: any) {
    const pdfContent = htmlToPdfmake(html);
    const docDefinition = {
      content: pdfContent,
      pageSize: {
        width: 800, // 210mm
        height: 900, // 297mm
      }
    };
    return docDefinition;
  }

  downloadPdf() {
    const html = this.pdfTable.nativeElement;
    const randomDate = new Date().valueOf();
    // console.log(html);
    const docDefinition = this.htmlToDocDefinition(html.innerHTML);
    pdfMake.createPdf(docDefinition).download(`${this.purchaseId}-${randomDate}`);
  }

  exportexcel(): void {
    const randomDate = new Date().valueOf();
    const worksheet = XLSX.utils.table_to_sheet(this.pdfTable.nativeElement);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${this.purchaseId}-${randomDate}.xlsx`);


  }

  downloadAsPDF() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }

  getBase64Image(img: any) {
    var canvas = document.createElement("canvas");
    // console.log("image");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx!.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  // download() {
  //   let doc = new jsPDF();
  //   doc.autoTable({html: '#pdfTable'});
  //  doc.output('datauri','test.pdf');
  // }

  // <---------------------------> The below one is used to convert and download as it is the page <------------------------------>

  public exportToPdf() {
    const element = this.pdfTable.nativeElement;
    // console.log(element);


    html2canvas(element, { scale: 3 }).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png', 0.8);
      // const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [canvas.width, canvas.height],

      });



      const position = 0;
      const randomDate = new Date().valueOf();
      pdf.addImage(contentDataURL, 'html', 4, position, canvas.width, canvas.height);
      pdf.save(`${randomDate}_purchaseOrder.pdf`); // Generated PDF
    });
  }

  print(): void {

    const printContent = this.pdfTable.nativeElement.innerHTML;
    const printWindow = window.open('', '_blank');
    // printWindow?.document.write(printContent);

    printWindow?.document.write(`
    <html>
      <head>
        <style>
        .report-heading{
          margin-left:245px;
          color:red;
        }


          

        .report-header{
          // padding:10px;
        }

        table {
         border-collapse: collapse;
          margin:10px;   
          background-color:#d8f2ff;  
        }

      th, td {
        border: 1px solid black;
         padding: 10px;
          }

      .billing-right h3 {
          font-weight: 600;
          font-size: 15px;      
        }
   
        .billing-para {
          font-weight: 400;
         font-size: 15px;
         padding-left:5px;
          }

        .term-heading {
         font-size: 25px;
        font-weight: bold;
          }

          .service-para {
            font-size: 18px;
            padding-left: 3px;
            font-weight: 300;
            color: #000;
              }

           .data-form {
           border: 1px solid #e0dddd;
           padding: 20px;
            margin-bottom: 30px;
            box-shadow: 2px 4px 10px 0 rgba(124, 8, 8, 0.05), 2px 4px 10px 0 rgba(0, 34, 51, 0.05);
            // position: relative;
           }

            .m-2{
              // margin:20px;
            }

            .p-5{
              // padding:30px;
            }

            .rows1{
              display: flex;
              flex-wrap: wrap;
            }

            .billing-left {
              display:flex;
              width:100%;
              // padding:15px;
            }
            .spacer{
              width:220px;
            }

            .billing-left h3 {
              font-weight: 600;
              font-size: 15px;         
          }
          
          .billing-left p {
              color: #000;
              font-weight: 400;
              font-size: 15px;          
          }

          col-md-6{
            width:50%;
          }

          container-fluid{
            width:100%;
          }

            .page-background {
              background-color: #ffffff;
              min-height: 100vh;
              justify-content: center;
          }

          /* Large devices (≥1200px) */
                  @media (min-width: 1200px) {
                    .col-lg-8 {
                    flex-basis: 66.666667%;
                      max-width: 66.666667%;
                          }
                  }

              /* Medium devices (≥992px) */
              @media (min-width: 992px) and (max-width: 1199.98px) {
                .col-md-9 {
                  flex-basis: 75%;
                  max-width: 75%;
                }
              }

              /* Small devices (≥768px) */
              @media (min-width: 768px) and (max-width: 991.98px) {
                .col-sm-10 {
                  flex-basis: 83.333333%;
                  max-width: 83.333333%;
                }
              }

              /* Extra small devices (<768px) */
              @media (max-width: 767.98px) {
                .col-12 {
                  flex-basis: 100%;
                  max-width: 100%;
                }
              }

              .termsandheading{
                // padding:15px;
              }

              .heading-service{
                margin-bottom:15px;
                font-size:18px;
              }
            

              .term-heading{
                text-align:center;
              }
              
              .report-header {
                height: 150px;
                display: flex;
                flex-direction: row;
            }
            .report-logo{
                height:80px;
                width:120px;
                margin:10px;
                padding:5px;
            }
            .report-logo img {
                height:80px;
                width:120px;
                
            }
            
            .report-heading{
                margin-top:20px;
            }

            .report-heading h1{
                font-size:20px;
                margin-bottom:20px;
                color:red;
                font-weight: bold;
                
            }

            html{
              padding:10px;
              font-family: 'Roboto', sans-serif;
        }
            }

            .text-danger, .apv{
              color:red;
            }

            .potable{
              width: 100%;
              max-width: 100%;
              margin-bottom: 1rem;
              background-color: transparent;
              border-collapse: collapse;
              border: 1px solid #dee2e6;
              color: #343a40 !important;

            }

            .potable th,
            .potable td {
              border: 1px solid #dee2e6;
                  }

            .potable tbody tr:nth-of-type(odd) {
              background-color: rgba(0, 0, 0, 0.05);
              // background-color:#d8f2ff
            }

            @media only print {

              body{
                  margin:20px;
              }
              }
        </style>
      </head>
  
    </html>
  `, printContent);
    printWindow?.document.close();
    printWindow?.print();

  }




}
