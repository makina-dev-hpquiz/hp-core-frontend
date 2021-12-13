import { Injectable } from '@angular/core';
import { group } from 'console';
import { Group } from 'src/entities/group';
import { Lecture } from 'src/entities/lecture';
import { Question } from 'src/entities/Question';
import { getRepository } from 'typeorm';

@Injectable({
  providedIn: 'root'
})
export class GroupDaoService {

  constructor() { }

  /**
   *   
     * Sauvegarde une entité Group de la base de données
   * @param group 
   * @returns 
   */
  async saveGroup(group: Group){
    try {
      return await getRepository(Group).save(group);
    } catch (error) {
      console.log('GroupDaoService - saveGroup : La sauvegarde a echoué' + error);
    }
  }

/**
     * Supprime l'entité group fourni en paramètre de la base de données
     */
  async removeGroup(group: Group) {
    return await getRepository(Group).remove(group);
  }

  /**
   * Ajoute une question au groupe et sauvegarde la modification
   * @param group Group
   * @param question 
   */
  addQuestionInGroup(group: Group, question: Question){
    group.addQuestion(question);
    this.saveGroup(group);
  }

  /**
   * Supprime la question fourni au groupe et sauvegarde la modification
   * Si le groupe n'a plus de question alors il est supprimé
   * 
   * @param group Group
   * @param question 
   */
  removeQuestionInGroup(group: Group, question: Question){
    group.deleteQuestion(question);
    this.saveGroup(group);

    if(group.questions.length === 0) {
      this.removeGroup(group)
    }
  }

  /**
   * Récupère des groupes liées à une lecture
   * @param lecture 
   */
  findGroupsByLecture(lecture: Lecture){
    getRepository(Group).find({
      where: {lecture: lecture},
      order: {isCreated: 'DESC'}
    });
  }
}
