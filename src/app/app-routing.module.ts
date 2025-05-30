import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { JobComponent } from './components/job/job.component';
import { SalaryComponent } from './components/salary/salary.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { EducationComponent } from './components/education/education.component';
import { ViewUserComponent } from './components/view-user/view-user.component'; // ✅ Import view-user component

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'apply-leave', component: ApplyLeaveComponent },
  { path: 'my-leaves', component: MyLeavesComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'all-leaves', component: AllLeavesComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'personal-details', component: PersonalDetailsComponent },
      { path: 'contact-details', component: ContactDetailsComponent },
      { path: 'job', component: JobComponent },
      { path: 'salary', component: SalaryComponent },
      { path: 'work-experience', component: WorkExperienceComponent },
      { path: 'education', component: EducationComponent },
      { path: 'apply-leaves', component: ApplyLeaveComponent },
      { path: 'my-leaves', component: MyLeavesComponent },
      { path: 'all-leaves', component: AllLeavesComponent },
      { path: 'register', component: RegisterComponent },

      // ✅ Add the new admin-only route
      { path: 'view-user', component: ViewUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
