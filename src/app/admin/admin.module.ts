import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [],
  exports:[],
  providers: [ToastrService]
})
export class AdminModule { }
