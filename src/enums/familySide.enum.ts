import { Field, InputType, registerEnumType } from "type-graphql";

export enum FamilySide {
  BRIDE = 'BRIDE',
  GROOM = 'GROOM'
}

registerEnumType(FamilySide, {
  name: 'FamilySide',
  description: 'Family side'
})

@InputType()
export class FamilySideInput {
  @Field(() => FamilySide) // it's very important
  familySide: FamilySide;
}
