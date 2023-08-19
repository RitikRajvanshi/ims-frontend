import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})

export class UserDashboardComponent implements OnInit{

    productionurl:any;
    firstDay:any;
    lastDay:any;
    OrderCount:number =0;
    requestCount:number = 0;
    lastfinnancialyrDate:any;
    nextfinnancialyrDate:any;
    DatesforFinancialyearreport={
    start_date:'',
    end_date:''
    }
    DatesforMothlyreport={
      start_date:'',
      end_date:''
      }

    sumofPurchasingArray:any[]=[];
    numberofPoarray:any[]=[];
    amountofpurchasingyearly:any;
    amountofpurchasingmonthly:any;
    noofpoyearly:any;
    noofpomonthly:any;

  sumofPurchaseOrder:any;
  countOfitems:any;

  userName = sessionStorage.getItem('name');
  userRole = sessionStorage.getItem('privilege_id');

  monthlyReport={
    sumtotal:0,
    count:0
  }

  financialReport={
    sumtotal:0,
    count:0
  }

  Monthlyreportvar:any;
  finacialyearreportvar:any;

  constructor(private sharedService:SharedService, private router: Router){

  }


  ngOnInit(): void {
  this.getsumOfpurchaseOrder();
  this.getCurrentMonthFirstAndLastDates();
  this.getCurrentMonthPoandCount();
  this.getfinacialyearcountandsum();
this.countOfreceivedOrderandrequest();
this.productionurl = environment.ADMIN_URL;

//  this.getPoandNumberofItems(this.DatesforFinancialyearreport);
//   this.getPoandNumberofItems(this.DatesforMothlyreport);
}

countOfreceivedOrderandrequest(){
  this.sharedService.getCountofreceiveorder().subscribe((results:any)=>{
    this.OrderCount = results[0]?.count; 
    // console.log(this.OrderCount);
  })

  this.sharedService.getCountofreceiverequest().subscribe((respond:any)=>{
    this.requestCount = respond[0]?.count;
  })

  
}

  // get last financial year date.....

  getsumOfpurchaseOrder(){ 
    var today = new Date();   
    var curMonth = today.getMonth() + 1
    var curDate = today.getDate()
    var curYear = today.getFullYear();
  
    if (curMonth > 3) { 
       this.lastfinnancialyrDate = curYear.toString() + '-'+ '04'+'-'+ '01';
       this.nextfinnancialyrDate = (curYear+1).toString() + '-'+ '03'+'-'+ '31';
  
    } else {
      this.lastfinnancialyrDate = (curYear-1).toString()+'-'+ '04'+'-'+ '01';
      this.nextfinnancialyrDate = (curYear+1).toString() +'-'+ '03'+'-'+ '31';
    }


  

    this.DatesforFinancialyearreport.start_date = this.lastfinnancialyrDate;
    this.DatesforFinancialyearreport.end_date = this.nextfinnancialyrDate;
    console.log(this.DatesforFinancialyearreport);

   
    // this.getPoandNumberofItems(this.DatesforFinancialyearreport);
    // this.Monthlyreportvar = this.getPoandNumberofItems(this.DatesforFinancialyearreport)
    // console.log(this.Monthlyreportvar);

  }

  async getfinacialyearcountandsum(){ 
    try{
    var today = new Date();   

    var curMonth = today.getMonth() + 1
    var curDate = today.getDate()
    var curYear = today.getFullYear();
  
    if (curMonth > 3) { 
       this.lastfinnancialyrDate = curYear.toString() + '-'+ '04'+'-'+ '01';
       this.nextfinnancialyrDate = (curYear+1).toString() + '-'+ '03'+'-'+ '31';
  
    } else {
      this.lastfinnancialyrDate = (curYear-1).toString()+'-'+ '04'+'-'+ '01';
      this.nextfinnancialyrDate = (curYear+1).toString() +'-'+ '03'+'-'+ '31';
    }

    this.DatesforFinancialyearreport.start_date = this.lastfinnancialyrDate;
    this.DatesforFinancialyearreport.end_date = this.nextfinnancialyrDate;
    console.log(this.DatesforFinancialyearreport);

    this.finacialyearreportvar = await this.getPoandNumberofItems(this.DatesforFinancialyearreport);
    this.financialReport.sumtotal = this.finacialyearreportvar.sumOfPurchase[0].sumtotal;
    this.financialReport.count = this.finacialyearreportvar.numberofItems[0].count;
  

  console.log(this.finacialyearreportvar.numberofItems[0].count, "iiiiiiiiiiii")
  console.log(this.financialReport.sumtotal, "jjjjjjjjjjjjj")
  }
catch (error:any) {
  console.error('Error:', error);
  // Handle the error if needed
}

   
    // this.getPoandNumberofItems(this.DatesforFinancialyearreport);
    // this.Monthlyreportvar = this.getPoandNumberofItems(this.DatesforFinancialyearreport)
    // console.log(this.Monthlyreportvar);

  }

  getCurrentMonthFirstAndLastDates() {
    const currentDate = new Date();
    this.firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    console.log(this.firstDay, this.lastDay);
    this.DatesforMothlyreport.start_date = this.firstDay;
    this.DatesforMothlyreport.end_date = this.lastDay;
  }

  async getCurrentMonthPoandCount() {
    try{
    const currentDate = new Date();
    this.firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    console.log(this.firstDay, this.lastDay);
    this.DatesforMothlyreport.start_date = this.firstDay;
    this.DatesforMothlyreport.end_date = this.lastDay;

    this.Monthlyreportvar = await this.getPoandNumberofItems(this.DatesforMothlyreport);
    this.monthlyReport.sumtotal = this.Monthlyreportvar.sumOfPurchase[0].sumtotal;
    this.monthlyReport.count = this.Monthlyreportvar.numberofItems[0].count;
    // this.monthlyReport.count = this.variable2.count[0]
    console.log(this.Monthlyreportvar.sumOfPurchase[0].sumtotal, "jejjjjjjjj")
    console.log(this.Monthlyreportvar.numberofItems[0].count, "jejjjjjjjjiiiiiiiiiiiiiiiiiiii")
    }
    catch (error) {
      console.error('Error:', error);
      // Handle the error if needed
    }

    // this.variable2 = this.getPoandNumberofItems(this.DatesforMothlyreport)
   // console.warn(this.variable2);
    
  }


  async  getPoandNumberofItems(obj:object){

    try{
      const sumOfPurchaseResponse = await this.sharedService.getSumofpurchaseOrderbyDate(obj).toPromise();
      const receiveRequestResponse = await this.sharedService.getCountofPruchaseOrder(obj).toPromise();
    

     // Process the responses if needed
     console.log(sumOfPurchaseResponse, "sumOfPurchaseResponse");
     console.log(receiveRequestResponse, "receiveRequestResponse");

       // You can return the responses or any processed data as needed
       return {
        sumOfPurchase: sumOfPurchaseResponse,
        numberofItems: receiveRequestResponse
      };
    }
    catch (error:any) {
      if (error.status == 403) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Token has been expired..',
          footer: '<a href="../login">Please Login again..</a>'
        }).then(() => {
          this.router.navigate(['../login']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Some error occurred...',
          footer: '<a href="../login">Please Login again..</a>'
        }).then(() => {
          this.router.navigate(['../login']);
        });
      }
  
      // If an error occurs, you can throw it or handle it accordingly
      throw error;
    }
  }
  

    // this.sharedService.getCountofItemsbyDate(obj).subscribe((results:any)=>{
    //   console.log(results, "results2")

    //   this.numberofPoarray.push(JSON.parse(JSON.stringify(results)));
    //   // console.log(this.numberofPoarray, "array1");
    // })

   

  }





