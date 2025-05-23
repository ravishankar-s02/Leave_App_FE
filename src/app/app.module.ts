import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { JobComponent } from './components/job/job.component';
import { SalaryComponent } from './components/salary/salary.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { EducationComponent } from './components/education/education.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './components/view-user/view-user.component';

// AG Grid imports
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';

// Register the required module(s)
ModuleRegistry.registerModules([ClientSideRowModelModule]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ApplyLeaveComponent,
    MyLeavesComponent,
    AllLeavesComponent,
    AdminDashboardComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    PersonalDetailsComponent,
    ContactDetailsComponent,
    JobComponent,
    SalaryComponent,
    WorkExperienceComponent,
    EducationComponent,
    ViewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
