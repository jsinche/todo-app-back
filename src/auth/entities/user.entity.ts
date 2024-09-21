import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    first_name: string;

    @Column('text')
    last_name: string;

    @Column('bool', {
        default: true
    })
    is_active: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];
}