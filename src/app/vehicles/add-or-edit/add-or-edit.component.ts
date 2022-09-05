import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicle } from '../../models/vehicle.model';
@Component({
  selector: 'app-add',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.sass']
})
export class AddOrEditComponent implements OnInit {
  element!: Vehicle;
  selected = 'option2';
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Vehicle,
    public dialogRef: MatDialogRef<AddOrEditComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data.internalCode != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
