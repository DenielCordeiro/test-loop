import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
export interface PeriodicElement {
  icon: string;
  internalCode: string;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {icon: 'test', internalCode: 'sde', name: 'Hydrogen'},
];

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass']
})
export class VehiclesComponent implements OnInit {
  displayedColumns: string[] = ['icon', 'internalCode', 'name', 'actions'];
  dataSource = ELEMENT_DATA;

  animal: string = '';
  name: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }


  add(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '70%',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  edit(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '70%',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  delete(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '70%',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
