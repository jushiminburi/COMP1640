import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';

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
import { CategorymanagerComponent } from './qam/categorymanager/categorymanager.component';
import { SwitcherWrapperComponent } from './switcher-wrapper/switcher-wrapper.component';

import { DashboardsAdminComponent } from './admin/dashboards/dashboards.component';
import { MostPopularIdeaComponent } from './qam/most-popular-idea/most-popular-idea.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileStaffComponent } from './staff/profile-staff/profile-staff.component';
import { CreateIdeaComponent } from './staff/create-idea/create-idea.component';

import { EventListComponent } from './admin/event-list/event-list.component';
import { EventAndDeadLineComponent } from './admin/event-and-deadline/event-and-deadline.component';
import { IdeaComponent } from './idea/idea.component';
import { ListIdeaComponent } from './idea/list-idea/list-idea.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentsComponent } from './comments/comments.component';
import { CommentsListComponent } from './comments/comments-list/comments-list.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

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
    CategorymanagerComponent,
    SwitcherWrapperComponent,

    EventListComponent,
    EventAndDeadLineComponent,

    DashboardsAdminComponent,
    MostPopularIdeaComponent,

    SwitcherWrapperComponent,
    ProfileStaffComponent,
    CreateIdeaComponent,
    IdeaComponent,
    ListIdeaComponent,
    SnackBarComponent,
    CommentsComponent,
    CommentsListComponent ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    AppRoutingModule, ReactiveFormsModule, MatDialogModule, ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), NgToastModule, MatPaginatorModule, NgxPaginationModule, MatSnackBarModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, NgbModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
