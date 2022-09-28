import { QuestionModel } from './question.model';
import { v4 as uuidv4 } from 'uuid';

export class GroupModel {
    public questions: Array<QuestionModel>;
    public id: string;

    constructor() {
        this.questions = new Array<QuestionModel>();
        this.id = uuidv4();
    }

    public addQuestion(question){
        this.questions.push(question);
    }

    public deleteQuestion(question: QuestionModel){
        this.questions.splice(this.questions.indexOf(question), 1);
    }

}
