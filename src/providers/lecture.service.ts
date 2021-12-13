import { Injectable } from '@angular/core';
import { GroupModel } from 'src/models/group.model';
import { Lecture } from 'src/entities/lecture';
import { QuestionModel } from 'src/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  public lecture: Lecture;
  public  questions: Array<QuestionModel>;
  public groups: Array<GroupModel>;

   constructor() {
      //  this.lecture = new LectureModel(new Date().toDateString(), "Livre 1", this.questions);
       this.questions= new Array<QuestionModel>();
       this.groups = new Array<GroupModel>();
    }

    /**
     * Ajoute une question à la liste des questions en cours
     * @param question 
     */
    addQuestion(question: QuestionModel) {
        this.questions.push(question);
    }

    deleteQuestion(question: QuestionModel){}

    createGroupe(question: QuestionModel){
      let g = new GroupModel();
      g.addQuestion(question)
      this.groups.push(g);
    }

    // TODO
    addQuestionInGroupe(group: GroupModel, question: QuestionModel){
      group.addQuestion(question);
      // this.groups.find(group).addQuestion(question);
    }
}
