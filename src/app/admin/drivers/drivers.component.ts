import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AddDriverComponent } from './add-driver/add-driver.component';
import { EditDriverComponent } from './edit-driver/edit-driver.component';

import { DialogService } from '../../dialog.service';
import { DriverService } from './driver.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})

export class DriversComponent implements OnInit {

drivers: any;

 addDriverDialogRef: MatDialogRef<AddDriverComponent>;
 editDriverDialogRef: MatDialogRef<EditDriverComponent>;

  constructor(public dialog: MatDialog, 
  private dialogService: DialogService,
  private driverService: DriverService,
     private router: Router) { }
     
    openAddDriverDialog() {
   this.addDriverDialogRef = this.dialogService.open(AddDriverComponent,{
    width:'500px'
   })
   
   this.addDriverDialogRef.afterClosed().subscribe(() => {
        this.getAllDrivers();
    });
  }
  
  openEditDriverDialog(id) {
   this.dialogService.open(EditDriverComponent,{
    width:'500px',
    data: {'id': id}
   })
  }

  ngOnInit() {
    this.getAllDrivers();
  }
  
   getAllDrivers(){
      this.driverService.getDrivers().subscribe((res) => {
          console.log(res);
          this.drivers = res;
        }, err => {
          console.log(err);
        });
    }
    
  deleteDriver(id) {
  this.driverService.deleteDriver(id)
    .subscribe(res => {
        this.router.navigate(['./drivers']);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      }
    );
}

}
