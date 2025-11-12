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

    @ManyToOne(() => Product , product => product.billitem)
    @JoinColumn()
    product:Product;

    @ManyToOne(() => Sales, sales => sales.billitem)
    @JoinColumn()
    sales:Sales;

}