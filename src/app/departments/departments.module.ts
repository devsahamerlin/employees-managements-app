import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentDetailsComponent,
    DepartmentDialogComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    SharedModule,
  ]
})
export class DepartmentsModule { }
