import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagerComponent } from './admin/account-manager/account-manager.component';
import { AdminComponent } from './admin/admin.component';
import { CreateAccountComponent } from './admin/create-account/create-account.component';


import { LoginComponent } from './login/login.component';
import { QamComponent } from './qam/qam.component';
import { CategorymanagerComponent } from './qam/category-manager/category-manager.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StaffComponent } from './staff/staff.component';
import { TesttemComponent } from './testtem/testtem.component';

import { DashboardsAdminComponent } from './admin/dashboards/dashboards.component';
import { EventListComponent } from './admin/event-list/event-list.component';
import { EventAndDeadLineComponent } from './admin/event-and-deadline/event-and-deadline.component';
import { MostPopularIdeaComponent } from './qam/most-popular-idea/most-popular-idea.component';
import { DashBoardComponent } from './qam/dash-board/dash-board.component';
import { QacComponent } from './qac/qac.component';
import { ProfileUserComponent } from './qac/profile-user/profile-user.component';
import { EmailComponent } from './qac/email/email.component';
import { EventDetailComponent } from './qam/event-detail/event-detail.component';
import { DocumentDownloadComponent } from './qam/document-download/document-download.component';
import { ViewIdeaComponent } from './qac/view-idea/view-idea.component';
import { StaffHomePageComponent } from './staff/staff-home-page/staff-home-page.component';
import { EachEventComponent } from './staff/each-event/each-event.component';
import { DepartmentManagerComponent } from './admin/department-manager/department-manager.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'testtem', component: TesttemComponent },
  {path: 'qam', component: QamComponent,
    children: [
      { path: 'category-manager', component: CategorymanagerComponent },
      {path: 'dash-board', component: DashBoardComponent},
      {path: 'idea', component: MostPopularIdeaComponent },
      {path:'events/:id', component: EventDetailComponent },
      {path : 'document-download', component: DocumentDownloadComponent}]

   },

    { path: 'qac' , component: QacComponent,
    children:
    [{path: 'view-idea', component: ViewIdeaComponent},{
      path: 'profile-user', component: ProfileUserComponent
    },{path:'email', component:EmailComponent}]
  }
,
  { path: 'resetpassword', component: ResetPasswordComponent},
  { path: 'admin', component: AdminComponent,
    children: [
      {path: 'dashboard', component: DashboardsAdminComponent},
      {path: 'createaccount', component: CreateAccountComponent },
      {path: 'accountmanager', component: AccountManagerComponent},
      {path: 'eventlist', component: EventListComponent },
      {path: 'eventanddeadline', component: EventAndDeadLineComponent},
      {path: 'department', component: DepartmentManagerComponent}


    ],
 },
 { path: 'staff', component: StaffComponent ,
 children: [
   {path: 'homepage', component: StaffHomePageComponent},
   {path: 'eachevent', component: EachEventComponent}
 ]},



]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
