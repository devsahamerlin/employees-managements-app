import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeesService } from '../employees.service';
import { DepartmentsService } from '../../departments/departments.service';
import { SnackBarService } from '../../shared/service/snack-bar.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent {

  form!: UntypedFormGroup;
  showSpinner: boolean = false;
  employee!: any;
  actionType!: string;
  departments: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    private snackBar: SnackBarService,
    private employeesService: EmployeesService,
    private departmentsService: DepartmentsService,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const { employeeInfos, actionType } = data;
    this.employee = employeeInfos;
    this.actionType = actionType;
    if (this.employee != undefined && actionType === 'Edit') {
      this.form = this.fb.group({
        name: new UntypedFormControl(this.employee.name, [Validators.required]),
        surname: new UntypedFormControl(this.employee.surname, [Validators.required]),
        departmentId: new UntypedFormControl(this.employee.departmentId, [Validators.required])
      });
    } else {
      this.form = new UntypedFormGroup({
        name: new UntypedFormControl("", [Validators.required]),
        surname: new UntypedFormControl("", [Validators.required]),
        departmentId: new UntypedFormControl("", [Validators.required])
      });
    }
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  saveEmployee() {
    this.showSpinner = true;
    this.employeesService.saveEmployee(this.form.value)
      .subscribe({
        next: response => {
          this.snackBar.openSnackBar('Employee created successfully!');
          this.showSpinner = false;
          this.dialogRef.close(true);
        },
        error: error => {
          this.snackBar.openSnackBar(error);
          this.showSpinner = false;
        },
        complete: () => console.log('Complete')
      })
  }

  updateEmployee() {
    this.showSpinner = true;
    this.employeesService.updateEmployee(this.employee._id, this.form.value)
      .subscribe({
        next: response => {
          this.snackBar.openSnackBar('Employee updated successfully!');
          this.showSpinner = false;
          this.dialogRef.close(true);
        },
        error: error => {
          this.snackBar.openSnackBar(error);
          this.showSpinner = false;
        },
        complete: () => console.log('Complete')
      })
  }

  getDepartments() {
    this.showSpinner = true;
    this.departmentsService.getDepartments()
      .subscribe({
        next: response => {
          this.showSpinner = false;
          this.departments = response.data;
        },
        error: error => {
          this.showSpinner = false;
          this.snackBar.openSnackBar(error.message);
        },
        complete: () => console.log('Complete')
      })
  }

  get f() {
    return this.form.controls;
  }

}
