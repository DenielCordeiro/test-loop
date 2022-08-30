import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { HeaderComponent } from './header/header.component';
import { AddComponent } from './vehicles/add/add.component';
import { EditComponent } from './vehicles/edit/edit.component';
import { DeleteComponent } from './vehicles/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VehiclesComponent,
    HeaderComponent,
    AddComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
