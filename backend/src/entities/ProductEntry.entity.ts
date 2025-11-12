import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product.entity";

@Entity()
export class ProductEntry {
    @PrimaryGeneratedColumn('uuid')
    entry_id:string;

    @Column()
    quantity:number;

    @Column('decimal',{precision:10,scale:2})
    purchasePrice:number;

    @CreateDateColumn()
    addedAt:Date;

    @ManyToOne(() => Product, product => product.productEntry,{onDelete:'CASCADE'})
    @JoinColumn()
    product:Product;

}