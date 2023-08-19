import { Component,ViewEncapsulation , ViewChild, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { CheckService } from 'src/app/services/check.service';
import { AdminService } from 'src/app/services/admin.service'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-transfer-stock',
  templateUrl: './transfer-stock.component.html',
  styleUrls: ['./transfer-stock.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class TransferStockComponent {

 @ViewChild('systemdiv') systemdiv?: ElementRef;

transferStockForm:any;
systemData:any;
systemDatalength:number=0;
getSystemDatabyitemId:any;
getTransferDataDetailotherthanCPU:any;
itemDataOtherThanCPU:any;
getuserData:any;
locationdata:any;
systemConfigurationobj:any;
systemConfigurationlength:number=0;
getItemsradioBtn:boolean = false;
OnclickassignitemstoOthersbtn:boolean=false;
disableSystem:boolean=false;
displayItemsInstallation:boolean= false;
userDetailTabledisplay:boolean =false;
transferDetail:string='';

transferStockData={
  item_id:0,
  transfer_to:0,
  location_id:0,
  transfer_by:sessionStorage.getItem('login_id'),
  transfer_category:0
}

itemId = {
  item_id:0
}

transferTo= {
  transfer_to:0
}

SystemuserDetail={
  item_code:'',
  user_name:'',
  location_name:'',
  transfer_date:''
}

//radio buttons value
assignsysttouserbtnValue:any;
assignitemstosysbtnValue:any;
assignitemstoOthersbtnValue:any;


constructor(private sharedService:SharedService, private router:Router, private checkService:CheckService, private adminService:AdminService,private cdr: ChangeDetectorRef){}



ngOnInit():void{
  this.validation();
  this.getUserDataByStatus();
  this.getLocationData();
  this.getSystemData();
  this.assignsysttouserbtnValue=true;
  // console.warn(this.assignsysttouserbtnValue, 'assignsysttouserbtnValue is checked' )
  
}

ngAfterViewChecked(){
  //your code to update the model
  this.cdr.detectChanges();
}


getSystemData(){

  this.sharedService.getSystemsDatafromitems().subscribe(
    {
      next:(results:any)=>{
        this.systemData = results;
        // console.log(results);

      }, error: (error) => {
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

getItemsOtherthanCPU(){

  this.sharedService.getitemsoptherthanCPU().subscribe(
    {
      next:(results:any)=>{
        this.itemDataOtherThanCPU = results;
        // console.log(results);

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
    }
  )

}

getSystmeDatabyItemId(){

  if(this.disableSystem == false){
  this.userDetailTabledisplay = true;
  }
  
  this.sharedService.getsystemDatabyitemId(this.itemId).subscribe({
    next:(results:any)=>{
      this.systemDatalength = results.length;
      if(results.length === 0){
        console.log('No data found');
      this.getSystemDatabyitemId = 'No data found';
      }
      else{
      console.log(results);
      this.getSystemDatabyitemId = results[results.length-1];
      this.SystemuserDetail.item_code = this.getSystemDatabyitemId.item_code;
      this.SystemuserDetail.location_name = this.getSystemDatabyitemId.location_name;
      this.SystemuserDetail.user_name = this.getSystemDatabyitemId.user_name;   
      this.SystemuserDetail.transfer_date = this.getSystemDatabyitemId.transfer_date;   
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
          text: `Some error occured:${error}.`,
          footer: '<a href="../login">Please Login again..</a>'
        }).then(()=>{
          this.router.navigate(['../login']);
        })
      }
    }
  })
  
}

getTransferData(data:any){

  this.sharedService.getsystemDataotherThanCPU(data).subscribe({
    next:(results:any)=>{
     
      console.log(results);
      if(results.length ===0){
        console.log('This item is not assigned yet..');
        this.getTransferDataDetailotherthanCPU = '';
      }
      else{
      this.getTransferDataDetailotherthanCPU = `${results[0].item_code} is presently installed in ${results[0].system_name}`;
      }
      // return `This ${results.item_attach} is assgined to ${results.system_name}`;
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
  })

}

getSystemConfiguration(cpu:any){

  this.sharedService.getSystemConfiguration(cpu).subscribe({
    next:(results:any)=>{

      console.log(results);
      if(results.length===0){
        this.systemConfigurationlength = 0;
      }
      else{
      this.systemConfigurationlength = results.length;
      console.log(this.systemConfigurationlength);
      this.systemConfigurationobj = results;
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
          text: `Some error occured:${error}.`,
          footer: '<a href="../login">Please Login again..</a>'
        }).then(()=>{
          this.router.navigate(['../login']);
        })
      }
    }
    
  })
}

assignitemstosysbtn(){

  this.userDetailTabledisplay = false;
  this.disableSystem = false;
  this.transferStockData.transfer_to = 0;
  this.transferStockData.location_id = 0;
  this.transferStockData.transfer_category= 0;
  this.transferStockData.item_id = 0;
  this.getItemsradioBtn = true;
  this.OnclickassignitemstoOthersbtn =false;
  this.transferStockData.transfer_category= 1;
  this.transferStockForm.get('location_id')?.enable();
  this.getItemsOtherthanCPU();
  
 
}

assignitemstosysbtnChecked(){
  // assignsysttouserbtnValue
  this.ngOnInit();
  this.assignitemstoOthersbtnValue = false;
  this.assignsysttouserbtnValue = false;
  this.assignitemstosysbtnValue = true;
console.log(this.assignitemstosysbtnValue, 'assignitemstosysbtnValue is cheked')

}

assignsysttouserbtn(){
  location.reload();
  setTimeout(() => {
    if (this.systemdiv) {
      this.systemdiv.nativeElement.style.display='block'
    }
  })
  this.disableSystem == false;
  this.userDetailTabledisplay = false;
  this.OnclickassignitemstoOthersbtn =false;
  this.transferStockData.transfer_to = 0;
  this.transferStockData.location_id = 0;
  this.transferStockData.transfer_category= 0;
  this.transferStockData.item_id = 0;
  // this.ngOnInit();
  this.getItemsradioBtn = false;
  this.transferTo.transfer_to =0;
}

assignsysttouserbtnChecked(){
 this.assignitemstosysbtnValue = false;
this.assignitemstoOthersbtnValue = false;
  this.assignsysttouserbtnValue = true;
  console.log(this.assignsysttouserbtnValue, 'assignsysttouserbtnValue is checked')
  // this.assignsysttouserbtnValue = false;
 

} 

assignitemstoOthersbtn(){
  setTimeout(() => {
  if (this.systemdiv) {
    this.systemdiv.nativeElement.style.display='none';
  }
})
  this.disableSystem = true;
  this.getItemsOtherthanCPU();
  this.transferStockForm.get('location_id')?.enable();
  this.transferStockData.transfer_to = 0;
  this.transferTo.transfer_to =0
  this.transferStockData.location_id = 0;
  this.transferStockData.item_id = 0;
  this.transferStockData.transfer_category= 2;
  this.OnclickassignitemstoOthersbtn =true;
  this.SystemuserDetail.item_code = '';
  this.SystemuserDetail.location_name = '';
  this.SystemuserDetail.user_name = '';   
  this.SystemuserDetail.transfer_date = '';  
  this.userDetailTabledisplay = false;
  // console.log(this.systemdiv);

}

assignitemstoOthersbtnChecked(){
  this.ngOnInit();
  this.assignsysttouserbtnValue =false;
  this.assignitemstosysbtnValue = false;
  this.assignitemstoOthersbtnValue = true;
  // console.log(this.assignitemstoOthersbtnValue, 'assignitemstoOthersbtnValue is checked')


}

selectedItem(data:any){
  this.transferStockData.item_id = +data;
  this.itemId.item_id = +data;
  this.getSystmeDatabyItemId();
  this.getTransferData(this.itemId);
  this.displayItemsInstallation = true;
}

selectedCPU(data:any){
  this.transferStockData.transfer_to = +data;
  this.transferTo.transfer_to = +data;
  this.getSystemConfiguration(this.transferTo);
}


getUserDataByStatus() {
  this.sharedService.getUsersdatabystatus().subscribe(
    {
      next: (results: any) => {
        this.getuserData = results;

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
            text: `Some error occured:${error}.`,
            footer: '<a href="../login">Please Login again..</a>'
          }).then(()=>{
            this.router.navigate(['../login']);
          })
        }
      }
    })
}

selecteduser(data:any){
  this.transferStockForm.get('location_id')?.enable();
  this.transferStockData.location_id = 2;
  this.transferStockData.transfer_to = +data;
  this.transferTo.transfer_to = +data;
  // console.log(this.transferStockData);
  this.transferStockForm.get('location_id')?.disable();
  
}

selectedItems(data:any){
  if(this.OnclickassignitemstoOthersbtn){
    this.transferStockData.transfer_to = 0;
  }
  this.transferStockData.transfer_to = +data;
  // this.transferTo.transfer_to = +data;

}

selectedItemstoCPU(data:any){
  this.transferTo.transfer_to = +data;
  this.transferStockForm.get('location_id')?.enable();
  if(this.OnclickassignitemstoOthersbtn){
    this.transferStockData.item_id = 0;
  }
  this.transferStockData.item_id = +data;
  this.itemId.item_id = +data;
  this.transferStockData.location_id = 2;
  this.transferStockForm.get('location_id')?.disable();
  this.getTransferData(this.itemId);

}

getLocationData() {
  this.checkService.getLocationdatabystatus().subscribe(
    {
      next: (results: any) => {
        this.locationdata = JSON.parse(JSON.stringify(results));
      },
      error: (error) => {
        
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

selectedLocation(data:any){
  if(this.transferStockData.location_id == 0){
  this.transferStockData.location_id = +data;
  }
  else{
    // console.log('Already have location...')
  }
}


transferStock(){
    if(this.assignitemstoOthersbtnValue==false && (this.transferStockForm.controls['item_id'].value==0 || this.transferStockForm.controls['transfer_to'].value==0)){
      
        this.transferStockForm.controls['item_id'].markAsTouched();
        this.transferStockForm.controls['transfer_to'].markAsTouched();
        this.transferStockForm.controls['location_id'].markAsTouched();
        Swal.fire({
          title: 'Warninng!',
          text: `Please Fill all data with valid values...`,
          icon: 'warning',
        })
        // alert('Please Fill all data with valid values...');  
      
    }

      if(this.assignitemstoOthersbtnValue && (this.transferStockForm.controls['item_id'].value==0 || this.transferStockForm.controls['location_id'].value==0)){
        this.transferStockForm.controls['item_id'].markAsTouched();
        this.transferStockForm.controls['location_id'].markAsTouched();
        Swal.fire({
          title: 'Warninng!',
          text: `Please Fill all data with valid values...`,
          icon: 'warning',
        })
      }
    
    else{
      
      console.log(this.transferStockData);

      this.adminService.transferStock(this.transferStockData).subscribe({
        next:(results:any)=>{
          // alert(results[0].transfer_stock);

          if(this.assignsysttouserbtnValue){
            Swal.fire({
              title: 'Success!',
              text: `System is successfully assigned to user...`,
              icon: 'success',
            }).then(()=>{
              location.reload();
            })
            // alert('System is successfully assigned to user...')
          }
          else if(this.assignitemstosysbtnValue){
            Swal.fire({
              title: 'Success!',
              text: `Item is succesfully installed...`,
              icon: 'success',
            }).then(()=>{
              location.reload();
            })
            // alert('Item is succesfully installed...')
          }
          else{
            Swal.fire({
              title: 'Success!',
              text: `Stock is transferred successfully...`,
              icon: 'success',
            }).then(()=>{
              location.reload();
            })
            // alert('Stock is transferred successfully...')
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

validation(){
  this.transferStockForm = new FormGroup({
    item_id: new FormControl(0, [Validators.required]),
    transfer_to: new FormControl(0, [Validators.required]),
    location_id: new FormControl(0, [Validators.required]),
  })
}

}
