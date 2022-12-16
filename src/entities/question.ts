import { Lecture } from './lecture';
import { v4 as uuidv4 } from 'uuid';


export class Question {

    id: string;

    // @ManyToOne(() => Lecture, lecture => lecture.id)
    lecture: Lecture;

    public isCreated: string;

    public isUpdated: string;


    public question: string;

    public answer: string;

    public type: string;

    public difficulty: string;

    public nbPlayer: number;

    public particularity: string;

    // @ManyToMany(() => Group, group => lecture.id)
    // group: Group;

    constructor(){
        // this.id = uuidv4();
        this.isCreated = new Date().toISOString();
        this.isUpdated = new Date().toISOString();
    }


}
