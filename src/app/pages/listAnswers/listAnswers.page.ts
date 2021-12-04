import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LectureService } from 'src/providers/lecture.service';

@Component({
  selector: 'app-list-Answers',
  templateUrl: 'listAnswers.page.html',
  styleUrls: ['listAnswers.page.scss']
})
export class ListAnswersPage {

  public questions;

  constructor(private router: Router, private lectureService : LectureService) {}

  ngOnInit(){
    this.questions = this.lectureService.questions;
  }

  public goToDetail(){
    this.router.navigate(['/tabs/detail']);
    //Service stockage data avec transition de page
  }


  /**
   * Retourne le premier caractère de la chaîne fourni en paramètre.
   * TODO Attention pas de distinction entre Question : Q et QCM : Q
   * @param typeName string
   * @returns string
   */
  public getMiniNameType(typeName: String) {
    return typeName.substring(0, 1).toUpperCase();
  }
}
