import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { CheckService } from 'src/app/services/check.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-evaluation',
  templateUrl: './supplier-evaluation.component.html',
  styleUrls: ['./supplier-evaluation.component.scss']
})
export class SupplierEvaluationComponent {
  supplierData = {
    purchase_id: '',
    supplier_name: '',
    address: '',
    phone: '',
    mobile: '',
    email: '',
  }

  evaluationData = {
    purchase_id: '',
    evaluation_basis: '',
    vendor_status: '',
    qualitybasis_grading: '',
    pricebasis_grading: '',
    communicationbasis_grading: '',
    deliverybasis_grading: '',
    commitmentbasis_grading: '',
    flag: 'true',
    evaluation_done_by: sessionStorage.getItem('login_id')
  }


  evaluationGradingValuesArray: any = []
  qualityGrading: any;
  priceGrading: any;
  communicationGrading: any;
  deliveryGrading: any;
  commitmentGrading: any;

  TotalGrading = 0;
  purchaseId = {
    purchase_id: ''
  }

  supplierevaluationForm: any;
  purchaseIdFromparams: any;
  display: boolean = true;
  readonly: boolean = false;
  bgColor = 'white';
  textColor = 'black';
  BackgroundColor: any;
  TextColor: any;
  constructor(public activatedRoute: ActivatedRoute, private router: Router, private sharedService: SharedService,
    private adminService: AdminService, private checkService: CheckService) {
  }


  ngOnInit() {

    this.validation();

    this.activatedRoute.params.subscribe((params: any) => {

      this.purchaseIdFromparams = params['pid'];
      this.purchaseId.purchase_id = this.purchaseIdFromparams
      // console.log(this.purchaseId.purchase_id);
      this.getsupplierdata(this.purchaseId);

      //verifying the supplier is already evaluated or not

      this.checkService.verificationofpIdinsupplierEvaluation(this.purchaseId).subscribe(
        {
          next: (results: any) => {

            if (results[0].verification_of_supplierevaluation == 1) {

              this.sharedService.getsupplierEvaluationdatabypid(this.purchaseId).subscribe(
                {
                  next: (results: any) => {
                    // console.log(results);
                    if (results[0].vendor_status == 'Approved') {
                      this.BackgroundColor = '#cbf5dd'
                    }
                    else if (results[0].vendor_status == 'Rejected') {
                      this.BackgroundColor = '#ff9a98';
                    }
                    else {
                      this.BackgroundColor = '#FFD580';
                    }
                    this.evaluationData.evaluation_basis = results[0].evaluation_basis;
                    this.evaluationData.qualitybasis_grading = results[0].qualitybasis_grading;
                    this.evaluationData.pricebasis_grading = results[0].pricebasis_grading;
                    this.evaluationData.communicationbasis_grading = results[0].communicationbasis_grading;
                    this.evaluationData.deliverybasis_grading = results[0].deliverybasis_grading;
                    this.evaluationData.commitmentbasis_grading = results[0].commitmentbasis_grading;
                    this.evaluationData.vendor_status = results[0].vendor_status;
                    this.display = false;
                    this.supplierevaluationForm.get('qualitybasis_grading')?.disable();
                    this.supplierevaluationForm.get('pricebasis_grading')?.disable();
                    this.supplierevaluationForm.get('communicationbasis_grading')?.disable();
                    this.supplierevaluationForm.get('deliverybasis_grading')?.disable();
                    this.supplierevaluationForm.get('commitmentbasis_grading')?.disable();
                    this.supplierevaluationForm.get('vendor_status')?.disable();
                    this.readonly = true;

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

            } else {
              // console.log('Supplier didn\'t evaluate yet....')
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
                text: 'Some error occured...',
                footer: '<a href="../login">Please Login again..</a>'
              }).then(()=>{
                this.router.navigate(['../login']);

              })
            }
          }
        })



    })

  }

  getsupplierdata(pid: any) {

    this.sharedService.getsupplierjoindatafrompo(pid).subscribe(
      {
        next: (results: any) => {
          this.supplierData.purchase_id = results[0].purchase_id;
          this.evaluationData.purchase_id = results[0].purchase_id;

          this.supplierData.supplier_name = results[0].supplier_name;
          this.supplierData.address = results[0].address;
          this.supplierData.phone = results[0].phone;
          this.supplierData.mobile = results[0].mobile;
          this.supplierData.email = results[0].email;
          // console.log(this.supplierData);

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

  Selectqualitygrading(data: any) {
    if (data == 'A') {
      this.evaluationGradingValuesArray[0] = 3;

    }
    else if (data == 'B') {
      this.evaluationGradingValuesArray[0] = 2;

    }
    else {
      this.evaluationGradingValuesArray[0] = 1;

    }


    this.evaluationData.qualitybasis_grading = data;
    // console.log(data);

    this.TotalGrading = this.evaluationGradingValuesArray.reduce(this.add, 0);
    this.gradingValue();


  }

  Selectpricegrading(data: any) {
    if (data == 'A') {
      this.evaluationGradingValuesArray[1] = 3;


    }
    else if (data == 'B') {
      this.evaluationGradingValuesArray[1] = 2;


    }
    else {
      this.evaluationGradingValuesArray[1] = 1;


    }

    this.evaluationData.pricebasis_grading = data;
    // // console.log(data3);

    this.TotalGrading = this.evaluationGradingValuesArray.reduce(this.add, 0);
    this.gradingValue();


  }

  Selectcommunicationgrading(data: any) {
    if (data == 'A') {
      this.evaluationGradingValuesArray[2] = 3;


    }
    else if (data == 'B') {
      this.evaluationGradingValuesArray[2] = 2;


    }
    else {
      this.evaluationGradingValuesArray[2] = 1;

    }


    this.evaluationData.communicationbasis_grading = data;

    this.TotalGrading = this.evaluationGradingValuesArray.reduce(this.add, 0);
    this.gradingValue();

  }

  Selectdeliverygrading(data: any) {
    if (data == 'A') {
      this.evaluationGradingValuesArray[3] = 3;

    }
    else if (data == 'B') {
      this.evaluationGradingValuesArray[3] = 2;

    }
    else {
      this.evaluationGradingValuesArray[3] = 1;

    }

    this.evaluationData.deliverybasis_grading = data;
    // // console.log(data3);


    this.TotalGrading = this.evaluationGradingValuesArray.reduce(this.add, 0);
    this.gradingValue();


  }

  //sum of array values thorugh reduce method
  add(accumulator: any, a: any) {
    return accumulator + a;
  }

  gradingValue() {
    // console.log(this.TotalGrading);
    if (this.TotalGrading > 12) {
      this.evaluationData.vendor_status = 'Approved';
      this.textColor = '#007500';
      // this.bgColor = '#ff6666';
      // this.bgColor = '#ff3333';
    }
    else if (this.TotalGrading < 12) {
      this.evaluationData.vendor_status = 'Rejected';
      this.textColor = '#ff3333';

      // this.bgColor = '#9ACD32';
    }
    else {
      this.evaluationData.vendor_status = 'Conditionally accepted';
      this.textColor = ' #CC5500';
      // this.bgColor = 'orange';

    }
  }

  Selectcommitmentgrading(data: any) {
    if (data == 'A') {
      this.evaluationGradingValuesArray[4] = 3;

    }
    else if (data == 'B') {
      this.evaluationGradingValuesArray[4] = 2;


    }
    else {
      this.evaluationGradingValuesArray[4] = 1;
    }

    this.evaluationData.commitmentbasis_grading = data;
    // console.log(this.evaluationData);



    this.TotalGrading = this.evaluationGradingValuesArray.reduce(this.add, 0);
    // if(this.qualityGrading==0 || this.qualityGrading==0|| this.priceGrading==0||this.communicationGrading==0 || this.deliveryGrading==0|| this.commitmentGrading==0){
    //   this.TotalGrading = this.qualityGrading + this.priceGrading + this.communicationGrading + this.deliveryGrading+ this.commitmentGrading;
    //   if(this.TotalGrading < 12){
    //     this.evaluationData.vendor_status = 'Rejected';
    //     this.textColor ='#ff3333';
    //     // this.bgColor = '#ff6666';
    //     // this.bgColor = '#ff3333';
    //   }
    //   else if(this.TotalGrading > 12){
    //     this.evaluationData.vendor_status = 'Approved';
    //     this.textColor ='#9ACD32';
    //     // this.bgColor = '#9ACD32';
    //   }
    //   else{
    //     this.evaluationData.vendor_status = 'Conditionally accepted';
    //     this.textColor ='orange';
    //     // this.bgColor = 'orange';

    //   }
    // }


    // // console.log(this.TotalGrading);




    // Clear array using the length property


    this.TotalGrading = this.evaluationGradingValuesArray.reduce(this.add, 0);
    this.gradingValue();

    // this.evaluationGradingValuesArray.length = 0;

  }

  Selectstatus(data: any) {

    // this.getColor;
  }

  addsupplierEvaluation() {
    // console.log(this.evaluationData)

    if (this.supplierevaluationForm.invalid) {
      this.supplierevaluationForm.controls['qualitybasis_grading'].markAsTouched();
      this.supplierevaluationForm.controls['pricebasis_grading'].markAsTouched();
      // this.adduserForm.controls['privilege_id'].markAsTouched();
      this.supplierevaluationForm.controls['communicationbasis_grading'].markAsTouched();
      this.supplierevaluationForm.controls['deliverybasis_grading'].markAsTouched();
      this.supplierevaluationForm.controls['commitmentbasis_grading'].markAsTouched();
      // alert('Please Fill all Valid Input');
      Swal.fire({
        title: 'Warning!',
        text: 'Please Fill all Valid Input...',
        icon: 'warning',
      })
    }
    else {

      this.adminService.addsupplierEvaluation(this.evaluationData).subscribe(
        {
          next: (results: any) => {
            // console.log(results);
            // alert(results[0].supplier_evaluation);
            Swal.fire({
              title: 'Success!',
              text: 'Evaluation done successfully..',
              icon: 'success',
            }).then(()=>{
              this.router.navigateByUrl('user/upload-inspection-form');
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

  }

  getcolor() {

    if (this.evaluationData.vendor_status == 'Rejected') {
      return 'red';
    }
    else if (this.evaluationData.vendor_status == 'Approved') {
      return 'green';
    }
    else {
      return 'white';
    }
  }
  instructions(){
    Swal.fire({
      title: '<strong>Instruction to evaluate</strong>',
      icon:'info',
      html:
        // '<span class="text-left"><strong>If you select</strong></span>, ' +
        '<p class="text-secondary mt-2">A + A + A + A + ? = Accepted</p> ' +
        '<p class="text-secondary">A + A + A + B + B = Accepted</p>'+     
        '<p class="text-secondary">A + A + B + B + B = Accepted</p>'+     
       ' <p class="text-secondary">A + A + A + C + C = Rejected</p>'+
        '<p class="text-secondary">A + A + B + B + C = Rejected</p>'+
        '<p class="text-secondary">B + B + B + B + ? = Rejected</p>'+
        '<p class="text-secondary">B + B + B + C + C = Rejected</p>'+
        '<p class="text-secondary">C + C + C + C + ? = Rejected</p>'+
        '<p class="text-secondary">A + A + B + B + B = Conditionally Accepted</p>'+
        '<p class="text-secondary">A + A + A + B + C = Conditionally Accepted</p>',
      showCloseButton: true,      
    })
  }


  validation() {
    this.supplierevaluationForm = new FormGroup({
      purchase_id: new FormControl('', [Validators.required]),
      evaluation_basis: new FormControl(null),
      vendor_status: new FormControl({ value: '', disabled: false }, [Validators.required]),
      qualitybasis_grading: new FormControl({ value: '', disabled: false }, [Validators.required]),
      pricebasis_grading: new FormControl({ value: '', disabled: false }, [Validators.required]),
      communicationbasis_grading: new FormControl({ value: '', disabled: false }, [Validators.required]),
      deliverybasis_grading: new FormControl({ value: '', disabled: false }, [Validators.required]),
      commitmentbasis_grading: new FormControl({ value: '', disabled: false }, [Validators.required])
    })
  }
}
