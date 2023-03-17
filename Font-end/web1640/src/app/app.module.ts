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
import { SwitcherWrapperComponent } from './switcher-wrapper/switcher-wrapper.component';

import { DashboardsAdminComponent } from './admin/dashboards/dashboards.component';
import { MostPopularIdeaComponent } from './qam/most-popular-idea/most-popular-idea.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';

import { EventListComponent } from './admin/event-list/event-list.component';
import { EventAndDeadLineComponent } from './admin/event-and-deadline/event-and-deadline.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentsComponent } from './comments/comments.component';
import { CommentsListComponent } from './comments/comments-list/comments-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardComponent } from './qam/dash-board/dash-board.component';
import { CategoryManagerComponent } from './qam/category-manager/category-manager.component';

import { QacComponent } from './qac/qac.component';
import { ProfileUserComponent } from './qac/profile-user/profile-user.component';
import { EmailComponent } from './qac/email/email.component';
import { EventDetailComponent } from './qam/event-detail/event-detail.component';
import { DocumentDownloadComponent } from './qam/document-download/document-download.component';
import { StaffHomePageComponent } from './staff/staff-home-page/staff-home-page.component';
import { IdeaOfEventComponent } from './staff/idea-of-event/idea-of-event.component';
import { EachIdeaComponent } from './staff/each-idea/each-idea.component';
import { EachEventComponent } from './staff/each-event/each-event.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    AdminComponent,
    CreateAccountComponent,
    HeaderComponent,
    FooterComponent,
    LogoWebComponent,
    TesttemComponent,
    ResetPasswordComponent,
    AccountManagerComponent,
    QamComponent,

    SwitcherWrapperComponent,

    EventListComponent,
    EventAndDeadLineComponent,

    DashboardsAdminComponent,
    MostPopularIdeaComponent,

    SwitcherWrapperComponent,
  
    SnackBarComponent,
    CommentsComponent,
    CommentsListComponent,
    DocumentDownloadComponent,
    DashBoardComponent,
    CategoryManagerComponent,
    QacComponent,
  
    EmailComponent,

    EventDetailComponent ,
    StaffComponent,
    StaffHomePageComponent,
    IdeaOfEventComponent,
    EachIdeaComponent,
    EachEventComponent,

    
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    AppRoutingModule, ReactiveFormsModule, MatDialogModule,  ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), NgToastModule, MatPaginatorModule, NgxPaginationModule, MatSnackBarModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, NgbModule, BrowserAnimationsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
