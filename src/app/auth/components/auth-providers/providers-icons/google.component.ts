import { Component } from '@angular/core';

@Component({
  selector: 'google-icon',
  templateUrl: './google.svg',
  host: {
    '[style.height]': "'100%'",
  },
})
export class GoogleSvgComponent {}
