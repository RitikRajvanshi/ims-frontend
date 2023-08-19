import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.scss']
})
export class UpdateVendorComponent {
  getsupplierdata:any;
  supplieridfromparams:any;
  updatesupplierForm:any;

  supplierdata:any = {
    'supplier_name': '',
    'contact_person':'',
    'rating': '',
    'address': '',
    'phone': '',
    'mobile': '',
    'email': '',
    'status': '1',
    'created_by': sessionStorage.getItem('login_id'),
    'category': '',
    'supplier_id':0,
    'gstn':'',
    'pan_no':null
  }

  supplierid = {
    supplier_id:0
  }


  constructor(private adminservice: AdminService, private sharedService:SharedService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    this.validation();

    this.route.params.subscribe((params:any)=>{
      
      this.supplieridfromparams = +params['id'];
      })
  
      this.supplierid.supplier_id = this.supplieridfromparams
  
      // console.log(this.supplierid);
     this.getsupplierdatabyid(this.supplierid);
  }

  
  getsupplierdatabyid(id:any){
    // console.log(id);
    this.sharedService.getsupplierdatabyid(id).subscribe(
      {
        next:(results:any)=>{
      // console.log(results);
      this.getsupplierdata = JSON.parse(JSON.stringify(results))[0];
      // console.log('SupplierData',this.getsupplierdata.supplier_id);
      // console.log(id);

      this.supplierdata.supplier_name = this.getsupplierdata.supplier_name; 
      this.supplierdata.contact_person = this.getsupplierdata.contact_person;
      this.supplierdata.rating = this.getsupplierdata.rating;
      this.supplierdata.address = this.getsupplierdata.address;
      this.supplierdata.phone = this.getsupplierdata.phone;
      this.supplierdata.mobile = this.getsupplierdata.mobile;
      this.supplierdata.email = this.getsupplierdata.email;
      this.supplierdata.category = this.getsupplierdata.category;
      this.supplierdata.supplier_id = id.supplier_id;
      this.supplierdata.gstn = this.getsupplierdata.gstn;
      this.supplierdata.pan_no = this.getsupplierdata.pan_no;
      
    }, 
    error:(error)=>{
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
  }
    )

  }

  updateSupplier(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    this.supplierdata.modified_date = `${year}-${month}-${day}`;
    // console.log(this.supplierdata);

    if(this.updatesupplierForm.invalid)
    {
      this.updatesupplierForm.controls['supplier_name'].markAsTouched();
      this.updatesupplierForm.controls['contact_person'].markAsTouched();
      this.updatesupplierForm.controls['address'].markAsTouched();
      this.updatesupplierForm.controls['mobile'].markAsTouched();
      this.updatesupplierForm.controls['email'].markAsTouched();
      this.updatesupplierForm.controls['category'].markAsTouched();
      Swal.fire({
        title: 'Warning!',
        text: 'Please Fill required fields...',
        icon: 'warning',
        confirmButtonText: 'OK'
      });   
      
    }
    else
    {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
    
    this.adminservice.updateSupplierservice(this.supplierdata).subscribe({
      next:(results:any)=>{
      
    
      Swal.fire({
        title: 'Success!',
        text: 'User updated Successfully...',
        icon: 'success',
      }).then((result:any)=>{
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success text-light ml-2',
            cancelButton: 'btn btn-danger text-light'
          },
          buttonsStyling: false
        })

        // setTimeout(() => {
        swalWithBootstrapButtons.fire({
          title: 'You want to edit more?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            this.router.navigateByUrl('user/vendor-list');
          }
        })  
      })     
    },
  error:(error)=>{
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
  }}
    )
    Swal.fire('Saved!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
  
})

}
  }


  validation() {
    const emailPattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,64}';
    const CellphonePattern = "^[0-9]{10}$";
    this.updatesupplierForm = new FormGroup(
      {

        supplier_name: new FormControl(null, [Validators.required]),
        contact_person: new FormControl(null, [Validators.required]),
        rating: new FormControl(null, [Validators.required]),
        address: new FormControl(null, [Validators.required]),
        phone: new FormControl(null),
        mobile: new FormControl(null, [Validators.required, Validators.pattern(CellphonePattern)]),
        email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(emailPattern)]),
        category: new FormControl(null, [Validators.required]),
        gstn: new FormControl(null),
        pan_no: new FormControl(null)
      }
    
    )
  } 
}
