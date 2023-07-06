import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})

export class authGuard {
  constructor(private service: AuthService, private router: Router, private toastr: ToastrService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    //check if user logged is as
    if (this.service.IsLoggedIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'user') {
          if (this.service.GetUserrole()=='admin'){
            return true;
          }else{
            alert('You do not have access');
            this.router.navigate(['']);
            return false;
          }
        }
        else {
          return true;
        }
      } else {
        return true;
      }

    } else {
      this.router.navigate(['login']);
      return false;
    }

    return true;

  }
}