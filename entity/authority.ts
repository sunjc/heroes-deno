import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.ts";

enum AuthorityName {
  USER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN"
}

@Entity()
class Authority {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: String, name: "authority_name", length: 10})
  name: AuthorityName = AuthorityName.USER;

  @ManyToMany((type) => User, (user) => user.authorities)
  users: User[];
}

export {AuthorityName, Authority};
