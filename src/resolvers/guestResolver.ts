import { Guest, GuestInputType } from "../entity/Guest";
import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import { GuestType } from "../enums/guests.enum";

@Resolver()
export class GuestResolver {
  @Query(() => [Guest])
  async guests() {
    return await Guest.find({relations: ['family']});
  }


  @Mutation(() => Boolean)
  async newGuest(
    @Arg('name') name: string,
    @Arg('type', () => GuestType) type: GuestType,
    @Arg('age', () => Int) age: number,
    @Arg('familyId', () => Int) familyId: number,
  ) {
    try {
      console.log(type);
      await Guest.insert({ name, type, age, familyId })
      return true;
    } catch(err) {
      console.error(err);
      return false
    }
  }

  @Mutation(() => Boolean)
  updateGuest(
    @Arg('guest', () => GuestInputType) guest: GuestInputType, 
    @Arg('guestId', () => Int) guestId: number
    ) {
      try {
        Guest.update(guestId, guest);
        return true;
      } catch (err) {
        console.error(err)
        return false;
      }
  }

  @Mutation(() => Boolean)
  deleteGuest(@Arg('guestId', () => Int) guestId: number) {
    try {
      Guest.delete(guestId);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
