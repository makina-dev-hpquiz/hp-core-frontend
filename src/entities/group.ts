import { Lecture } from "./lecture";
import { Question } from "./Question";

export class Group {

    public id: number;

    public isCreated: string;

    // @ManyToMany(() => Question)
    public questions: Question[];
    
    // @ManyToOne(() => Lecture)
    public lecture: Lecture;

    constructor(lecture: Lecture){
        this.isCreated = new Date().toISOString();
        this.lecture = lecture;
    }

    public addQuestion(question){
        if(!this.questions) {
            this.questions = new Array();
        }
        this.questions.push(question);
    }

    public deleteQuestion(question: Question){
        this.questions.splice(this.questions.indexOf(question), 1);
    }


}