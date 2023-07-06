import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-editpopup',
  templateUrl: './editpopup.component.html'
})
export class EditpopupComponent {
  //varibles
  rolelist: any;
  formValue !: FormGroup;

  //constructor 
  constructor(private builder: FormBuilder, private servive: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private dialog: MatDialogRef<UpdatepopupComponent>) {

  }
  //properties
  editdata: any;

  //TODO, check role activity
  ngOnInit(): void {
    this.servive.GetAllRole()
      .subscribe(res => {
        this.rolelist = res;
      })
    if (this.data.usercode != null && this.data.usercode != '') {
      this.servive.Getbycode(this.data.usercode)
        .subscribe(res => {
          this.editdata = res;
          this.registerform.setValue({
            id: this.editdata.id, name: this.editdata.name, email: this.editdata.email, password: this.editdata.password,
            role: this.editdata.role, gender: this.editdata.gender, isActive: this.editdata.isActive
          })
        });
    }
  }

  //form initialise
  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false)
  });

  //updateuser method
  edituser() {
    if (this.registerform.valid) {
      this.servive.Updateuser(this.registerform.value.id, this.registerform.value)
        .subscribe(res => {
          // alert('Updated successfully.');
          this.toastr.success('Edited successfully.');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please Select Role')
    }
  }

}
