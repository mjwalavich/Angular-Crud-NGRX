import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../models/employee.model';
const API_URL = "http://localhost:3000";
@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`${API_URL}/records`);
    }
    add(body: IEmployee) {
        return this.http.post(`${API_URL}/records`, body);
    }
    put(body: { id: any; }) {
        return this.http.put(`${API_URL}/records/${body.id}`, body);
    }
    delete(id: any) {
        return this.http.delete(`${API_URL}/records/${id}`);
    }
    
}