import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artwork {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public title: string;

    @Column()
    public type: string;

}