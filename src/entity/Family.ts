import { Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Guest } from "./Guest";

@ObjectType()
@Entity('families')
export class Family extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  name: string;

  @Field(() => [Guest], { nullable: true })
  @OneToMany(() => Guest, (guest: Guest) => guest.family)
  guests?: Guest[];

  /**
   * DB insert time.
   */
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;

  /**
   * DB last update time.
   */
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}

@InputType()
export class FamilyInputType {
  @Field()
  name: string;
}
