import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IEmployee } from '../models/employee.model';
import { Store } from '@ngrx/store';
import { addEmployee, clearEmployee } from '../store/employee.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  @Input() formInput: IEmployee = {
    name: "",
    email: "",
    doh: "",
    gender: ""
  };
  @Output() showComponentEvent = new EventEmitter<string>();
  employee$ = this.store.select(state => state.employeeReducer.employee);

  constructor(private store: Store<any>, private _snackBar: MatSnackBar) {
   

  }
  ngOnInit() {
    this.employee$.subscribe(employee => {
      if (Object.keys(employee).length > 0) {
        this.showList();
        this.store.dispatch(clearEmployee());
      }
    })
  }
  showList() {
    this.showComponentEvent.next('view-employees');
  }
  onFormSubmit(): void {
    let body: IEmployee = this.formInput;
    if (this.formInput["name"].length < 3) {
      this._snackBar.open("name must be 3 atleast characters", "OK", { duration: 2000 });
      return;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formInput["email"]))) {
      this._snackBar.open("must be valid email", "OK", { duration: 2000 });
      return;
    }
    if (!this.formInput["doh"]) {
      this._snackBar.open("please provide correct date format", "OK", { duration: 2000  });
      return;
    }
    if (!this.formInput["gender"]) {
      this._snackBar.open("please select gender", "OK", { duration: 2000 });
      return;
    }
    body["doh"] = new Date(this.formInput["doh"]).toDateString();

    this.formInput = {
      name: "",
      email: "",
      doh: "",
      gender: ""
    };
    this.store.dispatch(addEmployee({ employee: body }));

  }

}
