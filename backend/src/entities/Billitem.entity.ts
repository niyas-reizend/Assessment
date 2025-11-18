import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ProductEntry } from "./ProductEntry.entity";
import { Sales } from "./Sales.entity";
import { Product } from "./Product.entity";

@Entity()
export class Billitem {
    @PrimaryGeneratedColumn('uuid')
    billitem_id:string;

    @Column()
    quantity:number;

    @Column('decimal',{precision:10,scale:2})
    salePrice:number;


    @ManyToOne(() => Product , product => product.billitem)
    @JoinColumn({name:"productId"})
    product:Product;

    @ManyToOne(() => Sales, sales => sales.billitem)
    @JoinColumn()
    sales:Sales;

}