import { GeocoderService } from './routing/geocoder.service';
import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const GEOCODER_KEEP_KEY = makeStateKey('geocoder_keep');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  addr: string;
  addrClient: string;
  addrServer: string;
  addrServerKeep: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private geocoder: GeocoderService,
    private state: TransferState
  ) {}

  ngOnInit() {

    console.log(window.document.body);

    this.addrServerKeep = this.state.get(GEOCODER_KEEP_KEY, null as any);

    // Do request on server and client
    this.geocoder.getAddr([Math.random() * 42, Math.random() * 2])
    .then(addr => {
      this.addr = addr;
    });

    // Do request only on client
    if ( isPlatformBrowser(this.platformId) ) {
      this.geocoder.getAddr([Math.random() * 42, Math.random() * 2])
      .then(addr => {
        this.addrClient = addr;
      });
    }

    // Do request only on server
    if ( isPlatformServer(this.platformId) ) {
      this.geocoder.getAddr([Math.random() * 42, Math.random() * 2])
      .then(addr => {
        this.addrServer = addr;
      });
    }

    // Do request on server and transfer state to client
    if ( !this.addrServerKeep ) {
      this.geocoder.getAddr([Math.random() * 42, Math.random() * 2])
      .then(addr => {
        this.addrServerKeep = addr;
        this.state.set(GEOCODER_KEEP_KEY, addr as any);
      });
    }
  }
}
