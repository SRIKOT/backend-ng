import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

import { ImportEmployeeService } from './import-employee.service';

import { Level } from '../_model/appraisal_level.model';
import { Org } from '../_model/org.model';
import { Employee } from '../_model/employee.model';

@Component({
  selector: 'app-import-employee',
  templateUrl: './import-employee.component.html',
  styleUrls: ['./import-employee.component.css']
})
export class ImportEmployeeComponent implements OnInit {
  orgs: Observable<Org[]>;
  levels: Observable<Level[]>;
  employees: Observable<Employee[]>;

  myControl = new FormControl();

  constructor(
    private importEmployeeService: ImportEmployeeService
  ) { }

  ngOnInit() {
    // this.orgs = this.importEmployeeService.list_org();
    // this.levels = this.importEmployeeService.list_level();
  }

  autoEmployee(event) {
    // this.employees = this.importEmployeeService.auto_employee(event.target.value);
  }
}
