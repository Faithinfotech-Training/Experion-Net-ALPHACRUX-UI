import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(private router: Router) { }


  canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;

    next: ActivatedRouteSnapshot): boolean {
      //Check roles : current role V/S expected role
      //  current role can be get from local storage        expected role can be get from app-routing.module.ts
      const expectedRole = next.data.StaffId;



      const accessId = localStorage.getItem('ACCESSID');
      console.log('inside authguard   '+accessId)
      console.log('accessid    '+accessId);
      //console.log('expected    '+expectedRole)



       if (expectedRole != accessId) {
        this.router.navigate(['/login']);
        return false;
       }



    //  expectedRole == accessId ? true : this.router.navigate(['/login']);
    //   console.log('accessid'+accessId);
    //   console.log('accessid'+expectedRole)
     return true



//       if(accessId=='1'||accessId=='2'||
//       accessId=='3'
//         ||accessId=='4'){

//           this.router.navigate(['/login']);
//           return true;
//         }
//         else if(accessId=='5'||accessId=='6'||
//           accessId=='11'
//           ){
//             this.router.navigate(['/login']);
//     return true;

//           }
//           else if(accessId=='7'|| accessId=='12'|| accessId=='13'
//             ){
//               this.router.navigate(['/login']);
//     return true;

//             }
//             else if(accessId=='8'|| accessId=='14'
//               ){
//                 console.log('inside if statement')
//                 this.router.navigate(['/login']);
//                 //this.router.navigateByUrl('lab/home/billing');


//     return true;


//               }
//               else if (accessId=='9'||accessId=='10'
//                 ){
//                   this.router.navigate(['/login']);
//             return true;
//                 }
//                 else{

//                   alert('Invalid Username or password')
//                 }



//       return true;

//   }

// // }
// if(accessId=='1'||accessId=='2'||
//       accessId=='3'
//         ||accessId=='4'||accessId=='5'||accessId=='6'||
//           accessId=='11'||accessId=='7'|| accessId=='12'|| accessId=='13'
//            ||accessId=='8'|| accessId=='14'
//               ||accessId=='9'||accessId=='10')
//               {
//               this.router.navigate(['/login']);
//               return true;
//             }
//         else{
//           this.router.navigate(['/login']);
//           return false;
//         }
      }

}
