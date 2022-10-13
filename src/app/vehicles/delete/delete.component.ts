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
    this.vehiclesService.getVehicle(this.idVehicle)
      .then((result: { data: Vehicle }) => {
        this.vehicle = result.data;
      })
      .catch((error) => {
        this.openSnackBar('[ERROR!]', 'closed');
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      })
  }

  onDelete(): void {
    this.loading = true;
    this.vehiclesService.deleteVehicle(this.vehicle)
      .then(() => {
        this.openSnackBar('Deleted Vehicle', 'close')
        this.dialogRef.close(true);
      })
      .catch((error) => {
        this.openSnackBar('[ERROR!]', 'closed');
        console.error(error.error);
      })
      .finally(() => {
        this.loading = false;
      })
  }

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action);
  }
}
