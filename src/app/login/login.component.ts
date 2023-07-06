import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //creating a constructor
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) {
    //session storage clearance
    sessionStorage.clear();

  }

  //variables 
  //TODO- data type string
  userdata: any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  //functions
  proceedlogin() {
    //getting username
    this.service.Getbycode(this.loginform.value.username)
      .subscribe(res => {
        this.userdata = res;
        console.log(this.userdata);
        //password check
        if (this.userdata.password === this.loginform.value.password) {
          //user activity check
          if (this.userdata.isActive) {
            sessionStorage.setItem('username', this.userdata.id);
            sessionStorage.setItem('userrole', this.userdata.role);
            this.router.navigate(['']);
          } else {
            alert('Please contact admin' + ' ' + 'In Active User');
          }
        } else {
          alert('Invalid credentials');
        }
      },(error: Response) =>{
        if(error.status == 404){
          alert('Username does not exist')
        }else{
          alert('Service not available')
        }
      });
  }

}


