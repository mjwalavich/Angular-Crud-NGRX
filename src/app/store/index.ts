import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as employeeReducer from "./employee.reducer";

export interface State {
  employeeReducer: any
}

export const reducers: ActionReducerMap<State> = {
  employeeReducer: employeeReducer.employeeReducer

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
