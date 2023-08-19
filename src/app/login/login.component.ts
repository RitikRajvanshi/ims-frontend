import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLoading: boolean = false;
  resContainer: any;
  container: any;
  container2: any;
  formLogin: any;
  rememberMe: boolean = false;
  user_email: string = '';
  user_password: string = '';


  constructor(private loginService: LoginService, private router: Router, private sharedService: SharedService, public httpClient: HttpClient) { }

  ngOnInit(): void {

    this.validation();
    const rememberMePreference = localStorage.getItem('rememberMe');
    this.rememberMe = rememberMePreference === 'true';

    if (this.rememberMe) {
      this.user_email = localStorage.getItem('user_email') || '';
      this.user_password = localStorage.getItem('user_password') || '';
    }
  }


  validation() {
    this.formLogin = new FormGroup({
      user_email: new FormControl('', [Validators.required]),
      user_password: new FormControl('', [Validators.required]),
    })
  }

  loadData() {
    this.isLoading = true;

    // Simulating an asynchronous operation preloader
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

  }


  onSubmit(data: any) {
    // console.log(data)
    this.loadData();

    if (this.rememberMe) {
      // Store remember me preference and user credentials in local storage
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('user_email', this.user_email);
      localStorage.setItem('user_password', this.user_password);
    } else {
      // Remove remember me preference and user credentials from local storage
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_password');
    }

    this.loginService.userLogin(data).subscribe((respond: any) => {

      //parsing the object due to any type.
      this.resContainer = JSON.parse(JSON.stringify(respond));

      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${this.resContainer.token}`
      // })

      //storing data in sessionstorage
      sessionStorage.setItem("Token", this.resContainer.token);
      // console.log(this.resContainer.data);

      //login user details
      if (this.resContainer.data !== undefined || null) {

        sessionStorage.setItem('name', this.resContainer.data.user_name);
        sessionStorage.setItem('login_id', this.resContainer.data.user_id);
        sessionStorage.setItem('privilege_id', this.resContainer.data.privilege_id);


        if (this.resContainer.message !== 0) {


          if (this.resContainer.data.privilege_id == 1 || 29) {




            this.router.navigate(['/user']);
            // console.log( 'Token--' ,this.resContainer.token);

          }
          // else if (this.resContainer.data.privilege_id == 25) {
          //   this.router.navigate(['/user'])
          //   // console.log( 'Token--' ,this.resContainer.token);
          // }
        }

      }
      else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Invalid Email or Password..',
        }).then(()=>{
          location.reload();
        })

      }


    })
  }
}
