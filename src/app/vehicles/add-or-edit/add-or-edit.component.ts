import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Vehicle } from '../../models/vehicle.model';
import {VehiclesService} from "../../services/vehicles-service.service";

@Component({
  selector: 'app-add',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.sass']
})
export class AddOrEditComponent implements OnInit {
  selected = '';
  isChange!: boolean;
  form!: FormGroup;
  icons: string[] = [
    'default.png',
    'A_34.png',
    'B_19.png',
    'L_13.png',
    '1.png',
    'A_39.png',
    'Y_1.png',
    'H_4.png',
    'O_2.png',
    'M_21.png',
    'L_7.png',
    'Z_6.png',
    'M_23.png',
    'Z_24.png',
    'M_13.png',
  ];

  urlIcon: string = 'https://cdn.readymix.io/img/icons/';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Vehicle,
    public dialogRef: MatDialogRef<AddOrEditComponent>,
    public vehiclesService: VehiclesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    let inputsForm = this.form = this.formBuilder.group({
      "id": [null],
      "icon": [null],
      "codbt": [null, Validators.required],
      "name": [null]
    });

    this.form.patchValue(this.data);

    if (this.data != null ) {
      this.isChange = false;
    } else {
      this.isChange = true;
    }
  }

  add(): void {
    let vehicle: Vehicle =  Object.assign(new Vehicle(), this.form.value);
    console.log(vehicle);
  }

  edit(): void {
    let vehicle =  Object.assign(new Vehicle(), this.form.value);
    console.log(vehicle)
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
