import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router,
                private toastr: ToastrService) {}
                
        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
                
            if (this.authService.isLoggedIn()) {
            
            let roles = route.data.expectedRole;
            if (roles) {
                var match = this.authService.roleMatch(roles);
                if (match) return true;
                else {
                    this.router.navigate(['/login']);
                    return false;
                }
            }
          else
          return true;
        }

        this.toastr.info("Please login to access this page.")
        this.router.navigate(['/login']);
        return false;
    }
}