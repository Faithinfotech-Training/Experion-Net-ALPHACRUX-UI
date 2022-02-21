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
  //isAuthenticate = false;



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
          this.loginUser = data;

          if(this.loginUser.StaffId==1||this.loginUser.StaffId==2||
            this.loginUser.StaffId==3
            ||this.loginUser.StaffId==4){


              console.log("Redirecting to Doctor Page");
              localStorage.setItem("USERNAME", this.loginUser.UserName);
              localStorage.setItem("ACCESSID", this.loginUser.StaffId);
              sessionStorage.setItem("USERNAME", this.loginUser.UserName);
              this.router.navigateByUrl('doctor/appointments');

            }
            else if(this.loginUser.StaffId==5||this.loginUser.StaffId==6||
              this.loginUser.StaffId==11
              ){
                console.log("Redirecting to Receptionist Page");
                localStorage.setItem("USERNAME", this.loginUser.UserName);
                localStorage.setItem("ACCESSID", this.loginUser.StaffId);
                sessionStorage.setItem("USERNAME", this.loginUser.UserName);
                this.router.navigateByUrl('reception/home');

              }
              else if(this.loginUser.StaffId==7|| this.loginUser.StaffId==12|| this.loginUser.StaffId==13
                ){
                  console.log("Redirecting to pharmacist Page");
                  localStorage.setItem("USERNAME", this.loginUser.UserName);
                  localStorage.setItem("ACCESSID", this.loginUser.StaffId);
                  sessionStorage.setItem("USERNAME", this.loginUser.UserName);
                  this.router.navigateByUrl('pharmacy/home');

                }
                else if(this.loginUser.StaffId==8|| this.loginUser.StaffId==14
                  ){
                    console.log("Redirecting to Lab Technician Page");
                    localStorage.setItem("USERNAME", this.loginUser.UserName);
                    localStorage.setItem("ACCESSID", this.loginUser.StaffId);
                    sessionStorage.setItem("USERNAME", this.loginUser.UserName);
                   this.router.navigateByUrl('lab/home/billing');


                  }
                  else if (this.loginUser.StaffId==9||this.loginUser.StaffId==10
                    ){
                      console.log("Redirecting to Admin Page");
                      localStorage.setItem("USERNAME", this.loginUser.UserName);
                      localStorage.setItem("ACCESSID", this.loginUser.StaffId);
                      sessionStorage.setItem("USERNAME", this.loginUser.UserName);
                      this.router.navigateByUrl('admin/staffs/edit');

                    }
                    else{

                      alert('Invalid Username or password')
                    }



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
