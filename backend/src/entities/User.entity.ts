import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sales } from "./Sales.entity";
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 10, unique: true })
  phone_number: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true })
  place: string;

  @OneToMany(() => Sales, (sales) => sales.soldby)
  sales: Sales[];
}
