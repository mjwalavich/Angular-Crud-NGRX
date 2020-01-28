import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IEmployee } from '../models/employee.model';
import { getEmployees, deleteEmployee, updateEmployee } from '../store/employee.actions';
import { Store } from "@ngrx/store";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
const ELEMENT_DATA: IEmployee[] = [
  {
    "name": "George Strait",
    "email": "Gstrait@gmail.com",
    "doh": "Sun Jan 19 2020",
    "gender": "male"
  }
];

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit, AfterViewInit {

  dataSource$ = this.store.select(state => state.employeeReducer.employees);
  displayedColumns: string[] = ['name', 'email', 'gender', 'doh', 'action'];
  constructor(private store: Store<any>, public dialog: MatDialog) { }
  ngOnInit() {
   
  }
  ngAfterViewInit() {
    
    this.store.dispatch(getEmployees())
    this.dataSource$.subscribe(employees => {
      this.dataSource.data = employees;
    })
  
  }
  dataSource = new MatTableDataSource([]);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteClick(id) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: id
    });
    
  }
  openDialog(data: IEmployee): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }



}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'edit-dialog.html',
})
export class EditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmployee, private store: Store<any>) {
    
  }
  employee: IEmployee = { ...this.data };
  doh = new Date(this.data.doh);

  onNoClick(): void {
    this.dialogRef.close();
  }
  onUpdateClick(): void {
    let body: IEmployee = { ...this.employee };
    body["doh"] = this.doh.toDateString();
    this.store.dispatch(updateEmployee({ employee: body, id: body["id"] }));
    this.dialogRef.close();


  }

}


@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Number, private store: Store<any>) {
    
  }
  ;

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.store.dispatch(deleteEmployee({ id:this.data }))
    this.dialogRef.close();


  }

}

