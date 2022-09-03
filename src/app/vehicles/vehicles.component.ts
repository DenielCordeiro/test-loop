import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MatTable } from '@angular/material/table';
import { PeriodicElementService } from '../services/periodic-element.service';
import { PeriodicElement } from '../models/periodic-element.model';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.sass'],
  providers: [PeriodicElementService]
})
export class VehiclesComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>

  displayedColumns: string[] = ['icon', 'internalCode', 'name', 'actions'];
  dataSource!: PeriodicElement[];

  constructor(
    public dialog: MatDialog,
    public periodicElementService: PeriodicElementService
  ) {
    this.periodicElementService.getElements()
      .subscribe((data: PeriodicElement[]) => {
        this.dataSource = data;
      });
  }

  ngOnInit(): void { }

  add(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(AddOrEditComponent, {
      width: '70%',
      data: element === null ? {
        icon: '',
        internalCode: '',
        name: ''
      } : {
        id: element.id,
        icon: element.icon,
        internalCode: element.internalCode,
        name: element.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(i => i.id).includes(result.id)) {
          this.periodicElementService.editElements(result)
            .subscribe((data: PeriodicElement) => {
              const index = this.dataSource.findIndex(i => i.id === data.id)
              this.dataSource[index] = data;
              this.table.renderRows();
            })
        } else {
          this.periodicElementService.createElements(result)
          .subscribe((data: PeriodicElement) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });
        }
      }
    });
  }

  edit(element: PeriodicElement): void {
    this.add(element);
  }

  deleteElement(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.periodicElementService.deleteElement(id)
          .subscribe(() => {
            this.dataSource = this.dataSource.filter(i => i.id !== id);
            this.table.renderRows();
          });
      }
    });
  }
}
