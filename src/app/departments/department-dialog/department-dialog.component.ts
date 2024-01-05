import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css']
})
export class DepartmentDialogComponent implements OnInit {

  form!: UntypedFormGroup;
  showSpinner: boolean = false;
  department!: any;
  actionType!: string;

  constructor(
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    private snackBar: SnackBarService,
    private departmentsService: DepartmentsService,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const { departmentInfos, actionType } = data;
    this.department = departmentInfos;
    this.actionType = actionType;
    if (this.department != undefined && actionType === 'Edit') {
      this.form = this.fb.group({
        name: new UntypedFormControl(this.department.name, [Validators.required])
      });
    } else {
      this.form = new UntypedFormGroup({
        name: new UntypedFormControl('', [Validators.required]),
      });
    }
  }

  ngOnInit(): void { }

  saveDepartment() {
    console.log("Clicked");
    this.showSpinner = true;
    this.departmentsService.saveDepartment(this.form.value)
      .subscribe({
        next: response => {
          this.snackBar.openSnackBar('Department created successfully!');
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

  updateDepartment() {
    this.showSpinner = true;
    this.departmentsService.updateDepartment(this.department._id, this.form.value)
      .subscribe({
        next: response => {
          this.snackBar.openSnackBar('Department updated successfully!');
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

  get f() {
    return this.form.controls;
  }

}
