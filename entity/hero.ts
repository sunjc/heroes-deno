import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({orderBy: {id: "ASC"}})
export class Hero {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", {name: "hero_name", length: 50, unique: true})
  name: string;

  @CreateDateColumn({name: "created_date"})
  createdDate: Date;

  @UpdateDateColumn({name: "last_modified_date"})
  lastModifiedDate: Date;
}
