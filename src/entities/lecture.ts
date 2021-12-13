import { QuestionModel } from "../models/question.model";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';

@Entity()
export class Lecture {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public date: string;

    @Column()
    public livre: string;

    // @OneToMany(type => QuestionModel, question => question.lecture) 
    // public questions: Array<QuestionModel>;

    @Column({
        nullable: true
    })
    public startPage: string;

    @Column({
        nullable: true
    })
    public endPage: string;

    @Column()
    public isInProgress: boolean

    constructor() { 
        this.date = new Date().toISOString();
        this.isInProgress = true;
    }
}