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
      }
    });
  }

  ngOnInit() {
    this.groups = this.lectureService.groups;
    this.keyword = '';
  }

  async ionViewWillEnter(){
    this.groups = await this.lectureService.refreshGroups();
  }

  /**
   * TODO Code en doublon, à transformer en component
   *
   * @param typeName
   * @returns
   */
  public getMiniNameType(typeName: String) {
    if(typeName === TypeQuestion.QCM) {
      return 'Qc';
    } else {
    return typeName.substring(0, 1).toUpperCase();
    }  }

  /**
   * Créer un nouveau groupe avec la question sélectionné
   */
  public async createGroupe() {
    if (this.selectedQuestion) {
      this.groups = await this.lectureService.createGroupe(this.selectedQuestion);
      this.resetSelectedQuestion();
    } else {
      console.log('Pas de question selectionnée');
    }
  }

  /**
   * Ajoute la question sélectionné dans le groupe cliqué
   * RG : La question ne peut pas être déjà dans le même groupe
   *
   * @param group
   */
  public async addInGroupe(group: Group) {
    if (this.selectedQuestion) {
      this.groups =  await this.lectureService.addQuestionInGroupe(group, this.selectedQuestion);
        this.resetSelectedQuestion();
    } else {
      console.log('Pas de question selectionné');
    }
  }

  /**
   * Appelle le service qui gère la suppression de la question dans le groupe
   *
   * @param group
   * @param question
   */
  public async removeQuestion(group: Group, question: Question) {
    this.groups = await this.lectureService.removeQuestionsInGroupe(group, question);
  }

  /**
   * Reinitialise la question sélectionné
   */
   public resetSelectedQuestion() {
    this.selectedQuestion = null;
  }

  public filter() {
    if (this.keyword !== '') {
      this.results = this.lectureService.questions.filter(q => q.question.toLowerCase().includes(this.keyword.toLowerCase()));
    } else {

      this.results = new Array<Question>();
    }
  }

  selectQuestion(question: Question) {
    this.selectedQuestion = question;
    this.results = new Array<Question>();
    this.keyword = '';
  }

}
