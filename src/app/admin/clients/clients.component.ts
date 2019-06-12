import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IClient } from './client';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

import { DialogService } from '../../dialog.service';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

public currentClient: IClient;
clients: any;

 addClientDialogRef: MatDialogRef<AddClientComponent>;
 editClientDialogRef: MatDialogRef<EditClientComponent>;

  constructor(public dialog: MatDialog, 
  private dialogService: DialogService,
  private clientService: ClientService,
     private router: Router) { }
  
  openAddClientDialog() {
   this.addClientDialogRef = this.dialogService.open(AddClientComponent,{
    width:'500px'
   });

    this.addClientDialogRef.afterClosed().subscribe(() => {
        this.getAllClients();
    });
  }
  
  openEditClientDialog(id) {
   this.dialogService.open(EditClientComponent,{
    width:'500px',
    data: {'id': id}
   })
  }
  
  
   ngOnInit() {
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
 
 deleteClient(id) {
  this.clientService.deleteClient(id)
    .subscribe(res => {
        this.router.navigate(['./clients']);
        this.ngOnInit();
      }, (err) => {
        console.log(err);
      }
    );
}
  

}
