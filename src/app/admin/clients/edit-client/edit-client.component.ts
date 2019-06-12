import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { IClient } from '../client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

public currentClient: IClient;

 clientid:any;
 updateClientForm: FormGroup;


  constructor(private fb: FormBuilder,
   private clientService: ClientService,
   private toastr: ToastrService,
   private router: Router,
   private route: ActivatedRoute,
   public dialogRef: MatDialogRef<EditClientComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { 
   
   console.log(data.id);
   this.clientid = data.id;
         this.updateClientForm = this.fb.group ({
            'clientname'    : new FormControl(""),
            'clientphoneno' : new FormControl(""),
            'clientemail'   : new FormControl(""),
            'clientaddress' : new FormControl("")
        });
   }


  ngOnInit() {
    this.getOneClient(this.clientid);
  }
  
  
  getOneClient(id){
    this.clientService.getClient(id).subscribe((res) => {
          this.currentClient = res;
          console.log("cleintsssss--"+ this.currentClient);
          console.log("cleintsssss--"+ this.currentClient.clientName);
           this.populateForm(this.currentClient);
        }, err => {
          console.log(err);
        });
  }
  
  populateForm(data): void {
    this.updateClientForm.patchValue({
      clientname: data.clientName,
      clientemail: data.clientEmail,
      clientphoneno: data.clientPhoneNo,
      clientaddress: data.clientAddress
    });
  }
  
  
editClient(formdata:any){
    let theForm = this.updateClientForm.value;
    this.clientService.editClient(this.clientid, theForm).subscribe((res) => {
    if (res.success === false) {
            this.toastr.error(res.message);
          } else {
            this.toastr.success(res.message);
            this.router.navigate(['/admin/clients']);
            this.dialogRef.close();
          }
          this.updateClientForm.reset();
      });
}

    close() {
        this.dialogRef.close();
    }
}
