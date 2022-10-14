import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehiclesService } from "../../services/vehicles-service.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {
  loading: boolean = false;
  vehicle!: Vehicle;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public idVehicle: number,
    public dialogRef: MatDialogRef<DeleteComponent>,
    public vehiclesService: VehiclesService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.downloadVehicle();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  downloadVehicle(): void {
    this.loading = true;
    this.vehiclesService.getResource(this.idVehicle)
      .then(vehicle => {
        this.vehicle = vehicle;
      })
      .catch((error) => {
        this.openSnackBar('[ERROR!] unable load data this vehicle :(', 'closed');
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      })
  }

  onDelete(): void {
    this.loading = true;
    this.vehiclesService.delete(this.idVehicle)
      .then(() => {
        this.openSnackBar('Deleted Vehicle', 'close')
        this.dialogRef.close(true);
      })
      .catch((error) => {
        this.openSnackBar('[ERROR!] could not delete this vehicle :(', 'closed');
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
      })
  }

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action);
  }
}
