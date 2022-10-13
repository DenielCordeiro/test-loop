import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Vehicle } from '../../models/vehicle.model';
import { VehiclesService } from "../../services/vehicles-service.service";

@Component({
  selector: 'app-add',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.sass']
})
export class AddOrEditComponent implements OnInit {
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
  loading: boolean = false;
  urlIcon: string = 'https://cdn.readymix.io/img/icons/';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public idVehicle: number,
    public dialogRef: MatDialogRef<AddOrEditComponent>,
    public vehiclesService: VehiclesService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "icon": [null],
      "codbt": [null, Validators.required],
      "name": [null],
    });

    if (this.idVehicle != null) {
      this.downloadVehicle();
    }
  }

  downloadVehicle(): void {
    this.loading = true;
    this.vehiclesService.getVehicle(this.idVehicle)
      .then((result: { data: Vehicle }) => {
        this.form.patchValue(result.data);
      })
      .catch((error) => {
        this.openSnackBar('[ERROR!]', 'closed');
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      })
  }

  add(): void {
    let additional: {} = {
      "company": 429,
      "type": 0
    }
    let vehicle: Vehicle =  Object.assign(new Vehicle(), this.form.value, additional);
    vehicle.type = 0
    this.loading = true;
    this.vehiclesService.createVehicle(vehicle)
      .then(() => {
        this.openSnackBar('Created Vehicle', 'close');
        this.dialogRef.close(true);
      })
      .catch((error) => {
        this.openSnackBar('[ERROR!]', 'closed');
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      })
  }

  edit(): void {
    let additional: {} = {
      "id": this.idVehicle,
      "company": 429,
      "type": 0
    }
    let vehicle =  Object.assign(new Vehicle(),  this.form.value, additional);

    this.loading = true;

    this.vehiclesService.editVehicle(vehicle)
      .then(() => {
        this.openSnackBar('Edited Vehicle','close');
        this.dialogRef.close(true);
      })
      .catch((error) => {
        this.openSnackBar('[ERROR!]', 'closed');
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      })
  }

  cancel(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action);
  }
}
