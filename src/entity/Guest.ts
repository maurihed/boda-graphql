import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Family } from "./Family";
import { GuestType } from "../enums/guests.enum";

@ObjectType()
@Entity('guests')
export class Guest extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  name: string;

  @Field(() => GuestType)
  @Column('text')
  type: GuestType;

  @Field(() => Int)
  @Column('int')
  age: number;

  @Field(() => Int)
  @Column('int')
  familyId: number;

  @Field(() => Family, {nullable: true})
  @ManyToOne(() => Family, (family: Family) => family.guests)
  family: Family;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public createdAt: Date;
  
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}

@InputType()
export class GuestInputType {
  @Field({ nullable: true })
  name?: string;

  @Field(() => GuestType, { nullable: true })
  type?: GuestType;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => Int, { nullable: true })
  familyId?: number;
}
