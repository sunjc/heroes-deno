import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "../deps.ts";
import { Authority } from "./authority.ts";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: String, length: 50, unique: true })
  username: string;

  @Column({ type: String, length: 100 })
  password: string;

  @Column({ type: String, length: 50, unique: true })
  email: string;

  @Column({ type: Boolean })
  enabled: boolean = true;

  @ManyToMany((type) => Authority, { eager: true })
  @JoinTable({
    name: "user_authority",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "authority_id",
      referencedColumnName: "id",
    },
  })
  authorities: Authority[];
}
