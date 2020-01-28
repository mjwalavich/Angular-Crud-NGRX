import EmployeeActionTypes from './employee.action-types';


/* Defining initial state*/
export const initialState = {
    isLoading: false,
    isError: false,
    employee: {},
    employees: []

};

/* reducer takes in the state and takes in the actions*/

export function employeeReducer(state = initialState, action: any) {
    let array = [];
    let index = 0;

/* Determines type of action and returns the new state */

    switch (action.type) {
        case EmployeeActionTypes.GET_EMPLOYEES_LOAD:
            return {
                ...state, isLoading: true
            };

        case EmployeeActionTypes.GET_EMPLOYEES_SUCC:
            return {
                ...state,
                isLoading: false,
                employees: action.payload
            };
        case EmployeeActionTypes.GET_EMPLOYEES_SUCC:
            return {
                ...state, isLoading: false, isError: true
            };


        case EmployeeActionTypes.ADD_EMPLOYEE_LOAD:
            return {
                ...state, isLoading: true
            };
        case EmployeeActionTypes.ADD_EMPLOYEE_SUCC:
            return {
                ...state,
                isLoading: false,
                employee: action.payload
            };
        case EmployeeActionTypes.ADD_EMPLOYEE_FAIL:
            return {
                ...state, isLoading: false, isError: true
            };


        case EmployeeActionTypes.CLEAR_EMPLOYEE_SUCC:
            return {
                ...state, employee: {}
            }




        case EmployeeActionTypes.DELETE_EMPLOYEE_LOAD:
            return {
                ...state, isLoading: true
            };
        case EmployeeActionTypes.DELETE_EMPLOYEE_SUCC:
            array = [...state.employees]
            index = array.findIndex(v => v.id === action.payload);
            array.splice(index, 1);
            return {
                ...state,
                isLoading: false,
                employees: array

            };
        case EmployeeActionTypes.DELETE_EMPLOYEE_FAIL:
            return {
                ...state, isLoading: false, isError: true
            };



        case EmployeeActionTypes.UPDATE_EMPLOYEE_LOAD:
            return {
                ...state, isLoading: true
            };
        case EmployeeActionTypes.UPDATE_EMPLOYEE_SUCC:
            array = [...state.employees]
            index = array.findIndex(v => v.id === action.payload.id);
            array[index] = action.payload
            return {
                ...state,
                isLoading: false,
                employees: array
            };
        case EmployeeActionTypes.UPDATE_EMPLOYEE_FAIL:
            return {
                ...state, isLoading: false, isError: true
            };





        default:
            return state;
    }
}