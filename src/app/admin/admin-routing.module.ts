import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BookingComponent } from './booking/booking.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { CarsComponent } from './cars/cars.component';
import { DriversComponent } from './drivers/drivers.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';
import { EditDriverComponent } from './drivers/edit-driver/edit-driver.component';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { EditCarComponent } from './cars/edit-car/edit-car.component';
import { AddBookingComponent } from './booking/add-booking/add-booking.component';
import { EditBookingComponent } from './booking/edit-booking/edit-booking.component';

import { AuthGuardService as AuthGuard } from '../auth-guard.service';
import { DialogService } from '../dialog.service';
import { ClientService } from './clients/client.service';
import { DriverService } from './drivers/driver.service';
import { CarService } from './cars/car.service';
import { BookingService } from './booking/booking.service';


const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard], 
        data: { 
            expectedRole: 'admin'
        },
        children:[
            {  path: '',
               children:[
                   {
                    path: 'booking',
                    component: BookingComponent,
                     children: [{
                            path: '',
                            children:[
                                {
                                  path: 'add', 
                                  component: AddBookingComponent
                                },
                                {
                                  path: 'id', 
                                  redirectTo: BookingComponent
                                },
                                {
                                  path: 'edit/:id', 
                                  component: EditBookingComponent
                                }
                            ]
                        }]
                   },
                   {
                    path: 'clients',
                    component: ClientsComponent,
                    children: [{
                            path: '',
                            children:[
                                {
                                  path: 'add', 
                                  component: AddClientComponent
                                },
                                {
                                  path: 'id', 
                                  redirectTo: ClientsComponent
                                },
                                {
                                  path: 'edit/:id', 
                                  component: EditClientComponent
                                }
                            ]
                        }]
                   },
                   {
                    path: 'cars',
                    component: CarsComponent,
                    children: [{
                            path: '',
                            children:[
                                {
                                  path: 'add', 
                                  component: AddCarComponent
                                },
                                {
                                  path: 'id', 
                                  redirectTo: CarsComponent
                                },
                                {
                                  path: 'edit/:id', 
                                  component: EditCarComponent
                                }
                            ]
                        }]
                   },
                   {
                    path: 'drivers',
                    component: DriversComponent,
                     children: [{
                            path: '',
                            children:[
                                    {
                                      path: 'add', 
                                      component: AddDriverComponent
                                    },
                                    {
                                      path: 'id', 
                                      redirectTo: DriversComponent
                                    },
                                    {
                                      path: 'edit/:id', 
                                      component: EditDriverComponent
                                    }
                                ]
                    }]
                   }
               ]
            }
        ]
    }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [
  AdminComponent,
  BookingComponent,
  ClientsComponent,
  AddClientComponent,
  SidebarComponent,
  EditClientComponent,
  CarsComponent, 
  DriversComponent,
  AddDriverComponent,
  EditDriverComponent,
  AddCarComponent, 
  EditCarComponent,
  AddBookingComponent,
  EditBookingComponent
  ],
  exports: [
  RouterModule,
  SidebarComponent
  ],
  providers: [ToastrService, DialogService, ClientService, DriverService, CarService, BookingService]
  })
export class AdminRoutingModule { }
