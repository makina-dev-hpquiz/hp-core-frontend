import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lecture } from "./lecture";
import { Question } from "./Question";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    public id: string;


    @Column()
    public isCreated;

    @OneToMany(() => Question, question => question.id)
    public questions: Array<Question>;
    
    @OneToMany(() => Lecture, lecture => lecture.id)
    public lecture: Lecture;

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