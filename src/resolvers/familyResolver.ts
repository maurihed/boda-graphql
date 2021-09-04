import {Arg, Mutation, Query, Resolver, Int} from "type-graphql";
import { Guest, GuestInputType } from "../entity/Guest";
import { Family, FamilyInputType } from "../entity/Family";

@Resolver()
export class FamilyResolver {
  @Query(() => [Family])
  async families() {
    return await Family.find({
      relations: ['guests'],
      loadRelationIds: false
    });
  }


  @Mutation(() => Boolean)
  async newFamily(
    @Arg('name') name: string,
    @Arg('guests', () => [GuestInputType], {nullable: true}) guests?: GuestInputType[]
  ) {
    try {
      const {identifiers: [{id: familyId}]} = await Family.insert({ name });
      if (guests?.length) {
        guests.forEach((guest: GuestInputType) => Guest.insert({...guest, familyId}));
      }
      return true;
    } catch(err) {
      console.error(err);
      return false
    }
  }

  @Mutation(() => Boolean)
  async updateFamily(
    @Arg('familyId', () => Int) familyId: number,
    @Arg('family') family: FamilyInputType
  ){
    try {
      Family.update(familyId, family);
      return true;
    } catch (err) {
      console.error(err);
      return false
    }
  }

  @Mutation(() => Boolean)
  async deleteFamily (@Arg('familyId', () => Int) familyId: number) {
    try {
      Family.delete(familyId);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
