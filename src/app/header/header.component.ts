import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '../auth.service';
import { DialogService } from '../dialog.service';

import { LoginComponent } from '../login/login.component';
import { EnquiryComponent } from '../enquiry/enquiry.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

signInDialogRef: MatDialogRef<LoginComponent>;
enquiryDialogRef: MatDialogRef<EnquiryComponent>;

  constructor(public authService: AuthService,
  private dialogService: DialogService) { }
  
  openLoginDialog() {
   this.signInDialogRef = this.dialogService.open(LoginComponent,{
    width:'500px'
   })
  }
  
  openEnquiryDialog() {
   this.enquiryDialogRef = this.dialogService.open(EnquiryComponent,{
    width:'500px'
   })
  }
  
  ngOnInit() {
  }

}
