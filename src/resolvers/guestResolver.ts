import { Guest, GuestInputType } from "../entity/Guest";
import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import { GuestType } from "../enums/guests.enum";

@Resolver()
export class GuestResolver {
  @Query(() => [Guest])
  async guests() {
    return await Guest.find({relations: ['family']});
  }


  @Mutation(() => Guest)
  async newGuest(
    @Arg('name') name: string,
    @Arg('type', () => GuestType) type: GuestType,
    @Arg('familyId', () => Int) familyId: number,
    @Arg('age', () => Int, { defaultValue: 18, nullable: true }) age?: number,
  ) {
    try {
      const { identifiers: [{ id: guestId }] } = await Guest.insert({ name, type, age, familyId })
      return await Guest.findOneOrFail(guestId, { relations: ['family'] });
    } catch(err) {
      console.error(err);
      return {
        hasError: true,
        error: err
      };
    }
  }

  @Mutation(() => Guest)
  async updateGuest(
    @Arg('guest', () => GuestInputType) guest: GuestInputType, 
    @Arg('guestId', () => Int) guestId: number
    ) {
      try {
        console.log(guest);
        await Guest.update(guestId, guest);
        return await Guest.findOneOrFail(guestId, { relations: ['family'] });
      } catch (err) {
        console.error(err)
        return {
          hasError: true,
          error: err
        };
      }
  }

  @Mutation(() => Int)
  deleteGuest(@Arg('guestId', () => Int) guestId: number) {
    try {
      Guest.delete(guestId);
      return guestId;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
