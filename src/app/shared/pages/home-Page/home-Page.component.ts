import { Component } from '@angular/core';

@Component({
  selector: 'shared-home-page',
  templateUrl: './home-Page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class HomePageComponent { }
