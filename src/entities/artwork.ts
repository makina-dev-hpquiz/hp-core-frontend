import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lecture } from "./lecture";

@Entity()
export class Artwork {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public title: string;

    @Column()
    public type: string;

    // @Column({nullable:true})
    // @OneToMany(() => Lecture, lecture => lecture.artwork)
    // lectures: Lecture[];

    constructor(title?: string, type?: string){
        this.title = title;
        this.type = type;
    }

}