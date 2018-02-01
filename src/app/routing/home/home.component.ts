import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { GeocoderService } from '../geocoder.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const TIMER_KEY = makeStateKey('timer_key');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addr: any;
  timer: any;
  timerTime = isPlatformServer(this.platformId) ? 1 : 1000 * 10;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private geocoder: GeocoderService,
    private state: TransferState
  ) { }

  ngOnInit() {


    this.timer = this.state.get(TIMER_KEY, null);
    setTimeout(() => {
      this.timer = 'Timer value : ' + (Math.round(Math.random() * 5000));
      this.state.set(TIMER_KEY, this.timer);
    }, this.timerTime);

    if ( isPlatformBrowser(this.platformId) ) {
      this.geocoder.getAddr([Math.random() * 42, Math.random() * 2])
      .then(addr => {
        this.addr = addr;
      });
    }
  }

}
