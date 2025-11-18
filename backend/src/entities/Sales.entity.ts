import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Product } from "./Product.entity";
import { User } from "./User.entity";
import { Billitem } from "./Billitem.entity";

@Entity()
export class Sales {
    @PrimaryGeneratedColumn('uuid')
    sales_id:string;

    @Column('decimal',{precision:10,scale:2})
    totalSalesPrice:number;

    @Column('decimal',{precision:10,scale:2})
    totalTax:number;

    @Column('decimal',{precision:10,scale:2})
    discount:number;

    @Column('decimal',{precision:10,scale:2})
    amountToPay:number;

    @CreateDateColumn()
    soldAt:Date;

    @OneToMany(() => Billitem, billitem => billitem.sales ,{cascade:true})
    billitem:Billitem[];
}