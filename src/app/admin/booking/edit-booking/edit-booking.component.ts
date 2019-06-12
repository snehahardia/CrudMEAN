import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BookingService } from '../booking.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CarService } from '../../cars/car.service';
import { DriverService } from '../../drivers/driver.service';
import { ClientService } from '../../clients/client.service';

import { IBooking } from '../booking';


@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})

export class EditBookingComponent implements OnInit {

    public currentBooking: IBooking;

    bookingid: any;
    updateBookingForm: FormGroup;
    cars: any;
    drivers: any;
    clients: any;
    
  constructor(private fb: FormBuilder,
   private bookingService: BookingService,
   private toastr: ToastrService,
   private router: Router,
   private carService: CarService,
   private driverService: DriverService,
   private clientService: ClientService,
   private route: ActivatedRoute,
   public dialogRef: MatDialogRef<EditBookingComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { 
   
   this.bookingid = data.id;
          this.updateBookingForm = this.fb.group ({
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

  ngOnInit() {
   this.getOneBooking(this.bookingid);
   this.getAllCars();
   this.getAllDrivers();
   this.getAllClients();
  }

    getAllCars(){
      this.carService.getCars().subscribe((res) => {
      this.cars = res;
        }, err => {
          console.log(err);
        });
    }
    
    getAllDrivers(){
      this.driverService.getDrivers().subscribe((res) => {
          this.drivers = res;
        }, err => {
          console.log(err);
        });
    }
    
    getAllClients(){
      this.clientService.getClients().subscribe((res) => {
          this.clients = res;
        }, err => {
          console.log(err);
        });
    }
     
   getOneBooking(id){
    this.bookingService.getBooking(id).subscribe((res) => {
          this.currentBooking = res;
          this.populateForm(this.currentBooking);
        }, err => {
          console.log(err);
        });
  }
  
  populateForm(data): void {
    this.updateBookingForm.patchValue({
            clientname  : data.clientName._id,
            bookingdate : data.bookingDate,
            fromcity    : data.fromCity,
            tocity      : data.toCity,
            pickupdate  : data.pickupDate,
            returndate  : data.returnDate,
            carname     : data.car._id,
            drivername  : data.driver._id
    });
  }
  
  editBooking(formdata:any){
    let theForm = this.updateBookingForm.value;
    this.bookingService.editBooking(this.bookingid, theForm).subscribe((res) => {
    if (res.success === false) {
            this.toastr.error(res.message);
          } else {
            this.toastr.success(res.message);
            this.router.navigate(['/admin/booking']);
            this.dialogRef.close();
          }
          this.updateBookingForm.reset();
      });
 }

    close() {
        this.dialogRef.close();
    }
    
  
    

}
