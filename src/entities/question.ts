import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Lecture } from "./lecture";
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Question {

    @PrimaryColumn("uuid")
    id: string;

    @ManyToOne(() => Lecture, lecture => lecture.id)
    lecture: Lecture;

    @Column()
    isCreated: string;

    @Column()
    isUpdated: string;

    
    @Column()
    public question: string;

    @Column({
        nullable: true
    })
    public answer: string;

    @Column()
    public type: string;

    @Column()
    public difficulty: string;

    @Column({
        nullable: true
    })
    public nbPlayer: number;

    @Column({
        nullable: true
    })
    public particularity: string;

    // @ManyToMany(() => Group, group => lecture.id)
    // group: Group;

    constructor(){
        this.id = uuidv4();
        this.isCreated = new Date().toISOString();
        this.isUpdated = new Date().toISOString();
    }

   
}