import { Component } from '@angular/core';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';
import { DepartmentsService } from '../departments.service';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {

  departmentColumns = [
    'department',
    'createdAt',
    'actions'
  ];
  departments: any[] = [];
  showSpinner: boolean = false;
  unSubSignal: Subject<void> = new Subject<void>();
  actionsVisible: boolean = false;

  constructor(
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    private departmentsService: DepartmentsService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.getDepartments();
  }

  addDepartment(): void {
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
      data: {
        actionType: 'Add',
        departmentInfos: undefined,
      },
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unSubSignal.asObservable()))
      .subscribe((resp) => {
        this.showSpinner = false;
        this.getDepartments();
      });
  }

  updateDepartment(department: any) {
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
      data: {
        actionType: 'Edit',
        departmentInfos: department,
      },
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unSubSignal.asObservable()))
      .subscribe((resp) => {
        this.showSpinner = false;
        this.getDepartments();
      });
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

  deleteDepartment(id: string) {
    this.departmentsService.deleteDepartment(id)
      .subscribe({
        next: response => {
          this.snackBar.openSnackBar(response.message);
          this.getDepartments();
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
