import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../clients/client.service';
import { CarService } from '../../cars/car.service';
import { DriverService } from '../../drivers/driver.service';

import { BookingService } from '../booking.service';


@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

 bookingForm: FormGroup;

  constructor(private fb: FormBuilder,
   private toastr: ToastrService,
   private router: Router,
   private clientService: ClientService,
   private carService: CarService,
   private driverService: DriverService,
   private bookingService: BookingService,
   public dialogRef: MatDialogRef<AddBookingComponent>) { 
   
     this.bookingForm = this.fb.group ({
            'clientname'  : new FormControl(""),
            'bookingdate' : new FormControl(""),
            'fromcity'    : new FormControl(""),
            'tocity'      : new FormControl(""),
            'pickupdate'  : new FormControl(""),
            'returndate'  : new FormControl(""),
            'carname'     : new FormControl(""),
            'drivername'  : new FormControl("")
        });
        
   }
   
   clients: any;
   cars: any;
   drivers: any;
   bookings: any;

  ngOnInit() {
  this.getAllClients();
  this.getAllCars();
  this.getAllDrivers();
  this.getAllBookings();
  }
  
  setDate(): void {
        let date = new Date();
        this.bookingForm.patchValue({bookingdate: {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()}
        }});
    }
    
   getAllClients(){
      this.clientService.getClients().subscribe((res) => {
          console.log(res);
          this.clients = res;
        }, err => {
          console.log(err);
        });
    }
    
      getAllCars(){
      this.carService.getCars().subscribe((res) => {
          console.log(res);
          this.cars = res;
        }, err => {
          console.log(err);
        });
    }
    
    getAllDrivers(){
      this.driverService.getDrivers().subscribe((res) => {
          console.log(res);
          this.drivers = res;
        }, err => {
          console.log(err);
        });
    }
    
    getAllBookings(){
      this.bookingService.getBookings().subscribe((res) => {
          this.bookings = res;
        }, err => {
          console.log(err);
        });
    }
    
   saveBooking(formdata:any) {
      let theForm = this.bookingForm.value;
      this.bookingService.addBooking(theForm).subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.ngOnInit(); 
            this.dialogRef.close();
          }
          this.bookingForm.reset();
      });
    }
    
    
    close() {
        this.dialogRef.close();
    }
  
  
}
