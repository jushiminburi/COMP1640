import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { StaffComponent } from './staff/staff.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoWebComponent } from './logo-web/logo-web.component';
// import { Interceptor } from './Interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TesttemComponent } from './testtem/testtem.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountManagerComponent } from './admin/account-manager/account-manager.component';
import { ApiService } from './api.service';
import { CreateAccountComponent } from './admin/create-account/create-account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponentComponent } from './admin/create-account/success-dialog-component/success-dialog-component.component';
import { QamComponent } from './qam/qam.component';
import { TopicmanagerComponent } from './qam/topicmanager/topicmanager.component';
import { SwitcherWrapperComponent } from './switcher-wrapper/switcher-wrapper.component';
import { TopicAndDeadLineComponent } from './admin/topic-and-dead-line/topic-and-dead-line.component';
import { TopicListComponent } from './admin/topic-list/topic-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileStaffComponent } from './staff/profile-staff/profile-staff.component';
import { CreateIdeaComponent } from './staff/create-idea/create-idea.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    StaffComponent,
    CreateAccountComponent,
    HeaderComponent,
    FooterComponent,
    LogoWebComponent,
    TesttemComponent,
    ResetPasswordComponent,
    AccountManagerComponent,
    QamComponent,
    TopicmanagerComponent,
    SwitcherWrapperComponent,
    ProfileStaffComponent,
    CreateIdeaComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    AppRoutingModule, ReactiveFormsModule, MatDialogModule, ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), NgToastModule, MatPaginatorModule, NgxPaginationModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
