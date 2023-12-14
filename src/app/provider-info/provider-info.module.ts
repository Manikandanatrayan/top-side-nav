// provider-info.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressInfoComponent } from './address-info/address-info.component';

const routes: Routes = [
  {
    path: '',

    children: [
      { path: 'profile_information', component: ProfileInfoComponent },
      { path: 'address', component: AddressInfoComponent },

      { path: '', redirectTo: 'profile-info', pathMatch: 'full' }, //
    ],
  },
];

@NgModule({
  declarations: [ProfileInfoComponent, AddressInfoComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class ProviderInfoModule {}
