import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { LoginService } from '../services/login.service';
declare var $:any;
import { environment } from '../environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  
    companyData:any;
    companyLogo= '';
    companyName='';
    icontoggle=true;


    userRole = sessionStorage.getItem('privilege_id');
    userName = sessionStorage.getItem('name');

    screenSizes= {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    }
  
 

  constructor(public router:Router, public loginService:LoginService, public sharedService:SharedService){}


  ngOnInit() {
    console.log(this.userRole);
    this.getCompanyData();
  }

  logout(){
   this.loginService.logout(); 
  }

  getCompanyData(){
    this.sharedService.getCompanydata().subscribe(
      {
        next:(results:any)=>{
      this.companyData = results;
      // this.companyLogo = 'http://192.168.0.132:3009/files/'+ results[0].company_logo;
      this.companyLogo = `${environment.BASE_URL}files/`+ results[0].company_logo;
      console.log(this.companyLogo);
      this.companyName = results[0].company_name;
        },
        error:(error)=>{
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



  
   SidebarToggle(){
    var screenSizes = this.screenSizes;
     //Enable sidebar push menu
     if ($(window).width() > (screenSizes.sm - 1)) {
      if ($("body").hasClass('sidebar-collapse')) {
          $("body").removeClass('sidebar-collapse')
      } else {
          $("body").addClass('sidebar-collapse')
      }
  }
    //Handle sidebar push menu for small screens
      else {
          if ($("body").hasClass('sidebar-open')) {
              $("body").removeClass('sidebar-open').removeClass('sidebar-collapse')
          } else {
              $("body").addClass('sidebar-open')
          }
      }
   }

   


  

   }
  





 

