import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MatTableDataSource} from '@angular/material/table';
import { VehiclesService } from '../services/vehicles-service.service';
import { Vehicle } from '../models/vehicle.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass'],
  providers: [ VehiclesService ]
})
export class VehiclesComponent implements OnInit {
  dataSource!: MatTableDataSource<Vehicle>;
  displayedColumns: string[] = ['icon', 'codbt', 'name', 'actions'];
  vehicles!: Vehicle[];
  getAllVehicle: boolean = false;
  textSearchFilter: string = '';

  constructor(
    public dialog: MatDialog,
    public vehiclesService: VehiclesService,
    private _snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.getAllVehicle = true;
    this.vehiclesService.getVehicles()
      .then((data: { data: Vehicle[] }) => {
         this.dataSource.data = data.data;
         this.vehicles = data.data
      })
      .catch((error) => {
        this.openSnackBar('[ERROR!]', 'closed');
      })
      .finally(() => {
        this.getAllVehicle = false;
      })
  }

  getValueAndFilter(event: Event): void {
    this.textSearchFilter = (event.target as HTMLInputElement).value.toLowerCase();
    this.search(this.textSearchFilter);
  }

  search(text: string): void {
    let vehiclesFiltered = this.vehicles.filter((vehicle) => {
      if (vehicle.name?.toLowerCase().indexOf(text) != -1 || vehicle.codbt?.toLowerCase().indexOf(text) != -1){
        return true
      } else {
        return false
      }
    })

    this.dataSource.data = vehiclesFiltered
  }

  addOrEdit(id: number | null): void {
    const dialogRef = this.dialog.open<AddOrEditComponent, number>(AddOrEditComponent, {
      width: '70%',
      data: id
    });

    this.reloadTable(dialogRef);
  }

  edit(id: number): void {
    this.addOrEdit(id);
  }

  add() : void {
    this.addOrEdit(null);
  }

  deleteVehicle(id: number): void {
    const dialogRef = this.dialog.open<DeleteComponent, number>(DeleteComponent, {
      width: '70%',
      data: id
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

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action);
  }
}
