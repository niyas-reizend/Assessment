import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Product } from "./Product.entity";
import { User } from "./User.entity";
import { Billitem } from "./Billitem.entity";

@Entity()
export class Sales {
    @PrimaryGeneratedColumn('uuid')
    sales_id:string;

    @Column()
    quantity:number;

    @Column('decimal',{precision:10,scale:2})
    salesPrice:number;

    @Column()
    discount:number;

    @CreateDateColumn()
    soldAt:Date;

    @ManyToOne(() => User, user => user.sales )
    @JoinColumn()
    soldby:User;

    @OneToMany(() => Billitem, billitem => billitem.sales)
    billitem:Billitem[];

}