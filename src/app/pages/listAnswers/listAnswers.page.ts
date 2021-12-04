import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionModel } from 'src/models/question.model';
import { LectureService } from 'src/providers/lecture.service';

@Component({
  selector: 'app-list-Answers',
  templateUrl: 'listAnswers.page.html',
  styleUrls: ['listAnswers.page.scss']
})
export class ListAnswersPage {

  public questions: QuestionModel[];
  public keyword: string;

  constructor(private router: Router, private lectureService : LectureService) {}

  ngOnInit(){
    this.questions = this.lectureService.questions;
    // this.questions.length
    this.keyword = "";
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

  /**
   * Filtre la liste de questions en fonction de la phrase écrite dans le searchInput
   */
  public filter(){
    if(this.keyword !== "") {
    this.questions = this.lectureService.questions.filter( q => q.question.toLowerCase().includes(this.keyword.toLowerCase()));
    }
  }
}
