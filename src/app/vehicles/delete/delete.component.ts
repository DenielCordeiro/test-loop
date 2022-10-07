import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehiclesService } from "../../services/vehicles-service.service";
import {FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Vehicle,
    public dialogRef: MatDialogRef<DeleteComponent>,
    public vehiclesService: VehiclesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.loading = true;
    this.vehiclesService.deleteVehicle(this.data)
      .then((data) => {
        this.openSnackBar('Deleted Vehicle', 'close')
        this.dialogRef.close(true);
      })
      .catch((error) => {
        this.openSnackBar('[ERROR!]   ' + console.error(error.error), 'closed');
      })
      .finally(() => {
        this.loading = false;
      })
  }

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action);
  }
}
