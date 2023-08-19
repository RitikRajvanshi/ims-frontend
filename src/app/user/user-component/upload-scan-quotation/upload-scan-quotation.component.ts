import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { FilesService } from 'src/app/services/files.service';
import { Router } from '@angular/router';
declare var require: any
const FileSaver = require('file-saver');
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-scan-quotation',
  templateUrl: './upload-scan-quotation.component.html',
  styleUrls: ['./upload-scan-quotation.component.scss']
})
export class UploadScanQuotationComponent {
  searchItem = '';
  uploadquotationForm: any
  requestData: any;
  files: any;
  uploadfileandgetData: any;
  uploadProgress:any;

  display1: boolean = true;      // for add button
  display2: boolean = false;     // for update button

  toggleListBtn = true;
  toggleAddbtn = false;
  display3 = true;
  display4 = false;

  getquotationData: any;

  //for inserting quotation
  uploadquotationData: any = {
    quotation_name: '',
    quotation_path: '',
    mimetype: '',
    request_id: 0,
    description: '',
    created_by: sessionStorage.getItem('login_id')
  }

  //for updating quotation
  uploadquotationData2: any = {
    quotation_id: 0,
    quotation_name: '',
    quotation_path: '',
    mimetype: '',
    request_id: 0,
    description: ''
  }

  updatequotationDataotherthanfile: any = {
    quotation_id: 0,
    request_id: 0,
    description: '',
  }

  created_by = sessionStorage.getItem('name');

  fileName = {
    file_name: ''
  }

  quotationId = {
    quotation_id: 0
  }


  constructor(private sharedService: SharedService, private filesServices: FilesService, private router: Router) { }

  ngOnInit(): void {
    this.validation();
    this.getAcceptedRequest();
    this.getQuotationData();

  }

  getAcceptedRequest() {
    this.sharedService.getacceptedRequest().subscribe(
      {
        next: (result: any) => {
          this.requestData = result;
          // console.log(this.requestData);
        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Session expired. Please login..',
              footer: '<a href="../login">Login..</a>'
            })
            this.router.navigate(['../login']);
          }
          else {
            // console.log('Other error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Some error occured...',
              footer: '<a href="../login">Please Login again..</a>'
            })
            this.router.navigate(['../login']);
          }
        }
      })

  }

  getQuotationData() {
    this.sharedService.getQuotationdata().subscribe(
      {
        next: (result: any) => {
          this.getquotationData = result;
          // console.log(this.requestData);
        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Session expired. Please login..',
              footer: '<a href="../login">Login..</a>'
            })
            this.router.navigate(['../login']);
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Some error occured...',
              footer: '<a href="../login">Please Login again..</a>'
            })
            this.router.navigate(['../login']);
          }
        }
      })

  }

  selectedrequest(id: any) {
    // console.log(id);
    this.uploadquotationData.request_id = + id;
    // console.log(this.uploadquotationData);
  }

  getquotationname(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type == 'application/pdf') {
        // console.log('correct type');
        //this.file have the pdf file
        this.files = file;
        // console.log(this.files);
        this.fileName.file_name = this.files.name;
      }

      else {
        //call validation
        this.uploadquotationForm.get('quotation_name').touched;
        this.uploadquotationForm.controls["quotation_name"].reset();
        alert('Filetype is not Valid.');

      }
    }

  }

  uploadquotation() {

    if (this.uploadquotationForm.invalid) {
      this.uploadquotationForm.controls['quotation_name'].markAsTouched();
      this.uploadquotationForm.controls['request_id'].markAsTouched();
      this.uploadquotationForm.controls['description'].markAsTouched();
    }
    else {

      if (this.display1) {

        const formdata = new FormData();
        formdata.append('file', this.files);

        //uploading quotation in backend folder name 'file' and gets its information

        this.filesServices.uploadFileandgetData(formdata).subscribe(
          // {
          //   next: (results: any) => {
            (event: HttpEvent<any>) => {

              if (event.type === HttpEventType.UploadProgress && event.total!== undefined) {
           this.uploadProgress = Math.round((100 * event.loaded) / event.total);
         }
          else if (event.type === HttpEventType.Response) {
           this.uploadProgress = 100; // Completed
           const results = event.body;
              console.log(results);

              this.uploadfileandgetData = results;
              // // console.log(this.uploadfileandgetData.filename, this.uploadfileandgetData.filepath, this.uploadfileandgetData.mimetype);

              this.uploadquotationData.quotation_name = this.uploadfileandgetData.filename;
              this.uploadquotationData.quotation_path = this.uploadfileandgetData.filepath;
              this.uploadquotationData.mimetype = this.uploadfileandgetData.mimetype;

              // console.log(this.uploadquotationData)

              this.filesServices.uploadQuotation(this.uploadquotationData).subscribe(
                {
                  next: (results: any) => {
                    // alert(results.message);
                    Swal.fire({
                      title: 'Success!',
                      text: 'Quotation Uploaded Successfully',
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
                })
            }
          })
      }

      else {

        if (this.files == undefined || null || "") {
          this.updatequotationDataotherthanfile.description = this.uploadquotationData.description;
          this.updatequotationDataotherthanfile.request_id = this.uploadquotationData.request_id;


          // console.log(this.updatequotationDataotherthanfile)
          this.filesServices.updateQuatationotherthanFile(this.updatequotationDataotherthanfile).subscribe(
            {
              next: (results: any) => {
                Swal.fire({
                  title: 'Success!',
                  text: 'Quotation Updated Successfully',
                  icon: 'success',
                }).then(() => {
                  location.reload();
                });
             
              }, error: (error) => {
                
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
        else {

          const formdata2 = new FormData();
          formdata2.append('file', this.files);

          this.filesServices.uploadFileandgetData(formdata2).subscribe((event: HttpEvent<any>) => {
                if (event.type === HttpEventType.UploadProgress && event.total!== undefined) {
             this.uploadProgress = Math.round((100 * event.loaded) / event.total);
           }
            else if (event.type === HttpEventType.Response) {
             this.uploadProgress = 100; // Completed
             const results = event.body;
                console.log(results);

                this.uploadfileandgetData = results;
                // console.log(this.uploadfileandgetData.filename, this.uploadfileandgetData.filepath, this.uploadfileandgetData.mimetype);

                this.uploadquotationData2.quotation_name = this.uploadfileandgetData.filename;
                this.uploadquotationData2.quotation_path = this.uploadfileandgetData.filepath;
                this.uploadquotationData2.mimetype = this.uploadfileandgetData.mimetype;
                this.uploadquotationData2.request_id = this.uploadquotationData.request_id;
                this.uploadquotationData2.description = this.uploadquotationData.description;

                // console.log(this.uploadquotationData2)

                this.filesServices.updatefullQuotation(this.uploadquotationData2).subscribe(
                  {
                    next: (results: any) => {
                      Swal.fire({
                        title: 'Success!',
                        text: 'Quotation Updated Successfully',
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
                  })
              }
            })
        }
      }
    }
  }

  updatequotation(id: any) {
    //this is used to clear the validation of particular control

    this.uploadquotationForm.controls['quotation_name'].clearValidators();
    this.display1 = false;
    this.display2 = true;
    this.display4 = false;
    this.display3 = true;
    this.toggleListBtn = true;
    this.toggleAddbtn = false;
    this.quotationId.quotation_id = id;

    this.sharedService.getQuotationdatabyId(this.quotationId).subscribe(
      {
        next: (results: any) => {
          // console.log(results, 'results')
          this.updatequotationDataotherthanfile.quotation_id = this.quotationId.quotation_id;
          this.uploadquotationData2.quotation_id = this.quotationId.quotation_id;

          this.fileName.file_name = results[0].quotation_name;
          this.uploadquotationData.request_id = results[0].request_id;
          this.updatequotationDataotherthanfile.request_id = this.uploadquotationData.request_id;

          this.uploadquotationData.description = results[0].description;
          this.updatequotationDataotherthanfile.description = this.uploadquotationData.description;


          // // console.log(results[0].description);
          // console.log(this.files, 'files');
          // console.log(this.updatequotationDataotherthanfile);
        },
        error: (error) => {
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

  //donwload and save file in local system (we use package name file-saver)
  downloadPDF(name: any) {

    const fileUrl = `http://192.168.0.132:3009/files/${name}`;
    const fileName = name;

    FileSaver.saveAs(fileUrl, fileName);
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

    this.uploadquotationForm = new FormGroup({
      quotation_name: new FormControl('', [Validators.required]),
      request_id: new FormControl(0, [Validators.required]),
      file_name: new FormControl(''),
      description: new FormControl('', [Validators.required])
    })
  }
}
