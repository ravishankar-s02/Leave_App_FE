import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';
import { LeaveSummaryComponent } from './components/leave-summary/leave-summary.component';
import { UploadLeaveComponent } from './components/upload-leave/upload-leave.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { JobComponent } from './components/job/job.component';
import { SalaryComponent } from './components/salary/salary.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { EducationComponent } from './components/education/education.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    canActivate: [AuthGuard] // ✅ Block if already logged in
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'apply-leave', component: ApplyLeaveComponent, canActivate: [AuthGuard] },
      { path: 'my-leaves', component: MyLeavesComponent, canActivate: [AuthGuard] },
      { path: 'all-leaves', component: AllLeavesComponent, canActivate: [AuthGuard] },
      { path: 'leave-summary', component: LeaveSummaryComponent, canActivate: [AuthGuard] },
      { path: 'upload-leave', component: UploadLeaveComponent, canActivate: [AuthGuard] },
      { path: 'personal-details', component: PersonalDetailsComponent, canActivate: [AuthGuard] },
      { path: 'contact-details', component: ContactDetailsComponent, canActivate: [AuthGuard] },
      { path: 'job', component: JobComponent, canActivate: [AuthGuard] },
      { path: 'salary', component: SalaryComponent, canActivate: [AuthGuard] },
      { path: 'work-experience', component: WorkExperienceComponent, canActivate: [AuthGuard] },
      { path: 'education', component: EducationComponent, canActivate: [AuthGuard] },
      { path: 'view-user', component: ViewUserComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
