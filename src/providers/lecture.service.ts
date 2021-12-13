import { Injectable } from '@angular/core';
import { Lecture } from 'src/entities/lecture';
import { ConfigureLectureService } from './configure-lecture.service';
import { QuestionDaoService } from './dao/question-dao.service';
import { Question } from 'src/entities/Question';
import { Group } from 'src/entities/group';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  public lecture: Lecture;
  public  questions: Array<Question>;
  public groups: Array<Group>;

   constructor(private configureLecture: ConfigureLectureService, private questionDao: QuestionDaoService) {
      this.lecture = this.configureLecture.getCurrentLecture();
       this.questions= new Array<Question>();
       this.groups = new Array<Group>();
    }

    /**
     * Ajoute une question à la liste des questions en cours
     * @param question 
     */
    addQuestion(question: Question) {
        this.questions.push(question);
        this.questionDao.saveQuestion(question);
    }

    deleteQuestion(question: Question){}

    createGroupe(question: Question){
      let g = new Group();
      g.addQuestion(question)
      this.groups.push(g);
    }

    // TODO
    addQuestionInGroupe(group: Group, question: Question){
      group.addQuestion(question);
      // this.groups.find(group).addQuestion(question);
    }

    removeQuestionsInGroupe(){

    }
}
