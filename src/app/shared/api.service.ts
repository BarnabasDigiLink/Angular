import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //inject httpClient from created constructor
  constructor(private http: HttpClient) { }

  //methods for POST,DELETING,UPDATING,FETCHING records
  //get user
  GetUser() {
    return this.http.get<string>("http://localhost:3000/posts/")
      .pipe(map((res: string) => {
        return res;
      }))
  }
  //post user
  PostUser(data: any) {
    return this.http.post<string>("http://localhost:3000/posts/", data)
      .pipe(map((res: string) => {
        return res;
      }))
  }
  //update user
  UpdateUser(id: number, data: any) {
    return this.http.put<string>("http://localhost:3000/posts/" + id, data)
      .pipe(map((res: string) => {
        return res;
      }))
  }
  //delete user
  DeleteUser(id: number) {
    return this.http.delete<string>("http://localhost:3000/posts/" + id)
      .pipe(map((res: string) => {
        return res;
      }))
  }
}
