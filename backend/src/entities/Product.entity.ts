import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntry } from "./ProductEntry.entity";
import { Sales } from "./Sales.entity";
import { Billitem } from "./Billitem.entity";


@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id:string;

    @Column()
    name:string;

    @Column({unique:true})
    sku:string;

    @Column('decimal',{precision:10,scale:2})
    price:number;

    @Column()
    currentStock:number;
    
    @Column('decimal',{precision:10,scale:2})
    taxPercentage:number;

    @CreateDateColumn()
    createdAt:Date;

    @OneToMany(() => ProductEntry, productEntry => productEntry.product)
    productEntry:ProductEntry[];


    @OneToMany(() => Billitem, billitem => billitem.product)
    billitem:Billitem[];

}