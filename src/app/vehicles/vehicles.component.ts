import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { DeleteComponent } from './delete/delete.component';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { VehiclesService } from '../services/vehicles-service.service';
import { Vehicle } from '../models/vehicle.model';
import {FormGroup} from "@angular/forms";
import {DialogRef} from "@angular/cdk/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass'],
  providers: [ VehiclesService ]
})
export class VehiclesComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  dataSource!: MatTableDataSource<Vehicle>;
  displayedColumns: string[] = ['icon', 'codbt', 'name', 'actions'];
  getAllVehicle: boolean = false;

  constructor(
    public dialog: MatDialog,
    public vehiclesService: VehiclesService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  add(data: Vehicle | null): void {
    const dialogRef = this.dialog.open<AddOrEditComponent,Vehicle>(AddOrEditComponent, {
      width: '70%',
      data: data
    });

    this.reloadTable(dialogRef);
  }

  getVehicles() {
    this.getAllVehicle = true;
    this.vehiclesService.getElements()
      .then((data) => {
        console.log(data);
        this.dataSource.data = data.data;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.getAllVehicle = false;
      })


  }

  edit(data: Vehicle): void {
    this.add(data);
  }

  deleteVehicle(data: Vehicle): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '70%',
      data: data
    });

    this.reloadTable(dialogRef);
  }

  reloadTable(dialogRef: MatDialogRef<DeleteComponent | AddOrEditComponent>) {
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getVehicles();
      }
    })
  }
}
