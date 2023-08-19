import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-make-purchase-order',
  templateUrl: './make-purchase-order.component.html',
  styleUrls: ['./make-purchase-order.component.scss']
})
export class MakePurchaseOrderComponent {

  @ViewChild('btnsupplierId') btnsupplierId!: ElementRef;
  purchaseForm: any;

  prchase_id: any;
  new_prchase_id: any;

  purchaseData = {
    purchase_id: '',
    supplier_id: 0,
    issue_date: (new Date()).toISOString().substring(0, 10),
    expected_date: (new Date()).toISOString().substring(0, 10),
    product_id: 0,
    unit_price: '',
    quantity: 0,
    sub_total: 0,
    discount_in_rs: 0,
    total: 0,
    description: '',
    gst_calculation: 0,
    gst_in_percent: 0,
    sent_by: sessionStorage.getItem('name')
  }

  supplierName = {
    supplier_name: ''
  }

  getsupplierData: any;
  getpurchasedatafrompoArray: any = [];
  getsupplierDataArray: any = [];

  selectedSupplier: any;
  clickedSupplierbtn: boolean = false;
  clickedPurchaseIdbtn: boolean = false;
  selectedPurchaseId: any;
  getproductData: any;

  getsupplierId: any;
  getproductId: any;

  getpurchasedatafrompo: any;    //purchase order
  getpurchaseOrderDatabypid: any;
  selectedpurchaseId: any;

  searchText = '';
  searchText2 = '';

  display1 = true;               //new_purchase_id element to hide/show        
  display2 = false;             //existing purchase_id element to hide/show
  display3 = false;             //existing purchase_id to hide/show
  read = false;                 // property binding
  display = false;              //for supplier list  to hide/show
  read2 = false;




  constructor(public adminService: AdminService, private sharedService: SharedService, private router: Router) {

  }

  ngOnInit() {
    this.validation();
    this.getNewPurchaseID();                                                                  //this is for showing new id on everyload....
    this.getPurchaseDatafromPO();
    this.getSupplierData();
    this.getProductData();


  }

  getPurchaseDatafromPO() {
    this.sharedService.getpurchasedatafromPurchaseOrder().subscribe(
      {
        next: (results: any) => {
          this.getpurchasedatafrompo = results

          for (let item of this.getpurchasedatafrompo) {
            this.getpurchasedatafrompoArray.push(item.purchase_id);
          }

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

  getSupplierData() {
    this.sharedService.getsupplierdata().subscribe(
      {
        next: (results: any) => {
          this.getsupplierData = JSON.parse(JSON.stringify(results));

          for (let item of this.getsupplierData) {
            this.getsupplierDataArray.push(item.supplier_name);
          }
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

  getProductData() {
    this.sharedService.getProductdata().subscribe(
      {
        next: (results: any) => {
          this.getproductData = results;
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





  selectSupplier(data: any) {
    //  // console.log(this.btnsupplierId.value);
    this.clickedSupplierbtn = true;

    this.selectedSupplier = data;
    this.display = false;

    this.supplierName.supplier_name = data;
    this.sharedService.getsupplierdatabyname(this.supplierName).subscribe(
      {
        next: (results: any) => {
          this.getsupplierId = results[0].supplier_id;

          this.purchaseData.supplier_id = this.getsupplierId;
          this.searchText = this.supplierName.supplier_name;
          // console.log(this.purchaseData.supplier_id);
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

  showData() {
    if (this.read == true || this.read2 == true) {
      this.display = false;
    }
    else {
      this.display = true;

    }
  }
  hidedata() {
    this.display = false;
  }

  selectPurchaseid(data: any) {
    if (this.display2 == true && this.display1 == false) {
      this.getpurchaseorderDatabyPid(data);

      this.selectedPurchaseId = data;
      this.searchText2 = data;
      this.purchaseData.purchase_id = data;
      this.display3 = false;
      this.clickedSupplierbtn = true;

      // this.purchaseForm.controls['purchase_id'].valid();
    }

    this.selectedPurchaseId = data;

    this.purchaseData.purchase_id = data;
    this.display3 = false;
    // this.purchaseForm.controls['purchase_id'].valid();
    this.clickedSupplierbtn = true;
    //in existing purchase id


  }

  showData2() {

    if (this.read == true || this.read2 == true) {
      this.display3 = false;
    }
    else {
      this.display3 = true;

    }

  }
  hidedata2() {
    this.display3 = false;
  }


  calculatesubtotal() {
    // this.purchaseData.sub_total = +this.purchaseData.unit_price * +this.purchaseData.quantity ;

    this.purchaseData.sub_total = +(+this.purchaseData.unit_price * +this.purchaseData.quantity - this.purchaseData.discount_in_rs) ;
    this.calculateTotal();
    this.calculateGST();
    // // console.log(this.purchaseData.sub_total);

  }

  calculateGST() {
    this.purchaseData.gst_calculation =+(+ this.purchaseData.sub_total * + this.purchaseData.gst_in_percent).toFixed(2);
    // // console.log(this.purchaseData.gst_calculation);

  }

  calculateTotal() {
    // this.purchaseData.total = this.purchaseData.sub_total + this.purchaseData.gst_calculation - this.purchaseData.discount_in_rs;
    this.purchaseData.total =+(this.purchaseData.sub_total  + this.purchaseData.gst_calculation) ;

    // // console.log(this.purchaseData.total);
  }


  perchaseOrdergenerate(data: any) {
    // console.log(data);

    if (this.purchaseForm.invalid) {
      // this.purchaseForm.controls['purchase_id'].markAsTouched();
      this.purchaseForm.controls['supplier_id'].markAsTouched();
      this.purchaseForm.controls['product_id'].markAsTouched();
      this.purchaseForm.controls['unit_price'].markAsTouched();
      this.purchaseForm.controls['quantity'].markAsTouched();
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill required fields...',
        icon: 'warning',
        confirmButtonText: 'OK',
        color:'#00235E'
      });

    }
    else {
      // property binding for supplier_name to readonly....
      this.read = true;
      this.display = false;                                      //   not showing items from supplier table

      if (this.display1 == true && this.display2 == false) {
        // console.log('In new purhcaseId')
        this.purchaseData.purchase_id = data.purchase_id;
        // console.log(this.purchaseData.purchase_id);
        // console.log(this.purchaseData);


        this.adminService.makePurchaseOrder(this.purchaseData).subscribe(
          {
            next: (results: any) => {

              Swal.fire({
                title: 'Success!',
                text: 'PO generate Successfully...',
                icon: 'success',
              });
              this.purchaseForm.get('product_id')?.patchValue(0);
              this.purchaseForm.get('unit_price')?.patchValue(0);
              this.purchaseForm.get('quantity')?.patchValue(0);
              this.purchaseForm.get('sub_total')?.patchValue(0);
              this.purchaseForm.get('gst_in_percent')?.patchValue(0);
              this.purchaseForm.get('gst_calculation')?.patchValue(0);
              this.purchaseForm.get('discount_in_rs')?.patchValue(0);
              this.purchaseForm.get('total')?.patchValue(0);
              this.purchaseForm.controls['description'].reset();
              this.purchaseForm.controls['supplier_id'].markAsUntouched();
              this.purchaseForm.controls['product_id'].markAsUntouched();
              this.purchaseForm.controls['unit_price'].markAsUntouched();
              this.purchaseForm.controls['quantity'].markAsUntouched();

            }, error: (error) => {
              // console.log('error')
              if (error.status == 403) {
                //  const expirationTime = error.error.expirationTime;
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
                // console.log('Other error:', error);
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
        console.log('In existing purhcaseId')


        this.adminService.makePurchaseOrder(this.purchaseData).subscribe(
          {
            next: (results: any) => {
              Swal.fire({
                title: 'Success!',
                text: 'PO generate Successfully...',
                icon: 'success',
              });
              this.purchaseForm.get('product_id')?.patchValue(0);
              this.purchaseForm.get('supplier_id')?.patchValue(null);

              this.purchaseForm.get('unit_price')?.patchValue(0);
              this.purchaseForm.get('quantity')?.patchValue(0);
              this.purchaseForm.get('sub_total')?.patchValue(0);
              this.purchaseForm.get('gst_in_percent')?.patchValue(0);
              this.purchaseForm.get('gst_calculation')?.patchValue(0);
              this.purchaseForm.get('discount_in_rs')?.patchValue(0);
              this.purchaseForm.get('total')?.patchValue(0);
              this.purchaseForm.controls['description'].reset();
              this.read2 = true;
              this.purchaseForm.controls['supplier_id'].markAsUntouched();
              this.purchaseForm.controls['product_id'].markAsUntouched();
              this.purchaseForm.controls['unit_price'].markAsUntouched();
              this.purchaseForm.controls['quantity'].markAsUntouched();

            }, error: (error) => {
              // console.log('error')
              if (error.status == 403) {
                //  const expirationTime = error.error.expirationTime;
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
                  text: 'Session expired. Please login..',
                  footer: '<a href="../login">Login..</a>'
                }).then(()=>{
                  this.router.navigate(['../login']);
                })
              }
            }
          })
      }
    }

  }

  getpurchaseorderDatabyPid(p_id: any) {

    this.read = false;
    this.read2 = false;

    let purchaseOrderPid = {
      purchase_id: p_id
    }
    // console.log(purchaseOrderPid);

    this.sharedService.getpurchaseOrderdatabyPid(purchaseOrderPid).subscribe(
      {
        next: (result: any) => {
          // console.log(result);
          this.getpurchaseOrderDatabypid = result;
          this.selectSupplier = result[0].supplier_name;
          this.purchaseForm.controls['supplier_id']?.patchValue(this.selectSupplier);
          let tempIssueDate = (result[0].issue_date).split('T')[0];
          let tempExpectedeDate = (result[0].expected_date).split('T')[0];
          this.purchaseForm.controls['issue_date']?.patchValue(tempIssueDate);
          this.purchaseForm.controls['expected_date']?.patchValue(tempExpectedeDate);
          this.read = true;
          this.read2 = true;
          this.display = false;
          this.display3 = false;
          this.purchaseData.supplier_id = result[0].supplier_id;
          // console.log(this.purchaseData.supplier_id);
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
              text: 'Session expired. Please login..',
              footer: '<a href="../login">Login..</a>'
            }).then(()=>{
              this.router.navigate(['../login']);
            })
          }
        }
      })
  }


  //PURCHASE ID PATTERN
  getNewPurchaseID() {
    let oldID = "APV-000/2023";
    this.sharedService.getlastPurchaseid().subscribe(
      {
        next: (results: any) => {
          // // console.log(results[0]);
          this.prchase_id = results[0].purchase_id;
          // console.log(this.prchase_id);

          if (results[0].purchase_id != '' || undefined || null) {
            oldID = JSON.stringify(this.prchase_id);
            // // console.log(oldID);
          }


          let newIdsplit = oldID.replace('/', '-').split('-');
          let midInt: number = + newIdsplit[1] + 1;

          let newIdintoString = JSON.stringify(midInt);
          // // console.log(newIdintoString);

          let newId = '';
          // // console.log(newIdintoString.length);

          if (newIdintoString.length == 1) {
            newId = '00' + newIdintoString;
          }
          // else if(JSON.stringify(newIdsplit).length == 2){
          else if (newIdintoString.length == 2) {
            newId = '0' + newIdintoString;
          }
          else {
            newId = newIdintoString;
          }

          let newpurchaseid = "APV-" + newId + "/" + new Date().getFullYear();
          this.new_prchase_id = newpurchaseid;
          // return newpurchaseid;

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
              this.router.navigate(['../login'])
            });
          }
        }
      })
  }

  newPurchaseId() {
    location.reload();
    this.display1 = true;
    this.display2 = false;

  }

  existingPurchaseId() {
    this.clickedPurchaseIdbtn = true;

    this.purchaseForm.controls['purchase_id'].reset();
    this.purchaseForm.controls['supplier_id'].reset();
    this.display1 = false;
    this.display2 = true;
  }

  productId(id: any) {
    // console.log(id);
    this.purchaseData.product_id = id;
  }


  validation() {

    this.purchaseForm = new FormGroup({
      purchase_id: new FormControl(''),
      issue_date: new FormControl((new Date()).toISOString().substring(0, 10)),
      expected_date: new FormControl((new Date()).toISOString().substring(0, 10)),
      product_id: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      supplier_id: new FormControl(0, [Validators.required]),
      //showing data in yyyy-mm-dd format...
      unit_price: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      quantity: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      sub_total: new FormControl(0, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      discount_in_rs: new FormControl(0),
      total: new FormControl(0),
      description: new FormControl(''),
      gst_calculation: new FormControl(0),
      gst_in_percent: new FormControl(0),
    })

  }
}
