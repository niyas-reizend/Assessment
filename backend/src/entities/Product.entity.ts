import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntry } from "./ProductEntry.entity";


@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id:string;

    @Column()
    name:string;

    @Column()
    sku:string;

    @Column('decimal',{precision:10,scale:2})
    price:number;

    @Column()
    currentStock:number;
    
    @Column()
    taxPercentage:number;

    @CreateDateColumn()
    createdAt:Date;

    @OneToMany(() => ProductEntry, productEntry => productEntry.product)
    productEntry:ProductEntry[];

    @OneToMany(() => ProductEntry, salesEntry => salesEntry.product)
    salesEntry:ProductEntry[];

}