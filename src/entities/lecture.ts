import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Artwork } from "./artwork";

@Entity()
export class Lecture {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public date: string;

    @ManyToOne(() => Artwork) 
    public artwork: Artwork;
    

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