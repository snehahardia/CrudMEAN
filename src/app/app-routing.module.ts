import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { EnquiryComponent } from './enquiry/enquiry.component';

import { TabsModule } from 'ngx-bootstrap';


const appRoutes: Routes = [
    {
      path: '',
      component: MainpageComponent,
      children: [
                    {
                      path: 'login',
                      component: LoginComponent
                    },
                    {
                      path: 'signup',
                      component: SignUpComponent
                    },
                    {
                      path: 'enquiry',
                      component: EnquiryComponent
                    }
                ]
    },
    {
      path: 'admin',
      loadChildren: './admin/admin.module#AdminModule'
    
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'logout',
      component: LogoutComponent
    }
    
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule.forRoot()

  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
    MainpageComponent, 
    HomeComponent,
    LogoutComponent,
    EnquiryComponent
  ],
   exports: [ RouterModule ]
})

export class AppRoutingModule { }
