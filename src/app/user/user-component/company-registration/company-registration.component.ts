import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { FilesService } from 'src/app/services/files.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent {
  companyregistrationForm: any;
  files: any;
  uplaodfileandgetData: any;

  companyData = {
    'company_logo': '',
    'company_name': '',
    'address': '',
    'telephone_no': 0,
    'registered_email': '',
    'status': '1',
    'created_by': sessionStorage.getItem('login_id'),
  }

  logoname: any = {
    company_logo: ''
  }

  constructor(private adminserive: AdminService, public fileServie: FilesService, private router: Router) { }

  ngOnInit(): void {

    this.validation();

  }

  selectedLogo(event: any) {
    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      if (file.type == ('image/png' || 'image/jpg' || 'image/jpeg')) {
        this.files = file;    
        this.logoname.company_logo = this.files.name;
      }
    }
    else {
      //call validation
      this.companyregistrationForm.get('company_logo').touched;
      this.companyregistrationForm.controls["company_logo"].reset();
      Swal.fire({
        title: 'Warning!',
        text: 'Filetype is not valid...',
        icon: 'warning',
      });

    }

  }

  submitRegistraion() {

    if (this.companyregistrationForm.invalid) {

      this.companyregistrationForm.controls['company_logo'].markAsTouched();
      this.companyregistrationForm.controls['company_name'].markAsTouched();
      this.companyregistrationForm.controls['address'].markAsTouched();
      this.companyregistrationForm.controls['telephone_no'].markAsTouched();
      this.companyregistrationForm.controls['registered_email'].markAsTouched();

    }
    else {
      // console.log(this.companyData);

      const formdata = new FormData();
      formdata.append('file', this.files);

      this.fileServie.uploadFileandgetData(formdata).subscribe(
        {
          next: (results: any) => {
            this.uplaodfileandgetData = results;
            this.companyData.company_logo = this.uplaodfileandgetData.filename;
            this.adminserive.registerCompany(this.companyData).subscribe(
              {
                next: (results: any) => {
                  // console.log(results);
                  if (results[0].registercompany == 0) {
                    Swal.fire({
                      title: 'Success!',
                      text: 'Company has been registered Successfully...',
                      icon: 'success',
                    });
                    this.ngOnInit();

                  }
                  else {
                    Swal.fire({
                      title: 'Success!',
                      text: 'Company profile has been updated Successfully...',
                      icon: 'success',
                    });
                    this.ngOnInit();
                  }
                
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
                      text: `Some error occured:${error}.`,
                      footer: '<a href="../login">Please Login again..</a>'
                    }).then(()=>{
                      this.router.navigate(['../login']);
                    })
                  }
                }
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
                text: `Some error occured:${error}.`,
                footer: '<a href="../login">Please Login again..</a>'
              }).then(()=>{
                this.router.navigate(['../login']);
              })
            }
          }
        })
    }
  }

  validation() {
    const emailPattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,64}';
    const CellphonePattern = "^[0-9]{10}$";
    this.companyregistrationForm = new FormGroup(
      {

        company_logo: new FormControl('', [Validators.required]),
        company_name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        telephone_no: new FormControl(0, [Validators.required, Validators.pattern(CellphonePattern)]),
        registered_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(emailPattern)]),
      }

    )
  }
}
