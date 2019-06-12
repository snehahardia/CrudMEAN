import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {

contactForm: FormGroup;
disabledSubmitButton: boolean = true;
optionsSelect: Array<any>;

  constructor(private fb: FormBuilder,
   private toastr: ToastrService,
   private router: Router,
   private connectionService: ConnectionService,
   public dialogRef: MatDialogRef<EnquiryComponent>) { 
   
   this.contactForm = fb.group({
        'contactFormName': ['', Validators.required],
        'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
        'contactFormSubjects': ['', Validators.required],
        'contactFormMessage': ['', Validators.required],
        'contactFormCopy': [''],
    });
   
   
   }

  ngOnInit() {
  
  this.optionsSelect = [
    { value: 'Feedback', label: 'Feedback' },
    { value: 'Report a bug', label: 'Report a bug' },
    { value: 'Feature request', label: 'Feature request' },
    { value: 'Other stuff', label: 'Other stuff' },
    ];
  }
  
  onSubmit() {
    this.connectionService.sendMessage(this.contactForm.value).subscribe(() => {
      alert('Your message has been sent.');
      this.contactForm.reset();
      this.disabledSubmitButton = true;
    }, error => {
      console.log('Error', error);
    });
  }
  
  close() {
        this.dialogRef.close();
    }

}