import { Injectable } from '@angular/core';
import { Lecture } from 'src/entities/lecture';
import { ConfigureLectureService } from './configure-lecture.service';
import { QuestionDaoService } from './dao/question-dao.service';
import { Question } from 'src/entities/Question';
import { Group } from 'src/entities/group';
import { GroupDaoService } from './dao/group-dao.service';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  public lecture: Lecture;
  public questions: Array<Question>;
  public groups: Array<Group>;

  private isInitialize: boolean; //TODO

  constructor(private configureLecture: ConfigureLectureService, private questionDao: QuestionDaoService,
    private groupDao: GroupDaoService) {
      this.isInitialize = false;
      this.questions = new Array<Question>();
      this.groups = new Array<Group>();
  }


  /**
   * Initialise le service en récupérant l'item Lecture réalisé par le service ConfigureLectureService
   */
  initialize() {
      this.lecture = this.configureLecture.getCurrentLecture();
      this.questions = new Array<Question>();
      this.groups = new Array<Group>();
      this.isInitialize = true;
  }

  /**
   * Charge une précedente lecture non terminée
   */
  loadReading(lecture: Lecture) {
    //TODO Impl
  }

  /**
   * Ajoute une question à la liste des questions en cours et la transmet à la couche DAO pour la sauvegarder en bdd
   * Si la question existe déjà dans dans la liste alors elle n'a pas ajouté de nouveau
   *
   * @param question
   */
  public async addQuestion(question: Question) {
    question = await this.questionDao.saveQuestion(question);
    question.lecture = this.lecture;
    this.questions.push(question);
  }

  /**
   * Appel le service Dao permettant de mettre à jour la question en base de données
   *
   * @param question
   */
  public async updateQuestion(question: Question) {
    await this.questionDao.updateQuestion(question);
  }

  deleteQuestion(question: Question) { }

  /**
   * Retourne la liste des groupes actuelles
   */
  public async refreshGroups(): Promise<Group[]> {
    return await this.findGroups();
  }

  /**
   * Créer un nouveau groupe avec une question
   */
  public async createGroupe(question: Question): Promise<Group[]> {
    const g = new Group(this.lecture);
    await this.addQuestionInGroupe(g, question);

    return await this.findGroups();
  }

  // TODO
  async addQuestionInGroupe(group: Group, question: Question) {
    if (!group.questions || !group.questions.find(q => q.id === question.id)) {
      await this.groupDao.addQuestionInGroup(group, question);
      // this.groups = await this.groupDao.findGroupsByLecture(this.lecture);
    }

    return this.groups;
  }

  /**
   * Supprime un group de la liste et récupère la liste des groupes mmis à jour
   *
   * @param group Group
   * @param question Question
   */
  public async removeQuestionsInGroupe(group: Group, question: Question) {
    await this.groupDao.removeQuestionInGroup(group, question);
    return await this.findGroups();
  }

  /**
   * Demande à la couche DAO l'ensemble des groupes associés à la lecture courrante
   */
  private async findGroups() {
    // this.groups = await this.groupDao.findGroupsByLecture(this.lecture);
    return this.groups;
  }

}
