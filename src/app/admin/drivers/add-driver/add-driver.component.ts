import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DriverService } from '../driver.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

 driverForm: FormGroup;

  constructor(private fb: FormBuilder,
   private driverService: DriverService,
   private toastr: ToastrService,
   private router: Router,
   public dialogRef: MatDialogRef<AddDriverComponent>) { 
   
    this.driverForm = this.fb.group ({
            'drivername'    : new FormControl(""),
            'driverphoneno' : new FormControl(""),
            'driveraddress' : new FormControl("")
        });
   }

  ngOnInit() {
  }
  
  saveDriver(formdata:any) {
   let theForm = this.driverForm.value;
      this.driverService.addDriver(theForm).subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.ngOnInit();
            this.dialogRef.close();
          }
          this.driverForm.reset();
      });
    }
    
    close() {
        this.dialogRef.close();
    }

}
