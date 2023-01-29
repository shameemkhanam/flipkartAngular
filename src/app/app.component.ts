import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FlipkartAngular';

  constructor() {}

  ngOnInit() {}

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}
