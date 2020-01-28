import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, } from 'rxjs/operators';
import { EmployeeService } from '../services/employees.service';
import EmployeeActionTypes from './employee.action-types';

/*  Utilized createEffect vs Effect */

@Injectable()
export class EmployeeEffects {
  constructor(private actions$: Actions,
    private employeeService: EmployeeService
  ) { }
  getEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActionTypes.GET_EMPLOYEES_LOAD),
      mergeMap(() => this.employeeService.getAll()
        .pipe(
          map(employees => {
            return {
              type: EmployeeActionTypes.GET_EMPLOYEES_SUCC,
              payload: employees
            }
          }),
          catchError(() => of({ type: EmployeeActionTypes.GET_EMPLOYEES_FAIL }))
        )
      )
    )
  );
  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActionTypes.ADD_EMPLOYEE_LOAD),
      mergeMap((action) => {
        let payload: any = action
        return this.employeeService.add(payload.employee)
          .pipe(
            map(employee => {
              return {
                type: EmployeeActionTypes.ADD_EMPLOYEE_SUCC,
                payload: employee
              }
            }),
            catchError(() => of({ type: EmployeeActionTypes.ADD_EMPLOYEE_FAIL }))
          )
      }
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActionTypes.DELETE_EMPLOYEE_LOAD),
      mergeMap((action) => {
        let payload: any = action
        return this.employeeService.delete(payload.id)
          .pipe(
            map(employees => {
              return {
                type: EmployeeActionTypes.DELETE_EMPLOYEE_SUCC,
                payload: payload.id
              }
            }),
            catchError(() => of({ type: EmployeeActionTypes.DELETE_EMPLOYEE_FAIL }))
          )
      }
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActionTypes.UPDATE_EMPLOYEE_LOAD),
      mergeMap((action) => {
        let payload: any = action
        return this.employeeService.put(payload.employee)
          .pipe(
            map(employee => {
              return {
                type: EmployeeActionTypes.UPDATE_EMPLOYEE_SUCC,
                payload: employee
              }
            }),
            catchError(() => of({ type: EmployeeActionTypes.UPDATE_EMPLOYEE_FAIL }))
          )
      }
      )
    )
  );
}
