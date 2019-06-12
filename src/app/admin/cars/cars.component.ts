import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICar } from './car';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';

import { DialogService } from '../../dialog.service';
import { CarService } from './car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

public currentCar: ICar;
cars: any;

 addCarDialogRef: MatDialogRef<AddCarComponent>;
 editCarDialogRef: MatDialogRef<EditCarComponent>;

  constructor(public dialog: MatDialog, 
  private dialogService: DialogService,
  private carService: CarService,
     private router: Router) { }
     
    openAddCarDialog() {
        this.addCarDialogRef = this.dialogService.open(AddCarComponent,{
        width:'500px'
   })
   
    this.addCarDialogRef.afterClosed().subscribe(() => {
        this.getAllCars();
    });
  }
  
  openEditCarDialog(id) {
   this.dialogService.open(EditCarComponent,{
    width:'500px',
    data: {'id': id}
   })
  }
  

  ngOnInit() {
   this.getAllCars();
  }
  
  getAllCars(){
      this.carService.getCars().subscribe((res) => {
          console.log(res);
          this.cars = res;
        }, err => {
          console.log(err);
        });
    }
 
 deleteCar(id) {
  this.carService.deleteCar(id)
    .subscribe(res => {
        this.router.navigate(['./cars']);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      }
    );
}

}
