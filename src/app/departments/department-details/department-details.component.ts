import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DepartmentsService } from '../departments.service';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { EmployeesService } from '../../employees/employees.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  employeeColumns = [
    'name',
    'surname',
    'createdAt'
  ];

  employees: any[] = [];
  department!: any;
  showSpinner: boolean = false;
  showSubCatSpinner1 = false;
  showSubCatSpinner2 = false;
  departmentId!: string;
  unSubSignal: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private employeesService: EmployeesService,
    private snackBar: SnackBarService,
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.departmentId = params['id'];
      this.getDepartment(this.departmentId)
    });
  }

  getDepartment(departmentId: string) {
    this.showSpinner = true;
    this.departmentsService.getDepartment(departmentId)
      .subscribe({
        next: response => {
          this.showSpinner = false;
          this.department = response.data;
          this.getEmployees(response.data._id);
        },
        error: error => {
          this.showSpinner = false;
          this.snackBar.openSnackBar(error.message);
        },
        complete: () => console.log('Complete')
      })
  }

  getEmployees(departmentId: string | undefined) {
    this.showSpinner = true;
    this.employeesService.getEmployeeByDepartment(departmentId)
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

}
