import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product.entity";
import { User } from "./User.entity";

@Entity()
export class SalesEntry {
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

    @ManyToOne(() => Product, product => product.salesEntry)
    @JoinColumn()
    product:Product;

    @ManyToOne(() => User, user => user.salesEntry )
    @JoinColumn()
    soldby:User;

    

}