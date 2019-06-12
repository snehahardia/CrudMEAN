import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AddBookingComponent } from './add-booking/add-booking.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';

import { DialogService } from '../../dialog.service';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

addBookingDialogRef: MatDialogRef<AddBookingComponent>;
editBookingDialogRef: MatDialogRef<EditBookingComponent>;


  constructor(public dialog: MatDialog, 
  private dialogService: DialogService,
     private bookingService: BookingService,
     private router: Router) { }

bookings: any;

openAddBookingDialog() {
   this.addBookingDialogRef = this.dialogService.open(AddBookingComponent,{
    width:'500px'
   })
   
   this.addBookingDialogRef.afterClosed().subscribe(() => {
        this.getAllBookings();
    });
  }
  
   openEditBookingDialog(id) {
   this.dialogService.open(EditBookingComponent,{
    width:'500px',
    data: {'id': id}
   })
  }
  
  ngOnInit() {
    this.getAllBookings();
  }
  
  getAllBookings(){
      this.bookingService.getBookings().subscribe((res) => {
          this.bookings = res;
        }, err => {
          console.log(err);
        });
    }
    
  deleteBooking(id) {
  this.bookingService.deleteBooking(id)
    .subscribe(res => {
        this.router.navigate(['./booking']);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      }
    );
}

}
