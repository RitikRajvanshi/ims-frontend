import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-information-list',
  templateUrl: './system-information-list.component.html',
  styleUrls: ['./system-information-list.component.scss']
})
export class SystemInformationListComponent {
  searchItem:any;
  systemsData:any;

  constructor(private sharedService:SharedService, private router:Router){

  }

  ngOnInit():void{
    // this.systemData();
    this.getSystemData();
  }

  // systemData(){

  //   this.sharedService.getSystemDatafromtransferstock().subscribe({
  //     next:(results:any)=>{
  //       console.log(results);
  //     this.systemsData = results;
  //     },
  //     error:(error)=>{
  //       if (error.status == 403) {
  //         //  const expirationTime = error.error.expirationTime;
  //         alert('Token has been expired. Please Login');
  //         this.router.navigate(['../login']);
  //       }
  //       else {
  //         // console.log('Other error:', error);
  //         alert(`Some error occured:${error}. Please login`);
  //         this.router.navigate(['../login']);
  //       }
  //     }
  //   })
  // }

  getSystemData(){

    this.sharedService.getSystemsDatafromitems().subscribe(
      {
        next:(results:any)=>{
          this.systemsData = results;
          console.log(results);
  
        }, error: (error) => {
          // console.log('error')
          if (error.status == 403) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Token has been expired..',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(() => {
              this.router.navigate(['../login']);
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Some error occured...',
              footer: '<a href="../login">Please Login again..</a>'
            }).then(() => {
              this.router.navigate(['../login']);
            })
          }
        }
      }
    )
  
  }
}
