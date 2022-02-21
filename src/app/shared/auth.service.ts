import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName:string;
  password:string;

  constructor(private httClient:HttpClient){}
  public login(user:Users){

    this.userName=user.UserName;
    this.password=user.UserPassword;
    return this.httClient.get(environment.apiUrl+'labtechnician/login/'+this.userName+'&'+this.password);

}
//LOGOUT

public logOut() {
  
  console.log('inside logout from lab tech')

  localStorage.removeItem("USERNAME");

  localStorage.removeItem("ACCESSROLE");

  localStorage.removeItem("ACCESSID");

  sessionStorage.removeItem("USERNAME");

  // sessionStorage.removeItem("jwtToken");

}

}
