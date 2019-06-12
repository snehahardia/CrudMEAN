import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

 clientForm: FormGroup;
 clients: any;

  constructor(private fb: FormBuilder,
   private clientService: ClientService,
   private toastr: ToastrService,
   private router: Router,
   public dialogRef: MatDialogRef<AddClientComponent>) { 
        
        this.clientForm = this.fb.group ({
            'clientname'    : new FormControl(""),
            'clientphoneno' : new FormControl(""),
            'clientemail'   : new FormControl(""),
            'clientaddress' : new FormControl("")
        });
    
    }
    
  ngOnInit() {
    this.router.navigate(['/admin/clients']);
     this.getAllClients();
  }
  
   getAllClients(){
      this.clientService.getClients().subscribe((res) => {
          console.log(res);
          this.clients = res;
        }, err => {
          console.log(err);
        });
    }

saveClient(formdata:any) {
   let theForm = this.clientForm.value;
      this.clientService.addClient(theForm).subscribe(data => {
          if (data.success === false) {
            this.toastr.error(data.message);
          } else {
            this.toastr.success(data.message);
            this.ngOnInit();
            this.dialogRef.close();
          }
          this.clientForm.reset();
      });
    }
    
    
    
    close() {
        this.dialogRef.close();
    }
    
    

}
