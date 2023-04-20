import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.page.html',
  styleUrls: ['./configurations.page.scss'],
})
export class ConfigurationsPage implements OnInit {

  public address: string;
  public stateConnexion: boolean;

  constructor() {
    this.stateConnexion = false;
   }

  ngOnInit() {
  }

  save(){
    alert(this.address);
  }

}
