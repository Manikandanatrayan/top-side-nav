import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavOverview } from './sidenav/sidenav-overview';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
// import { ProfileInfoComponent } from './provider-info/profile-info/profile-info.component';
// import { AddressInfoComponent } from './provider-info/address-info/address-info.component';

import { DataService } from './data.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatListModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, SideNavOverview],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
