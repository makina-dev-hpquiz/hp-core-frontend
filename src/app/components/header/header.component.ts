import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-lecture',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public title= 'Mode lecture';
  constructor() { }

  ngOnInit() {}
}
