import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '[attr.some-host-attribute]': 'true',
  },
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
