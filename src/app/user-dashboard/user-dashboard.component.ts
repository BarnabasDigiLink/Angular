import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from './user-dashboard.model';
import { ApiService } from '../shared/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { EditpopupComponent } from '../editpopup/editpopup.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  formValue !: FormGroup;
  //userModel object to post the data
  userModelObj: UserModel = new UserModel();

  //property 
  userData !: string;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private service: AuthService, private dialog: MatDialog) {
    //users(listed) fuction call 
    this.Loaduser();
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    //getAllUser method call 
    this.getAllUser();
  }

  //nethod for posting data(api call) 
  postUserDetails() {
    this.userModelObj.firstName = this.formValue.value.firstName;
    this.userModelObj.lastName = this.formValue.value.lastName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.userModelObj.salary = this.formValue.value.salary;

    this.api.PostUser(this.userModelObj).subscribe(res => {
      console.log(res);
      alert("Employee Added Successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    },
      err => {
        ("Something Went Wrong!")
      })
  }

  //
  clickAddUser() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  //populating the dashboard table(get data)
  getAllUser() {
    this.api.GetUser()
      .subscribe(res => {
        this.userData = res;
      })
  }

  //edit user method
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  //updated user details values
  updateUserDetails() {
    this.userModelObj.firstName = this.formValue.value.firstName;
    this.userModelObj.lastName = this.formValue.value.lastName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.userModelObj.salary = this.formValue.value.salary;

    //update method
    this.api.UpdateUser(this.userModelObj.id, this.userModelObj)
      .subscribe(res => {
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })
  }

  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  Loaduser() {
    this.service.GetAll()
      .subscribe(res => {
        this.userlist = res;
        this.dataSource = new MatTableDataSource(this.userlist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  //TS code
  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status'];


  //Edit function
  Edituser(code: string) {
    const popup = this.dialog.open(EditpopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: code
      }
    })
    popup.afterClosed().subscribe(res => {
      this.Loaduser();
    });
  }

  //delete
  deleteUser(id: string) {
    this.service.delete(id).subscribe(res => {
      alert('Deleted suucessfully');
      this.service.GetAll();
      location.reload();
    });
  }

}