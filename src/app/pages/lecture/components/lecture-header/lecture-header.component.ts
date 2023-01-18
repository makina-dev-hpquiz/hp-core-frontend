import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-lecture',
  templateUrl: './lecture-header.component.html',
  styleUrls: ['./lecture-header.component.scss'],
})
export class LectureHeaderComponent implements OnInit {

  @Output() actionButtonEmitter = new EventEmitter<boolean>();

  @Input() public title = 'Mode lecture';
  @Input() public buttonIsActive = false;

  constructor() { }

  ngOnInit() {}

  public actionButton(){
    this.actionButtonEmitter.emit(true);
  }
}
