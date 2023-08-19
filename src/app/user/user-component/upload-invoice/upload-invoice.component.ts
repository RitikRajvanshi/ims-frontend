import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FilesService } from 'src/app/services/files.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';



@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.scss']
})
export class UploadInvoiceComponent {
  invoiceForm: any;
  searchItem = '';

  purchaseData = {
    purchase_id: '',
    invoice_no: '',
    modified_by: sessionStorage.getItem('login_id'),
    filename: '',
    filepath: '',
    mimetype: ''
  }

  //have to upload only invoice
  purchaseData2 = {
    purchase_id: '',
    invoice_no: '',
    modified_by: sessionStorage.getItem('login_id')
  }

  purchaseIdobj = {
    purchase_id: ''
  }



  purchasedata: any;                  //according to invoice
  purchasedataArray: any = [];
  selectedpurchaseData: any;
  searchText = '';                    //for seaching purchase Id
  display: boolean = false;           //for show/hide list of purchase Id
  files: any;
  toggleListBtn = true;
  toggleAddbtn = false;
  display1 = true;                    //for displaying add button
  display2 = false;                   //for displaying update button
  display3 = true;
  display4 = false;
  readonly = false;                   //property binding for purchase_id formcontrol
  getpurchaseDatafrompo: any;
  purchaseId: any;
  uploadFileandgetData: any;
  submitted = false;
  uploadProgress:any;
    // Add a class to the progress bar to apply the custom styles
    progressBarClass: string = 'mat-progress-bar-primary';

  constructor(private sharedService: SharedService, private filesService: FilesService, private router: Router) { }

  ngOnInit(): void {
    this.validation();
    this.getPurchaseDataAcctoinvoice();
    this.getPurchaseDataFromPO();


  }

  getPurchaseDataAcctoinvoice() {
    this.sharedService.getpurchasedatafrompoacctoinvoice().subscribe(
      {
        next: (results: any) => {
          // console.log(results[0]);
          this.purchasedata = results;


          for (let item of this.purchasedata) {
            //save the data in array
            this.purchasedataArray.push(item.purchase_id);
            // console.log(this.purchasedataArray);
          }

        }
        , error: (error) => {
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

  getPurchaseDataFromPO() {
    this.sharedService.getpurchasedataforInvoice().subscribe(
      {
        next: (results: any) => {
          this.getpurchaseDatafrompo = results;
          // console.log(results[0].filename);

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

  get f() {
    return this.invoiceForm.controls;
  }

  showData() {
    this.display = true;
  }
  hidedata() {
    this.display = false;

  }

  selectPurchaseid(id: any) {

    // console.log(id);
    this.selectedpurchaseData = id;
    this.purchaseData.purchase_id = id;
    this.purchaseData2.purchase_id = id;
    this.display = false;
  }

  selectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);

      if (file.type == 'application/pdf') {
        console.log('correct type');
        //this.file have the pdf file
        this.files = file;
        console.log(this.files);
      }

      else {
        //call validation
        this.invoiceForm.get('filename').touched;
        this.invoiceForm.controls["filename"].reset();
        // alert('Filetype is not Valid.')
        Swal.fire({
          title: 'Warning!',
          text: 'Filetype is not valid...',
          icon: 'warning',
        });
        // this.invoiceForm.controls["filename"].setValidators([Validators.required]);
        // this.invoiceForm.get('filename').updateValueAndValidity();

      }


    }
  }


  uploadInvoice() {
    // ----------------add----------------
    // this.submitted = true;

    if (this.invoiceForm.invalid) {  
      this.invoiceForm.controls['filename'].markAsTouched();
      this.invoiceForm.controls['purchase_id'].markAsTouched();
      this.invoiceForm.controls['invoice_no'].markAsTouched(); 
    }
    else {
      if (this.display1) {

        const formdata = new FormData();
        console.log(this.files);
        formdata.append('file', this.files)
        console.log(formdata);


        this.filesService.uploadFileandgetData(formdata)
          .subscribe((event: HttpEvent<any>) => {

             if (event.type === HttpEventType.UploadProgress && event.total!== undefined) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        }
         else if (event.type === HttpEventType.Response) {
          this.uploadProgress = 100; // Completed
          const results = event.body;
            // console.log(results);
              this.uploadFileandgetData = results;
              console.log(this.uploadFileandgetData.filename);

              this.purchaseData.filename = results.filename;
              this.purchaseData.filepath = this.uploadFileandgetData.filepath;
              this.purchaseData.mimetype = this.uploadFileandgetData.mimetype;
              console.log(this.purchaseData)
        

              this.filesService.uploadInvoiceinpo(this.purchaseData).subscribe(
           

                // (results: any) => {
                //   console.log(results);
                //   Swal.fire({
                //     title: 'Success!',
                //     text: 'Invoice Uploaded Successfully',
                //     icon: 'success',
                //   }).then(() => {
                //     location.reload();
                //   });                          
                // }
                {
                  next: (results: any) => {
                    // console.log(results);
                    Swal.fire({
                      title: 'Success!',
                      text: 'Invoice Uploaded Successfully',
                      icon: 'success',
                    });
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
                } 
              
            )
              }
              }      
          
        )
            }

      //----------------------upload-----------------------
      else {

    

        if (this.files == undefined || null || '') {
          // console.log(' I am here now');

          this.purchaseData2.invoice_no = this.purchaseData.invoice_no;
          // console.log(this.purchaseData2);

          this.filesService.updateInvoicenoinpo(this.purchaseData2).subscribe(
            
            // (results)=>{
            //   Swal.fire({
            //     title: 'Success!',
            //     text: 'Invoice Uploaded Successfully',
            //     icon: 'success',
            //   });
            //   this.ngOnInit();
            // }
            {
              next: (results: any) => {
                // console.log(results);
                Swal.fire({
                  title: 'Success!',
                  text: 'Invoice Updated Successfully',
                  icon: 'success',
                }).then(()=>{
                  location.reload();
                })
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
            } 
            )


        }
        else {

          const formdata2 = new FormData();
          formdata2.append('file', this.files);

          this.filesService.uploadFileandgetData(formdata2).subscribe(
            {
              next: (event: HttpEvent<any>) => {
                if (event.type === HttpEventType.UploadProgress && event.total!== undefined) {
                  this.uploadProgress = Math.round((100 * event.loaded) / event.total);
                }
                 else if (event.type === HttpEventType.Response) {
                  this.uploadProgress = 100; // Completed
                  const results = event.body;
                    // console.log(results);
                 
                

                this.purchaseData.filename = results.filename;
                this.purchaseData.filepath = results.filepath;
                this.purchaseData.mimetype = results.mimetype;

                this.purchaseData.purchase_id = this.purchaseId;
                 
                // console.log(this.purchaseData);
                 

                this.filesService.uploadInvoiceinpo(this.purchaseData).subscribe(
                //   (results: any) =>
                
                // {
                //   Swal.fire({
                //     title: 'Success!',
                //     text: 'Invoice Uploaded Successfully',
                //     icon: 'success',
                //   }).then(() => {
                //     location.reload();
                //   });

                // }
                {
                  next: (results: any) => {
                    // console.log(results);
                    Swal.fire({
                      title: 'Success!',
                      text: 'Invoice Updated Successfully',
                      icon: 'success',
                    }).then(() => {
                          location.reload();
                        });
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
                } 
                
                )
              }
            }
            
            })
        }
      }
    }
  }


  updateInvoicebtn(data: any) {
    //this is used to clear the validation of particular control

    this.invoiceForm.controls['filename'].clearValidators();
    this.display4 = false;
    this.display3 = true;
    this.toggleListBtn = true;
    this.toggleAddbtn = false;

    this.display1 = false;
    this.display2 = true;
    this.display = false;
    this.readonly = true;

    this.purchaseData2.purchase_id = data;
    this.purchaseIdobj.purchase_id = data;


    // // console.log(this.purchaseData);
    this.sharedService.getpurchasedatabyid(this.purchaseIdobj).subscribe(
      {
        next: (results: any) => {
          this.purchaseId = results[0].purchase_id;
          this.purchaseData2.purchase_id = results[0].purchase_id;
          this.purchaseData.invoice_no = results[0].invoice_no;

          // console.log(this.purchaseData2.purchase_id, 'data2 purchaseid')
          // this.invoiceForm.get('purchase_id').patchValue(results[0].purchase_id);

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

  toggleActionAdd() {
    this.toggleListBtn = false;
    this.toggleAddbtn = true;
    this.display3 = false;
    this.display4 = true;
  }

  toggleActionUpdate() {
    this.toggleListBtn = true;
    this.toggleAddbtn = false;
    this.display3 = true;
    this.display4 = false;
  }


  validation() {
    this.invoiceForm = new FormGroup({
      purchase_id: new FormControl('', [Validators.required]),
      invoice_no: new FormControl('', [Validators.required]),
      filename: new FormControl('', [Validators.required])
    })
  }

}
