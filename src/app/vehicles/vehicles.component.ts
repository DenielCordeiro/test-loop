import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';

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
  animal: string = '';
  name: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }


  openDialog(): void {
    // const dialogRef = this.dialog.open(AddComponent, {
    //   width: '250px',
    //   data: {name: this.name, animal: this.animal},
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });

    this.dialog.open(AddComponent, {
      width: '250px'
    });
  }
}
