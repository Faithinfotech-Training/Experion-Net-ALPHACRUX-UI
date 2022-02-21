import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService}from '../shared/auth.service'
import { Users } from '../shared/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {loginForm!: FormGroup;

  isSubmitted = false;

  error = '';

  loginUser: any = new Users();
  isAuthenticate = false;



  constructor(

    private formBuilder: FormBuilder,

    private router: Router,

    private authService: AuthService

  ) {}

  ngOnInit(): void {

    //Create a Reactive Form Model

    this.loginForm = this.formBuilder.group({



      //Form controlName fields

      UserName: ['',[Validators.required]],

      UserPassword: ['',[Validators.required]]

    });

  }


  //Get controls for validation
  get formControls() { return this.loginForm.controls; }

  //Login Verification
  loginCredentials() {
    this.isSubmitted = true;
    console.log("Submitted form for credentials");


    if (this.loginForm.valid) {
      console.log("Submitted Form is valid");

      this.authService.login(this.loginForm.value).subscribe(
        data => {
          this.error='';
          console.log(data);
          //this.loginUser = data;

          //Username, Role and Token

          //sessionStorage.setItem('JwtTOKEN', this.loginUser.token);
          //console.log(data.StaffId);

          if(data.StaffId==1||data.StaffId==2||
            data.StaffId==3
            ||data.StaffId==4){
              this.isAuthenticate = true;

              this.router.navigateByUrl('doctor/appointments');

            }
            else if(data.StaffId==5||data.StaffId==6||
              data.StaffId==11
              ){
                this.isAuthenticate = true;
                this.router.navigateByUrl('reception/home');

              }
              else if(data.StaffId==7|| data.StaffId==12|| data.StaffId==13
                ){
                  this.isAuthenticate = true;
                  this.router.navigateByUrl('pharmacy/home');

                }
                else if(data.StaffId==8|| data.StaffId==14
                  ){
                    this.isAuthenticate = true;
                    this.router.navigateByUrl('lab/home/billing');
                    return this.isAuthenticate;

                  }
                  else if (data.StaffId==9||data.StaffId==10
                    ){
                      this.isAuthenticate = true;
                      this.router.navigateByUrl('admin/staffs/edit');

                    }
                    else{
                      this.isAuthenticate = false;
                      alert('Invalid Username or password')
                    }


          //Check the role based and redirects to respective pages


          // if (this.loginForm.value.UserUsername == "binitha"&&
          // this.loginForm.value.UserPassword=='binitha') {

          //   console.log("Redirecting to Admin Page");
          //   localStorage.setItem("USERNAME", this.loginUser.UserUsername);
          //   this.router.navigateByUrl('/users');
          // }

          // else {
          //   this.error = "You are not authorized to access this page.";
          //  }
        },
        error => {
          this.error = "Invalid username or password! try again...";
          console.log(error);
        }
      );
}else {
  console.log("Form is invalid");
  console.log(this.loginForm.value);
   }
  }

}
