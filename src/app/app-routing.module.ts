import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';
import { AllLeavesComponent } from './components/all-leaves/all-leaves.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'apply-leave', component: ApplyLeaveComponent },
  { path: 'my-leaves', component: MyLeavesComponent },
  { path: 'all-leaves', component: AllLeavesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
