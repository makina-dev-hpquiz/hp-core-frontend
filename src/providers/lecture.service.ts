import { Injectable } from '@angular/core';
import { LectureModel } from 'src/models/lecture.model';
import { QuestionModel } from 'src/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  public lecture: LectureModel;
   public  questions: Array<QuestionModel>;

   constructor() {
       this.lecture = new LectureModel(new Date().toDateString(), "Livre 1", this.questions);
       this.questions= new Array<QuestionModel>();
    }

    /**
     * Ajoute une question à la liste des questions en cours
     * @param question 
     */
    addQuestion(question: QuestionModel) {
        this.questions.push(question);
    }

    deleteQuestion(question: QuestionModel){}

    createGroupe(){}

    addQuestionInGroupe(){}
}
