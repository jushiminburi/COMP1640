import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagerComponent } from './admin/account-manager/account-manager.component';
import { AdminComponent } from './admin/admin.component';
import { CreateAccountComponent } from './admin/create-account/create-account.component';


import { LoginComponent } from './login/login.component';
import { QamComponent } from './qam/qam.component';
import { CategorymanagerComponent } from './qam/categorymanager/categorymanager.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StaffComponent } from './staff/staff.component';
import { TesttemComponent } from './testtem/testtem.component';
import { EventAndDeadLineComponent } from './admin/event-and-deadline/event-and-deadline.component';
import { EventListComponent } from './admin/event-list/event-list.component';
import { DashboardsAdminComponent } from './admin/dashboards/dashboards.component';
import { CreateIdeaComponent } from './staff/create-idea/create-idea.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'testtem', component: TesttemComponent },
  {path: 'qam', component: QamComponent,
    children: [
      { path: 'categorymanager', component: CategorymanagerComponent }
    ]},
  { path: 'resetpassword', component: ResetPasswordComponent},
  { path: 'admin', component: AdminComponent,
    children: [
      {path: 'dashboard', component: DashboardsAdminComponent},
      { path: 'createaccount', component: CreateAccountComponent },
      { path: 'accountmanager', component: AccountManagerComponent},
      {path: 'eventlist', component: EventListComponent,
      
    },

      {path: 'eventanddeadline', component: EventAndDeadLineComponent},
      
    ],
 },
  { path: 'staff', component: StaffComponent ,
children:[
  {path:'createidea' , component: CreateIdeaComponent}
]},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
