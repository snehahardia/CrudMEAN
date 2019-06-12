import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CarService } from '../car.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

 carForm: FormGroup;

  constructor(private fb: FormBuilder,
   private carService: CarService,
   private toastr: ToastrService,
   private router: Router,
   public dialogRef: MatDialogRef<AddCarComponent>) { 
        
        this.carForm = this.fb.group ({
            'carname' : new FormControl(""),
            'carno' : new FormControl("")
        });
    console.log("car data==="+this.carForm.value);
    }
    
  ngOnInit() {
  }

saveCar(formdata:any) {
   let theForm = this.carForm.value;
      this.carService.addCar(theForm).subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.router.navigate(['/admin/cars']);
            this.dialogRef.close();
          }
          this.carForm.reset();
      });
    }
    
    close() {
        this.dialogRef.close();
    }

}
