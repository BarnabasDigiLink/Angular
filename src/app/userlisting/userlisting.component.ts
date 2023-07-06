import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatDialog } from '@angular/material/dialog'
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { EditpopupComponent } from '../editpopup/editpopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {

  //constructor creation
  constructor(private service: AuthService, private dialog: MatDialog) {
    //users(listed) fuction call 
    this.Loaduser();
  }
  userlist: any;//no anys
  dataSource: any;//fix
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
  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];

  //update function
  Updateuser(code: any) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: code
      }
    })
    popup.afterClosed().subscribe(res =>{
      this.Loaduser();
    });
  }

    //Edit function
    Edituser(code: any) {
      const popup = this.dialog.open(EditpopupComponent, {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '50%',
        data: {
          usercode: code
        }
      })
      popup.afterClosed().subscribe(res =>{
        this.Loaduser();
      });
    }

  // opendialog() {

  // }
  //delete
  deleteUser(id: any){
    this.service.delete(id).subscribe(res =>{
      alert('Deleted suucessfully');
      this.service.GetAll();
      location.reload();
    });
    
  }

}
