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
  test: any;

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

  //   switch ( expression ) {
  //     case value1:
  //         // statement 1
  //         break;
  //     case value2:
  //         // statement 2
  //         break;
  //     case valueN:
  //         // statement N
  //         break;
  //     default:
  //         //
  //         break;
  //  }
  }

  add(element: Vehicle | null): void {
    const dialogRef = this.dialog.open(AddOrEditComponent, {
      width: '70%',
      data: element === null ? {
        icon: '',
        codbt: '',
        name: '',
        company: 429,
        type: 0
      } :  {
        id: element.id,
        company: element.company,
        icon: element.icon,
        codbt: element.codbt,
        name: element.name,
        type: element.type.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if ('id' in result) {
          this.vehiclesService.editElements(result)
            .subscribe((data: any) => {
              const index = this.dataSource.findIndex(i => i.id === data.id)
              this.dataSource[index] = data;
              this.table.renderRows();
            })
        } else {
          this.vehiclesService.createElements(result)
          .subscribe((data: any) => {
            this.dataSource.push(data.data);
            this.table.renderRows();
          });
        }
      }
    });
  }

  edit(element: Vehicle): void {
    this.add(element);
  }

  deleteVehicle(element: Vehicle): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.vehiclesService.deleteElement(element)
          .subscribe(() => {
            this.dataSource = this.dataSource.filter(i => i.id !== element.id);
            this.table.renderRows();
          });
      }
    });
  }
}
