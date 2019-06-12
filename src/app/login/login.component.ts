import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private router: Router,
    private authService:AuthService,
    private userService:UserService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<LoginComponent>) { 
    
        this.loginForm = this.fb.group({
            'email': new FormControl(""),
            'password': new FormControl("")
        });
    }

  ngOnInit() {

  }
  
  loginUser(formdata:any){
      this.authService.login(this.loginForm.value)
        .subscribe(data => {
          if (data.json().success === false) {
            this.toastr.error(data.json().message);
          } else {
                 if(this.authService.roleMatch('admin')=== true) {
                      this.toastr.success('Welcome Admin.');
                      this.router.navigate(['/admin']);
                      this.dialogRef.close();
                  }
                  else {
                      this.toastr.success('Login successful.');
                      this.router.navigate(['/home']);
                      this.dialogRef.close();
                  }
          }
          this.loginForm.reset();
        }); 
  }
  
  close() {
        this.dialogRef.close();
    }
  
}