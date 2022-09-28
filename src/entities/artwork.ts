
import { Lecture } from './lecture';

export class Artwork {
    id: number;

    // public title: string;

    // public type: string;

    // @Column({nullable:true})
    // @OneToMany(() => Lecture, lecture => lecture.artwork)
    // lectures: Lecture[];

    constructor(public title?: string, public type?: string){}
}
