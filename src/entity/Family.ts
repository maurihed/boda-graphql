import { Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Guest } from "./Guest";
import { FamilySide } from "../enums/familySide.enum";

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

  @Field(() => FamilySide, { defaultValue: FamilySide.BRIDE })
  @Column("text", { default: FamilySide.GROOM })
  familySide: FamilySide;
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

  @Field(() => FamilySide)
  familySide: FamilySide;
}
