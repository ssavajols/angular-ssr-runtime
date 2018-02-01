import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { GeocoderService } from './routing/geocoder.service';
import { HttpModule } from '@angular/http';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatButtonModule,
    RoutingModule,
    HttpModule,
    BrowserModule.withServerTransition({appId: 'app'}),
    BrowserTransferStateModule,
  ],
  providers: [GeocoderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
