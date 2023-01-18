import { Injectable } from '@angular/core';
import { Lecture } from 'src/entities/lecture';
import { Question } from 'src/entities/Question';
import { DatabaseService } from '../database.service';
import { AbstractDaoService } from './abstract-dao.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionDaoService extends AbstractDaoService {


  private table = 'question';

  private addRequest = 'INSERT INTO ' + this.table +
    ' (question, answer, type, difficulty, nbPlayer, particularity, isCreated, isUpdated, lecture_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
  private findNewestQuestionRequest = 'SELECT * FROM ' + this.table + ' ORDER BY id DESC LIMIT 1;';
  private updateRequest = 'UPDATE ' + this.table +
    ' SET question = ?, answer = ?, type = ?, difficulty = ?, nbPlayer = ?, particularity = ?, isUpdated = ? ' +
    'WHERE id = ?;';

  constructor(private databaseService: DatabaseService) {
    super();
  }

  /**
   * Sauvegarde une entité question de la base de données
   */
  public async saveQuestion(question: Question) {
    console.log('QuestionDaoService.saveQuestion : ',
      question.question, question.answer, question.type, question.difficulty, question.lecture.id);
    try {
      (await this.databaseService.getDatabase()).executeSql(this.addRequest,
        [question.question, question.answer, question.type,
        question.difficulty, question.nbPlayer, question.particularity,
        question.isCreated, question.isUpdated, question.lecture.id]);

      return await this.findNewestQuestion();
    } catch (error) {
      console.log('Erreur saveQuestion ', error);
    }
  }

  /**
   * Met à jour une entité question en base de données
   *
   * @param question
   */
  public async updateQuestion(question: Question) {
    question.isUpdated = new Date().toISOString();
    console.log('QuestionDaoService.updateQuestion');
    try {
      (await this.databaseService.getDatabase()).executeSql(this.updateRequest,
        [question.question, question.answer, question.type,
        question.difficulty, question.nbPlayer, question.particularity,
        question.isUpdated, question.id]);
    } catch (error) {
      console.log('Erreur updateQuestion ', error);
    }
  }


  /**
   * TODO a refacto abstract extract() {}
   *
   * @param res
   * @returns
   */
  protected extract(res: any) {
    const q = new Question();
    q.id = res.id;
    q.answer = res.answer;
    q.question = res.question;
    q.type = res.type;
    q.difficulty = res.difficulty;
    q.isCreated = res.isCreated;
    q.isUpdated = res.isUpdated;
    q.nbPlayer = res.nbPlayer;
    q.particularity = res.particularity;
    q.lecture = new Lecture(res.lecture_id);

    return q;
  }

  /**
   * Retourne la dernière question créer
   */
  private async findNewestQuestion() {
    let question: Question;
    try {
      return (await this.databaseService.getDatabase()).executeSql(this.findNewestQuestionRequest, []).then(res =>
        question = this.extract(res.rows.item(0))
      );
    } catch (error) {
      console.log('Erreur findNewestQuestion ', error);
    }

    return question;
  }
  //   /**
  //   * Retourne une liste de question associé à la lecture en cours
  //   * @returns Question[]
  //   */
  //  public async findAllQuestionsByLecture(lecture: Lecture): Promise<Question[]> {
  //    return await getRepository(Question).find({
  //     where: {lecture: lecture },
  //     order: { isUpdated: "DESC"}
  //   });
  //  }



}


