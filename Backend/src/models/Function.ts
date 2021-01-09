import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cad_functions')
export default class Function {
    @PrimaryGeneratedColumn('increment')
    id_function: number;

    @Column()
    nome: string;

    @Column("text", { array: true })
    tags: string[];

    @Column()
    description: string;

    @Column("text")
    purpose: string;

    @Column("text")
    parameters: string;

    @Column("text")
    pathurl: string;

    @Column("text")
    saida: string;

    @Column()
    code: string;
}