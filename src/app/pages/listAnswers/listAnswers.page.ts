import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-Answers',
  templateUrl: 'listAnswers.page.html',
  styleUrls: ['listAnswers.page.scss']
})
export class ListAnswersPage {

  public question;

  constructor(private router: Router) {}

  ngOnInit(){
    this.question = {"question": "Quel est le numéro du coffre où Hagrid récupère un mystérieux paquet?", "type":"question"};
  }

  public goToDetail(){
    this.router.navigate(['/tabs/detail']);
    //Service stockage data avec transition de page
  }


  public getMiniNameType(typeName: String) {
    return typeName.substring(0, 1).toUpperCase();
  }
}
