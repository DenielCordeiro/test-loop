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

  displayedColumns: string[] = ['icon', 'internalCode', 'name', 'actions'];
  dataSource!: Vehicle[];

  constructor(
    public dialog: MatDialog,
    public vehiclesService: VehiclesService,
  ) {
    this.vehiclesService.getElements()
      .subscribe((data: Vehicle[]) => {
        this.dataSource = data;
      });
  }

  ngOnInit(): void {}

  add(element: Vehicle | null): void {
    const dialogRef = this.dialog.open(AddOrEditComponent, {
      width: '70%',
      data: element === null ? {
        icon: '',
        internalCode: '',
        name: ''
      } : {
        company: element.company,
        icon: element.icon,
        internalCode: element.internalCode,
        name: element.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(i => i.company).includes(result.company)) {
          this.vehiclesService.editElements(result)
            .subscribe((data: Vehicle) => {
              const index = this.dataSource.findIndex(i => i.company === data.company)
              this.dataSource[index] = data;
              this.table.renderRows();
            })
        } else {
          this.vehiclesService.createElements(result)
          .subscribe((data: Vehicle) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });
        }
      }
    });
  }

  edit(element: Vehicle): void {
    this.add(element);
  }

  deleteVehicle(company: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.vehiclesService.deleteElement(company)
          .subscribe(() => {
            this.dataSource = this.dataSource.filter(i => i.company !== company);
            this.table.renderRows();
          });
      }
    });
  }
}
