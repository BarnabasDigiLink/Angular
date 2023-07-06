import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  //constructor creation
  constructor(private service: AuthService, private toastr: ToastrService) {
    //users(listed) fuction call 
    this.LoadCustomer();
    this.SetAccesspermission();
  }
  customerlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  //variables
  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;
  //
  LoadCustomer() {
    this.service.GetAllCustomer()
      .subscribe(res => {
        this.customerlist = res;
        this.dataSource = new MatTableDataSource(this.customerlist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  //
  SetAccesspermission(){
    this.service.Getaccessbyrole(this.service.getrole(),'customer')
    .subscribe(res => {
      this.accessdata = res;
     //todo
      // console.log(this.accessdata);
     if(this.accessdata.length > 0){
      this.haveadd = this.accessdata[0].haveadd;
      this.haveedit = this.accessdata[0].haveedit;
      this.havedelete = this.accessdata[0].havedelete;
      //this.LoadCustomer();
     }
      //  else{
      //   alert('you are not authorised to access')
      //  }
    })
  }

  //TS code
  displayedColumns: string[] = ['code', 'name', 'lastname' ,'creditlimit', 'action'];
  //
  Updatecustomer(code:any){
    if(this.haveedit){
      this.toastr.success('Success')
    }else{
      this.toastr.warning('You do not have access to edit')
    }
  }
  //
  Removecustomer(code:any){
    if(this.havedelete){
      this.toastr.success('Success')
    }else{
      this.toastr.warning('You do not have access to delete')
    }
  }
  //
  addcustomer(){
    if(this.haveadd){
      this.toastr.success('Success')
    }else{
      this.toastr.warning('You do not have access to add user')
    }
  }
}
