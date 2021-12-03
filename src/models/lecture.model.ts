import { QuestionModel } from "./question.model";

export class LectureModel {
 
    constructor(
            public date:string, 
            public livre: string,
            public questions: Array<QuestionModel>
        ){}
}