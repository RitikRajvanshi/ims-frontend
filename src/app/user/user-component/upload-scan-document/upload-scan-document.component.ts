import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { FilesService } from 'src/app/services/files.service';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
declare var require: any
const FileSaver = require('file-saver');

//used to download and save file on your system;

@Component({
  selector: 'app-upload-scan-document',
  templateUrl: './upload-scan-document.component.html',
  styleUrls: ['./upload-scan-document.component.scss']
})
export class UploadScanDocumentComponent {
  searchItem = '';
  uploaddocumentForm: any
  categoryData: any;
  files: any;
  uploadProgress:any;
  uploadfileandgetData: any;

  display1: boolean = true;      // for add button
  display2: boolean = false;     // for update button

  toggleListBtn = true;
  toggleAddbtn = false;
  display3 = true;
  display4 = false;
  getDocData: any;
  getcreatedby: any;

  //for inserting document
  uploadDocData: any = {
    document_name: '',
    document_path: '',
    mimetype: '',
    category_id: 0,
    description: '',
    created_by: sessionStorage.getItem('login_id')
  }

  //for updating document
  uploadDocData2: any = {
    document_id: 0,
    document_name: '',
    document_path: '',
    mimetype: '',
    category_id: 0,
    description: ''
  }

  updateDocDataotherthanfile: any = {
    document_id: 0,
    category_id: 0,
    description: '',
  }

  created_by = sessionStorage.getItem('name');

  fileName = {
    file_name: ''
  }

  documentId = {
    document_id: 0
  }


  constructor(private sharedService: SharedService, private filesServices: FilesService, private router: Router) { }

  ngOnInit(): void {
    this.validation();
    this.getCategoryData();
    this.getDocumentData();
  }

  getCategoryData() {
    this.sharedService.getCategorydata().subscribe(
      {
        next: (results: any) => {
          this.categoryData = results;
          // console.log(results);
        }
        , error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            //  const expirationTime = error.error.expirationTime;
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

  getDocumentData() {
    this.sharedService.getDocumentdata().subscribe(
      {
        next: (results: any) => {
          this.getDocData = results;

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
    // console.log(this.files);

  }

  selectedCategory(id: any) {
    // console.log(id);
    this.uploadDocData.category_id = + id;
    // console.log(this.uploadDocData);
  }

  getDocname(event: any) {

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
        this.uploaddocumentForm.get('document_name').touched;
        this.uploaddocumentForm.controls["document_name"].reset();
        Swal.fire({
          title: 'Warning!',
          text: 'Filetype is not valid...',
          icon: 'warning',
        });

      }
    }

  }

  uploadDocument() {

    if (this.uploaddocumentForm.invalid) {
      this.uploaddocumentForm.controls['document_name'].markAsTouched();
      this.uploaddocumentForm.controls['category_id'].markAsTouched();
      this.uploaddocumentForm.controls['description'].markAsTouched();
    }
    else {

      if (this.display1) {

        const formdata = new FormData();
        formdata.append('file', this.files);

        //uploading document in backend folder name 'file' and gets its information

        this.filesServices.uploadFileandgetData(formdata).subscribe
          // {
          //   next: (results: any) => {
            ((event: HttpEvent<any>) => {

              if (event.type === HttpEventType.UploadProgress && event.total!== undefined) {
           this.uploadProgress = Math.round((100 * event.loaded) / event.total);
         }
          else if (event.type === HttpEventType.Response) {
           this.uploadProgress = 100; // Completed
           const results = event.body;
              console.log(results);
              this.uploadfileandgetData = results;
              // console.log(this.uploadfileandgetData.filename, this.uploadfileandgetData.filepath, this.uploadfileandgetData.mimetype);
              this.uploadDocData.document_name = this.uploadfileandgetData.filename;

              this.uploadDocData.document_path = this.uploadfileandgetData.filepath;
              this.fileName.file_name = this.uploadfileandgetData.filename;
              this.uploadDocData.mimetype = this.uploadfileandgetData.mimetype;
              // console.log(this.uploadDocData)

              this.filesServices.uploadscanDocument(this.uploadDocData).subscribe(
                {
                  next: (results: any) => {
                    // alert(results.message);
                    Swal.fire({
                      title: 'Success!',
                      text: 'Document updated Successfully',
                      icon: 'success',
                    }).then(()=>{
                      this.ngOnInit();
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
                })

            }
          })
      }

      else {

        if (this.files == undefined || null || "") {
          this.updateDocDataotherthanfile.description = this.uploadDocData.description;
          this.updateDocDataotherthanfile.category_id = this.uploadDocData.category_id;


          // console.log(this.updateDocDataotherthanfile)
          this.filesServices.updateDocotherthanFile(this.updateDocDataotherthanfile).subscribe(
            {
              next: (results: any) => {
                // alert(results.message);
                
                Swal.fire({
                  title: 'Success!',
                  text: 'Document Updated Successfully',
                  icon: 'success',
                }).then(()=>{
                  this.ngOnInit();
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
            })


        }
        else {

          const formdata2 = new FormData();
          formdata2.append('file', this.files);

          this.filesServices.uploadFileandgetData(formdata2).subscribe(
            {
              next: (event: HttpEvent<any>) => {
                if (event.type === HttpEventType.UploadProgress && event.total!== undefined) {
                  this.uploadProgress = Math.round((100 * event.loaded) / event.total);
                }
                 else if (event.type === HttpEventType.Response) {
                  this.uploadProgress = 100; // Completed
                  const results = event.body;
                    // console.log(results);

                this.uploadfileandgetData = results;
                // console.log(this.uploadfileandgetData.filename, this.uploadfileandgetData.filepath, this.uploadfileandgetData.mimetype);

                this.uploadDocData2.document_name = this.uploadfileandgetData.filename;
                this.uploadDocData2.document_path = this.uploadfileandgetData.filepath;
                this.uploadDocData2.mimetype = this.uploadfileandgetData.mimetype;
                this.uploadDocData2.category_id = this.uploadDocData.category_id;
                this.uploadDocData2.description = this.uploadDocData.description;

                // console.log(this.uploadDocData2)
                this.filesServices.updatefullDoc(this.uploadDocData2).subscribe(
                //   (results: any) => {
                //   // alert(results.message);
                //   Swal.fire({
                //     title: 'Success!',
                //     text: 'Document Uploaded Successfully',
                //     icon: 'success',
                //   }).then(() => {
                //     location.reload();
                //   })
                // }
                {
                  next: (results: any) => {
                    // alert(results.message);
                    
                    Swal.fire({
                      title: 'Success!',
                      text: 'Document Updated Successfully',
                      icon: 'success',
                    }).then(() => {
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
            }
          })
        }
      }
    }
  }

  updateDocument(id: any) {
    //this is used to clear the validation of particular control
    this.uploaddocumentForm.controls['document_name'].clearValidators();

    this.display1 = false;
    this.display2 = true;
    this.display4 = false;
    this.display3 = true;
    this.toggleListBtn = true;
    this.toggleAddbtn = false;
    this.documentId.document_id = id;

    this.sharedService.getDocumentdatabydocId(this.documentId).subscribe(
      {
        next: (results: any) => {
          this.updateDocDataotherthanfile.document_id = this.documentId.document_id;
          this.uploadDocData2.document_id = this.documentId.document_id;

          this.fileName.file_name = results[0].document_name;
          // console.log(results[0].document_name)
          this.uploadDocData.category_id = results[0].category_id;
          this.updateDocDataotherthanfile.category_id = this.uploadDocData.category_id;

          this.uploadDocData.description = results[0].description;
          this.updateDocDataotherthanfile.description = this.uploadDocData.description;
          // console.log(this.updateDocDataotherthanfile);

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

  //donwload and save file in local system (we use package name file-saver)
  downloadPDF(name: any) {

    const fileUrl = `http://192.168.0.132:3009/files/${name}`;
    const fileName = name;

    FileSaver.saveAs(fileUrl, fileName)
    
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

    this.uploaddocumentForm = new FormGroup({
      document_name: new FormControl('', [Validators.required]),
      category_id: new FormControl(0, [Validators.required]),
      file_name: new FormControl(''),
      description: new FormControl('', [Validators.required])
    })
  }

}
