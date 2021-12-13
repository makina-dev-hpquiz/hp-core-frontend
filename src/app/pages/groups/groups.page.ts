import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/entities/group';
import { Question } from 'src/entities/Question';
import { TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { LectureService } from 'src/providers/lecture.service';

@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss']
})
export class GroupsPage {

  public keyword: string;
  public results: Array<Question>;

  public groups: Group[];
  public selectedQuestion: Question;

  constructor(private route: ActivatedRoute, private router: Router, private lectureService: LectureService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedQuestion = this.router.getCurrentNavigation().extras.state.question;
        console.log(this.selectedQuestion)

      }
    });
  }

  ngOnInit() {
    this.groups = this.lectureService.groups;
    this.keyword = "";
  }

  /**
   * TODO Code en doublon, à transformer en component
   * @param typeName 
   * @returns 
   */
  public getMiniNameType(typeName: String) {
    if(typeName === TypeQuestion.QCM) {
      return "Qc";
    } else {
    return typeName.substring(0, 1).toUpperCase();
    }  }

  /**
   * Créer un nouveau groupe avec la question sélectionné
   */
  public createGroupe() {
    if (this.selectedQuestion) {
      this.lectureService.createGroupe(this.selectedQuestion);
      this.resetSelectedQuestion();
    } else {
      console.log("Pas de question selectionnée")
    }
  }

  /**
   * Ajoute la question sélectionné dans le groupe cliqué
   * RG : La question ne peut pas être déjà dans le même groupe
   * @param group 
   */
  public addInGroupe(group: Group) {
    if (this.selectedQuestion) {
      if (!group.questions.find(q => q.id === this.selectedQuestion.id)) {
        group.addQuestion(this.selectedQuestion);
        this.resetSelectedQuestion();
      } else {
        console.log("Déjà dans le groupe")
      }
    } else {
      console.log("Pas de question selectionné")
    }
  }

  /**
   * Reinitialise la question sélectionné
   */
  public resetSelectedQuestion() {
    this.selectedQuestion = null;
  }

  /**
   * Supprime la question passé en paramètre du groupe passé en paramètre,
   * Si le group est vide, il est supprimé également
   * @param group 
   * @param question 
   */
  public removeQuestion(group: Group, question: Question) {
    group.deleteQuestion(question);
    if (group.questions.length === 0) {
      this.groups.splice(this.groups.indexOf(group), 1);
    }
  }


  public filter() {
    if (this.keyword !== "") {
      this.results = this.lectureService.questions.filter(q => q.question.toLowerCase().includes(this.keyword.toLowerCase()));
    } else {

      this.results = new Array<Question>();
    }
  }

  selectQuestion(question: Question) {
    this.selectedQuestion = question;
    this.results = new Array<Question>();
    this.keyword = "";
  }

}
