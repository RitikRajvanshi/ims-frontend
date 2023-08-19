import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent {

  addSupplierForm: any;
  response: any;
  categoryValue: any;

  supplierdata = {
    'supplier_name': '',
    'contact_person': '',
    'rating': '',
    'address': '',
    'phone': '',
    'mobile': '',
    'email': '',
    'status': '1',
    'created_by': sessionStorage.getItem('login_id'),
    'category': '',
    'gstn':'',
    'pan_no':null
  }


  constructor(private adminserive: AdminService, private router: Router) { }

  ngOnInit(): void {

    this.validation();
  }

  addnewSupplier() {
    if (this.addSupplierForm.invalid) {
      this.addSupplierForm.controls['supplier_name'].markAsTouched();
      this.addSupplierForm.controls['contact_person'].markAsTouched();
      this.addSupplierForm.controls['rating'].markAsTouched();
      this.addSupplierForm.controls['address'].markAsTouched();
      this.addSupplierForm.controls['mobile'].markAsTouched();
      this.addSupplierForm.controls['email'].markAsTouched();
      this.addSupplierForm.controls['category'].markAsTouched();
      // this.addSupplierForm.controls['category'].markAsTouched();
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill required fields...',
        icon: 'warning',
        confirmButtonText: 'OK',
        color: '#00235E'
      })

    }
    else {


      //service call to add supplier
      console.log(this.supplierdata);

      this.adminserive.addSupplierservice(this.supplierdata).subscribe(
        {
          next: (results: any) => {
            this.response = JSON.parse(JSON.stringify(results)).addsupplier;
            console.log(this.response)

            //firstcheck email is registered or not according to it, addsupplier.

            if (this.response !== '1') {
              Swal.fire({
                title: 'Success!',
                text: 'Supplier added successfully...',
                icon: 'success',
              });
              this.supplierdata.rating ='null';
              this.supplierdata.category ='null';
              this.ngOnInit();
            }

            else {
              Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Email is already registered...',
              });
              this.ngOnInit();
            }
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
  }


  validation() {
    const emailPattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,64}';
    const CellphonePattern = "^[0-9]{10}$";
    this.addSupplierForm = new FormGroup(
      {

        supplier_name: new FormControl(null, [Validators.required]),
        contact_person: new FormControl(null, [Validators.required]),
        rating: new FormControl(null, [Validators.required]),
        address: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.pattern(CellphonePattern)]),
        mobile: new FormControl(null, [Validators.required, Validators.pattern(CellphonePattern)]),
        email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(emailPattern)]),
        category: new FormControl(null, [Validators.required]),
        gstn: new FormControl(null),
        pan_no: new FormControl(null)
      }

    )
  }
}
