import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: { title: string; url: string; icon: string; type: string }[];

  constructor() {
    this.sideMenu();
  }

  sideMenu() {
    this.navigate =
      [
        {
          title: 'Home',
          url: '',
          icon: 'home-outline',
          type: 'page'
        },
        {
          title: 'Lectures',
          url: '/lectures',
          icon: 'list',
          type: 'page'
        },
        {
          title: 'Configurations',
          url: '/configurations',
          icon: 'settings-outline',
          type: 'page'
        },

      ];
  }
}
