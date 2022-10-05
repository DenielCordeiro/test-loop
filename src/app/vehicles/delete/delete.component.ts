import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehiclesService } from "../../services/vehicles-service.service";
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Vehicle,
    public dialogRef: MatDialogRef<DeleteComponent>,
    public vehiclesService: VehiclesService
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  // onDelete(): boolean {
  //   let deleteVehicle: boolean = true;
  //
  //   this.vehiclesService.deleteElement()
  //     .subscribe(() => {
  //       this.dataSource = this.dataSource.filter(i => i.id !== element.id);
  //       this.table.renderRows();
  //     });
  //
  //   return deleteVehicle
  // }
}
