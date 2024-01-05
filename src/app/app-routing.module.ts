import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.module').then((module) => module.DepartmentsModule),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees.module').then((module) => module.EmployeesModule),
  },
  { path: '', redirectTo: 'departments', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
