import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  //creating a constructor
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) {

  }

  //form initialise
  registerform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$!%*?&].{4,}')])),
    email: this.builder.control('', Validators.compose([Validators.email, Validators.required])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isActive: this.builder.control(false)
  });

  //functions
  proceedregistration() {
    console.log(this.registerform.value);
    if (this.registerform.valid) {
      this.service.Proceedregister(this.registerform.value)
        .subscribe(res => {
          alert('Please contact admin for enable access');
          this.router.navigate(['login']);
        })
    } else {
      alert('Please enter valid data!');
    }
  }

}
