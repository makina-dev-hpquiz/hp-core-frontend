import { Component } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss']
})
export class GroupsPage {

  
  public question;

  constructor() {}

 ngOnInit(){
    this.question = {"question": "Quel est le numéro du coffre où Hagrid récupère un mystérieux paquet?", "type":"question"};
  }



  public getMiniNameType(typeName: String) {
    return typeName.substring(0, 1).toUpperCase();
  }

}
