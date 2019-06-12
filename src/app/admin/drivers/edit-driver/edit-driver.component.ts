import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DriverService } from '../driver.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { IDriver } from '../driver';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {

public currentDriver: IDriver;

driverid: any;
 updateDriverForm: FormGroup;

  constructor(private fb: FormBuilder,
   private driverService: DriverService,
   private toastr: ToastrService,
   private router: Router,
   private route: ActivatedRoute,
   public dialogRef: MatDialogRef<EditDriverComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { 
   
   this.driverid = data.id;
         this.updateDriverForm = this.fb.group ({
            'drivername'    : new FormControl(""),
            'driverphoneno' : new FormControl(""),
            'driveraddress' : new FormControl("")
        });
   
   }

  ngOnInit() {
   this.getOneDriver(this.driverid);
  }
  
  getOneDriver(id){
    this.driverService.getDriver(id).subscribe((res) => {
          this.currentDriver = res;
          console.log("cleintsssss--"+ this.currentDriver);
          console.log("cleintsssss--"+ this.currentDriver.driverName);
           this.populateForm(this.currentDriver);
        }, err => {
          console.log(err);
        });
  }
  
  populateForm(data): void {
    this.updateDriverForm.patchValue({
      drivername: data.driverName,
      driverphoneno: data.driverPhoneNo,
      driveraddress: data.driverAddress
    });
  }
  
  
editDriver(formdata:any){
    let theForm = this.updateDriverForm.value;
    this.driverService.editDriver(this.driverid, theForm).subscribe((res) => {
    if (res.success === false) {
            this.toastr.error(res.message);
          } else {
            this.toastr.success(res.message);
            this.router.navigate(['/admin/drivers']);
            this.dialogRef.close();
          }
          this.updateDriverForm.reset();
      });
}

    close() {
        this.dialogRef.close();
    }

}
