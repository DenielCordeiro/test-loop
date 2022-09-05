import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MatTable } from '@angular/material/table';
import { VehiclesService } from '../services/vehicles-service.service';
import { Vehicle } from '../models/vehicle.model';
import { VehicleFirebaseService } from '../services/vehiclefirebase.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass'],
  providers: [VehiclesService]
})
export class VehiclesComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>

  displayedColumns: string[] = ['icon', 'internalCode', 'name', 'actions'];
  dataSource!: Vehicle[];

  constructor(
    public dialog: MatDialog,
    public vehiclesService: VehiclesService,
    public VehicleFirebaseService: VehicleFirebaseService
  ) {
    // this.vehiclesService.getElements()
    //   .subscribe((data: Vehicle[]) => {
    //     this.dataSource = data;
    //   });
  }

  ngOnInit(): void {
    this.dataSource;
  }

  add(element: Vehicle | null): void {}

  edit(element: Vehicle): void {}

  deleteVehicle(key: string): void {}

  // add(element: Vehicle | null): void {
  //   const dialogRef = this.dialog.open(AddOrEditComponent, {
  //     width: '70%',
  //     data: element === null ? {
  //       icon: '',
  //       internalCode: '',
  //       name: ''
  //     } : {
  //       id: element.id,
  //       icon: element.icon,
  //       internalCode: element.internalCode,
  //       name: element.name
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result !== undefined) {
  //       if (this.dataSource.map(i => i.id).includes(result.id)) {
  //         this.vehiclesService.editElements(result)
  //           .subscribe((data: Vehicle) => {
  //             const index = this.dataSource.findIndex(i => i.id === data.id)
  //             this.dataSource[index] = data;
  //             this.table.renderRows();
  //           })
  //       } else {
  //         this.vehiclesService.createElements(result)
  //         .subscribe((data: Vehicle) => {
  //           this.dataSource.push(data);
  //           this.table.renderRows();
  //         });
  //       }
  //     }
  //   });
  // }

  // edit(element: Vehicle): void {
  //   this.add(element);
  // }

  // deleteVehicle(id: number): void {
  //   const dialogRef = this.dialog.open(DeleteComponent, {
  //     width: '70%',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result !== undefined) {
  //       this.vehiclesService.deleteElement(id)
  //         .subscribe(() => {
  //           this.dataSource = this.dataSource.filter(i => i.id !== id);
  //           this.table.renderRows();
  //         });
  //     }
  //   });
  // }
}
