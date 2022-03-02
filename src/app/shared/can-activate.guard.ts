import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(private router: Router) { }


  canActivate(
   

    next: ActivatedRouteSnapshot): boolean {
      //Check roles : current role V/S expected role
      //  current role can be get from local storage        expected role can be get from app-routing.module.ts
      const expectedRole = next.data.RoleId;



      const accessId = localStorage.getItem('ACCESSID');
      console.log('inside authguard   '+accessId)
      console.log('accessid    '+accessId);




       if (expectedRole != accessId) {
        this.router.navigate(['/login']);
        return false;
       }



     return true


      }

}
