import { Component } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  employeesColumns = [
    'name',
    'surname',
    'createdAt',
    'actions'
  ];

  employees!: any;
  showSpinner: boolean = false;
  unSubSignal: Subject<void> = new Subject<void>();
  name!: string;
  actionsVisible: boolean = false;

  constructor(
    private employeesService: EmployeesService,
    private dialog: MatDialog,
    private snackBar: SnackBarService,
  ) {
    this.getEmployees()
  }

  addEmployee() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: {
        actionType: 'Add',
        employeeInfos: undefined
      },
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unSubSignal.asObservable()))
      .subscribe((resp) => {
        this.showSpinner = false;
        this.getEmployees();
      });
  }

  updateEmployee(employee: any) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: {
        actionType: 'Edit',
        employeeInfos: employee,
      },
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unSubSignal.asObservable()))
      .subscribe((resp) => {
        if (resp) {
          this.getEmployees();
        }

      });
  }

  getEmployees() {
    this.showSpinner = true;
    this.employeesService.getEmployees()
      .subscribe({
        next: response => {
          this.showSpinner = false;
          this.employees = response.data;
        },
        error: error => {
          this.showSpinner = false;
          this.snackBar.openSnackBar(error.message);
        },
        complete: () => console.log('Complete')
      })
  }

  deleteEmployee(id: string) {
    this.employeesService.deleteEmployee(id)
      .subscribe({
        next: response => {
          this.showSpinner = false;
          this.snackBar.openSnackBar(response.message);
          this.getEmployees();
        },
        error: error => {
          this.showSpinner = false;
          this.snackBar.openSnackBar(error.message);
        },
        complete: () => console.log('Complete')
      })
  }

  onActionClick() {
    if (this.actionsVisible) {
      this.actionsVisible = false;
    } else {
      this.actionsVisible = true;
    }
  }

}
