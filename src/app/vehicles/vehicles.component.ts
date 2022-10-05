import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MatTable } from '@angular/material/table';
import { VehiclesService } from '../services/vehicles-service.service';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass'],
  providers: [VehiclesService]
})
export class VehiclesComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['icon', 'codbt', 'name', 'actions'];
  dataSource!: Vehicle[];

  constructor(
    public dialog: MatDialog,
    public vehiclesService: VehiclesService,
  ) {
      this.vehiclesService.getElements()
        .subscribe((data: any) => {
          this.dataSource = data.data;
        });
  }

  ngOnInit(): void {
  }

  add(data: Vehicle | null): void {
    const dialogRef = this.dialog.open(AddOrEditComponent, {
      width: '70%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.table.renderRows();
    });
  }

  edit(data: Vehicle): void {
    this.add(data);
  }

  deleteVehicle(data: Vehicle): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '70%',
    });
  }
}
