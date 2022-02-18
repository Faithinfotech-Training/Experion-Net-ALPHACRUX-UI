import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httClient:HttpClient){}
  public login(user:Users){
    return this.httClient.post(environment.apiUrl+'logintoken/token',user);
}
}
