import { Injectable } from '@angular/core';
import { Lecture } from 'src/entities/lecture';
import { Question } from 'src/entities/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionDaoService {

  constructor() { }

   /**
    * Sauvegarde une entité lecture de la base de données
    */
    public async saveQuestion(question: Question) {
      // try {
      //   return await getRepository(Question).save(question);
      // } catch (error) {
      //   console.log('QuestionDaoService - saveQuestion : La sauvegarde a echoué' + error);
      // }
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
