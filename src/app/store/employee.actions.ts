import { createAction, props } from '@ngrx/store';
import EmployeeActionTypes from './employee.action-types';
import { IEmployee } from '../models/employee.model';


/* Utilized createAction vs Action to reduce boilerplate code  */


export const getEmployees = createAction(EmployeeActionTypes.GET_EMPLOYEES_LOAD);
export const addEmployee = createAction(EmployeeActionTypes.ADD_EMPLOYEE_LOAD, props<{ employee: IEmployee }>());
export const updateEmployee = createAction(EmployeeActionTypes.UPDATE_EMPLOYEE_LOAD, props<{ employee: IEmployee, id: Number }>());
export const deleteEmployee = createAction(EmployeeActionTypes.DELETE_EMPLOYEE_LOAD, props<{ id: Number }>());
export const clearEmployee = createAction(EmployeeActionTypes.CLEAR_EMPLOYEE_SUCC);

