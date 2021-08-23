import { Field, InputType, registerEnumType } from "type-graphql";

export enum GuestType {
  CHILD = 'CHILD',
  YOUNG_ADULT = 'YOUNG_ADULT',
  OLD_ADULT = 'OLD_ADULT'
}

registerEnumType(GuestType, {
  name: 'GuestType',
  description: 'Type of the guest'
})

@InputType()
export class GuestTypeInput {
  @Field(() => GuestType) // it's very important
  guestType: GuestType;
}
