import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Staffs } from './staffs';
import { Roles } from './roles';
import { Qualifications } from './qualifications';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  staffs: Staffs[];
  roles: Roles[];
  qualifications: Qualifications[];
  formData: Staffs = new Staffs();
  constructor(private client: HttpClient) {}

  //List roles
  getRoles() {
    return this.client
      .get(environment.apiUrl + 'admin/roles')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.roles = data as Roles[];
      });
  }

  //list qualifications
  getQualifications() {
    return this.client
      .get(environment.apiUrl + 'admin/qualifications')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.qualifications = data as Qualifications[];
      });
  }

  //list Staffs
  getStaffs() {
    return this.client
      .get(environment.apiUrl + 'admin/liststaffs')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.staffs = data as Staffs[];
      });
  }


  //Add a new staff
  addStaff(staff: Staffs) { 
    return this.client.post(environment.apiUrl + 'admin/staff', staff)
      .toPromise()
      .then((data) => {
        console.log(data);
      });
  }

  //Get staff by id
  getStaffById(staffId: number): Observable<any> { 
    return this.client.get(environment.apiUrl + 'admin/staff/' + staffId);
  }
}
