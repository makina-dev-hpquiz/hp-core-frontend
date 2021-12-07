import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stop-lecture',
  templateUrl: './stop-lecture.page.html',
  styleUrls: ['./stop-lecture.page.scss'],
})
export class StopLecturePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  stopLecture() {
    this.router.navigate(['/']);
    
  }
}
