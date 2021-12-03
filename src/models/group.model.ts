import { QuestionModel } from "./question.model";

export class GroupModel {
 
    constructor(
        public questions: Array<QuestionModel>
    ){}
    }