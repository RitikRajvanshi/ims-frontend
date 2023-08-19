import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from 'src/app/services/admin.service';
import { CheckService } from 'src/app/services/check.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-upload-inspection-form',
  templateUrl: './upload-inspection-form.component.html',
  styleUrls: ['./upload-inspection-form.component.scss']
})
export class UploadInspectionFormComponent {

  inspectionformData = {
    purchase_id: '',
    supplier_name: '',
    product_received_date: '',
    inspected_by: 0,
    date_of_inspection: '',
    invoice_no: '',

  }

  purchaseIdObj = {
    purchase_id: '',
    item_name:''
  }

  verifyItems: any;

  //item 
  itemData = {
    purchase_id: '',
    item_code: '',
    item_name: '',
    description: 'No Description',
    category_id: 2,
    location_id: 1,                         //warehouse
    invoice_no: '',
    warrantyend_Date: '',
    item_status: '1',
    created_by: sessionStorage.getItem('login_id'),
    complain_id: 1
  }

  itemName = {
    item_name: ''
  }

  itemNameinArray: any[] = [];
  itemQunaitiyinArray: any[] = [];
  itemlastValues: any[] = [];
  itemCodetoverify:any[]=[];

  InspectionData = {
    id: 0,
    product_id: 0,
    approved_by_admin1: 0,
    approved_by_admin2: 0,
    inspected_by: 0
  }

  filteredItemIds:number[]=[];
  AddinspectionDisbaling = true;


  getpurchasejoinData: any;
  selectedpurchaseId: any;
  selectedsupplierName: any;
  getpurchaseDatabyId: any;

  purchaseId: any = [];
  supplierName: any = [];

  searchText = '';                   //searching filter for purchase id

  display: boolean = false;         // show/hide list,in searching purchase id
  display2: boolean = true;        // show/hide bottom static form
  display3: boolean = true;        // show/hide add inspection button
  display4: boolean = false;        //show/hide add to items button

  approvalfromadmin1: any;
  approvalfromadmin2: any;
  is_sent:any;

  showinspectionForm: any;
  roleType = sessionStorage.getItem('privilege_id');
  user_name = sessionStorage.getItem('name');

  itemsDataobjinarray: any = [];

  // check approvedbyadmin1 or approvedbyadmin2
  admin1approval: any;
  admin2approval: any;
  // adminapprovalbyid:any;

  constructor(private sharedService: SharedService, private adminService: AdminService, private checkService: CheckService, private router: Router) { }


  ngOnInit() {
    this.validation();
    this.getPruchaseorderData();
    this.warrantyEndDate();
  }

  getPruchaseorderData(){
    this.sharedService.getpurchaseorderdata().subscribe(
      {
      next:(results: any) => {
      this.getpurchasejoinData = results;
      // console.log('getpurchasejoinData', results);

      for (let item of this.getpurchasejoinData) {

        //save the data in array
        this.purchaseId.push(item.purchase_id);
      }
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
        text: 'Some error occured...',
        footer: '<a href="../login">Please Login again..</a>'
      }).then(()=>{
        this.router.navigate(['../login']);
      })
    }
  }
})

  
  }



  selectpurchaseId(data: any) {
    this.AddinspectionDisbaling = true;

    console.log(data, "selectedpurchaseId");
    this.selectedpurchaseId = data;
    this.display = false;
    this.display3 = true;
    this.display2 = false;

    this.purchaseIdObj.purchase_id = data;

    //  verfying that purchase id is present in item table or not....

    // this.verificationOfItem();

    //we need to understand that after verification we have to do multiple things...

    this.inspectionformData.purchase_id = data;
    this.itemData.purchase_id = data;

    this.sharedService.getPurchaseJoinDatabyPid(this.purchaseIdObj).subscribe(
      {
        next: (results: any) => {
          this.getpurchaseDatabyId = JSON.parse(JSON.stringify(results));
          console.log(results, "getPurchaseJoinDatabyPid");

          this.itemNameinArray.length = 0;
          this.itemQunaitiyinArray.length = 0;
          this.filteredItemIds.length = 0;
          this.itemlastValues.length = 0;

          for (let items of results) {
            console.log(items.is_active, "is_active");
            if (items.approved_by_admin1 === 0 || items.approved_by_admin2 === 0 || items.is_active==='0') {
              //with this condition only filtered data(i.e.. the po that is approved by both admins and also not added in items table) of product and quantity
              //  should be pushed in the arrays.

            console.log(items, "items after filter")
              this.filteredItemIds.push(items.id);
              this.display4 = true;
              this.itemNameinArray.push(items.product_name);
              this.itemQunaitiyinArray.push(items.quantity);
              this.itemName.item_name = items.product_name;
            

              this.sharedService.getlastItemcode(this.itemName).subscribe(
                {
                  next: (results: any) => {
                     console.log(results, "results");
                      // replace(/\s+/g, '') to remove spaces...
                    this.itemlastValues.push((results[0].get_last_itemcode3)?.replace(/\s+/g, ''));
                    
                  }
                 ,
              
                  error: (error) => {
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
            console.log(this.itemlastValues, 'Lastnameinitemtable')
            //also saving the last itemcodes of corresponding products in itemNameinArray, to another array
            // console.warn(this.itemNameinArray, this.itemQunaitiyinArray, this.itemlastValues);
          }
          console.log(this.itemNameinArray,"product");
          console.log(this.itemQunaitiyinArray,"quantity");
          console.log(this.filteredItemIds, "ids");

          //same for every object of same po
          this.inspectionformData.supplier_name = this.getpurchaseDatabyId[0]?.supplier_name;
          this.inspectionformData.invoice_no = this.getpurchaseDatabyId[0]?.invoice_no;

          this.itemData.invoice_no = this.getpurchaseDatabyId[0]?.invoice_no;

          //date is not directly putting so used patchValue for this....
          this.showinspectionForm.get('product_received_date')?.patchValue((this.getpurchaseDatabyId[0]?.product_received_date)?.split('T')[0]);
          this.showinspectionForm.get('date_of_inspection')?.patchValue((this.getpurchaseDatabyId[0]?.date_of_inspection)?.split('T')[0]);

          for (let i = 0; i < this.getpurchaseDatabyId.length; i++) {
            this.InspectionData.approved_by_admin1 = this.getpurchaseDatabyId[i]?.approved_by_admin1;
            this.InspectionData.approved_by_admin2 = this.getpurchaseDatabyId[i]?.approved_by_admin2;
            this.InspectionData.id = this.getpurchaseDatabyId[0]?.id;
            console.log(this.InspectionData.id, "inspection id");
            console.log(this.InspectionData);
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
      }
    )
  }

  showData() {
    this.display = true;
  }
  hidedata() {
    this.display = false;
  }

 getApprovalDetailfromid(id:any){
    let idobj = {
      id:id
    }
    this.sharedService.getpurchasedatabyid(idobj).subscribe((results:any)=>{
      this.admin1approval = results[0].approved_by_admin1;
      this.admin2approval = results[0].approved_by_admin2;
    })
  }


   approvalupdate2(id: any, productId: any, value: any) {
    this.getApprovalDetailfromid(id);

    setTimeout(()=>{
      console.log(id,productId, value);

      this.InspectionData.approved_by_admin1 =  this.admin1approval;  
      this.AddinspectionDisbaling = false;
      // console.log(id, value, this.getpurchaseDatabyId.length);
      this.InspectionData.id = +id;
      this.InspectionData.product_id = +productId;
      this.InspectionData.approved_by_admin2 = + value;
      this.InspectionData.id = id;
      console.log(this.InspectionData, "for admin2");
    },50)
   
  }

   approvalupdate1(id: any, productId: any, value: any) {
     this.getApprovalDetailfromid(id);

     setTimeout(()=>{
    // if(this.admin2approval && this.InspectionData.approved_by_admin2 === 0){
      this.InspectionData.approved_by_admin2 =  this.admin2approval;   
    // }
    this.AddinspectionDisbaling = false;
    this.InspectionData.id = +id;
    this.InspectionData.product_id = +productId;
    this.InspectionData.approved_by_admin1 = + value;
    console.log(this.InspectionData, "for admin1");
  },50)
  }

 

  SubmitInspection() {
    this.AddinspectionDisbaling = true;

    if (this.InspectionData.approved_by_admin2 === 1 && this.InspectionData.approved_by_admin1 === 0) {
      this.InspectionData.inspected_by = 0
    }
    else if (this.InspectionData.approved_by_admin2 === 0 && this.InspectionData.approved_by_admin1 === 1) {
      this.InspectionData.inspected_by = 1

    }
    else if (this.InspectionData.approved_by_admin2 === 1 && this.InspectionData.approved_by_admin1 === 1) {
      this.InspectionData.inspected_by = 10
    }
    else {

      // console.warn(this.InspectionData, 'InspectionData before adding 1')
    }
    console.log(this.InspectionData, 'InspectionData before adding 2')

    this.adminService.addinspectioninPI(this.InspectionData).subscribe(
      {
        next: (results: any) => {
          // console.log(results);

          this.display4 = true;
          this.display3 = false;
          // this.ngOnInit();
          this.selectpurchaseId(this.selectedpurchaseId);
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: `Item succesfully inspected by ${this.user_name}` ,
            showConfirmButton: false,
            timer: 1500
          })

        },
        error: (error) => {
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


  // for bgcolor change propertybinding during inspection yes(1) == 'green(#4bb543)', no(2) == 'red(#FF2E2E)' and select(null)='white'
  // getcolor(value: any) {
  //   if (value == '1') {
  //     return '#19B745';    //green
  //   }
  //   else {
  //     return 'white';
  //   }

  // }

  warrantyEndDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear() + 1;

    let newMonth = `0${month}`.slice(-2);
    let Newday = `0${day}`.slice(-2);
    // This arrangement can be altered based on how we want the date's format to appear.

    let NextYearDate = `${year}-${newMonth}-${Newday}`;
    // console.log(NextYearDate); // "2024-04-13"
    this.itemData.warrantyend_Date = NextYearDate;
  }

  itemcodegeneration() {
   

    this.itemsDataobjinarray.length = 0;
    for (let i = 0; i < this.itemNameinArray.length; i++) {

      this.itemData.item_name = this.itemNameinArray[i];
      this.itemName.item_name = this.itemData.item_name;

      for (let j = 0; j < this.itemQunaitiyinArray[i]; j++) {
        // // console.log(this.itemlastValues[i]);

        if (this.itemlastValues[i] == null || '') {
          this.itemData.item_code = this.itemName.item_name + '-' + (+j + 1);
          //JSON.parse(JSON.stringify(this.itemData)) is compulasary otherwise the updated(last data loop times) data is pushed in array loop times
          //this is called deep copy
          let deepCopyofItemArray = JSON.parse(JSON.stringify(this.itemData))
          this.itemsDataobjinarray = [...this.itemsDataobjinarray, deepCopyofItemArray];
          // console.log(this.itemsDataobjinarray);
        }
        else {
          // console.log(this.itemlastValues[i]);
          let splitItemCode = this.itemlastValues[i].split('-');

          let newcode = + splitItemCode[1] + j + 1;
          let newItemcode = splitItemCode[0] + '-' + newcode;
          this.itemData.item_code = newItemcode;

          //JSON.parse(JSON.stringify(this.itemData)) is compulsary otherwise the updated data is pushed in array loop times
          //this is called deep copy
          let deepCopyofItemArray = JSON.parse(JSON.stringify(this.itemData))

          this.itemsDataobjinarray = [...this.itemsDataobjinarray, deepCopyofItemArray];
          console.log(this.itemsDataobjinarray, "Data is ready to add");

        }
      }
    }

    console.log(this.itemsDataobjinarray, "itemsDataobjinarray");

    this.adminService.addItem(this.itemsDataobjinarray).subscribe({
      next: (results: any) => {
        this.itemCodetoverify = JSON.parse(JSON.stringify(results));
        // console.log(this.itemCodetoverify);  
        Swal.fire({
          title: 'Success!',
          text: 'Item added sucessfully...',
          icon: 'success',
        }).then(() => {
          location.reload();
        });
      },
      error: (error) => {
        // console.log('error')
        if (error.status == 403) {
          //  const expirationTime = error.error.expirationTime;
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

    console.warn(this.filteredItemIds);
    this.updateaisactiveinpi(this.filteredItemIds);
  }


  updateaisactiveinpi(id:any[]){
  const filteredidsobj={
    ids:id
  }
    this.adminService.updateisactiveinpiforitems(filteredidsobj).subscribe({
      next:(results:any)=>{
        console.log(results, "isactive updated");
      },
      error:(error)=>{
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



  //now depreciated by ritik rajvanshi by may be useful
  verificationOfItem() {
    // console.log(this.purchaseIdObj)
    this.checkService.verificationofItems(this.purchaseIdObj).subscribe(
      //with new way of doing it
      {
        next: (results: any) => {
          results.map((e:any)=>{
            console.log(e, "value of e ");
          })
          this.verifyItems = results[0]?.verification_ofitems;
          console.log(this.verifyItems, "Verify Item");
        },

        error: (error) => {
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
      }
    )
  }
 

  validation() {
    this.showinspectionForm = new FormGroup({
      purchase_id: new FormControl(''),
      supplier_name: new FormControl('', [Validators.required]),
      product_received_date: new FormControl('', [Validators.required]),
      date_of_inspection: new FormControl('', [Validators.required]),
      invoice_no: new FormControl('', [Validators.required]),
    })
  }

}
