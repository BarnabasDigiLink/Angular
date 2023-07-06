import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/users';

  //functions
  // getting all users
  GetAll() {
    return this.http.get(this.apiurl);
  }
  // getting all users by roles
  GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  // trial method for user/admin access
  Getbycode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }
  // method passing valid data
  Proceedregister(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }
  // method update edited users
  Updateuser(code: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + code, inputdata);
  }
  //method check login
  IsLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  //get all roles
  getrole() {
    return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
  }
  //Get all userroles
  GetUserrole() {
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString() : '';
  }

  //get all users
  GetAllCustomer() {
    return this.http.get('http://localhost:3000/customer');
  }

  //get user/admin method
  Getaccessbyrole(role: any, menu: any) {
    return this.http.get('http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu)
  }

  //delete funtion
  delete(id: any) {
    return this.http.delete('http://localhost:3000/users/' + id);
  }
}

