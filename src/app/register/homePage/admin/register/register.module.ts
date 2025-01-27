import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from '../../../customer/register-form/register-form.component';
import { RegisterSuccessComponent } from '../../../customer/register-success/register-success.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule, 
    RegisterFormComponent,
    RegisterSuccessComponent,
  ],
  exports: []
})

export class RegisterModule { }


