import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService) { 
    
        this.registerForm = this.fb.group({
            'name': new FormControl(""),
            'email': new FormControl(""),
            'password': new FormControl(""),
            'address': new FormControl(""),
            'phoneNo': new FormControl("")
        });

    }

  ngOnInit() {
  }

    registerUser() {
    let theForm = this.registerForm.value;
      this.userService.addUser(theForm).subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.router.navigate(['/login']);
          }
          this.registerForm.reset();
      });
    }
}
