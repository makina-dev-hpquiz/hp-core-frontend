import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-lecture',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public title= "Mode lecture"
  constructor(private router: Router) { }

  ngOnInit() {}
  stopLecture() {
    this.router.navigate(['/']);
    
  }
}
