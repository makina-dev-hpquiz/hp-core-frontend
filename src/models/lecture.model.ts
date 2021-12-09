import { QuestionModel } from "./question.model";

export class LectureModel {
    public date;
    public livre: string;
    public questions: Array<QuestionModel>;

    public startPage;
    public endPage;

    constructor() { 
        this.date = new Date();
    }
}