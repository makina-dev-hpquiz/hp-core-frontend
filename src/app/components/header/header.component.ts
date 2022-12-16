import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-lecture',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Output() actionButtonEmitter = new EventEmitter<boolean>();

  @Input() public title: string = 'Mode lecture';
  @Input() public buttonIsActive: boolean = false;

  constructor() { }

  ngOnInit() {}

  public actionButton(){
    this.actionButtonEmitter.emit(true);
  }
}
