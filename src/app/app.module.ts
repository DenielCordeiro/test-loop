
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { NgxWebstorageModule } from "ngx-webstorage";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { HeaderComponent } from './header/header.component';
import { AddOrEditComponent } from './vehicles/add-or-edit/add-or-edit.component';
import { DeleteComponent } from './vehicles/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VehiclesComponent,
    HeaderComponent,
    AddOrEditComponent,
    DeleteComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        AuthModule,
        HttpClientModule,
        MatCardModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatProgressBarModule,
        MatSnackBarModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        ReactiveFormsModule,
        NgxWebstorageModule.forRoot(),
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
