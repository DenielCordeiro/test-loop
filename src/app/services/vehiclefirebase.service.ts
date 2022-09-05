import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Vehicle } from '../models/vehicle.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleFirebaseService {

  constructor( public db: AngularFireDatabaseModule ) {}

  getElements() {
    // this.db.list('vehicle').snapshotChanges()
    //   .pipe(
    //     map(changes => {
    //       return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    //     })
    //   );
  }

  createElements(element: Vehicle) {
    // this.db.list('vehicle').push(element)
    //   .then((result: any) => {
    //     console.log(result.key);
    //   })
  }

  editElements(element: Vehicle, key: string) {
    // this.db.list('vehicle').update(key, element)
    // .then((result: any) => {
    //   console.log(result.key);
    // })
  }

  deleteElement(key: string): void {
    // this.db.object(`vehicle/${key}`).remove();
  }
}
