import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lecture } from "./lecture";
import { Question } from "./Question";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public isCreated: string;

    @ManyToMany(() => Question)
    @JoinTable()
    public questions: Question[];
    
    @ManyToOne(() => Lecture)
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