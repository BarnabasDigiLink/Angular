import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project';

  //variables
  ismenurequired = false;
  isadminuser = false;
  //constructer creation
  constructor(private router: Router, private service: AuthService) {

  }
  ngDoCheck(): void {
    let currenturl = this.router.url;
    //check which page is logged in
    if (currenturl == '/login' || currenturl == '/signup') {
      this.ismenurequired = false;
    } else {
      this.ismenurequired = true;
    }
    if(this.service.GetUserrole()=== 'admin'){
      this.isadminuser = true;
    }else{
      this.isadminuser = false;
    }
  }
 
  ngOnInit(): void {
    new Function();
  }
  //??
  clickAddUser() {
    // this.formValue.reset();
    // this.showAdd = true;
    // this.showUpdate = false;
  }
}
