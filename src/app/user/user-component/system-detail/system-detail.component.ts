import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-detail',
  templateUrl: './system-detail.component.html',
  styleUrls: ['./system-detail.component.scss']
})
export class SystemDetailComponent {

  transferTo={
    transfer_to:0
  };

  itemId={
    item_id:0
  };
  searchItem:any;
  systemDetail:any;
  systemName:any;
  systemDatabyitemId:any;

  constructor(private route: ActivatedRoute, private sharedService:SharedService, private router:Router){
  }

  ngOnInit():void{

    this.route.params.subscribe((params: any) => {
      this.transferTo.transfer_to = +params['transferto'];
      this.itemId.item_id = +params['transferto'];
      this.getSystemData(this.itemId);
      this.getSystemConfiguration(this.transferTo);
    })
  }

  getSystemConfiguration(cpu:any){

    this.sharedService.getSystemConfiguration(cpu).subscribe({
      next:(results:any)=>{
        console.log(results);
        this.systemDetail = results;
        this.systemName = results[0].system_name;
      },
      error:(error)=>{
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
      
    })
  }

  getSystemData(itemId:any){
    this.sharedService.getsystemDatabyitemId(itemId).subscribe({
      next:(results:any)=>{   
          console.log(results);
        this.systemDatabyitemId = results;    
    }
      , error: (error) => {
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
    })
  
  }





}
