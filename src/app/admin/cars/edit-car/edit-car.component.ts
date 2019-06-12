import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CarService } from '../car.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ICar } from '../car';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  public currentCar: ICar;

 carid:any;
 updateCarForm: FormGroup;

  constructor(private fb: FormBuilder,
   private carService: CarService,
   private toastr: ToastrService,
   private router: Router,
   private route: ActivatedRoute,
   public dialogRef: MatDialogRef<EditCarComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { 
   
   console.log(data.id);
   this.carid = data.id;
         this.updateCarForm = this.fb.group ({
            'carname'    : new FormControl(""),
            'carno' : new FormControl("")
        });
   }


  ngOnInit() {
   this.getOneCar(this.carid);
  }

getOneCar(id){
    this.carService.getCar(id).subscribe((res) => {
          this.currentCar = res;
          console.log("cleintsssss--"+ this.currentCar);
          console.log("cleintsssss--"+ this.currentCar.carName);
           this.populateForm(this.currentCar);
        }, err => {
          console.log(err);
        });
  }
  
  populateForm(data): void {
    this.updateCarForm.patchValue({
      carname: data.carName,
      carno: data.carNo
    });
  }
  
  
editCar(formdata:any){
    let theForm = this.updateCarForm.value;
    this.carService.editCar(this.carid, theForm).subscribe((res) => {
    if (res.success === false) {
            this.toastr.error(res.message);
          } else {
            this.toastr.success(res.message);
            this.router.navigate(['/admin/cars']);
            this.dialogRef.close();
          }
          this.updateCarForm.reset();
      });
}

    close() {
        this.dialogRef.close();
    }
}
