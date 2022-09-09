import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class AuthModule { }
