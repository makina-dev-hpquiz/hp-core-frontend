import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    public id: string;


    public questions: Array<Question>;
    

    @Column()
    public isCreated;


    constructor(){
        this.isCreated = new Date().toISOString();
    }

    public addQuestion(question){
        this.questions.push(question);
    }

    public deleteQuestion(question: Question){
        this.questions.splice(this.questions.indexOf(question), 1);
    }


}