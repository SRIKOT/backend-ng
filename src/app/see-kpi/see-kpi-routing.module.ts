import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';

import { SeeKPIComponent } from './see-kpi.component';
import { ImportEmployeeComponent } from './import-employee/import-employee.component';
import { ImportOrganizationComponent } from './import-organization/import-organization.component';


const routes: Routes = [
  {
    path: '',
    component: SeeKPIComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ImportEmployeeComponent },
      { path: 'employee', component: ImportEmployeeComponent },
      { path: 'organization', component: ImportOrganizationComponent }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeeKpiRoutingModule { }