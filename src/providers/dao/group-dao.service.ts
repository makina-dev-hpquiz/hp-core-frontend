import { Injectable } from '@angular/core';
import { Group } from 'src/entities/group';
import { Lecture } from 'src/entities/lecture';
import { Question } from 'src/entities/Question';

@Injectable({
  providedIn: 'root'
})
export class GroupDaoService {

  constructor() { }

  /**
   *
   * Sauvegarde une entité Group de la base de données
   *
   * @param group
   * @returns
   */
  async saveGroup(group: Group){
    // try {
    //   return await getRepository(Group).save(group);
    // } catch (error) {
    //   console.log('GroupDaoService - saveGroup : La sauvegarde a echoué' + error);
    // }
  }

/**
 * Supprime l'entité group fourni en paramètre de la base de données
 */
  async deleteGroup(group: Group) {
    // return await getRepository(Group).remove(group);
  }

  /**
   * Ajoute une question au groupe et sauvegarde la modification
   *
   * @param group Group
   * @param question
   */
  async addQuestionInGroup(group: Group, question: Question){
    // group.addQuestion(question);
    // await this.saveGroup(group);
  }

  /**
   * Spprime la question du groupe puis sauvegarde le group ou
   *  le supprime s'il ne possède plus de questions
   *
   * @param group Group
   * @param question
   */
  async removeQuestionInGroup(group: Group, question: Question){
    // group.deleteQuestion(question);

    // if(group.questions.length === 0) {
    //   await this.deleteGroup(group)
    // } else {
    //  await this.saveGroup(group);
    // }
  }

  // /**
  //  * Récupère des groupes liées à une lecture
  //  * @param lecture
  //  */
  // async findGroupsByLecture(lecture: Lecture) : Promise<Group[]>{
  //   return await getRepository(Group).find({
  //     where: { lecture: lecture },
  //     order: { isCreated: 'DESC' },
  //     relations: ["lecture", "questions"],

  //   });
  // }
}
